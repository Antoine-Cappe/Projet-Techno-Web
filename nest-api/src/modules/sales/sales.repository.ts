import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SaleEntity } from './entities/sale.entity';
import { CreateSaleDto } from './dtos/sale.dto';
import { ClientId } from '../clients/entities/client.entity';
import { BookId } from '../books/entities/book.entity';

@Injectable()
export class SalesRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  async createSale(dto: CreateSaleDto): Promise<SaleEntity> {
    const sale = this.saleRepository.create({
      clientId: dto.clientId as ClientId,
      bookId: dto.bookId as BookId,
      date: new Date(dto.date),
    });
    return this.saleRepository.save(sale);
  }

  async findByBookId(bookId: string): Promise<SaleEntity[]> {
    return this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.client', 'client')
      .where('LOWER(sale.book_id) = LOWER(:bookId)', { bookId })
      .orderBy('sale.date', 'DESC')
      .getMany();
  }

  async countByClientId(clientId: string): Promise<number> {
    return this.saleRepository.count({ 
      where: { clientId: clientId as ClientId } 
    });
  }

  async countByBookId(bookId: string): Promise<number> {
    return this.saleRepository.count({ 
      where: { bookId: bookId as BookId } 
    });
  }

  async findByClientId(clientId: string): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { clientId: clientId as ClientId },
      relations: { book: { author: true } },
      order: { date: 'DESC' },
    });
  }

  public async findAll(options?: FindManyOptions<SaleEntity>): Promise<SaleEntity[]> {
    return this.saleRepository.find(options);
  }

  public async getSalesByClientId(clientId: string): Promise<SaleEntity[]> {
    return this.findByClientId(clientId);
  }

  public async getSalesByBookId(bookId: string): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { bookId: bookId as BookId },
      relations: ['client'],
      order: { date: 'DESC' },
    });
  }
}