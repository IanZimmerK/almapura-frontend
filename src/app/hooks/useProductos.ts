"use client";

import { useState, useEffect } from 'react';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  destacado?: boolean; 
  imagen?: string;
}

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/producto`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProductos(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Filtra productos destacados
  const featuredProducts = productos.filter((p) => p.destacado);

  return { productos, featuredProducts, loading, error };
};