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
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center dark:text-white">
            Establecer una nueva contraseña
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NewPasswordForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default NewPasswordReset;
