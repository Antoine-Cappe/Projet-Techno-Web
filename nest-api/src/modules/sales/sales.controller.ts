import { Body, Controller, Get, Post, Query } from '@nestjs/common'; // Ajoute Get et Query
import { SalesRepository } from './sales.repository';
import { CreateSaleDto } from './dtos/sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesRepository: SalesRepository) {}

  // AJOUT : Route pour lister les ventes (filtrables par client)
  @Get()
  public async getSales(@Query('bookId') bookId?: string) {
    if (bookId) {
      return this.salesRepository.getSalesByBookId(bookId);
    }
    return []; // Ou retourner toutes les ventes
  }

  @Post()
  public async createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.salesRepository.createSale(createSaleDto);
  }
}