import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export interface Categoria {
  id: number;
  nombre: string;
}

export interface CreateCategoriaPayload {
  nombre: string;
}

export interface UpdateCategoriaPayload {
  nombre?: string;
}

// Configuración de axios para la API
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const categoriasApi = {
  /**
   * Obtiene la lista de todas las categorías
   */
  getAll: async (): Promise<Categoria[]> => {
    const response = await api.get('/categorias');
    return response.data;
  },

  /**
   * Obtiene una categoría por su ID
   */
  getById: async (id: number): Promise<Categoria> => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  /**
   * Crea una nueva categoría
   */
  create: async (categoria: CreateCategoriaPayload): Promise<Categoria> => {
    const response = await api.post('/categorias', categoria);
    return response.data;
  },

  /**
   * Actualiza una categoría existente
   */
  update: async (id: number, categoria: UpdateCategoriaPayload): Promise<Categoria> => {
    const response = await api.patch(`/categorias/${id}`, categoria);
    return response.data;
  },

  /**
   * Elimina una categoría
   */
  delete: async (id: number): Promise<Categoria> => {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  }
};