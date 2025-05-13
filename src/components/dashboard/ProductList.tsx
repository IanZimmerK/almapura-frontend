// src/components/dashboard/ProductList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useProductos } from "@/app/hooks/useProductos";
import Button from "@/components/ui/Button";

interface ProductListProps {
  title?: string;
}

export default function ProductList({ title = "Productos" }: ProductListProps) {
  const { productos, loading } = useProductos();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar productos por término de búsqueda
  const filteredProducts = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          {title}
        </h2>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2 text-gray-400">🔍</span>
          </div>
          <Link href="/dashboard/productos/nuevo">
            <Button>Nuevo Producto</Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <p className="mt-2 text-gray-600">Cargando productos...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Nombre
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Descripción
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Precio
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Destacado
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((producto) => (
                <tr key={producto.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {producto.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {producto.nombre}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {producto.descripcion.length > 50
                      ? `${producto.descripcion.substring(0, 50)}...`
                      : producto.descripcion}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    ${producto.precio}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {producto.destacado ? "✅" : "❌"}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/productos/${producto.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Editar
                      </Link>
                      <button className="text-red-600 hover:text-red-800">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">
            No se encontraron productos{searchTerm ? " con ese término de búsqueda" : ""}.
          </p>
        </div>
      )}
    </div>
  );
}