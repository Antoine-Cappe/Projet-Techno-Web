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
        ...dto,
        date: new Date(dto.date)
    });
    return this.saleRepository.save(sale);
  }

  async countByClientId(clientId: string): Promise<number> {
    return this.saleRepository.count({ where: { clientId } });
  }

  async countByBookId(bookId: string): Promise<number> {
    return this.saleRepository.count({ where: { bookId } });
  }

  async findByClientId(clientId: string): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { clientId },
      relations: { book: { author: true } },
      order: { date: 'DESC' }
    });
  }

  async findByBookId(bookId: string): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { bookId },
      relations: { client: true },
      order: { date: 'DESC' }
    });
  }

  async findAll(): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      relations: { client: true, book: { author: true } },
      order: { date: 'DESC' }
    });
  }
}