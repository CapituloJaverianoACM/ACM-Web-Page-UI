"use client";

import { signIn } from "@/controllers/supabase.controller";
import { useState } from "react";
import { Input } from "../shared/ui/input";
import { Button } from "../shared/ui/button";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await signIn(email,password);
    if(response.error){
      setError(response.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError("");
    window.location.href = "/";
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-azul-ultramar dark:text-white">Correo electrónico</label>
        <Input
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
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          className="border border-azul-crayon rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-azul-crayon bg-white dark:bg-black text-base"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <span className="text-red-600 text-sm">{error}</span>}
      <Button type="submit" className="w-full mt-2" disabled={loading}>
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </Button>
    </form>
  )

}