'use client';

import { useProductos } from '@/app/hooks/useProductos';
import ProductoCard from '@/components/Layouts/ui/ProductoCard';

export default function ProductosPage() {
  const { productos, loading } = useProductos();

  if (loading) return <p className="p-6">Cargando productos...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {productos.map((producto: any) => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
