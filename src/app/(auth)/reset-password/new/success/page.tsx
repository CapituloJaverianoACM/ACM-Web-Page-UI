import { SimpleConfettiLayout } from "@/layouts/info/simple-confetti-layout";

const SuccessResetPassword: React.FC = () => {
  return (
    <SimpleConfettiLayout title="¡Excelente!">
      <p className="text-center text-sm text-(--azul-ultramar) dark:text-gray-400">
        Tu contraseña ya debería estar actualizada. Ya puedes iniciar sesión con
        tu nueva contraseña.
      </p>
    </SimpleConfettiLayout>
  );
};

export default SuccessResetPassword;
