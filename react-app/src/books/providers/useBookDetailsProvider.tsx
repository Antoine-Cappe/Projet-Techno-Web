import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import axios from 'axios'

export interface BookSaleModel {
  id: string;
  date: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    photo?: string | null;
  };
}

export interface UseBookDetailsReturn {
  isLoading: boolean;
  book: BookModel | null;
  sales: BookSaleModel[];
  loadBook: () => Promise<void>;
  updateBook: (input: UpdateBookModel) => Promise<void>;
  recordSale: (clientId: string, date: string) => Promise<void>;
}

export const useBookDetailsProvider = (id: string): UseBookDetailsReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [book, setBook] = useState<BookModel | null>(null)
  const [sales, setSales] = useState<BookSaleModel[]>([])

  const loadBook = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const bookRes = await axios.get<BookModel>(`http://localhost:3000/books/${id}`)
      setBook(bookRes.data)
      
      const salesRes = await axios.get<BookSaleModel[]>(`http://localhost:3000/sales?bookId=${id}`)
      setSales(salesRes.data)
    } catch (err: unknown) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const updateBook = async (input: UpdateBookModel): Promise<void> => {
    try {
      await axios.patch<BookModel>(`http://localhost:3000/books/${id}`, input)
      await loadBook()
    } catch (err: unknown) {
      console.error(err)
    }
  }

  const recordSale = async (clientId: string, date: string): Promise<void> => {
    try {
      await axios.post('http://localhost:3000/sales', { bookId: id, clientId, date })
      await loadBook() 
    } catch (err: unknown) {
      console.error(err)
    }
  }

  return { isLoading, book, sales, loadBook, updateBook, recordSale }
}