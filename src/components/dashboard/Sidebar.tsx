// src/components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/api/context/AuthContext";

interface MenuItem {
  label: string;
  href: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "📊",
  },
  {
    label: "Productos",
    href: "/dashboard/productos",
    icon: "📦",
  },
  {
    label: "Pedidos",
    href: "/dashboard/pedidos",
    icon: "🛍️",
  },
  {
    label: "Clientes",
    href: "/dashboard/clientes",
    icon: "👥",
  },
  {
    label: "Configuración",
    href: "/dashboard/configuracion",
    icon: "⚙️",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="bg-gray-800 text-white h-screen w-64 fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-2xl font-semibold">TiendaAP</h2>
        <p className="text-gray-400 mt-1">Panel de Administración</p>
      </div>

      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="bg-green-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold">
            {user?.name.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="font-medium">{user?.name}</p>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded hover:bg-gray-700 ${
                  pathname === item.href ? "bg-gray-700" : ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center w-full p-2 rounded hover:bg-gray-700"
        >
          <span className="mr-3">🚪</span>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;