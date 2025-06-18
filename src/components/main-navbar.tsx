'use client';

import React, {useState} from "react";

export default function MainNavbar() {
    const [activeLink, setActiveLink] = useState("home");

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-md">
            <div className="container">
                <div className="glassmorphic" style={{padding: "var(--space-lg)"}}>
                    {/* Navigation content */}
                    <div className="flex items-center justify-between" style={{position: "relative", zIndex: 1}}>
                        {/* Logo */}
                        <img
                            src="/Logo_Oscuro.svg"
                            alt="Logo ACM Javeriana"
                            style={{maxHeight: "40px", width: "auto", display: "block", padding : "0 var(--space-sm)"}}
                        />

                        {/* Navigation Links - Added gap for spacing */}
                        <div className="hidden md:flex flex-1 justify-center items-center"
                             style={{gap: "var(--space-xl)"}}>
                            {["home", "about Us", "members", "activities"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item}`}
                                    className="text-base text-semibold px-md py-md relative"
                                    style={{
                                        textDecoration: "none",
                                        color: activeLink === item ? "var(--azul-electrico)" : "var(--azul-noche)",
                                        transition: "color var(--transition-normal)"
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveLink(item);
                                    }}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                    <span
                                        style={{
                                            position: "absolute",
                                            bottom: "0",
                                            left: "50%",
                                            width: activeLink === item ? "30px" : "0",
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
                        <div className="hidden md:flex items-center" style={{gap: "var(--space-md)"}}>
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
                                className="btn btn--outline btn--small p-sm"
                                aria-label="Open menu"
                            >
                                <svg className="w-6 h-6 text-azul-noche" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
