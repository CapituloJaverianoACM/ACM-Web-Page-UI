"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/shared/ui/card";
import { SignUpForm } from "@/components/sign-up/sign-up-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-[#121212] p-4">
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
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <Link href="/log-in" className="text-xs text-azul-crayon dark:text-white hover:underline mt-2">¿Ya tienes cuenta? Inicia sesión</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
