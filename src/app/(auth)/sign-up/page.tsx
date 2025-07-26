"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/home/ui/card";
import { Button } from "@/components/home/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Lógica real de autenticación aquí

    // Simulación de una llamada a la API
    setTimeout(() => {
      setLoading(false);
      if (!nombre || !apellido || !email || !password) {
        setError("Por favor, completa todos los campos.");
      } else {
        // Simulación de éxito
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        window.location.href = "/"
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-azul-niebla dark:bg-[#121212] p-4">
      {/* Logo ACM */}
      <Link href="/" className="mb-6 flex flex-col items-center group select-none">
        <img
          src="/Logo_Oscuro.svg"
          alt="Logo ACM Javeriana"
          className="h-16 w-auto dark:hidden drop-shadow-md transition-transform group-hover:scale-105"
          draggable={false}
        />
        <img
          src="/Logo_Claro.svg"
          alt="Logo ACM Javeriana"
          className="h-16 w-auto hidden dark:flex drop-shadow-md transition-transform group-hover:scale-105"
          draggable={false}
        />
      </Link>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="dark:text-white">Crear cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="nombre" className="text-sm font-medium text-azul-ultramar dark:text-white">Nombre</label>
              <input
                id="nombre"
                type="text"
                autoComplete="given-name"
                className="border border-azul-crayon rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-azul-crayon bg-white dark:bg-black text-base"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="apellido" className="text-sm font-medium text-azul-ultramar dark:text-white">Apellido</label>
              <input
                id="apellido"
                type="text"
                autoComplete="family-name"
                className="border border-azul-crayon rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-azul-crayon bg-white dark:bg-black text-base"
                value={apellido}
                onChange={e => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-azul-ultramar dark:text-white">Correo electrónico</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="border border-azul-crayon rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-azul-crayon bg-white dark:bg-black text-base"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium text-azul-ultramar dark:text-white">Contraseña</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="border border-azul-crayon rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-azul-crayon bg-white dark:bg-black text-base"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <span className="text-red-600 text-sm">{error}</span>}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <Link href="/log-in" className="text-xs text-azul-crayon dark:text-white hover:underline mt-2">¿Ya tienes cuenta? Inicia sesión</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
