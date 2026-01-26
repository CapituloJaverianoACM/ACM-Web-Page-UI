"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

const locales = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const getCookie = (name: string) => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}`;
};

export default function LanguageToggle() {
  const { data: currentLocale = "en" } = useQuery({
    queryKey: ["locale"],
    queryFn: () => getCookie("locale") ?? "en",
    staleTime: Infinity,
  });

  const changeLocaleMutation = useMutation({
    mutationFn: (newLocale: string) => {
      setCookie("locale", newLocale, 365);
      return Promise.resolve(newLocale);
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  const changeLanguage = () => {
    const newLocale = currentLocale === "en" ? "es" : "en";
    changeLocaleMutation.mutate(newLocale);
  };

  const locale = locales.find((l) => l.code === currentLocale) || locales[0];

  return (
    <button
      onClick={changeLanguage}
      className="glassmorphic dark:glassmorphic-dark px-3 py-2.5 flex items-center gap-2 hover:opacity-80 transition-opacity"
      title={`Cambiar a ${locale.code === "en" ? "Español" : "English"}`}
      disabled={changeLocaleMutation.isPending}
    >
      <span className="text-sm font-medium hidden sm:inline">
        {locale.code.toUpperCase()}
      </span>
    </button>
  );
}
