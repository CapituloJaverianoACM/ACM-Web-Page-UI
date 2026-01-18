"use client";
import React from "react";
import ThreeBlobs from "../three-blobs";
import { HeroBackground } from "../ui/hero-background";

export function Hero() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden cursor-none bg-[#dde5f8] dark:bg-transparent"
      id="home"
    >
      {/* Three.js Background */}
      <ThreeBlobs />

      {/* Blurry overlay between blobs and content */}
      <HeroBackground />

      {/* Content Overlay with slightly increased z-index to ensure visibility over blurred blobs */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto pointer-events-none select-none">
          {/* Logo */}
          <img
            src="/Logo_Oscuro.svg"
            alt="Logo"
            className="dark:hidden flex filter drop-shadow-md"
          />
          <img
            src="/Logo_Claro.svg"
            alt="Logo"
            className="hidden dark:flex filter drop-shadow-md"
          />

          {/* Subtitle */}
          <p className="font-montserrat font-400 text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow dark:text-white">
            ¡Hola! somos ACM Javeriana, un grupo de estudiantes apasionados por
            la tecnología y la innovación.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 rounded-full flex justify-center">
            <div className="w-1 h-3 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Enhanced gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/25 dark:to-white/15 pointer-events-none z-10"></div>
    </section>
  );
}
