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
      router.push("/reset-email-sended?email=" + email);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError("Sucedió algo enviando el email, intenta de nuevo");
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleResetEmail}>
      <p className="text-center">
        Lamentamos mucho que hayas olvidado tu contraseña, ¡Ingresa tu email
        para poder recuperarlo!
      </p>
      <Input
        id="email"
        type="email"
        autoComplete="email"
        className="border border-azul-crayon rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-azul-crayon bg-[#FFFFF] dark:bg-black text-base"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="flex flex-col p-3 justify-center items-center">
        {error && (
          <span className="p-3 text-red-500 text-center text-base">
            {" "}
            {error}{" "}
          </span>
        )}
        <Button
          type="submit"
          className="text-base font-semibold text-white w-auto"
        >
          Enviar email
        </Button>
        {loading && <LogoLoader size={200} />}
      </div>
    </form>
  );
};

export default ResetEmailForm;
