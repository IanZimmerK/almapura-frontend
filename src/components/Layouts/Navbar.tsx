import Link from "next/link";

const Navbar = () => {
  const links = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/productos" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            TiendaAP
          </Link>

          {/* Enlaces */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-green-600 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Carrito */}
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            🛒 <span className="ml-1">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;