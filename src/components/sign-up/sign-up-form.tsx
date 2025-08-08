"use client";

import { signUp } from "@/controllers/supabase.controller";
import { useState } from "react";
import { Input } from "../shared/ui/input";
import { Button } from "../shared/ui/button";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const response = await signUp(name, surname, email, password, avatar_url);
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError("");
    window.location.href = "/log-in";
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="nombre" className="text-sm font-medium text-azul-ultramar dark:text-white">Nombre</label>
        <Input
          id="nombre"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="apellido" className="text-sm font-medium text-azul-ultramar dark:text-white">Apellido</label>
        <Input
          id="apellido"
          type="text"
          value={surname}
          onChange={e => setSurname(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-azul-ultramar dark:text-white">Correo electrónico</label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
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
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="avatar_url" className="text-sm font-medium text-azul-ultramar dark:text-white">Avatar URL (Optional)</label>
        <div className="flex items-center gap-2">
          <div className="flex-grow">
            <Input
              id="avatar_url"
              type="url"
              autoComplete="avatar_url"
              value={avatar_url}
              onChange={e => setAvatarUrl(e.target.value)}
            />
          </div>
          {avatar_url && (
            <img
              src={avatar_url}
              alt="Avatar Preview"
              className="h-16 w-16 rounded-full object-cover"
            />
          )}
        </div>
      </div>
      {error && <span className="text-red-600 text-sm">{error}</span>}
      <Button type="submit" className="w-full mt-2" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
    </form>
  )

}