import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity, type ClientId } from './entities/client.entity'; // Import du type ClientId
import { CreateClientDto, UpdateClientDto } from './dtos/client.dto';

@Injectable()
export class ClientsRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>, 
  ) {}

  async getClients(): Promise<[ClientEntity[], number]> {
    return this.clientRepository.findAndCount();
  }

  async getClientById(id: string): Promise<ClientEntity | null> {
    return this.clientRepository.findOne({ 
      where: { id: id as ClientId } 
    });
  }

  async createClient(dto: CreateClientDto): Promise<ClientEntity> {
    const newClient: ClientEntity = this.clientRepository.create(dto);
    return this.clientRepository.save(newClient);
  }

  async updateClient(id: string, dto: UpdateClientDto): Promise<void> {
    await this.clientRepository.update(id as ClientId, dto);
  }

  async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete(id as ClientId);
  }
}