import EventCard from "@/components/league/ui/Events/event-card";
import React from "react";

export const EventSkeletonCard = () => {
  return (
    <EventCard.Container
      key="unique"
      className="justify-end w-[20rem]! xl:w-120!"
    >
      <div className="flex w-full aspect-video">
        <EventCard.Image
          src={"/Logo_Oscuro.svg"}
          className="object-contain! opacity-15 w-2/3! m-auto"
        />
      </div>

      <EventCard.Padding>
        <EventCard.Title className="bg-neutral-200 rounded" />
        <EventCard.Padding>
          <EventCard.Description className="bg-neutral-200 rounded" />
        </EventCard.Padding>

        <EventCard.RegisterButton>{"  "}</EventCard.RegisterButton>
      </EventCard.Padding>
    </EventCard.Container>
  );
};
