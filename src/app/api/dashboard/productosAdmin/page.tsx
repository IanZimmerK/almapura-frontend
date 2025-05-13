// src/app/dashboard/productos/page.tsx
"use client";

import ProductList from "@/components/dashboard/ProductList";

export default function ProductosPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
        <p className="text-gray-600 mt-1">
          Administra tu catálogo de productos
        </p>
      </header>
      
      <ProductList />
    </div>
  );
}