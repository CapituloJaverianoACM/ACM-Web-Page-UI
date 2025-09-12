"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/home/apple-cards-carousel";
import { FocusCards } from "../focus-cards";
import { PreExamsContent } from "../pre-exams-content";

export function AboutUs() {
  const cards = carrousel_items.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div id="about-us" className="space-y-8 pl-4 sm:pl-6 lg:pl-8 py-12">
      <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-40">
        <h1 className="dark:text-white">Sobre Nosotros</h1>
        <p className="text-xl dark:text-white/80">
          Somos una comunidad apasionada por la tecnología y la innovación,
          dedicada a impulsar el crecimiento profesional y personal de nuestros
          miembros a través de la colaboración, el aprendizaje y el liderazgo.
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

  useEffect(() => {
    fetch(
      "https://codeforces.com/api/user.info?checkHistoricHandles=false&handles=aruiz08;firulo;TalkySafe143;achalogy;Cojuan;Avila_Sa;sandoval95",
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
    title: "Refuerza tus conocimientos antes de los parciales con nuestros talleres",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <PreExamsContent />,
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <></>,
  },

  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <></>,
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <></>,
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <></>,
  },
];
