import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional() // La photo est facultative selon le sujet
  photoUrl?: string; // Ajoute cette ligne !
}

export class UpdateAuthorDto {
  @IsString() @IsOptional() firstName?: string;
  @IsString() @IsOptional() lastName?: string;
  @IsString() @IsOptional() photoUrl?: string;
}