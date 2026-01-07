"use client";
import React, { useState } from "react";
import { Input } from "../shared/ui/input";
import { Button } from "../shared/ui/button";
import { sendResetEmail } from "@/controllers/supabase.controller";
import { useRouter } from "next/navigation";
import LogoLoader from "../shared/ui/logo-loader/loader";

const ResetEmailForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      await sendResetEmail(email);
      setLoading(false);
      setEmail("");
      router.push("/reset-email-sent?email=" + email);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError("Sucedió algo enviando el email, intenta de nuevo");
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleResetEmail} className="flex flex-col gap-4">
      <p className="text-center text-sm text-[var(--azul-ultramar)] dark:text-gray-400 mb-2">
        Lamentamos mucho que hayas olvidado tu contraseña, ¡Ingresa tu email
        para poder recuperarlo!
      </p>
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
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && (
        <span className="text-red-600 text-sm text-center">{error}</span>
      )}
      <Button type="submit" className="w-full mt-2" disabled={loading}>
        {loading ? "Enviando..." : "Enviar email"}
      </Button>
      {loading && <LogoLoader size={200} />}
    </form>
  );
};

export default ResetEmailForm;
