"use client";

import { useState } from "react";
import { Input } from "../shared/ui/input";
import { Button } from "../shared/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { signup } from "@/app/(auth)/sign-up/actions";
import { redirect } from "next/navigation";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const form_data = new FormData();
    form_data.set("name", name);
    form_data.set("surname", surname);
    form_data.set("email", email);
    form_data.set("password", password);
    form_data.set("avatar_url", avatar_url);

    const { error } = await signup(form_data);
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    redirect("/log-in");
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="nombre"
          className="text-sm font-medium text-azul-ultramar dark:text-white"
        >
          Nombre
        </label>
        <Input
          id="nombre"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="apellido"
          className="text-sm font-medium text-azul-ultramar dark:text-white"
        >
          Apellido
        </label>
        <Input
          id="apellido"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-sm font-medium text-azul-ultramar dark:text-white"
        >
          Correo electrónico
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="text-sm font-medium text-azul-ultramar dark:text-white"
        >
          Contraseña
        </label>
        <div className="relative w-full">
          <Input
            id="password"
            type={passwordVisibility ? "text" : "password"}
            autoComplete="new-password"
            className="pr-10 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[var(--azul-ultramar)] dark:text-gray-400 hover:text-[var(--azul-electrico)] dark:hover:text-white transition-colors z-10"
            onClick={() => setPasswordVisibility((prev) => !prev)}
          >
            {passwordVisibility ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeClosed className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="avatar_url"
          className="text-sm font-medium text-azul-ultramar dark:text-white"
        >
          Avatar URL (Opcional)
        </label>
        <div className="flex items-end gap-2">
          <div className="flex-grow">
            <Input
              id="avatar_url"
              type="url"
              autoComplete="avatar_url"
              value={avatar_url}
              onChange={(e) => setAvatarUrl(e.target.value)}
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
  );
}
