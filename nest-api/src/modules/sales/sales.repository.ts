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

  async findByBookId(bookId: string): Promise<SaleEntity[]> {
    console.log(`[DB] 🔍 Recherche des ventes pour le livre ID : ${bookId}`);
    
    const sales = await this.saleRepository.find({
      // On cherche via l'objet relation 'book' plutôt que la colonne 'bookId'
      where: { 
        book: { id: bookId as any } 
      },
      relations: { 
        client: true 
      },
      order: { 
        date: 'DESC' 
      }
    });

    if (sales.length > 0) {
      console.log(`[DB] ✅ Succès : ${sales.length} vente(s) trouvée(s). Premier client : ${sales[0].client?.firstName}`);
    } else {
      console.log(`[DB] ❌ Échec : Aucune vente trouvée pour cet ID dans la table 'sales'.`);
    }

    return sales;
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