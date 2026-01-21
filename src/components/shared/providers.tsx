"use client";

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import MainNavbar, { NavLink } from "./main-navbar";
import Footer from "./footer";
import { useTranslations } from "next-intl";

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000 * 5, // 5 minute
          refetchOnWindowFocus: false,
        },
      },
    });

    return client;
  });
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;

  const translation = useTranslations("Navigation");
  const navLinks: NavLink[] = [
    {
      key: "",
      label: translation("home"),
      href: "/",
    },
    {
      key: "league",
      label: translation("league"),
      href: "/league",
    },
  ];
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <MainNavbar navLinks={navLinks} />
        {children}
        <Footer />
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
