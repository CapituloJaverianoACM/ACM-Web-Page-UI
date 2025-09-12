"use client";

import { IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="w-full px-6 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border-t border-gray-200/20 dark:border-gray-700/20 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 items-center">
          {/* Título a la izquierda */}
          <div className="flex flex-col justify-self-start">
            <h3 className="text-sm text-center text-[--azul-noche] dark:text-white">
              Capítulo Javeriano ACM
            </h3>
          </div>

          {/* Logo en el centro */}
          <div className="flex justify-center">
            <img
              src="/Logo_Oscuro.svg"
              alt="Logo ACM Javeriana"
              className="h-8 dark:hidden"
              draggable={false}
            />
            <img
              src="/Logo_Claro.svg"
              alt="Logo ACM Javeriana"
              className="h-8 hidden dark:block"
              draggable={false}
            />
          </div>

          {/* Redes sociales a la derecha - apiladas verticalmente */}
          <div className="flex flex-col items-end gap-2 justify-self-end">
            <a
              href="https://www.linkedin.com/company/capitulo-javeriano-acm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandLinkedin className="w-5 h-5 text-[--azul-noche] dark:text-white hover:opacity-70 transition-opacity" />
            </a>
            <a
              href="https://www.instagram.com/acmjaveriana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandInstagram className="w-5 h-5 text-[--azul-noche] dark:text-white hover:opacity-70 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
