import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

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
    return this.authorRepository.getAuthorById(id);
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }
}
