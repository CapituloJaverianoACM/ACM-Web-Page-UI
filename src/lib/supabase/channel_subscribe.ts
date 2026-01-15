import { SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_CHANNEL_RESULTS: string = "topic:results";

type SubscriptionCallback = {
  (): unknown;
};

export function suscribe_leaderboard(
  supabase: SupabaseClient,
  cb: SubscriptionCallback,
) {
  const channel = supabase
    .channel(SUPABASE_CHANNEL_RESULTS, { config: { private: false } })
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "results" },
      () => cb(),
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "results" },
      () => cb(),
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "results" },
      () => cb(),
    )
    .subscribe((status, err) => {
      if (status === "SUBSCRIBED") {
        console.log("Conectado a Supabase fafai");
      } else {
        console.log(err);
      }
    });
  return channel;
}
