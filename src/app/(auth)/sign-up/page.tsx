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

export default function SignUpPage() {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="dark:text-white">Crear cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <Link
            href="/log-in"
            className="text-xs text-azul-crayon dark:text-white hover:underline mt-2"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
