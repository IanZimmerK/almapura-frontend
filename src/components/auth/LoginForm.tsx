// src/components/auth/LoginForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "../ui/Input";
import Button from "@/components/ui/Button"; // Ruta correcta
import { useAuth } from "@/app/api/context/AuthContext";

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "El email es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setLoginError("Credenciales incorrectas. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Ocurrió un error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Iniciar Sesión
        </h2>
        
        {loginError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {loginError}
          </div>
        )}
        
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          error={errors.email}
          required
        />
        
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          error={errors.password}
          required
        />
        
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm">
            ¿No tienes una cuenta?{" "}
            <Link 
              href="/auth/register" 
              className="text-green-600 hover:text-green-800"
            >
              Regístrate
            </Link>
          </p>
        </div>

        {/* Credenciales de prueba para el prototipo */}
        <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
          <p className="font-bold mb-1">Credenciales de prueba:</p>
          <p>Admin: admin@tiendaap.com / password</p>
          <p>Usuario: user@tiendaap.com / password</p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;