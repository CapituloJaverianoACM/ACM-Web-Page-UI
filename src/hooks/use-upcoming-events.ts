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
    if (contest.registered) {
      if (!contest.checkin) {
        toast.error("¡Realiza el check-in primero!");
        return;
      }

      router.push(`/contest/${contest.id}`);
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
    return events.filter((event) => {
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
