import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dtos/client.dto';
import { ClientModel } from './models/client.model';

@Controller('clients') // Toutes les routes commenceront par /clients [cite: 3257, 3382]
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get() // Liste des clients [cite: 57, 3360]
  async getClients(): Promise<ClientModel[]> {
    return this.clientsService.getClients();
  }

  @Get(':clientId') // Détails d'un client [cite: 66, 3360]
  async getClientById(@Param('clientId') id: string): Promise<ClientModel> {
    return this.clientsService.getClientById(id);
  }

  @Post() // Création d'un client [cite: 64, 3360]
  async createClient(@Body() dto: CreateClientDto): Promise<ClientModel> {
    return this.clientsService.createClient(dto);
  }

  @Patch(':clientId') // Modification d'un client [cite: 68, 3361]
  async updateClient(
    @Param('clientId') id: string,
    @Body() dto: UpdateClientDto,
  ): Promise<ClientModel> {
    return this.clientsService.updateClient(id, dto);
  }

  @Delete(':clientId') // Suppression d'un client [cite: 60, 3361]
  async deleteClient(@Param('clientId') id: string): Promise<void> {
    return this.clientsService.deleteClient(id);
  }
}