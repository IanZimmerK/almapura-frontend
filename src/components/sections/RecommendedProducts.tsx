"use client"; 

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; 
import { useProductos } from "@/app/hooks/useProductos";
import { LoadingSkeleton } from "../Layouts/ui/Skeleton";

// Animaciones predefinidas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const RecommendedProducts = () => {
  const { featuredProducts, loading } = useProductos();

  if (loading) return <LoadingSkeleton />;
  if (!featuredProducts.length) return null;

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Título animado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Productos Recomendados
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Descubre nuestras selecciones especiales para ti.
          </p>
        </motion.div>

        {/* Contenedor de productos con animación escalonada */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProducts.map((producto) => (
            <motion.div
              key={producto.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Imagen del producto */}
              <motion.div 
                className="h-48 relative"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={producto.imagen || "/placeholder.jpg"}
                  alt={producto.nombre}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Detalles del producto */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{producto.nombre}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {producto.descripcion}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-600">
                    ${producto.precio.toFixed(2)}
                  </span>
                  <Link
                    href={`/productos/${producto.id}`}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Botón "Ver todos" animado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            href="/productos"
            className="inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            Ver todos los productos
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecommendedProducts;