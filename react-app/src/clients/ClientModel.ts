export type ClientModel = {
  id: string
  firstName: string
  lastName: string
  email?: string | null;
  photo?: string | null;
  purchasedBooksCount: number;
}

export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
  photo?: string;
}

export type UpdateClientModel = Partial<CreateClientModel>