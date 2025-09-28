// Code de Acha 😎

import { Carousel } from "@/components/home/apple-cards-carousel";
import EventCard from "@/components/league/ui/Events/event-card";
import { Contest } from "@/models/contest.model";
import { LevelEnum } from "@/models/level.enum";
import { ReactNode, useEffect, useState } from "react";
import { LevelFilter } from "../ui/Events/level-filter";
import ContestTimer from "../ui/Events/contest-timer";
import {registerForContest,getStudentParticipations} from "@/controllers/participation.controller";
import { Participation } from "@/models/participation.model";
//import { supabase } from "@/lib/supabase";

const formatDateEvent = ({
  date,
  start_hour,
  final_hour,
}: {
  date: Date;
  start_hour: Date;
  final_hour: Date;
}) => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const optionsHour: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Date(date).toLocaleDateString("es-ES", optionsDate);
  const formattedInitialHour = new Date(start_hour).toLocaleTimeString(
    "es-ES",
    optionsHour,
  );
  const formattedFinalHour = new Date(final_hour).toLocaleTimeString(
    "es-ES",
    optionsHour,
  );

  return `${formattedDate}, de ${formattedInitialHour} a ${formattedFinalHour}`;
};

interface ParticipationState {
  isRegistered: boolean;
  hasCheckedIn: boolean;
}

