import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogPortal,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface AvatarMenuProps {
  avatarUrl: string;
  userName: string;
}

export default function AvatarMenu({ avatarUrl, userName }: AvatarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const router = useRouter();
  const supabase = createClient();

  avatarUrl =
    avatarUrl ||
    "https://i.pinimg.com/474x/e6/e4/df/e6e4df26ba752161b9fc6a17321fa286.jpg?nii=t";
  userName = userName || "Usuario";

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setIsOpen(false);

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error al cerrar sesión:", error);
      }

      router.push("/log-in");
      router.refresh();
    } catch (error) {
      console.error("Error inesperado al cerrar sesión:", error);
      router.push("/log-in");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative">
      {/* Avatar de usuario */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div ref={triggerRef} className="cursor-pointer">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="h-12 w-12 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
        </DialogTrigger>

        {/* Menú Desplegable */}
        <DialogPortal>
          <DialogContent
            className="fixed w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 z-[100] p-0"
            style={{
              top: `${position.top}px`,
              right: `${position.right}px`,
              transform: "none",
              left: "auto",
              bottom: "auto",
            }}
            onInteractOutside={(e) => {
              // Permitir que se cierre al hacer clic fuera
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            {/* Título de Dialog, solo accesible */}
            <VisuallyHidden>
              <DialogTitle>Menú del Usuario</DialogTitle>
            </VisuallyHidden>

            <div className="py-2">
              <div className="flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full mr-2"
                />
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  {userName}
                </span>
              </div>
              <Link
                href="/profile"
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block no-underline"
                onClick={() => setIsOpen(false)}
              >
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[--azul-crayon] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
              </button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
