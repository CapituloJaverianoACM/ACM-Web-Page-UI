import Image from "next/image";
import Link from "next/link";
import React from "react";

type AuthLayoutProps = React.PropsWithChildren<{}>;

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-[#121212] p-4">
      {/* Logo ACM */}
      <Link
        href="/"
        className="mb-6 flex flex-col items-center group select-none"
      >
        <Image
          src="/Logo_Oscuro.svg"
          alt="Logo ACM Javeriana"
          width={20}
          height={20}
          className="h-16 w-auto dark:hidden drop-shadow-md transition-transform group-hover:scale-105"
          draggable={false}
        />
        <Image
          src="/Logo_Claro.svg"
          alt="Logo ACM Javeriana"
          width={20}
          height={20}
          className="h-16 w-auto hidden dark:flex drop-shadow-md transition-transform group-hover:scale-105"
          draggable={false}
        />
      </Link>
      {children}
    </div>
  );
};
