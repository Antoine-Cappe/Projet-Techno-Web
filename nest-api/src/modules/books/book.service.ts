import { Injectable } from '@nestjs/common';
import {
  BookModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookRepository } from './book.repository';
import { SalesRepository } from '../sales/sales.repository'; // Import du repository des ventes

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly salesRepository: SalesRepository, // Injection du repository des ventes
  ) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    const [books, totalCount] = await this.bookRepository.getAllBooks(input);

    // On enrichit chaque livre avec son nombre de ventes
    const booksWithSales = await Promise.all(
      books.map(async (book) => {
        // On récupère le compte des ventes pour ce livre spécifique
        // Note: Assure-toi que countByBookId est défini dans ton SalesRepository
        const purchasedCount = await this.salesRepository.findAll({
          where: { bookId: book.id as any }
        }).then(sales => sales.length);

        return {
          ...book,
          purchasedCount,
        };
      }),
    );

    return [booksWithSales, totalCount];
  }

  public async getBookById(id: string): Promise<BookModel | undefined> {
    const book = await this.bookRepository.getBookById(id);
    if (!book) return undefined;

    // On ajoute aussi le compte pour le détail d'un livre seul
    const purchasedCount = await this.salesRepository.findAll({
      where: { bookId: id as any }
    }).then(sales => sales.length);

    return {
      ...book,
      purchasedCount,
    };
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    return this.bookRepository.createBook(book);
  }

  public async updateBook(
    id: string,
    book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    const oldBook = await this.getBookById(id);
    if (!oldBook) {
      return undefined;
    }

    return this.bookRepository.updateBook(id, book);
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }
}