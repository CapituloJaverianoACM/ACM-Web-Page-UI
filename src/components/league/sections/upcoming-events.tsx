// Code de Acha 😎

import { Carousel } from "@/components/home/apple-cards-carousel";
import EventCard from "@/components/league/ui/Events/event-card"
import { Contest } from '@/models/contest.model'
import { LevelEnum } from "@/models/level.enum";
import React, { ReactNode, useEffect, useState } from "react";
import { LevelFilter } from "../ui/Events/level-filter";

const formatDateEvent = ({
  date, start_hour, final_hour
}: {
  date: Date,
  start_hour: Date,
  final_hour: Date
}) => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  const optionsHour: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }

  const formattedDate = new Date(date).toLocaleDateString('es-ES', optionsDate)
  const formattedInitialHour = new Date(start_hour).toLocaleTimeString('es-ES', optionsHour)
  const formattedFinalHour = new Date(final_hour).toLocaleTimeString('es-ES', optionsHour)

  return `${formattedDate}, de ${formattedInitialHour} a ${formattedFinalHour}`
}

export function UpcomingEvents({
  events = [],
  loadingInitialState = false
}: {
  events: Contest[],
  loadingInitialState?: boolean
}) {

  // Diseño de una tarjeta para decir que no hay eventos

  const NoEventsCard: ReactNode = <EventCard.Container key="unique" className="justify-end !w-[20rem] xl:!w-[30rem]">
    <div className="flex w-full aspect-video">
      <EventCard.Image src={"/Logo_Oscuro.png"} className="!object-contain opacity-15 w-1/2 m-auto" />
    </div>

    <EventCard.Padding>
      <EventCard.Title>
        No hay eventos con tus parámetros de busqueda
      </EventCard.Title>
      <EventCard.Padding>
        <EventCard.Description>
          ¡Mantene alerta a nuestras redes sociales! Así sabrás cuando tengamos un evento de tu interés.
        </EventCard.Description>
      </EventCard.Padding>

      <EventCard.RegisterButton onClick={() => {
        alert('click')
      }}>
        Redes Sociales
      </EventCard.RegisterButton>

    </EventCard.Padding>

  </EventCard.Container>

  // Diseño de un tarjeta skeleton

  const SkeletonCard: ReactNode = <EventCard.Container key="unique" className="justify-end !w-[20rem] xl:!w-[30rem]">
    <div className="flex w-full aspect-video">
      <EventCard.Image src={"/Logo_Oscuro.png"} className="!object-contain opacity-15 !w-2/3 m-auto" />
    </div>

    <EventCard.Padding>
      <EventCard.Title className="bg-neutral-200 rounded" />
      <EventCard.Padding>
        <EventCard.Description className="bg-neutral-200 rounded" />
      </EventCard.Padding>

      <EventCard.RegisterButton onClick={() => {
        alert('click')
      }}>
        {"  "}
      </EventCard.RegisterButton>

    </EventCard.Padding>

  </EventCard.Container>

  // Diseño de las tarjetas

  const [loading, setLoading] = useState<boolean>(loadingInitialState)
  const [AllCards, setAllCards] = useState<({
    comp: ReactNode,
    level: LevelEnum
  })[]>([])

  useEffect(() => {
    setAllCards(
      events.map(event => {

        const { date, start_hour, final_hour } = event;

        return {
          comp: <EventCard.Container key={event._id} className="h-full justify-end !w-[20rem] xl:!w-[30rem]">
            {event.picture ? <EventCard.Image src={event.picture.link} /> : <div className="flex w-full aspect-video">
              <EventCard.Image src={"/Logo_Oscuro.png"} className="!object-contain opacity-15 !w-2/3 m-auto" />
            </div>}

            <EventCard.Padding>
              <EventCard.WrapContainer>
                <EventCard.Title>
                  {event.name}
                </EventCard.Title>
                {event.level == LevelEnum.Initial && <p title="Nivel Inicial" className="text-[--azul-electrico] m-0">Inicial</p>}
                {event.level == LevelEnum.Advanced && <p title="Nivel Avanzado" className="text-red-400 m-0">Avanzado</p>}
              </EventCard.WrapContainer>

              <EventCard.Padding>
                <EventCard.Description>
                  Salón {event.classroom} - {formatDateEvent({
                    date, start_hour, final_hour
                  })}
                </EventCard.Description>
              </EventCard.Padding>


              <EventCard.RegisterButton onClick={() => {
                alert('click')
              }}>

              </EventCard.RegisterButton>
            </EventCard.Padding>
          </EventCard.Container>,
          level: event.level == "Advanced" ? LevelEnum.Advanced : LevelEnum.Initial
        }
      })
    )
  }, [events])


  const [cards, setCards] = useState<ReactNode[]>([])
  const [filter, setFilter] = useState<"all" | "Initial" | "Advanced">("all");

  useEffect(() => {
    setCards(AllCards?.map(x => x.comp) ?? [])
    if (AllCards.length > 0) setLoading(false)
  }, [AllCards])

  // Acá se filtran los eventos

  useEffect(() => {
    setCards(
      AllCards.filter(x => {
        if (filter == "all") return true;
        else if (filter == "Advanced" && x.level == LevelEnum.Advanced) return true;
        else if (filter == "Initial" && x.level == LevelEnum.Initial) return true;
        return false;
      }).map(x => x.comp)
    )
    if (cards.length > 0) setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])


  return (
    <div id="upcoming-events" className="flex flex-col w-[90%] max-w-[100rem] mx-auto gap-2 items-center">
      <div className="flex flex-col gap-4 xl:flex-row items-center justify-between xl:w-[80%]">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="dark:text-white">Upcoming Events</h2>
          <p className="dark:text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, sunt.</p>
        </div>
        <div className="flex flex-col">
          <LevelFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <Carousel items={
        loading ? [SkeletonCard] : (cards.length > 0 ? cards : [NoEventsCard])
      } />
    </div>
  );
}