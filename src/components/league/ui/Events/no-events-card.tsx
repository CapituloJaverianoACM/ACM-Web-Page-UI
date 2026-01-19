import { useTranslations } from "next-intl";
import EventCard from "@/components/league/ui/Events/event-card";
import { redirect } from "next/navigation";
import React from "react";

export const NoEventsCard = () => {
  const t = useTranslations("League.upcomingEvents");

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
        <EventCard.Title>{t("noEvents")}</EventCard.Title>
        <EventCard.Padding>
          <EventCard.Description>{t("followSocial")}</EventCard.Description>
        </EventCard.Padding>

        <EventCard.RegisterButton
          onClick={() => {
            redirect("https://www.instagram.com/acmjaveriana/");
          }}
        >
          {t("socialNetworks")}
        </EventCard.RegisterButton>
      </EventCard.Padding>
    </EventCard.Container>
  );
};
