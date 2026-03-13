import { AuthorId } from './author.entity';

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
  booksCount?: number; 
};

export type AuthorDetailBook = {
  id: string;
  title: string;
  yearPublished: number;
};

export type AuthorDetailModel = AuthorModel & {
  books: AuthorDetailBook[];
  averageSales: number;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  photoUrl?: string; 
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;