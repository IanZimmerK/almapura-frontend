// src/app/dashboard/page.tsx
"use client";

import { useAuth } from "../context/AuthContext";
import { useProductos } from "@/app/hooks/useProductos";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const { productos, loading } = useProductos();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Bienvenido, {user?.name}. Aquí tienes un resumen de tu tienda.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Tarjeta de Productos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Productos</h2>
            <span className="text-3xl">📦</span>
          </div>
          <p className="text-3xl font-bold">
            {loading ? "..." : productos.length}
          </p>
          <p className="text-gray-600 mt-1">Productos en catálogo</p>
          <Link 
            href="/dashboard/productos" 
            className="mt-4 text-green-600 hover:text-green-800 inline-block"
          >
            Ver todos →
          </Link>
        </div>

        {/* Tarjeta de Pedidos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Pedidos</h2>
            <span className="text-3xl">🛍️</span>
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-gray-600 mt-1">Pedidos totales</p>
          <Link 
            href="/dashboard/pedidos" 
            className="mt-4 text-green-600 hover:text-green-800 inline-block"
          >
            Ver todos →
          </Link>
        </div>

        {/* Tarjeta de Ingresos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Ingresos</h2>
            <span className="text-3xl">💰</span>
          </div>
          <p className="text-3xl font-bold">$0.00</p>
          <p className="text-gray-600 mt-1">Ingresos totales</p>
          <Link 
            href="/dashboard/ventas" 
            className="mt-4 text-green-600 hover:text-green-800 inline-block"
          >
            Ver detalles →
          </Link>
        </div>
      </div>

      {/* Productos recientes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Productos recientes
        </h2>
        {loading ? (
          <p>Cargando productos...</p>
        ) : productos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                    Nombre
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                    Precio
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                    Destacado
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {productos.slice(0, 5).map((producto) => (
                  <tr key={producto.id} className="border-t">
                    <td className="py-2 px-4 text-sm text-gray-900">
                      {producto.nombre}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-900">
                      ${producto.precio}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-900">
                      {producto.destacado ? "✅" : "❌"}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      <Link
                        href={`/dashboard/productos/${producto.id}`}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay productos disponibles.</p>
        )}
        <div className="mt-4 text-right">
          <Link
            href="/dashboard/productos"
            className="text-green-600 hover:text-green-800"
          >
            Ver todos los productos →
          </Link>
        </div>
      </div>
    </div>
  );
}