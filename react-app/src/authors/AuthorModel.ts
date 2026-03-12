export type AuthorModel = {
  id: string
  firstName: string
  lastName: string
  photoUrl?: string
  booksCount?: number
}

export type AuthorDetailBook = {
  id: string
  title: string
  yearPublished: number
}

export type AuthorDetailModel = AuthorModel & {
  books: AuthorDetailBook[]
  averageSales: number
}

export type CreateAuthorModel = {
  firstName: string
  lastName: string
  photoUrl?: string
}

export type UpdateAuthorModel = Partial<CreateAuthorModel>
