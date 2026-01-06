import Image from "next/image";
import Link from "next/link";
import React from "react";

type AuthLayoutProps = React.PropsWithChildren<object>;

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--azul-electrico) 0%, var(--azul-ultramar) 50%, var(--azul-noche) 100%)",
      }}
    >
      {/* Overlay con patrón */}
      <div className="absolute inset-0 bg-[var(--azul-noche)]/40 dark:bg-[var(--azul-noche)]/60"></div>

      {/* Patrón de puntos decorativo */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--azul-niebla) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Formas flotantes decorativas */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, var(--azul-crayon), transparent)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--azul-niebla), transparent)",
          }}
        ></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full flex flex-col items-center gap-3">
        {/* Logo ACM */}
        <Link
          href="/"
          className="mb-16 flex flex-col items-center group select-none transition-all duration-300"
        >
          <div className="p-4 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl group-hover:bg-white/20 transition-all duration-300">
            <Image
              src="/Logo_Claro.svg"
              alt="Logo ACM Javeriana"
              width={20}
              height={20}
              className="h-16 w-auto drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
              draggable={false}
            />
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
};
