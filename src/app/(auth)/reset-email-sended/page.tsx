"use client";
import { SimpleConfettiLayout } from "@/layouts/info/simple-confetti-layout";
import { useSearchParams } from "next/navigation";

const ResetEmailSended: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "No hay email, bug?";
  return (
    <SimpleConfettiLayout title={"¡Bravo!"}>
      <p className="text-center text-sm text-[var(--azul-ultramar)] dark:text-gray-400 mb-4">
        Si tienes un correo registrado en{" "}
        <span className="text-[var(--azul-electrico)] font-semibold">
          {email}
        </span>{" "}
        vas a recibir un email para reestablecer tu contraseña.
      </p>
      <p className="text-center text-base text-[var(--azul-ultramar)] dark:text-gray-300 font-semibold">
        ¡Dale click al logo de ACM para volver al home!
      </p>
    </SimpleConfettiLayout>
  );
};

export default ResetEmailSended;
