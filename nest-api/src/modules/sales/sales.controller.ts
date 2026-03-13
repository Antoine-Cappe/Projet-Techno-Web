import { Body, Controller, Post } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { CreateSaleDto } from './dtos/sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesRepository: SalesRepository) {}

  @Post()
  async createSale(@Body() dto: CreateSaleDto) {
    return this.salesRepository.createSale(dto);
  }
}