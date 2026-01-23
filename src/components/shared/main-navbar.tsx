"use client";

import { useTranslations } from "next-intl";
import { getStudentBySupabaseId } from "@/controllers/student.controller";
import { getUser } from "@/controllers/supabase.controller";
import { IconMoon, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import AvatarMenu from "./ui/avatar-menu";
import LanguageToggle from "./ui/language-toggle";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { NavbarItem, NavLink } from "../navbar/navbar-item";

interface MainNavbarProps {
  navLinks: NavLink[];
}

const IGNORE_KEYS = {
  "log-in": true,
  "sign-up": true,
};

export default function MainNavbar({ navLinks }: MainNavbarProps) {
  let pathname = usePathname().slice(1);
  const t = useTranslations("Navigation");
  const activeLink = pathname == "" ? "home" : pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: student, isLoading } = useQuery({
    queryKey: ["navbar-user"],
    queryFn: async () => {
      const user = await getUser();
      if (!user) return null;
      return await getStudentBySupabaseId(user.id);
    },
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const changeTheme = () => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)"),
      );
      return match ? match[2] : null;
    };

    const setCookie = (name: string, value: string, days: number) => {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${value}; path=/; expires=${expires}`;
    };

    const currentTheme = getCookie("theme") ?? "light";

    if (currentTheme === "light") {
      document.documentElement.classList.add("dark");
      setCookie("theme", "dark", 365);
    } else {
      document.documentElement.classList.remove("dark");
      setCookie("theme", "light", 365);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 ${pathname in IGNORE_KEYS ? "hidden" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="glassmorphic dark:glassmorphic-dark px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-1">
              <img
                src="/Logo_Oscuro.svg"
                alt="Logo ACM Javeriana"
                className="h-10 w-auto mr-4 flex dark:hidden"
                style={{ userSelect: "none" }}
                draggable={false}
              />
              <img
                src="/Logo_Claro.svg"
                alt="Logo ACM Javeriana"
                className="h-10 w-auto mr-4 hidden dark:flex"
                style={{ userSelect: "none" }}
                draggable={false}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center justify-center space-x-6 flex-2">
              {navLinks.map((item) => (
                <NavbarItem
                  key={item.key}
                  item={item}
                  activeLink={activeLink}
                />
              ))}
            </div>

            <div className="flex gap-4 justify-end items-center ml-auto flex-1">
              <LanguageToggle />

              <div
                onClick={changeTheme}
                className="glassmorphic dark:glassmorphic-dark p-2 cursor-pointer"
              >
                <IconMoon className="dark:hidden flex"></IconMoon>
                <IconSun className="hidden dark:flex"></IconSun>
              </div>

              {/* User Links */}
              {!isLoading && student ? (
                <AvatarMenu
                  avatarUrl={student.avatar || ""}
                  userName={student.name || ""}
                />
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link
                    href="/log-in"
                    className="btn btn--outline btn--small dark:text-white"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/sign-up"
                    className="btn btn--primary btn--small dark:text-white"
                  >
                    {t("signup")}
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 glassmorphic transition-all duration-300"
                  aria-label="Toggle mobile menu"
                >
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden mt-4 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none hidden"
          }`}
        >
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <NavbarItem
                  key={item.key}
                  item={item}
                  activeLink={activeLink}
                />
              ))}
              <div className="flex flex-col items-center gap-2 mt-2">
                <Link
                  href="/log-in"
                  className="btn btn--outline btn--small w-full dark:text-white"
                  onClick={closeMobileMenu}
                >
                  {t("login")}
                </Link>
                <Link
                  href="/sign-up"
                  className="btn btn--primary btn--small w-full"
                  onClick={closeMobileMenu}
                >
                  {t("signup")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
