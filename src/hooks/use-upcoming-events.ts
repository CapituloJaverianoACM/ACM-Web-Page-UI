import { useState, useMemo } from "react";
import { Contest } from "@/models/contest.model";
import { LevelEnum } from "@/models/level.enum";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { registerUserToContest } from "@/controllers/participation.controller";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useUpcomingEvents = (
  events: Contest[],
  loadingInitialState: boolean,
) => {
  const [filter, setFilter] = useState<"all" | "Initial" | "Advanced">("all");
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleRegisterContest = async (contest: Contest) => {
    const now = new Date();
    const start = new Date(contest.start_hour);
    const contestStarted = now > start;

    // Deadline de registro: 5 minutos antes del inicio
    const registrationDeadline = new Date(start);
    registrationDeadline.setMinutes(registrationDeadline.getMinutes() - 5);

    // Después de que empieza el contest
    if (contestStarted) {
      // Si está registrado y tiene check-in -> competir
      if (contest.registered && contest.checkin) {
        router.push(`/league/${contest.id}`);
        return;
      }

      // Si no está registrado o no hizo check-in -> ver resultados
      router.push(`/league/${contest.id}/result`);
      return;
    }

    // Antes de que empiece el contest
    if (contest.registered) {
      if (!contest.checkin) {
        toast.error("¡Realiza el check-in primero!");
        return;
      }

      router.push(`/league/${contest.id}`);
      return;
    }

    // No registrado: solo se puede registrar hasta 5 minutos antes del inicio
    if (now > registrationDeadline) {
      toast.error("El registro para este contest ya cerró");
      return;
    }

    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user_metadata: User = data.user as User;

    if (!user_metadata) {
      toast.error("Debes iniciar sesión para registrarte");
      return;
    }

    const result = await registerUserToContest(user_metadata, contest);

    toast[result.ok ? "success" : "error"](result.msg);
    queryClient.invalidateQueries({ queryKey: ["league-contests"] });
  };

  const filteredEvents = useMemo(() => {
    // Ordenar eventos del más próximo al más lejano/pasado
    const sortedEvents = [...events].sort((a, b) => {
      const aStart = new Date(a.start_hour ?? a.date).getTime();
      const bStart = new Date(b.start_hour ?? b.date).getTime();

      return bStart - aStart;
    });

    return sortedEvents.filter((event) => {
      if (filter === "all") return true;
      if (filter === "Advanced" && event.level == LevelEnum.Advanced)
        return true;
      if (filter === "Initial" && event.level == LevelEnum.Initial) return true;
      return false;
    });
  }, [events, filter]);

  // Loading state is effectively derived from whether events are present/loaded
  // or passed down. If events array is ready, we aren't loading.
  const loading = loadingInitialState && events.length === 0;

  return {
    loading,
    filter,
    setFilter,
    filteredEvents,
    handleRegisterContest,
  };
};
