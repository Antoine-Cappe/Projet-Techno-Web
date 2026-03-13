import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { CreateSaleDto } from './dtos/sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesRepository: SalesRepository) {}

  @Get()
  public async getSales(
    @Query('clientId') clientId?: string,
    @Query('bookId') bookId?: string,
  ) {
    if (clientId) {
      return this.salesRepository.getSalesByClientId(clientId);
    }
    
    if (bookId) {
      return this.salesRepository.getSalesByBookId(bookId);
    }

    return [];
  }

  @Post()
  public async createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.salesRepository.createSale(createSaleDto);
  }
}