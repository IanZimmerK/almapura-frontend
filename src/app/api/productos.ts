import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  destacado: boolean;
  imagen: string | null;
  stock: number;
  categoriaId: number | null;
  categoria?: {
    id: number;
    nombre: string;
  };
}

export interface CreateProductoPayload {
  nombre: string;
  descripcion: string;
  precio: number;
  destacado?: boolean;
  stock?: number;
  categoriaId?: number | null;
}

export interface UpdateProductoPayload extends Partial<CreateProductoPayload> {}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const productosApi = {
  getAll: async (): Promise<Producto[]> => {
    const response = await api.get('/productos');
    return response.data;
  },

  getById: async (id: number): Promise<Producto> => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  create: async (producto: CreateProductoPayload, imagen?: File): Promise<Producto> => {
    const formData = new FormData();
    Object.entries(producto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    if (imagen) formData.append('imagen', imagen);

    const response = await api.post('/productos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: number, producto: UpdateProductoPayload, imagen?: File): Promise<Producto> => {
    const formData = new FormData();
    Object.entries(producto).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    if (imagen) formData.append('imagen', imagen);

    const response = await api.patch(`/productos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/productos/${id}`);
  },

  getDestacados: async (): Promise<Producto[]> => {
    const response = await api.get('/productos/destacados');
    return response.data;
  }
};