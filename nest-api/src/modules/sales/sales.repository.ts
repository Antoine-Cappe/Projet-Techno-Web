import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './entities/sale.entity';
import { CreateSaleDto } from './dtos/sale.dto';

@Injectable()
export class SalesRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  async createSale(dto: CreateSaleDto): Promise<SaleEntity> {
    const sale = this.saleRepository.create({
      clientId: dto.clientId,
      bookId: dto.bookId,
      date: new Date(dto.date),
    });
    return this.saleRepository.save(sale);
  }

  async findByBookId(bookId: string): Promise<SaleEntity[]> {
    console.log(`[DB]  Recherche pour bookId : ${bookId}`);

    
    const sales = await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.client', 'client')
      .where('LOWER(sale.book_id) = LOWER(:bookId)', { bookId })
      .orderBy('sale.date', 'DESC')
      .getMany();

    if (sales.length === 0) {
      
      const rawData = await this.saleRepository.query('SELECT * FROM sales LIMIT 1');
      console.log('[DB] DEBUG - Contenu brut de la table sales :', rawData);
    }

    return sales;
  }

  async countByClientId(clientId: string): Promise<number> {
    return this.saleRepository.count({ where: { clientId: clientId as any } });
  }

  async findByClientId(clientId: string): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { clientId: clientId as any },
      relations: { book: { author: true } },
      order: { date: 'DESC' },
    });
  }

  public async findAll(options?: any): Promise<SaleEntity[]> {
    return this.saleRepository.find(options);
  }

  public async getSalesByClientId(clientId: string): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { clientId: clientId as any },
      relations: ['book', 'book.author'], // Indispensable pour afficher le titre et l'auteur
      order: { date: 'DESC' }, // Les plus récents en premier
    });
  }
}