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
