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
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center dark:text-white">
            Recuperar contraseña
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResetEmailForm />
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default ResetPassword;
