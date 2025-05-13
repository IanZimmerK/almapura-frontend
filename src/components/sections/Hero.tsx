
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-green-50 py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Bienvenido!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Descubre nuestros productos naturales y saludables.
        </p>
        <Link
          href="/productos"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Ver Productos
        </Link>
      </div>
    </section>
  );
};

export default Hero;