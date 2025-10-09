import { SimpleConfettiLayout } from "@/layouts/info/simple-confetti-layout";

const SuccessResetPassword: React.FC = () => {
  return (
    <SimpleConfettiLayout title="¡Excelente!">
      <p className="text-center font-semibold">
        Tu contraseña ya debería estar actualizada
      </p>
    </SimpleConfettiLayout>
  );
};

export default SuccessResetPassword;
