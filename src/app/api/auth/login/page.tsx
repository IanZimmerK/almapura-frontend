// src/app/auth/login/page.tsx
"use client";

import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redireccionar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-600">TiendaAP</h1>
        <p className="mt-2 text-gray-600">Inicia sesión en tu cuenta</p>
      </div>
      <LoginForm />
    </div>
  );
}