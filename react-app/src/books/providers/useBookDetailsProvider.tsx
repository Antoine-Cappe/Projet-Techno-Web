import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import axios from 'axios'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<BookModel | null>(null)
  const [sales, setSales] = useState<any[]>([]) // État pour stocker les ventes

  const loadBook = async () => {
    setIsLoading(true)
    try {
      const bookRes = await axios.get(`http://localhost:3000/books/${id}`)
      setBook(bookRes.data)
      
      // CORRECTION : Utilisation de la query string ?bookId=
      const salesRes = await axios.get(`http://localhost:3000/sales?bookId=${id}`)
      setSales(salesRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const updateBook = async (input: UpdateBookModel) => {
    try {
      await axios.patch(`http://localhost:3000/books/${id}`, input)
      await loadBook()
    } catch (err) {
      console.error(err)
    }
  }

  const recordSale = async (clientId: string, date: string) => {
    try {
      await axios.post('http://localhost:3000/sales', { bookId: id, clientId, date })
      await loadBook() // Recharge pour voir le nouvel acheteur
    } catch (err) {
      console.error(err)
    }
  }

  return { isLoading, book, sales, loadBook, updateBook, recordSale }
}