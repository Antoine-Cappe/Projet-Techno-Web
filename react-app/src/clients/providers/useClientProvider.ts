import { useState, useEffect } from 'react';
import type { ClientModel } from '../ClientModel';

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, isLoading, refresh: fetchClients };
};