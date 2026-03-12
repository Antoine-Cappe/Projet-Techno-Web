import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sale.entity';
import { SalesRepository } from './sales.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  providers: [SalesRepository],
  exports: [SalesRepository],
})
export class SalesModule {}