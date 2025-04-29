// src/components/layout/Footer.tsx
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Columna 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4">TiendaAP</h3>
              <p className="text-gray-400">
                Productos naturales para una vida saludable.
              </p>
            </div>
  
            {/* Columna 2 (Enlaces) */}
            <div>
              <h4 className="font-bold mb-4">Enlaces</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-400 hover:text-white">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="/productos" className="text-gray-400 hover:text-white">
                    Productos
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Columna 3 (Contacto) */}
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <p className="text-gray-400">contacto@tiendaap.com</p>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} TiendaAP. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;