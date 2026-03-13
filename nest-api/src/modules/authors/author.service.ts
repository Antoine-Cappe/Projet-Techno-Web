import { Injectable } from '@nestjs/common';
import { 
  AuthorModel, 
  AuthorDetailModel, 
  CreateAuthorModel, 
  UpdateAuthorModel 
} from './author.model';
import { AuthorRepository } from './author.repository';
import { SalesRepository } from '../sales/sales.repository';

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly salesRepository: SalesRepository,
  ) {}

  public async getAllAuthors(): Promise<AuthorModel[]> {
    const authors = await this.authorRepository.getAllAuthors();
    
    return authors.map(author => ({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl,
      booksCount: author.books ? author.books.length : 0,
    }));
  }

  public async getAuthorById(id: string): Promise<AuthorDetailModel | null> {
    const author = await this.authorRepository.getAuthorById(id);
    if (!author) return null;

    let totalSales = 0;
    if (author.books && author.books.length > 0) {
      const salesCounts = await Promise.all(
        author.books.map(book => 
          this.salesRepository.findAll({ where: { bookId: book.id } })
            .then(sales => sales.length)
        )
      );
      totalSales = salesCounts.reduce((acc, count) => acc + count, 0);
    }

    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl,
      books: author.books.map(book => ({
        id: book.id,
        title: book.title,
        yearPublished: book.yearPublished
      })),
      averageSales: author.books.length > 0 ? totalSales / author.books.length : 0,
    };
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    const newAuthor = await this.authorRepository.createAuthor(author);
    return {
      id: newAuthor.id,
      firstName: newAuthor.firstName,
      lastName: newAuthor.lastName,
      photoUrl: newAuthor.photoUrl,
    };
  }

  public async updateAuthor(id: string, author: UpdateAuthorModel): Promise<AuthorDetailModel | null> {
    await this.authorRepository.updateAuthor(id, author);
    return this.getAuthorById(id);
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }
}