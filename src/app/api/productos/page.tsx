// src/app/productos/page.tsx
"use client";

import PublicLayout from "@/components/Layouts/PublicLayout";
import { useProductos } from "@/app/hooks/useProductos";
import ProductoCard from "@/components/Layouts/ui/ProductoCard";
import { LoadingSkeleton } from "@/components/Layouts/ui/Skeleton";

export default function ProductosPage() {
  const { productos, loading } = useProductos();

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Nuestros Productos
        </h1>
        
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}