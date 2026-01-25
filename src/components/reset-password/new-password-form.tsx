import { Input } from "@/components/shared/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { Button } from "../shared/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { ACMToast } from "../shared/ui/toaster/acm-toast";
import { getUser, updatePasswordUser } from "@/controllers/supabase.controller";
import { useRouter } from "next/navigation";
import LogoLoader from "../shared/ui/logo-loader/loader";
import { User } from "@supabase/supabase-js";
import { useLoadingAction } from "@/hooks/use-loading-action";
import { showToast, ToastType } from "@/utils/show-toast";

const NewPasswordForm: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const passwordVisibility = [useState<boolean>(false), useState(false)];

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      if (!user) {
        router.push("/");
      }
      setUser(user);
    };
    checkUser();
  }, []);

  const togglePasswordVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id === "first" ? 0 : 1;
    passwordVisibility[id][1]((prev) => !prev);
  };

  const updatePasswordAction = async () => {
    if (password !== confirmPassword) {
      showToast(toast, {
        type: ToastType.ERROR,
        message: "¡Tus contraseñas no coinciden!",
      });
      return; // Detener sin lanzar error
    }

    const confirm = await updatePasswordUser(password);

    if (!confirm) {
      showToast(toast, {
        type: ToastType.ERROR,
        message:
          "Ups! algo sucedió de nuestro lado, vuelvelo a intentar mas tarde",
      });
      return; // Detener sin lanzar error
    }

    router.push("/reset-password/new/success");
  };

  const { run: submitPassword, isLoading: loading } =
    useLoadingAction(updatePasswordAction);

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-center text-sm text-(--azul-ultramar) dark:text-gray-400 mb-2">
        Editando contraseña de{" "}
        <span className="text-(--azul-electrico) font-semibold">
          {user?.email}
        </span>
      </p>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="new-password"
          className="text-sm font-medium text-azul-ultramar dark:text-white"
        >
          Nueva contraseña
        </label>
        <div className="relative w-full">
          <Input
            id="new-password"
            type={!passwordVisibility[0][0] ? "password" : "text"}
            autoComplete="new-password"
            className="pr-10 w-full"
            value={password}
            placeholder="Nueva contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            id="first"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--azul-ultramar) dark:text-gray-400 hover:text-(--azul-electrico) dark:hover:text-white transition-colors z-10"
            onClick={togglePasswordVisibility}
          >
            {passwordVisibility[0][0] ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeClosed className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="confirm-password"
          className="text-sm font-medium text-azul-ultramar dark:text-white"
        >
          Confirmar contraseña
        </label>
        <div className="relative w-full">
          <Input
            id="confirm-password"
            type={!passwordVisibility[1][0] ? "password" : "text"}
            autoComplete="new-password"
            className="pr-10 w-full"
            value={confirmPassword}
            placeholder="Confirmar contraseña"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            id="second"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--azul-ultramar) dark:text-gray-400 hover:text-(--azul-electrico) dark:hover:text-white transition-colors z-10"
            onClick={togglePasswordVisibility}
          >
            {passwordVisibility[1][0] ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeClosed className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <Button
        className="w-full mt-2"
        onClick={submitPassword}
        disabled={loading}
      >
        {loading ? (
          <>
            <LogoLoader size={20} />
            Reestableciendo...
          </>
        ) : (
          "Reestablecer"
        )}
      </Button>
      <Toaster position="bottom-center" />
    </div>
  );
};

export { NewPasswordForm };
