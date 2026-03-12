import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entities/client.entity';
import { ClientsController } from './client.controller';
import { ClientsService } from './client.service';
import { ClientsRepository } from './client.repository';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]),
    SalesModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService, ClientsRepository],
  exports: [ClientsService],
})
export class ClientsModule {}