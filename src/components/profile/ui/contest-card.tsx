"use client";

import { Contest } from "@/models/contest.model";
import { Participation } from "@/models/partipation.model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { CheckinTimer } from "@/components/checkin/CheckinTimer";
import Countdown from "react-countdown";
import { formatDateEvent } from "@/utils/date-format";

interface ContestCardProps {
  contest: Contest & { participation?: Participation };
}

export const ContestCard = ({ contest }: ContestCardProps) => {
  const router = useRouter();
  const now = new Date();
  const start = new Date(contest.start_hour);
  const contestStarted = now >= start;
  const t = useTranslations("Profile.contests");
  const tLeague = useTranslations("League.upcomingEvents");

  const isParticipant = contest.registered;
  const hasCheckin = contest.checkin || false;
  const position = contest.participation?.position;

  // Determinar si el contest terminó basándose en si tiene posición asignada
  const isFinished = position !== null && position !== undefined;

  // Ventanas de tiempo para checkin
  const checkinStart = new Date(start.getTime() - 2 * 60 * 60 * 1000); // 2 horas antes
  const checkinEnd = new Date(start.getTime() - 5 * 60 * 1000); // 5 minutos antes

  const beforeCheckinWindow = now < checkinStart;
  const inCheckinWindow = now >= checkinStart && now < checkinEnd;

  const showPreCheckinCountdown =
    !contestStarted && isParticipant && !hasCheckin && beforeCheckinWindow;
  const showCheckinTimer =
    !contestStarted && isParticipant && !hasCheckin && inCheckinWindow;

  // Mostrar botón principal solo cuando no estamos mostrando contadores de pre-competencia/check-in
  const showMainButton = !showPreCheckinCountdown && !showCheckinTimer;

  // Texto del botón según estado (similar a upcoming-event-card)
  const buttonLabel = contestStarted
    ? hasCheckin
      ? tLeague("goToContest")
      : "Ver resultados"
    : isParticipant
      ? tLeague("goToContest")
      : tLeague("register");

  const getStatusInfo = () => {
    if (!contestStarted)
      return {
        text: t("status.upcoming"),
        classes:
          "bg-(--azul-niebla) text-(--azul-electrico) dark:bg-blue-900 dark:text-blue-200",
      };
    if (isFinished)
      return {
        text: t("status.finished"),
        classes:
          "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      };
    return {
      text: t("status.inProgress"),
      classes:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
  };

  const statusInfo = getStatusInfo();

  const handleCardClick = () => {
    // Si terminó o si empezó y tiene checkin, redirigir a resultados
    if (isFinished || (contestStarted && hasCheckin)) {
      router.push(`/league/${contest.id}/result`);
    }
  };

  return (
    <li className="group">
      <div
        className={`flex flex-col gap-3 p-4 rounded-sm border border-(--azul-niebla) dark:border-gray-700 bg-(--azul-niebla)/30 dark:bg-gray-700/50 hover:bg-(--azul-niebla)/50 dark:hover:bg-gray-700 transition-colors ${
          (isFinished || (contestStarted && hasCheckin)) && "cursor-pointer"
        }`}
        onClick={handleCardClick}
      >
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-base mb-0 font-semibold text-(--azul-noche) dark:text-white truncate">
              {contest.name}
            </p>
            <span
              className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 ${statusInfo.classes}`}
            >
              {statusInfo.text}
            </span>
            <p className="text-xs text-(--azul-ultramar) dark:text-gray-400 truncate mt-1">
              {formatDateEvent({
                date: contest.date,
                start_hour: contest.start_hour,
              })}
              {contest.classroom ? ` · ${contest.classroom}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Mostrar posición si existe y el contest terminó */}
            {isFinished && position !== null && position !== undefined && (
              <span
                className={`px-2 py-1 rounded-md text-xs font-semibold ${
                  position === 1
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                }`}
              >
                {t("actions.position")} {position}
              </span>
            )}
            {/* Mostrar botón principal solo cuando no estamos mostrando contadores */}
            {showMainButton && (
              <>
                {/* Si empezó y no hizo checkin, mostrar mensaje y botón */}
                {contestStarted && isParticipant && !hasCheckin ? (
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-xs text-red-500 dark:text-red-400 m-0">
                      No hiciste checkin :(
                    </p>
                    <Link
                      href={`/league/${contest.id}/result`}
                      className="no-underline px-2 py-1 rounded-md text-xs font-semibold bg-(--azul-electrico) hover:bg-(--azul-crayon) text-white hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ver resultados
                    </Link>
                  </div>
                ) : (
                  /* Si no empezó o empezó con checkin, mostrar botón normal */
                  <Link
                    href={
                      contestStarted && hasCheckin
                        ? `/league/${contest.id}`
                        : `/league/${contest.id}/result`
                    }
                    className={`no-underline px-2 py-1 rounded-md text-xs font-semibold ${
                      contestStarted
                        ? hasCheckin
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-(--azul-electrico) hover:bg-(--azul-crayon)"
                        : isParticipant
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-(--azul-electrico) hover:bg-(--azul-crayon)"
                    } text-white hover:text-white`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {buttonLabel}
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* Contador antes del periodo de check-in (solo para registrados) */}
        {showPreCheckinCountdown && (
          <div className="mt-2 pt-2 border-t border-(--azul-niebla) dark:border-gray-700">
            <div className="text-center font-semibold">
              <p className="text-sm mb-2">
                Tiempo antes del periodo de check-in
              </p>
            </div>
            <div className="text-center font-(family-name:--font-primary) text-2xl">
              <Countdown date={checkinStart}>
                <h2 className="text-2xl mb-0">00:00:00:00</h2>
              </Countdown>
            </div>
          </div>
        )}

        {/* Contador de tiempo para hacer check-in (solo en ventana de check-in) */}
        {showCheckinTimer && (
          <div className="mt-2 pt-2 border-t border-(--azul-niebla) dark:border-gray-700">
            <CheckinTimer contest={contest} />
          </div>
        )}
      </div>
    </li>
  );
};
