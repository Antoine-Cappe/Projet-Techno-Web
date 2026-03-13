const API_URL = 'http://localhost:3000/api';

export interface Sale {
  id: string;
  clientId: string;
  bookId: string;
  date: string;
  client?: {
    id: string;
    name: string;
  };
  book?: {
    id: string;
    title: string;
  };
}

export interface CreateSaleDto {
  clientId: string;
  bookId: string;
  date: string;
}

export interface Client {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
}

// Récupérer toutes les ventes
export const getSales = async (): Promise<Sale[]> => {
  const response = await fetch(`${API_URL}/sales`);
  if (!response.ok) throw new Error('Failed to fetch sales');
  return response.json();
};

// Créer une vente
export const createSale = async (data: CreateSaleDto): Promise<Sale> => {
  const response = await fetch(`${API_URL}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create sale');
  return response.json();
};

// Supprimer une vente
export const deleteSale = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/sales/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete sale');
};

// Récupérer tous les clients
export const getClients = async (): Promise<Client[]> => {
  const response = await fetch(`${API_URL}/clients`);
  if (!response.ok) throw new Error('Failed to fetch clients');
  return response.json();
};

// Récupérer tous les livres
export const getBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
};