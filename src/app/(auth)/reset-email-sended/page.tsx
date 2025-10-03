"use client";
import { SimpleConfettiLayout } from "@/layouts/info/simple-confetti-layout";
import { useSearchParams } from "next/navigation";

const ResetEmailSended: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "No hay email, bug?";
  return (
    <SimpleConfettiLayout title={"¡Bravo!"}>
      <p className="text-center">
        Si tienes un correo registrado en{" "}
        <span className="text-blue-700">{email}</span> vas a recibir un email
        para reestablecer tu contraseña.
        <br />
        <span className="text-[17px] text-center font-semibold">
          ¡Dale click al logo de ACM para volver al home!
        </span>
      </p>
    </SimpleConfettiLayout>
  );
};

export default ResetEmailSended;
