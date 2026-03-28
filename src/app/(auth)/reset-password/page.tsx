import ResetEmailForm from "@/components/reset-password/email-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { AuthLayout } from "@/layouts/info/auth_layout";
import React from "react";

const ResetPassword: React.FC = () => {
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
            Recuperar contraseña
          </CardTitle>
          <p className="text-sm text-(--azul-ultramar) dark:text-gray-400">
            Ingresa tu email para recibir el enlace de recuperación
          </p>
        </CardHeader>
        <CardContent className="px-8">
          <ResetEmailForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default ResetPassword;
