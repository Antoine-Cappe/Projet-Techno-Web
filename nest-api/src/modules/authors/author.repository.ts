import { Injectable } from '@nestjs/common';
import { CreateAuthorModel, UpdateAuthorModel } from './author.model';
import { AuthorEntity, AuthorId } from './author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  public async getAllAuthors(): Promise<AuthorEntity[]> {
    return this.authorRepository.find({
      relations: ['books'],
    });
  }

  public async getAuthorById(id: string): Promise<AuthorEntity | null> {
    return this.authorRepository.findOne({
      where: { id: id as AuthorId },
      relations: ['books'],
    });
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorEntity> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }

  public async updateAuthor(id: string, data: UpdateAuthorModel): Promise<AuthorEntity | null> {
    await this.authorRepository.update(id, data);
    return this.getAuthorById(id);
  }
  
  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }
}