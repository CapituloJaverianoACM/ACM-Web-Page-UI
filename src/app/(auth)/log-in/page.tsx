"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/shared/ui/card";
import { SignInForm } from "@/components/sign-in/sign-in-form";
import { AuthLayout } from "@/layouts/info/auth_layout";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md bg-white dark:bg-[#1a1a1a] border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Barra superior con gradiente */}
        <div
          className="h-2 w-full"
          style={{
            background:
              "linear-gradient(to right, var(--azul-electrico), var(--azul-crayon))",
          }}
        ></div>

        <CardHeader className="text-center pb-6 pt-8">
          <CardTitle className="text-3xl font-bold text-[var(--azul-noche)] dark:text-white mb-3">
            Iniciar sesión
          </CardTitle>
          <p className="text-sm text-[var(--azul-ultramar)] dark:text-gray-400">
            Bienvenido de vuelta a ACM Javeriana
          </p>
        </CardHeader>
        <CardContent className="px-8">
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-3 pb-8 pt-6">
          <div className="w-full h-px bg-[var(--azul-niebla)] dark:bg-gray-700"></div>
          <div className="flex flex-col items-center gap-2 w-full">
            <Link
              href="/reset-password"
              className="text-sm text-[var(--azul-ultramar)] dark:text-gray-400 hover:text-[var(--azul-electrico)] dark:hover:text-[var(--azul-crayon)] transition-colors duration-200 underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="text-sm text-[var(--azul-ultramar)] dark:text-gray-400">
              ¿No tienes cuenta?{" "}
              <Link
                href="/sign-up"
                className="text-[var(--azul-electrico)] dark:text-[var(--azul-crayon)] hover:text-[var(--azul-crayon)] dark:hover:text-[var(--azul-niebla)] font-semibold transition-colors duration-200 underline-offset-4 hover:underline"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
