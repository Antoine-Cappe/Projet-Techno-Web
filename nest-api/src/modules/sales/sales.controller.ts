import { Body, Controller, Post, Get, Param } from '@nestjs/common';
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

  @Get('book/:bookId')
  async getSalesByBook(@Param('bookId') bookId: string) {
    console.log(`[SALES] Requête reçue pour les ventes du livre ID : ${bookId}`);
    const results = await this.salesRepository.findByBookId(bookId);
    console.log(`[SALES] Nombre de ventes trouvées en base : ${results.length}`);
    return results;
  }
}