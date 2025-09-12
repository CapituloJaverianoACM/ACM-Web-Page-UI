import { Input } from "@/components/shared/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { MouseEvent, useState } from "react";
import { Button } from "../shared/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { ACMToast } from "../shared/ui/toaster/acm-toast";
import { updatePasswordUser } from "@/controllers/supabase.controller";
import { useRouter } from "next/navigation";

const NewPasswordForm: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const passwordVisibility = [useState<boolean>(false), useState(false)];

  const togglePasswordVisibility = (e: MouseEvent<HTMLSpanElement>) => {
    const id = e.currentTarget.id === "first" ? 0 : 1;
    passwordVisibility[id][1]((prev) => !prev);
  };

  const submitPassword = async () => {
    if (password !== confirmPassword) {
      toast.custom((t) => (
        <ACMToast toastInstance={t}>
          <div>
            <p className="text-center m-0 font-semibold text-red-500">
              ¡Tus contraseñas no coinciden!
            </p>
          </div>
        </ACMToast>
      ));
      return;
    }

    const confirm = await updatePasswordUser(password);

    if (!confirm) {
      toast.custom((t) => (
        <ACMToast toastInstance={t}>
          <div>
            <p className="text-center m-0 font-semibold text-red-500">
              Ups! algo sucedió de nuestro lado, vuelvelo a intentar mas tarde
            </p>
          </div>
        </ACMToast>
      ));

      return;
    }

    router.push("/reset-password/new/success");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex justify-center items-center gap-3">
        <Input
          type={!passwordVisibility[0][0] ? "password" : "text"}
          autoComplete="password"
          className="border border-azul-crayon rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-azul-crayon bg-[#FFFFF] dark:bg-black text-base"
          value={password}
          placeholder="Nueva contraseña"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          id="first"
          className="cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {passwordVisibility[0][0] ? <Eye /> : <EyeClosed />}
        </span>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Input
          type={!passwordVisibility[1][0] ? "password" : "text"}
          autoComplete="password"
          className={
            "border border-azul-crayon rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-azul-crayon bg-[#FFFFF] dark:bg-black text-base"
          }
          value={confirmPassword}
          placeholder="Confirmar contraseña"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <span
          id="second"
          className="cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {passwordVisibility[1][0] ? <Eye /> : <EyeClosed />}
        </span>
      </div>

      <Button className="font-semibold text-white" onClick={submitPassword}>
        Reestablecer
      </Button>
      <Toaster />
    </div>
  );
};

export { NewPasswordForm };
