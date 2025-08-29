"use client";
import ResetEmailForm from "@/components/reset-password/email-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { AuthLayout } from "@/layouts/info/auth_layout";
import React from "react";

// TODO: Se puede reestablecer la contraseña sin que supabase lo sepa??
// HACK: Al parecer si, cuando el cliente se crea, coge las cookies tambien
const NewPasswordReset: React.FC = () => {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center dark:text-white">
            Establecer una nueva contraseña
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResetEmailForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default NewPasswordReset;
