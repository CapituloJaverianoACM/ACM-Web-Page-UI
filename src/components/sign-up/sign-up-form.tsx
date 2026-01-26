"use client";

import { useState, useRef } from "react";
import { Input } from "../shared/ui/input";
import { Button } from "../shared/ui/button";
import { Eye, EyeClosed, Upload, X } from "lucide-react";
import { signup } from "@/app/(auth)/sign-up/actions";
import { useRouter } from "next/navigation";
import { useLoadingAction } from "@/hooks/use-loading-action";
import { Toaster, toast } from "react-hot-toast";
import { showToast, ToastType } from "@/utils/show-toast";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        setError("Por favor, selecciona un archivo de imagen válido.");
        return;
      }
      // Validar tamaño (1MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("El archivo es demasiado grande. Máximo 1MB.");
        return;
      }
      setAvatarFile(file);
      setError("");
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSignup = async () => {
    setError("");
    const form_data = new FormData();
    form_data.set("name", name);
    form_data.set("surname", surname);
    form_data.set("email", email);
    form_data.set("password", password);
    if (avatarFile) {
      form_data.set("avatar", avatarFile);
    }

    const { error } = await signup(form_data);
    if (error) {
      setError(error);
      return; // Detener la ejecución sin lanzar error
    }

    showToast(toast, {
      type: ToastType.OK,
      message: "Te envíaremos un correo de confirmación. Redirigiendo...",
    });

    setTimeout(() => router.push("/log-in"), 2000);
  };

  const { run: handleSubmit, isLoading: loading } =
    useLoadingAction(handleSignup);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Toaster position="bottom-center" />
      <div className="flex flex-col gap-1">
        <label
          htmlFor="nombre"
          className="text-sm font-bold text-azul-ultramar dark:text-white"
        >
          Nombre
        </label>
        <Input
          id="nombre"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="apellido"
          className="text-sm font-bold text-azul-ultramar dark:text-white"
        >
          Apellido
        </label>
        <Input
          id="apellido"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-sm font-bold text-azul-ultramar dark:text-white"
        >
          Correo electrónico
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="text-sm font-bold text-azul-ultramar dark:text-white"
        >
          Contraseña
        </label>
        <div className="relative w-full">
          <Input
            id="password"
            type={passwordVisibility ? "text" : "password"}
            autoComplete="new-password"
            className="pr-10 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--azul-ultramar) dark:text-gray-400 hover:text-(--azul-electrico) dark:hover:text-white transition-colors z-10"
            onClick={() => setPasswordVisibility((prev) => !prev)}
          >
            {passwordVisibility ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeClosed className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="avatar"
          className="text-sm font-bold text-azul-ultramar dark:text-white"
        >
          Avatar (Opcional)
        </label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              ref={fileInputRef}
              id="avatar"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <label
              htmlFor="avatar"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-(--azul-niebla) dark:border-gray-600 bg-(--azul-niebla) dark:bg-gray-700 text-(--azul-noche) dark:text-white hover:bg-(--azul-crayon) dark:hover:bg-gray-600 cursor-pointer transition-colors text-sm font-medium"
            >
              <Upload className="h-4 w-4" />
              <span>{avatarFile ? avatarFile.name : "Seleccionar imagen"}</span>
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Formatos: JPEG, PNG, WEBP. Máximo 1MB
            </p>
          </div>
          {avatarPreview && (
            <div className="flex-2 relative">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="h-20 w-20 min-w-20 min-h-20 rounded-full object-cover ring-2 ring-(--azul-electrico)"
              />
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                aria-label="Eliminar avatar"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
      {error && <span className="text-red-600 text-sm">{error}</span>}
      <Button type="submit" className="w-full mt-2" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
    </form>
  );
}
