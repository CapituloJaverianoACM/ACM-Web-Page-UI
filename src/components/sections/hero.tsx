"use client";
import React from "react";
import { SparklesCore } from "../sparkles";

export function Hero() {
  return (
    <div id="hero" className="h-[40rem] relative w-full bg-white flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#000000"
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-black relative z-20">
        Capítulo Javeriano ACM
      </h1>
    </div>
  );
}
