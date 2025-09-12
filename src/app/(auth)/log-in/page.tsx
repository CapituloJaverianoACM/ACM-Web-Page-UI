"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/shared/ui/card";
import { SignInForm } from "@/components/sign-in/sign-in-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-[#121212] p-4">
      {/* Logo ACM */}
      <Link
        href="/"
        className="mb-6 flex flex-col items-center group select-none"
      >
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
          <CardTitle className="dark:text-white">Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <a
            href="#"
            className="text-xs text-azul-crayon dark:text-white hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
          <Link
            href="/sign-up"
            className="text-xs text-azul-crayon dark:text-white hover:underline mt-2"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
