"use client";
import { useTranslations } from "next-intl";

import VideoCard from "../ui/video-card";

interface RoadmapStep {
  number: number;
  title: string;
  subtitle?: string;
  videoSrc?: string;
}

export function Roadmap() {
  const t = useTranslations("Roadmap.steps");

  const steps: RoadmapStep[] = [
    {
      number: 1,
      title: t("step1.title"),
      subtitle: t("step1.subtitle"),
      videoSrc:
        "https://www.youtube.com/watch?v=QFzXQNZ6zvQ&pp=ugUEEgJlbtIHCQlNCgGHKiGM7w%3D%3D",
    },
    {
      number: 2,
      title: t("step2.title"),
      subtitle: t("step2.subtitle"),
    },
  ];

  const cardHeight = 400; // Altura estimada de cada tarjeta
  const cardSpacing = 96; // Espacio entre tarjetas (space-y-24 = 6rem = 96px)

  // Calcular altura total más ajustada
  const totalHeight =
    steps.length * cardHeight + (steps.length - 1) * cardSpacing;

  // Generar el path curvo que conecta las tarjetas
  const generateCurvePath = () => {
    if (steps.length < 2) return "";

    let pathData = "";

    for (let i = 0; i < steps.length - 1; i++) {
      // Posición vertical de cada tarjeta
      const currentCardY = i * (cardHeight + cardSpacing) + cardHeight / 2;
      const nextCardY = (i + 1) * (cardHeight + cardSpacing) + cardHeight / 2;

      // Puntos de inicio y fin en los lados de las tarjetas
      const startY = currentCardY + cardHeight * 0.25;
      const endY = nextCardY - cardHeight * 0.25;

      let startX, endX, control1X, control2X;

      if (i % 2 === 0) {
        // Tarjeta par (visual izquierda):
        // Sale desde lado izquierdo, se aleja a la izquierda, vuelve a derecha
        startX = -480; // Centro del lado izquierdo
        endX = 480; // Centro del lado derecho de la siguiente

        // Ambos puntos de control en la rama izquierda
        control1X = -700; // Se aleja hacia la izquierda
        control2X = -650; // Continúa en la rama izquierda
      } else {
        // Tarjeta impar (visual derecha):
        // Sale desde lado derecho, se aleja a la derecha, vuelve a izquierda
        startX = 480; // Centro del lado derecho
        endX = -480; // Centro del lado izquierdo de la siguiente

        // Ambos puntos de control en la rama derecha
        control1X = 700; // Se aleja hacia la derecha
        control2X = 650; // Continúa en la rama derecha
      }

      const control1Y = startY + (endY - startY) * 0.35;
      const control2Y = endY - (endY - startY) * 0.35;

      if (i === 0) {
        pathData += `M ${startX} ${startY} `;
      } else {
        pathData += `M ${startX} ${startY} `;
      }

      // Curva cúbica Bezier que crea arcos por fuera
      pathData += `C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY} `;
    }

    return pathData;
  };

  return (
    <div className="pt-32 pb-8 px-4">
      <div className="relative flex flex-col items-center">
        {/* SVG connector lines - positioned absolutely behind */}
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 overflow-visible"
          style={{
            width: "800px",
            height: `${totalHeight}px`,
            zIndex: 0,
          }}
          viewBox={`-400 0 800 ${totalHeight}`}
          preserveAspectRatio="xMidYMin meet"
        >
          <defs>
            <style>{`
              path, circle { 
                pointer-events: none;
              }
            `}</style>
          </defs>

          {/* Curved path connecting cards */}
          <path
            d={generateCurvePath()}
            className="stroke-[var(--azul-crayon)] dark:stroke-[var(--azul-electrico)]"
            strokeWidth="3"
            fill="none"
            strokeDasharray="8,4"
          />

          {/* Circles at each step */}
          {steps.map((_, index) => {
            const x = index % 2 === 0 ? -480 : 480;
            const y = index * (cardHeight + cardSpacing) + cardHeight / 2;
            return (
              <circle
                key={`dot-${index}`}
                cx={x}
                cy={y}
                r="8"
                className="fill-[var(--azul-crayon)] dark:fill-[var(--azul-electrico)]"
              />
            );
          })}
        </svg>

        {/* Roadmap steps */}
        <div className="space-y-24 w-full relative z-10">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex items-center justify-center w-full"
            >
              {/* Video Card - más grande con número en esquina */}
              <div
                className="w-[32rem] relative"
                style={{
                  marginLeft: index % 2 === 0 ? "-30rem" : "30rem",
                }}
              >
                {/* Number Badge - esquina superior izquierda */}
                <div className="absolute -top-4 -left-4 z-20">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--azul-crayon)] dark:bg-[var(--azul-electrico)] text-[var(--white)] font-bold text-2xl shadow-lg">
                    {step.number}
                  </div>
                </div>

                <VideoCard
                  number={step.number}
                  title={step.title}
                  subtitle={step.subtitle}
                  videoSrc="https://youtu.be/EVUEIHcbZic"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
