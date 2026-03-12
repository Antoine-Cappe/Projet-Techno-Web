import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRepository } from './client.repository';
import { ClientEntity } from './entities/client.entity';
import { ClientModel } from './models/client.model';
import { CreateClientDto, UpdateClientDto } from './dtos/client.dto';

@Injectable() 
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  // Transforme une Entité (DB) en Modèle (Appli)
  private mapEntityToModel(entity: ClientEntity): ClientModel {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      photo: entity.photo,
      purchasedBooksCount: 0, 
    };
  }

  async getClients(): Promise<ClientModel[]> {
    const [entities] = await this.clientsRepository.getClients();
    return entities.map((e) => this.mapEntityToModel(e));
  }

  async getClientById(id: string): Promise<ClientModel> {
    const entity = await this.clientsRepository.getClientById(id);
    if (!entity) {
      throw new NotFoundException(`Le client avec l'ID ${id} n'existe pas.`); 
    }
    return this.mapEntityToModel(entity);
  }

  async createClient(dto: CreateClientDto): Promise<ClientModel> {
    const entity = await this.clientsRepository.createClient(dto);
    return this.mapEntityToModel(entity);
  }

  async updateClient(id: string, dto: UpdateClientDto): Promise<ClientModel> {
    await this.clientsRepository.updateClient(id, dto);
    return this.getClientById(id); 
  }

  async deleteClient(id: string): Promise<void> {
    await this.clientsRepository.deleteClient(id);
  }
}