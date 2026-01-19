// Code de Acha 😎

import { Carousel } from "@/components/home/apple-cards-carousel";
import { Contest } from "@/models/contest.model";
import { LevelFilter } from "../ui/Events/level-filter";
import { Toaster } from "react-hot-toast";
import { useUpcomingEvents } from "@/hooks/use-upcoming-events";
import { UpcomingEventCard } from "@/components/league/ui/Events/upcoming-event-card";
import { NoEventsCard } from "@/components/league/ui/Events/no-events-card";
import { EventSkeletonCard } from "@/components/league/ui/Events/event-skeleton-card";

export function UpcomingEvents({
  events = [],
  loadingInitialState = false,
}: {
  events: Contest[];
  loadingInitialState?: boolean;
}) {
  const { loading, filter, setFilter, filteredEvents, handleRegisterContest } =
    useUpcomingEvents(events, loadingInitialState);

  const cards = filteredEvents.map((event) => (
    <UpcomingEventCard
      key={event.id}
      event={event}
      onRegister={handleRegisterContest}
    />
  ));

  return (
    <div
      id="upcoming-events"
      className="flex flex-col w-[90%] max-w-400 mx-auto gap-2 items-center"
    >
      <Toaster position="bottom-center" />
      <div className="flex flex-col gap-4 xl:flex-row items-center justify-between xl:w-[80%]">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="dark:text-white">Próximos Eventos</h2>
          <p className="dark:text-white">¡No te pierdas de ningún contest!</p>
        </div>
        <div className="flex flex-col">
          <LevelFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <Carousel
        items={
          loading
            ? [<EventSkeletonCard key="skeleton" />]
            : cards.length > 0
              ? cards
              : [<NoEventsCard key="no-events" />]
        }
      />
    </div>
  );
}
