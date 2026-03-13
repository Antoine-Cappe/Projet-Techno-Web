import { Injectable } from '@nestjs/common';
import {
  BookModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookRepository } from './book.repository';
import { SalesRepository } from '../sales/sales.repository';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly salesRepository: SalesRepository,
  ) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    const [books, totalCount] = await this.bookRepository.getAllBooks(input);

    const booksWithSales = await Promise.all(
      books.map(async (book): Promise<BookModel> => {
        const purchasedCount = await this.salesRepository.countByBookId(book.id);

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

    const purchasedCount = await this.salesRepository.countByBookId(id);

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