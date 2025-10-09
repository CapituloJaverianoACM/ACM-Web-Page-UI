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
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="dark:text-white">Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <a
            href="/reset-password"
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
    </AuthLayout>
  );
}
