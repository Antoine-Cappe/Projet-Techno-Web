import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dtos/client.dto';
import { ClientModel } from './models/client.model';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get() 
  async getClients(): Promise<ClientModel[]> {
    return this.clientsService.getClients();
  }

  @Get(':clientId')
  async getClientById(@Param('clientId') id: string): Promise<ClientModel> {
    return this.clientsService.getClientById(id);
  }

  @Post()
  async createClient(@Body() dto: CreateClientDto): Promise<ClientModel> {
    return this.clientsService.createClient(dto);
  }

  @Patch(':clientId')
  async updateClient(
    @Param('clientId') id: string,
    @Body() dto: UpdateClientDto,
  ): Promise<ClientModel> {
    return this.clientsService.updateClient(id, dto);
  }

  @Delete(':clientId')
  async deleteClient(@Param('clientId') id: string): Promise<void> {
    return this.clientsService.deleteClient(id);
  }
}