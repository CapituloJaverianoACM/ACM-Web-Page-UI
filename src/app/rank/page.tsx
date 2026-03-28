"use client";

import { Ranking } from "@/components/league/sections/ranking";

export default function RankPage() {
  {
    /* El contenido interno debe ocupar como mínimo el alto de la pantalla para que el footer se vea bien */
  }
  return (
    <div className="min-h-dvh flex flex-col justify-between">
      <div className="mt-40 w-full max-w-360 mx-auto p-8">
        <Ranking />
      </div>
    </div>
  );
}
