import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { AuthorEntity } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  // Pour la liste : on compte les livres
  public async getAllAuthors(): Promise<any[]> {
    return this.authorRepository.find({
      relations: ['books'],
    });
  }

  // Correction Bug 4 : Récupérer un auteur précis avec ses livres
  public async getAuthorById(id: string): Promise<AuthorEntity | null> {
    return this.authorRepository.findOne({
      where: { id: id as any },
      relations: ['books'], // Crucial pour afficher la liste des livres
    });
  }
  
  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }
}
