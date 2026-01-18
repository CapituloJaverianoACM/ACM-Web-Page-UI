import React from "react";
import { Carousel, Card } from "@/components/home/apple-cards-carousel";
import { PreExamsContent } from "../pre-exams-content";
import { CPMembersContent } from "../cp-members-content";

export function Activities() {
  const cards = carrousel_items.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div id="activities" className="space-y-8 pl-4 sm:pl-6 lg:pl-8 py-12">
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-40">
        <h1 className="dark:text-white">Nuestras Actividades</h1>
        <p className="text-xl dark:text-white/80">
          En nuestra comunidad organizamos actividades como talleres prácticos,
          competencias de programación y proyectos colaborativos. Nuestro
          objetivo es aprender juntos, mejorar nuestras habilidades y disfrutar
          resolviendo retos tecnológicos en equipo.
        </p>
      </div>
      <Carousel items={cards} />
    </div>
  );
}

const carrousel_items = [
  {
    category: "Programación Competitiva",
    title: "¡Conoce a nuestro grupo de programación competitiva!",
    src: "https://drive.google.com/uc?export=view&id=1RW9BeAFChl4J9darhpCqwl1NEvrNi_jJ",
    content: <CPMembersContent />,
  },
  {
    category: "Talleres Pre-Parciales",
    title:
      "Refuerza tus conocimientos antes de los parciales con nuestros talleres",
    src: "https://drive.google.com/uc?export=view&id=1mAWVNMh5wmlaBaciCkSMOV2nQXVYkMAu",
    content: <PreExamsContent />,
  },
  {
    category: "Cursos y Talleres",
    title: "Aprende nuevas habilidades con nuestros cursos y talleres",
    src: "https://drive.google.com/uc?export=view&id=1HH58GMKbAqUc06YbqzhHifatfKGDRpV0",
    content: <></>,
  },
];
