import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string | null; 
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  photoUrl?: string | null; 
};
