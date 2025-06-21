'use client';

import React, {useState} from "react";

export default function MainNavbar() {
    const [activeLink, setActiveLink] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Nav links
    const navLinks = [
        {key: "home", label: "Home", href: "#home"},
        {key: "about us", label: "About Us", href: "#about-us"},
        {key: "members", label: "Members", href: "#members"},
        {key: "activities", label: "Activities", href: "#activities"},
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 ">
            <div className="max-w-7xl mx-auto">
                <div className="glassmorphic px-6 py-3 shadow-lg">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <img
                                src="/Logo_Oscuro.svg"
                                alt="Logo ACM Javeriana"
                                className="h-10 w-auto mr-4"
                                style={{display: "block", userSelect: "none"}}
                                draggable={false}
                            />
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
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

                        {/* User Links */}
                        <div className="hidden md:flex items-center gap-4">
                            <a
                                href="#login"
                                className="btn btn--outline btn--small"
                            >
                                Log in
                            </a>
                            <a
                                href="#signup"
                                className="btn btn--primary btn--small"
                            >
                                Sign up
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
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
                                              d="M6 18L18 6M6 6l12 12"/>
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden mt-4 transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
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
                                <a
                                    href="#login"
                                    className="btn btn--outline btn--small w-full"
                                    onClick={closeMobileMenu}
                                >
                                    Log in
                                </a>
                                <a
                                    href="#signup"
                                    className="btn btn--primary btn--small w-full"
                                    onClick={closeMobileMenu}
                                >
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}