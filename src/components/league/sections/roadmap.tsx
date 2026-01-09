"use client";

import { Play } from "lucide-react";

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: "Cómo crear tu cuenta de Codeforces",
    description: "Tutorial: Registro en Codeforces",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Como enviar un problema a codeforces",
    description: "Tutorial: Configuración de perfil",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Participar en tu primer concurso",
    description: "Tutorial: Primeros pasos",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export function Roadmap() {
  return (
    <section
      id="roadmap"
      className="min-h-screen w-full bg-white dark:bg-black py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mt-8">
            Roadmap de la Liga
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Sigue estos pasos para comenzar tu viaje en la competencia
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative space-y-12">
          {roadmapSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Container */}
              <div
                className={`flex items-start gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Step Number - Fixed position */}
                <div className="relative flex-shrink-0">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/50 z-10 relative">
                    <span className="text-2xl font-bold text-white">
                      {step.id}
                    </span>
                  </div>

                  {/* Dashed connection line */}
                  {index < roadmapSteps.length - 1 && (
                    <svg
                      className="absolute left-1/2 top-14 h-20 w-24 -translate-x-1/2 overflow-visible"
                      preserveAspectRatio="none"
                    >
                      <path
                        d={`M 0 0 Q ${index % 2 === 0 ? "96" : "-96"} 80 0 160`}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="8,8"
                        fill="none"
                        className="text-blue-500 dark:text-blue-500"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <div className="rounded-3xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Video Placeholder */}
                    <div className="mb-6 aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/30 flex items-center justify-center group cursor-pointer">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-300/50 dark:from-blue-500/30 to-transparent"></div>
                        <div className="absolute rounded-full bg-blue-600 p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500 shadow-lg">
                          <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {step.description}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
