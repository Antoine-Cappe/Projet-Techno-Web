import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { AuthorEntity } from './author.entity';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';
import { SalesModule } from '../sales/sales.module'; // AJOUT

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity]),
    SalesModule, // AJOUT : permet d'injecter SalesRepository dans le service
  ],
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService],
})
export class AuthorModule {}