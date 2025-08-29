"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/shared/ui/card";
import Confetti from "@/components/shared/ui/confetti";
import { AuthLayout } from "@/layouts/info/auth_layout";
import { useSearchParams } from "next/navigation";

const ResetEmailSended: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "No hay email, bug?";
  return (
    <AuthLayout>
      <Confetti />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center dark:text-white">¡Bravo!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Si tienes un correo registrado en{" "}
            <span className="text-blue-700">{email}</span> vas a recibir un
            email para reestablecer tu contraseña.
          </p>
          <h4 className="text-[17px] text-center">
            ¡Dale click al logo de ACM para volver al home!
          </h4>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default ResetEmailSended;
