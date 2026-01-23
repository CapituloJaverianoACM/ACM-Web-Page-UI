import { useTranslations } from "next-intl";
import EventCard from "@/components/league/ui/Events/event-card";
import { Contest } from "@/models/contest.model";
import { LevelEnum } from "@/models/level.enum";
import { CheckinTimer } from "@/components/checkin/CheckinTimer";
import { formatDateEvent } from "@/utils/date-format";
import Countdown from "react-countdown";
import LogoLoader from "@/components/shared/ui/logo-loader/loader";

interface UpcomingEventCardProps {
  event: Contest;
  onRegister: (contest: Contest) => void;
  isRegistering?: boolean;
}

export const UpcomingEventCard = ({
  event,
  onRegister,
  isRegistering = false,
}: UpcomingEventCardProps) => {
  const t = useTranslations("League.upcomingEvents");
  const { date, start_hour } = event;

  const now = new Date();
  const start = new Date(start_hour);
  const contestStarted = now >= start;

  // Ventanas de tiempo
  const checkinStart = new Date(start.getTime() - 2 * 60 * 60 * 1000); // 2 horas antes
  const checkinEnd = new Date(start.getTime() - 5 * 60 * 1000); // 5 minutos antes

  const isParticipant = event.registered;
  const hasCheckin = event.checkin;

  const beforeCheckinWindow = now < checkinStart;
  const inCheckinWindow = now >= checkinStart && now < checkinEnd;

  const showPreCheckinCountdown =
    isParticipant && !hasCheckin && beforeCheckinWindow;
  const showCheckinTimer = isParticipant && !hasCheckin && inCheckinWindow;

  // Mostrar botón principal solo cuando no estamos mostrando contadores de pre-competencia/check-in
  const showMainButton = !showPreCheckinCountdown && !showCheckinTimer;

  // Texto del botón según estado
  const buttonLabel = contestStarted
    ? hasCheckin
      ? t("goToContest")
      : "Ver resultados"
    : isParticipant
      ? t("goToContest")
      : t("register");

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
            })}
          </EventCard.Description>
        </EventCard.Padding>

        {/* Contador antes del periodo de check-in (solo para registrados) */}
        {showPreCheckinCountdown && (
          <EventCard.Padding>
            <div className="text-center font-semibold">
              <p className="text-xl">Tiempo antes del periodo de check-in</p>
            </div>
            <div className="text-center font-(family-name:--font-primary) text-4xl">
              <Countdown date={checkinStart}>
                <h1 className="text-4xl mb-0">00:00:00:00</h1>
              </Countdown>
            </div>
          </EventCard.Padding>
        )}

        {/* Contador de tiempo para hacer check-in (solo en ventana de check-in) */}
        {showCheckinTimer && (
          <EventCard.Padding>
            <CheckinTimer contest={event} />
          </EventCard.Padding>
        )}

        {showMainButton && (
          <EventCard.RegisterButton
            onClick={() => onRegister(event)}
            className={` ${contestStarted
                ? hasCheckin
                  ? "bg-green-500 "
                  : "bg-(--azul-electrico) "
                : event.registered
                  ? "bg-green-500 "
                  : " "
              }`}
            // Antes de que inicie el contest:
            // - Participante sin check-in: botón deshabilitado (solo puede usar el contador de check-in)
            // - No registrado: botón habilitado mientras no llegue el límite de registro (validado en handleRegisterContest)
            disabled={(!contestStarted && isParticipant && !hasCheckin) || isRegistering}
          >
            {isRegistering ? (
              <div className="flex items-center justify-center gap-2">
                <LogoLoader size={20} />
                Registrando...
              </div>
            ) : (
              buttonLabel
            )}
          </EventCard.RegisterButton>
        )}
      </EventCard.Padding>
    </EventCard.Container>
  );
};
