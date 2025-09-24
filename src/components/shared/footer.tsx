"use client";

import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="w-full px-6 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border-t border-gray-200/20 dark:border-gray-700/20 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 items-center">
          {/* Titulo a la izquierda */}
          <div className="flex items-baseline justify-self-start whitespace-nowrap">
            <span className="font-montserrat text-lg md:text-lg text-[--azul-noche] dark:text-white">
              Capítulo Javeriano
            </span>
            <h1 className="ml-2 md:text-xl font-semibold text-[--azul-noche] dark:text-white">
              ACM
            </h1>
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

          {/* Redes sociales a la derecha */}
          <div className="flex items-center justify-self-end gap-3 md:gap-4">
            <a
              href="https://www.linkedin.com/company/capitulo-javeriano-acm/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex"
            >
              <IconBrandLinkedin className="w-7 h-7 md:w-8 md:h-8 text-[--azul-noche] dark:text-white hover:opacity-70 transition-opacity" />
            </a>

            <a
              href="https://www.instagram.com/acmjaveriana?igsh=N3VjZGw0OHE3eG1x"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex"
            >
              <IconBrandInstagram className="w-7 h-7 md:w-8 md:h-8 text-[--azul-noche] dark:text-white hover:opacity-70 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
