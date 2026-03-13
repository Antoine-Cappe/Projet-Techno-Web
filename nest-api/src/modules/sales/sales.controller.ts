import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { CreateSaleDto } from './dtos/sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesRepository: SalesRepository) {}

  @Get()
  async getSales(
    @Query('clientId') clientId?: string,
    @Query('bookId') bookId?: string,
  ) {
    if (clientId) {
      return this.salesRepository.findByClientId(clientId);
    }
    if (bookId) {
      return this.salesRepository.findByBookId(bookId);
    }
    return this.salesRepository.findAll();
  }

  @Post()
  async createSale(@Body() dto: CreateSaleDto) {
    return this.salesRepository.createSale(dto);
  }
}
