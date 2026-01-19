"use client";
import { NewPasswordForm } from "@/components/reset-password/new-password-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { AuthLayout } from "@/layouts/info/auth_layout";
import React from "react";

const NewPasswordReset: React.FC = () => {
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
            Establecer nueva contraseña
          </CardTitle>
          <p className="text-sm text-[var(--azul-ultramar)] dark:text-gray-400">
            Crea una contraseña segura para tu cuenta
          </p>
        </CardHeader>
        <CardContent className="px-8">
          <NewPasswordForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default NewPasswordReset;
