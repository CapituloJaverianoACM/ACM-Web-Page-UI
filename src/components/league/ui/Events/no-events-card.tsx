import EventCard from "@/components/league/ui/Events/event-card";
import { redirect } from "next/navigation";
import React from "react";

export const NoEventsCard = () => {
  return (
    <EventCard.Container
      key="unique"
      className="justify-end !w-[20rem] xl:!w-[30rem]"
    >
      <div className="flex w-full aspect-video">
        <EventCard.Image
          src={"/Logo_Oscuro.svg"}
          className="!object-contain opacity-15 w-2/3 m-auto"
        />
      </div>

      <EventCard.Padding>
        <EventCard.Title>
          No hay eventos con tus parámetros de busqueda
        </EventCard.Title>
        <EventCard.Padding>
          <EventCard.Description>
            ¡Mantene alerta a nuestras redes sociales! Así sabrás cuando
            tengamos un evento de tu interés.
          </EventCard.Description>
        </EventCard.Padding>

        <EventCard.RegisterButton
          onClick={() => {
            redirect("https://www.instagram.com/acmjaveriana/");
          }}
        >
          Redes Sociales
        </EventCard.RegisterButton>
      </EventCard.Padding>
    </EventCard.Container>
  );
};
