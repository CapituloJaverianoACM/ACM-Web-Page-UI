"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Página no encontrada
          </p>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 btn btn--primary dark:text-white mt-8"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
