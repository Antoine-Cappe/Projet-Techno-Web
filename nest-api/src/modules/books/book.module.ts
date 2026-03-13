import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorEntity } from '../authors/author.entity';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity]), SalesModule],
  controllers: [BookController],
  providers: [BookRepository, BookService],
})
export class BookModule {}
