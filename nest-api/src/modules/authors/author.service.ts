import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorRepository } from './author.repository';
import { SalesRepository } from '../sales/sales.repository';

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly salesRepository: SalesRepository,
  ) {}

  public async getAllAuthors(): Promise<any[]> {
    const authors = await this.authorRepository.getAllAuthors();
    // On transforme l'entité en modèle pour ajouter le compte des livres
    return authors.map(author => ({
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl,
      booksCount: author.books ? author.books.length : 0, // On envoie le chiffre attendu
    }));
  }

  public async getAuthorById(id: string): Promise<any> {
    const author = await this.authorRepository.getAuthorById(id);
    if (!author) return null;

    // Calcul du total des ventes pour tous les livres de l'auteur
    let totalSales = 0;
    if (author.books && author.books.length > 0) {
      const salesCounts = await Promise.all(
        author.books.map(book => 
          this.salesRepository.findAll({ where: { bookId: book.id as any } })
            .then(sales => sales.length)
        )
      );
      totalSales = salesCounts.reduce((acc, count) => acc + count, 0);
    }

    // On retourne l'auteur avec la propriété averageSales calculée
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      photoUrl: author.photoUrl,
      books: author.books,
      averageSales: author.books?.length ? totalSales / author.books.length : 0,
    };
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }

  public async updateAuthor(id: string, author: any): Promise<any> {
    return this.authorRepository.updateAuthor(id, author);
  }

  // AJOUT : Demander au repository de supprimer
  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }
}
