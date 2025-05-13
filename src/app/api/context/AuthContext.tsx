"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verificar si el usuario está autenticado al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Comprobar si hay un token en localStorage
        const token = localStorage.getItem("token");
        
        if (token) {
          // Esta es una versión simulada. En un entorno real, verificarías el token con tu backend
          // Simulación para el prototipo
          const userData = JSON.parse(localStorage.getItem("user") || "null");
          setUser(userData);
        }
      } catch (error) {
        console.error("Error checking authentication", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función de login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // En un escenario real, aquí harías una petición a tu API
      // Para el prototipo usaremos credenciales mockeadas
      if (email === "admin@tiendaap.com" && password === "password") {
        const mockUser = {
          id: 1,
          name: "Admin",
          email: "admin@tiendaap.com",
          role: "admin"
        };
        
        // Simular un token JWT
        const mockToken = "mock_jwt_token_for_demo";
        
        // Guardar en localStorage
        localStorage.setItem("token", mockToken);
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        setUser(mockUser);
        return true;
      } else if (email === "user@tiendaap.com" && password === "password") {
        const mockUser = {
          id: 2,
          name: "Usuario",
          email: "user@tiendaap.com",
          role: "customer"
        };
        
        const mockToken = "mock_jwt_token_for_demo_user";
        
        localStorage.setItem("token", mockToken);
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        setUser(mockUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función de registro
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulación para el prototipo
      // En un escenario real esto sería una petición POST a tu API
      const mockUser = {
        id: Date.now(), // ID único simulado
        name,
        email,
        role: "customer"
      };
      
      // Simular un token JWT
      const mockToken = "mock_jwt_token_for_new_user";
      
      // Guardar en localStorage
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;