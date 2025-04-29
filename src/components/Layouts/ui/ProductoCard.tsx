type Props = {
    producto: {
      id: number;
      nombre: string;
      descripcion: string;
      precio: number;
    };
  };
  
  export default function ProductoCard({ producto }: Props) {
    return (
      <div className="border p-4 rounded shadow hover:shadow-lg transition">
        <h2 className="text-xl font-bold">{producto.nombre}</h2>
        <p className="text-sm text-gray-600">{producto.descripcion}</p>
        <p className="text-lg mt-2">${producto.precio}</p>
        <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Agregar al carrito
        </button>
      </div>
    );
  }
  