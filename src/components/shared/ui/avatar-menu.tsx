import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";

interface AvatarMenuProps {
  avatarUrl: string;
  userName: string;
}

export default function AvatarMenu({ avatarUrl, userName }: AvatarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  avatarUrl =
    avatarUrl ||
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F009%2F292%2F244%2Fnon_2x%2Fdefault-avatar-icon-of-social-media-user-vector.jpg&f=1&nofb=1&ipt=3497eab29c4558bc00f4140ab8dbd34da0d03f3b01c0bb2c77019968e3e23a55";
  userName = userName || "Usuario";

  return (
    <div className="relative">
      {/* Avatar de usuario */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="h-12 w-12 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
        </DialogTrigger>

        {/* Menú Desplegable */}
        <DialogContent className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-300 z-50">
          {/* Título de Dialog, solo accesible */}
          <VisuallyHidden>
            <DialogTitle>Menú del Usuario</DialogTitle>
          </VisuallyHidden>

          <div className="py-2">
            <div className="flex items-center px-4 py-2">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-8 w-8 rounded-full mr-2"
              />
              <span className="text-sm">{userName}</span>
            </div>
            <Link
              href="/profile"
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Perfil
            </Link>
            <button
              onClick={() => {}}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Cerrar sesión
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
