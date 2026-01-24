"use client";

import { useState } from "react";
import { Input } from "../shared/ui/input";
import { Button } from "../shared/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { login } from "@/app/(auth)/log-in/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await login(email, password);
    if (error) {
      setError("Ups, algo no salió bien.");
      setLoading(false);
      return;
    }

    queryClient.clear();

    // Obtener el parámetro redirect de la URL, o usar "/" por defecto
    const redirectPath = searchParams.get("redirect") || "/";
    router.push(redirectPath);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-sm font-bold text-azul-ultramar dark:text-white"
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
          className="text-sm font-bold text-azul-ultramar dark:text-white"
        >
          Contraseña
        </label>
        <div className="relative w-full">
          <Input
            id="password"
            type={passwordVisibility ? "text" : "password"}
            autoComplete="current-password"
            className="pr-10 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--azul-ultramar) dark:text-gray-400 hover:text-(--azul-electrico) dark:hover:text-white transition-colors z-10"
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
      {error && (
        <span className="text-red-600 text-sm text-center">{error}</span>
      )}
      <Button
        type="submit"
        className="w-full mt-2 font-bold"
        disabled={loading}
      >
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}
