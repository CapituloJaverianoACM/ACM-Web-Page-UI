"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/shared/ui/card";
import { SignUpForm } from "@/components/sign-up/sign-up-form";
import { AuthLayout } from "@/layouts/info/auth_layout";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const searchParams = useSearchParams();

  // Obtener el parámetro redirect si existe para pasarlo al enlace de login
  const redirectParam = searchParams.get("redirect");
  const loginUrl = redirectParam
    ? `/log-in?redirect=${encodeURIComponent(redirectParam)}`
    : "/log-in";
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
          <CardTitle className="text-3xl font-bold text-(--azul-noche) dark:text-white mb-3">
            Crear cuenta
          </CardTitle>
          <p className="text-sm text-(--azul-ultramar) dark:text-gray-400">
            Únete a la comunidad ACM Javeriana
          </p>
        </CardHeader>
        <CardContent className="px-8">
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-3 pb-8 pt-6">
          <div className="w-full h-px bg-(--azul-niebla) dark:bg-gray-700"></div>
          <p className="text-sm text-(--azul-ultramar) dark:text-gray-400">
            ¿Ya tienes cuenta?{" "}
            <Link
              href={loginUrl}
              className="text-(--azul-electrico) dark:text-(--azul-crayon) hover:text-(--azul-crayon) dark:hover:text-(--azul-niebla) font-semibold transition-colors duration-200 underline-offset-4 hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
