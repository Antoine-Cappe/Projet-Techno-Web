import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sale.entity';
import { SalesRepository } from './sales.repository';
import { SalesController } from './sales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  controllers: [SalesController], 
  providers: [SalesRepository],
  exports: [SalesRepository],
})
export class SalesModule {}