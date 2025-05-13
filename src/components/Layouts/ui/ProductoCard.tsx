// src/components/ui/ProductoCard.tsx
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

type Props = {
  producto: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: string;
  };
};

export default function ProductoCard({ producto }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={producto.imagen || "/placeholder.jpg"}
          alt={producto.nombre}
          className="object-cover"
          fill
          priority
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{producto.nombre}</h2>
        <p className="text-sm text-gray-600 mt-1 h-12 overflow-hidden">
          {producto.descripcion}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <p className="text-lg font-bold text-green-600">
            ${producto.precio.toFixed(2)}
          </p>
          <Link href={`/productos/${producto.id}`}>
            <Button>Ver detalles</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}