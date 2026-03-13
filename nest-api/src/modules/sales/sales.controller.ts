import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { CreateSaleDto } from './dtos/sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesRepository: SalesRepository) {}

  @Post()
  async createSale(@Body() dto: CreateSaleDto) {
    console.log('[SALES] Tentative de création de vente :', dto);
    return this.salesRepository.createSale(dto);
  }

  @Get()
  async getSales(@Query('clientId') clientId?: string) {
    if (clientId) {
      return this.salesRepository.getSalesByClientId(clientId);
    }
    // Correction : on appelle la méthode findAll du repository
    return this.salesRepository.findAll({ 
      relations: ['book', 'client'] 
    });
  }
}