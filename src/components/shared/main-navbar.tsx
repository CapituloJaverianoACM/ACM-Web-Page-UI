'use client';

import { IconMoon, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

export type NavLink = {
    key: string;
    label: string;
    href: string;
};

interface MainNavbarProps {
    navLinks: NavLink[];
}

export default function MainNavbar({ navLinks }: MainNavbarProps) {
    const [activeLink, setActiveLink] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const changeTheme = () => {
        const getCookie = (name: string) => {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : null;
        };

        const setCookie = (name: string, value: string, days: number) => {
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            document.cookie = `${name}=${value}; path=/; expires=${expires}`;
        };

        const currentTheme = getCookie('theme') ?? 'light';

        if (currentTheme === 'light') {
            document.documentElement.classList.add('dark');
            setCookie('theme', 'dark', 365);
        } else {
            document.documentElement.classList.remove('dark');
            setCookie('theme', 'light', 365);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 ">
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
                        <div className="hidden md:flex items-center justify-center space-x-8 flex-2">
                            {navLinks.map((item) => (
                                <a
                                    key={item.key}
                                    href={item.href}

                                    className={`text-base text-semibold px-md py-md relative ${activeLink === item.key ? "text-[--azul-electrico]" : "text-[--azul-noche] dark:text-white"}`}
                                    style={{
                                        textDecoration: "none",
                                        // color: activeLink === item.key ? "var(--azul-electrico)" : "var(--azul-noche)",
                                        transition: "color var(--transition-normal)"
                                    }}
                                    onClick={() => {
                                        setActiveLink(item.key);
                                    }}
                                >
                                    {item.label}
                                    <span
                                        style={{
                                            position: "absolute",
                                            bottom: "0",
                                            left: "50%",
                                            width: activeLink === item.key ? "30px" : "0",
                                            height: "3px",
                                            backgroundColor: "var(--azul-electrico)",
                                            borderRadius: "var(--radius-sm)",
                                            transition: "width var(--transition-normal)",
                                            transform: "translateX(-50%)"
                                        }}
                                    ></span>
                                </a>
                            ))}
                        </div>

                        <div className="flex gap-4 justify-end items-center ml-auto flex-1">
                            <div onClick={changeTheme} className="glassmorphic dark:glassmorphic-dark p-2">
                                <IconMoon className="dark:hidden flex"></IconMoon>
                                <IconSun className="hidden dark:flex"></IconSun>
                            </div>

                            {/* User Links */}
                            <div className="hidden lg:flex items-center gap-4">
                                <Link
                                    href="/log-in"
                                    className="btn btn--outline btn--small "
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="btn btn--primary btn--small"
                                >
                                    Sign up
                                </Link>
                            </div>
                            {/* Mobile Menu Button */}
                            <div className="lg:hidden">
                                <button
                                    onClick={toggleMobileMenu}
                                    className="p-2 glassmorphic transition-all duration-300"
                                    aria-label="Toggle mobile menu"
                                >
                                    <svg
                                        className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {isMobileMenuOpen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden mt-4 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none hidden'
                    }`}>
                    <div
                        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-lg">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((item) => (
                                <a
                                    key={item.key}
                                    href={item.href}

                                    className="text-base text-semibold px-md py-md relative"
                                    style={{
                                        textDecoration: "none",
                                        color: activeLink === item.key ? "var(--azul-electrico)" : "var(--azul-noche)",
                                        transition: "color var(--transition-normal)"
                                    }}
                                    onClick={() => {
                                        setActiveLink(item.key);
                                    }}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="flex flex-col items-center gap-2 mt-2">
                                <Link
                                    href="/log-in"
                                    className="btn btn--outline btn--small w-full"
                                    onClick={closeMobileMenu}
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="btn btn--primary btn--small w-full"
                                    onClick={closeMobileMenu}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