export function UpcomingEvents({
  events = [],
  loadingInitialState = false,
}: {
  events: (Contest & { picture?: { link: string } })[]; 
  loadingInitialState?: boolean;
}) {
  const NoEventsCard: ReactNode = (
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
            ¡Mantente alerta a nuestras redes sociales! Así sabrás cuando
            tengamos un evento de tu interés.
          </EventCard.Description>
        </EventCard.Padding>
        <EventCard.RegisterButton
          onClick={() => {
            window.open("https://www.instagram.com/acmjaveriana", "_blank");
          }}
        >
          Redes Sociales
        </EventCard.RegisterButton>
      </EventCard.Padding>
    </EventCard.Container>
  );

  // Diseño de un tarjeta skeleton

  const SkeletonCard: ReactNode = (
    <EventCard.Container
      key="unique"
      className="justify-end !w-[20rem] xl:!w-[30rem]"
    >
       <div className="flex w-full aspect-video">
        <EventCard.Image
          src={"/Logo_Oscuro.svg"}
          className="!object-contain opacity-15 !w-2/3 m-auto"
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

  const [loading, setLoading] = useState<boolean>(loadingInitialState);
  const [allCards, setAllCards] = useState<{ comp: ReactNode; level: string | LevelEnum }[]>([]);
  const [cards, setCards] = useState<ReactNode[]>([]);
  const [filter, setFilter] = useState<"all" | "Initial" | "Advanced">("all");

  const [participations, setParticipations] = useState<Map<number, ParticipationState>>(new Map());
  const [studentId, setStudentId] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      //const { data: { user } } = await supabase.auth.getUser();
      //if (user) {
        // const { data: studentData } = await supabase
        //   .from("student")
        //   .select("id")
        //   .eq("supabase_user_id", user.id)
        //   .single();
        const studentData = {id: 9};
      if(true){
        if (studentData) {
          setStudentId(studentData.id);
          const studentParticipations = await getStudentParticipations(studentData.id);
          const participationMap = new Map<number, ParticipationState>();
          if (studentParticipations && studentParticipations.length > 0) {
            studentParticipations.forEach((p: Participation) => {
              participationMap.set(p.contest_id, {
                isRegistered: true,
                hasCheckedIn: p.checkin,
              });
            });
          }
          setParticipations(participationMap);
        }
      }
    };
    fetchStudentData();
  }, []);

  const handleRegister = async (contestId: number) => {
    if (!studentId) {
      alert("Por favor, inicia sesión para registrarte.");
      return;
    }
    try {
      await registerForContest(contestId);
      setParticipations(prev => new Map(prev).set(contestId, { isRegistered: true, hasCheckedIn: false }));
      alert("¡Te has registrado exitosamente!");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  // EN: src/components/league/sections/upcoming-events.tsx

  useEffect(() => {
    if (!events) return;

    setAllCards(
      events.map((event) => {
        const { date, start_hour, final_hour } = event;
        const contestId = event.id;
        const participationState = participations.get(contestId) || { isRegistered: false, hasCheckedIn: false };
        
        // 1. Obtenemos las fechas para poder compararlas
        const now = new Date();
        const startTime = new Date(start_hour);
        const endTime = new Date(final_hour);

        let cardActionContent: ReactNode;

        // 2. Comparamos las fechas para decidir qué mostrar
        if (now > endTime) {
          // El concurso ya terminó
          cardActionContent = (
            <EventCard.RegisterButton onClick={() => alert("Implementación futura: Aquí se verán los resultados del concurso.")}>
              Ver Resultados
            </EventCard.RegisterButton>
          );
        } else if (now >= startTime) {
          // El concurso está en progreso
          cardActionContent = (
            <EventCard.RegisterButton onClick={() => alert("Implementación futura: Aquí se verán los resultados del concurso.")}>
              Ver Resultados
            </EventCard.RegisterButton>
          );
        } else if (participationState.isRegistered && studentId) {
          // El concurso es a futuro Y el usuario está registrado -> Muestra el timer
          cardActionContent = (
            <ContestTimer
              startTime={startTime.toISOString()}
              contestId={contestId}
              studentId={studentId}
              hasCheckedIn={participationState.hasCheckedIn}
            />
          );
        } else {
          // El concurso es a futuro Y el usuario NO está registrado -> Muestra el botón de registro
          cardActionContent = (
            <EventCard.RegisterButton onClick={() => handleRegister(contestId)}>
              Registrarse
            </EventCard.RegisterButton>
          );
        }

        // --- FIN DE LA NUEVA LÓGICA ---

        return {
          comp: (
            <EventCard.Container
              key={event.id}
              className="h-full justify-end !w-[20rem] xl:!w-[30rem]"
            >
              {event.picture ? (
                <EventCard.Image src={event.picture.link} />
              ) : (
                <div className="flex w-full aspect-video">
                  <EventCard.Image
                    src={"/Logo_Oscuro.svg"}
                    className="!object-contain opacity-15 !w-2/3 m-auto"
                  />
                </div>
              )}
              <EventCard.Padding>
                <EventCard.WrapContainer>
                  <EventCard.Title>{event.name}</EventCard.Title>
                  {event.level === LevelEnum.Initial && (
                    <p title="Nivel Inicial" className="text-[--azul-electrico] m-0">Inicial</p>
                  )}
                  {event.level === LevelEnum.Advanced && (
                    <p title="Nivel Avanzado" className="text-red-400 m-0">Avanzado</p>
                  )}
                </EventCard.WrapContainer>
                <EventCard.Padding>
                  <EventCard.Description>
                    Salón {event.classroom} -{" "}
                    {formatDateEvent({ date, start_hour, final_hour })}
                  </EventCard.Description>
                </EventCard.Padding>

                {/* 3. Renderizamos el contenido de acción que decidimos antes */}
                {cardActionContent}
                
              </EventCard.Padding>
            </EventCard.Container>
          ),
          level: event.level,
        };
      })
    );
  }, [events, participations, studentId]);


  useEffect(() => {
    setCards(allCards?.map((x) => x.comp) ?? []);
    if (allCards.length > 0) setLoading(false);
  }, [allCards]);

  // Acá se filtran los eventos

  useEffect(() => {
    setCards(
      allCards.filter((x) => {
        if (filter === "all") return true;
        return x.level === filter;
      }).map((x) => x.comp)
    );
  }, [filter, allCards]);
  return (
    <div
      id="upcoming-events"
      className="flex flex-col w-[90%] max-w-[100rem] mx-auto gap-2 items-center"
    >
      <div className="flex flex-col gap-4 xl:flex-row items-center justify-between xl:w-[80%]">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="dark:text-white">Próximos Eventos</h2>
          <p className="dark:text-white">
            ¡Inscríbete en nuestros próximos concursos y demuestra tus habilidades!
          </p>
        </div>
        <div className="flex flex-col">
          <LevelFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <Carousel
        items={
          loading ? [SkeletonCard] : cards.length > 0 ? cards : [NoEventsCard]
        }
      />
    </div>
  );
}