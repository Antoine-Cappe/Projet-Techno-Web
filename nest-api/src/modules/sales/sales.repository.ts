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

  async findByClientId(clientId: string): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { clientId },
      relations: { book: { author: true } },
      order: { date: 'DESC' }
    });
  }
}