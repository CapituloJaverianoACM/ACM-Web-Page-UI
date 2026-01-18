import React from "react";

export const HeroBackground = () => {
  return (
    <div
      className="absolute inset-0 z-15 pointer-events-none bg-[#ffffff10]"
      style={{
        backdropFilter: "blur(50px)",
        WebkitBackdropFilter: "blur(50px)",
      }}
    >
      {/* Grain overlay */}
      <div
        className="opacity-25 dark:opacity-10 absolute inset-0 w-full h-full"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='1' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)'/></svg>\")",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
};
