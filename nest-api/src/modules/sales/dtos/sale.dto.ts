import { IsDateString, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsUUID()
  clientId: string;

  @IsUUID()
  bookId: string;

  @IsDateString()
  date: string;
}