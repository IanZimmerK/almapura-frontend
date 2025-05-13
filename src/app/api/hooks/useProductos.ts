// src/app/hooks/useProductos.ts
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Producto, CreateProductoDto, UpdateProductoDto } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const getAuthHeader = () => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }

  const fetchProductos = async (page = 1, limit = 10) => {
    setLoading(true)
    try {
      const response = await axios.get<{
        productos: Producto[]
        totalPages: number
      }>(`${API_URL}/productos?page=${page}&limit=${limit}`, getAuthHeader())
      
      setProductos(response.data.productos)
      setTotalPages(response.data.totalPages)
      setCurrentPage(page)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener productos')
    } finally {
      setLoading(false)
    }
  }

  const crearProducto = async (productoData: CreateProductoDto) => {
    setLoading(true)
    try {
      const response = await axios.post<Producto>(
        `${API_URL}/productos`,
        productoData,
        getAuthHeader()
      )
      setProductos(prev => [...prev, response.data])
      return response.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear producto')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const actualizarProducto = async (id: string, productoData: UpdateProductoDto) => {
    setLoading(true)
    try {
      const response = await axios.patch<Producto>(
        `${API_URL}/productos/${id}`,
        productoData,
        getAuthHeader()
      )
      setProductos(prev =>
        prev.map(producto =>
          producto._id === id ? { ...producto, ...response.data } : producto
        )
      )
      return response.data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar producto')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const eliminarProducto = async (id: string) => {
    setLoading(true)
    try {
      await axios.delete(`${API_URL}/productos/${id}`, getAuthHeader())
      setProductos(prev => prev.filter(producto => producto._id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar producto')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  return {
    productos,
    featuredProducts: productos?.slice(0, 3) || [], // Safe navigation + fallback
    loading,
    error,
    currentPage,
    totalPages,
    fetchProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
  }
}