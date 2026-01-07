"use client";
import { NewPasswordForm } from "@/components/reset-password/new-password-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { AuthLayout } from "@/layouts/info/auth_layout";

export default function ChangePasword() {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardHeader>
          <CardTitle className="dark:text-white">Cambiar contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          <NewPasswordForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2"></CardFooter>
      </Card>
    </AuthLayout>
  );
}
