export type BookModel = {
  id: string
  title: string
  yearPublished: number
  photoUrl?: string | null
  purchasedCount?: number
  author: {
    id: string
    firstName: string
    lastName: string
  }
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  photoUrl?: string
}

export type UpdateBookModel = Partial<CreateBookModel>
