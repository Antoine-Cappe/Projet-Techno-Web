import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sale.entity';
import { SalesRepository } from './sales.repository';
import { SalesController } from './sales.controller';
import { ClientEntity } from '../clients/entities/client.entity';
import { BookEntity } from '../books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, ClientEntity, BookEntity])],
  controllers: [SalesController], 
  providers: [SalesRepository],
  exports: [SalesRepository],
})
export class SalesModule {}