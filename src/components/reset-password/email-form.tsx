"use client";
import React, { useState } from "react";
import { Input } from "../shared/ui/input";
import { Button } from "../shared/ui/button";
import { sendResetEmail } from "@/controllers/supabase.controller";
import { useRouter } from "next/navigation";
import { useLoadingAction } from "@/hooks/use-loading-action";

const ResetEmailForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const handleResetEmailAction = async () => {
    setError(null);
    try {
      await sendResetEmail(email);
      const emailToSend = email; // Guardar el email antes de limpiarlo
      setEmail("");
      router.push("/reset-email-sent?email=" + emailToSend);
    } catch (e) {
      console.error(e);
      setError("Sucedió algo enviando el email, intenta de nuevo");
      setEmail("");
      throw e; // Re-lanzar para que el hook lo maneje
    }
  };

  const { run: handleResetEmail, isLoading: loading } = useLoadingAction(
    handleResetEmailAction,
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleResetEmail();
    } catch (e) {
      console.error(e);
      setError("Sucedió algo enviando el email, intenta de nuevo");
      setEmail("");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <p className="text-center text-sm text-(--azul-ultramar) dark:text-gray-400 mb-2">
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
    </form>
  );
};

export default ResetEmailForm;
