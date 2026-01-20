import { useTranslations } from "next-intl";
import EventCard from "@/components/league/ui/Events/event-card";
import { Contest } from "@/models/contest.model";
import { LevelEnum } from "@/models/level.enum";
import { CheckinTimer } from "@/components/checkin/CheckinTimer";
import { formatDateEvent } from "@/utils/date-format";

interface UpcomingEventCardProps {
  event: Contest;
  onRegister: (contest: Contest) => void;
}

export const UpcomingEventCard = ({
  event,
  onRegister,
}: UpcomingEventCardProps) => {
  const t = useTranslations("League.upcomingEvents");
  const { date, start_hour, final_hour } = event;

  return (
    <EventCard.Container
      key={event.id}
      className="h-full justify-end w-[20rem]! xl:w-120!"
    >
      {event.picture ? (
        <EventCard.Image src={event.picture.link} />
      ) : (
        <div className="flex w-full aspect-video">
          <EventCard.Image
            src={"/Logo_Oscuro.svg"}
            className="object-contain! opacity-15 w-2/3! m-auto"
          />
        </div>
      )}

      <EventCard.Padding>
        <EventCard.WrapContainer className="flex flex-col align-center items-center">
          <EventCard.Title>{event.name}</EventCard.Title>
          {event.level == LevelEnum.Initial && (
            <p title="Nivel Inicial" className="text-(--azul-electrico) m-0">
              {t("initial")}
            </p>
          )}
          {event.level == LevelEnum.Advanced && (
            <p title={t("advanced")} className="text-red-400 m-0">
              {t("advanced")}
            </p>
          )}
        </EventCard.WrapContainer>

        <EventCard.Padding>
          <EventCard.Description>
            {t("classroom")} {event.classroom} -{" "}
            {formatDateEvent({
              date,
              start_hour,
              final_hour,
            })}
          </EventCard.Description>
        </EventCard.Padding>

        {event.registered && !event.checkin && (
          <EventCard.Padding>
            <CheckinTimer contest={event} />
          </EventCard.Padding>
        )}

        <EventCard.RegisterButton
          onClick={() => onRegister(event)}
          className={event.registered ? "bg-green-500 " : " "}
          disabled={
            (!event.registered && new Date() > new Date(start_hour)) ||
            (event.registered && !event.checkin)
          }
        >
          {event.registered ? t("goToContest") : t("register")}
        </EventCard.RegisterButton>
      </EventCard.Padding>
    </EventCard.Container>
  );
};
