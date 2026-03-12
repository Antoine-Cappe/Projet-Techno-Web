import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import type { AuthorId } from '../authors/author.entity';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsUUID(4)
  authorId: AuthorId;

  @IsInt()
  @Min(0)
  @Max(2026)
  yearPublished: number;

  @IsString()
  @IsOptional()
  photoUrl?: string; 
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsUUID(4)
  @IsOptional()
  authorId: AuthorId;

  @IsInt()
  @Min(0)
  @Max(2026)
  @IsOptional()
  yearPublished: number;

  @IsString()
  @IsOptional()
  photoUrl?: string;
}

export class GetBooksDto {
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number = 10;

  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;

  @IsString()
  @IsOptional()
  sort?: string;
}
