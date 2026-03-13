import { useState, useEffect } from 'react'
import axios from 'axios'
import type {
  ClientModel,
  CreateClientModel,
  UpdateClientModel,
} from '../ClientModel'

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientModel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchClients = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get<ClientModel[]>(
        'http://localhost:3000/clients',
      )
      setClients(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des clients', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createClient = async (client: CreateClientModel) => {
    try {
      await axios.post('http://localhost:3000/clients', client)
      await fetchClients()
    } catch (error) {
      console.error('Erreur lors de la création du client', error)
    }
  }

  const updateClient = async (id: string, client: UpdateClientModel) => {
    try {
      await axios.patch(`http://localhost:3000/clients/${id}`, client)
      await fetchClients()
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client', error)
    }
  }

  const deleteClient = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/clients/${id}`)
      await fetchClients()
    } catch (error) {
      console.error('Erreur lors de la suppression du client', error)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return {
    clients,
    isLoading,
    refresh: fetchClients,
    createClient,
    updateClient,
    deleteClient,
  }
}
