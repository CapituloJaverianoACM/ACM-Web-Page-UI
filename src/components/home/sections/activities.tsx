"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/home/apple-cards-carousel";
import { FocusCards } from "../focus-cards";
import { PreExamsContent } from "../pre-exams-content";

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

const CPMembersContent = () => {
  const [cp_members, setCPMembers] = useState([]);
  const [cp_coaches, setCPCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  const CP_MEMBERS: string[] = [
    "adrianrrruiz",
    "TalkySafe143",
    "achalogy",
    "Avila_Sa",
    "Cojuan",
    "Lorenzo_lrc",
    "harry3008",
    "sandoval95",
  ];

  useEffect(() => {
    fetch(
      `https://codeforces.com/api/user.info?checkHistoricHandles=false&handles=${CP_MEMBERS.join(";")}`,
      {
        cache: "no-store",
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK" && Array.isArray(data.result)) {
          // Separar los coaches de los miembros
          const membersData = data.result
            .filter((user) => user.handle !== "sandoval95")
            .sort((a, b) => b.rating - a.rating)
            .map((user) => ({
              title: `${user.handle} - (Rating: ${user.rating})`,
              src: user.titlePhoto,
            }));

          const coachData = data.result
            .filter((user) => user.handle === "sandoval95")
            .map((user) => ({
              title: `${user.handle} - Coach`,
              src: user.titlePhoto,
            }));

          setCPMembers(membersData);
          setCPCoaches(coachData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <p className="dark:text-[--azul-niebla]">
        Somos un grupo apasionado por competir y desctacarnos cada día más
      </p>
      <br />
      <FocusCards cards={cp_members} />
      <p className="text-3xl text-center my-10 font-semibold dark:text-[--azul-niebla]">
        Nuestro Coach
      </p>
      <FocusCards cards={cp_coaches} />
    </>
  );
};

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
