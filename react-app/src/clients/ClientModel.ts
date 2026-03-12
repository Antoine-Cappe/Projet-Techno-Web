export type ClientModel = {
  id: string
  firstName: string
  lastName: string
  email?: string
}

export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
}

export type UpdateClientModel = Partial<CreateClientModel>