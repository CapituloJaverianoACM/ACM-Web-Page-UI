"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MainNavbar from "@/components/shared/main-navbar";
import Footer from "@/components/shared/footer";

type Competition = {
  id: string;
  name: string;
  date: string; // ISO
  location?: string;
  placement?: number; // 1 = ganador
  status: "upcoming" | "past";
};

const navLinks = [
  { key: "home", label: "Inicio", href: "/" },
  { key: "league", label: "La Liga", href: "/league" },
  { key: "rank", label: "Ranking", href: "/rank" },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("Adrián");
  const [lastName, setLastName] = useState("Ruiz");
  const [email, setEmail] = useState("adrian@example.com");

  const competitions: Competition[] = useMemo(
    () => [
      { id: "c3", name: "ICPC Regional 2025", date: "2025-11-20", location: "Bogotá", status: "upcoming" },
      { id: "c2", name: "Maratón Nacional 2025", date: "2025-07-15", location: "Medellín", placement: 2, status: "past" },
      { id: "c1", name: "Hackathon Universitaria 2024", date: "2024-10-02", location: "Cali", placement: 1, status: "past" }
    ],
    []
  );

  const sortedCompetitions = useMemo(() => {
    return [...competitions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [competitions]);

  const totalParticipations = competitions.length;
  const totalWins = competitions.filter(c => c.placement === 1).length;
  const level = useMemo(() => {
    if (totalWins >= 5) return "Elite";
    if (totalWins >= 3) return "Avanzado";
    if (totalWins >= 1) return "Intermedio";
    return "Novato";
  }, [totalWins]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    // Aquí integrarías tu lógica para persistir los datos (API call)
    setIsEditing(false);
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-[--azul-niebla] to-[--white] dark:bg-transparent">
      <MainNavbar navLinks={navLinks} />
      <div className="flex-1 max-w-6xl mx-auto p-6 md:p-8 w-full mt-[10rem]">
        <h1 className="text-3xl md:text-4xl font-bold text-[--azul-noche] dark:text-white mb-6">Perfil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información básica */}
          <section className="lg:col-span-2 bg-[--white] dark:bg-gray-800 rounded-xl shadow-sm border border-[--azul-niebla] dark:border-gray-700">
            <div className="p-6 border-b border-[--azul-niebla] dark:border-gray-700 flex items-center justify-start">
              <h2 className="text-xl font-semibold text-[--azul-noche] dark:text-white">Información básica</h2>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setIsEditing(prev => !prev)}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[--azul-electrico] hover:bg-[--azul-crayon] text-white transition-colors"
                >
                  {isEditing ? "Cancelar" : "Editar información"}
                </button>
                <Link
                  href="/auth/change-password"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[--azul-niebla] hover:bg-[--azul-crayon] dark:bg-gray-700 dark:hover:bg-gray-600 text-[--azul-noche] dark:text-gray-100 transition-colors"
                >
                  Cambiar contraseña
                </Link>
              </div>
            </div>

            <div className="p-6 flex flex-col md:flex-row gap-6">
              {/* Avatar editable */}
              <div className="flex flex-col items-center md:items-start md:w-1/3">
                <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-[--azul-niebla] dark:ring-blue-900">
                  {avatarUrl ? (
                    <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[--azul-electrico] to-[--azul-crayon] text-white text-3xl font-bold">
                      {firstName?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[--azul-niebla] dark:bg-blue-900 text-[--azul-electrico] dark:text-blue-200 cursor-pointer text-sm">
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    Subir avatar
                  </label>
                )}
              </div>

              {/* Campos editables */}
              <div className="md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[--azul-ultramar] dark:text-gray-400 mb-1">Nombres</label>
                  {isEditing ? (
                    <input
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[--azul-niebla] dark:bg-gray-700 text-[--azul-noche] dark:text-white border border-[--azul-niebla] dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[--azul-electrico]"
                    />
                  ) : (
                    <p className="text-[--azul-noche] dark:text-white font-medium">{firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-[--azul-ultramar] dark:text-gray-400 mb-1">Apellidos</label>
                  {isEditing ? (
                    <input
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[--azul-niebla] dark:bg-gray-700 text-[--azul-noche] dark:text-white border border-[--azul-niebla] dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[--azul-electrico]"
                    />
                  ) : (
                    <p className="text-[--azul-noche] dark:text-white font-medium">{lastName}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-[--azul-ultramar] dark:text-gray-400 mb-1">Correo</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[--azul-niebla] dark:bg-gray-700 text-[--azul-noche] dark:text-white border border-[--azul-niebla] dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[--azul-electrico]"
                    />
                  ) : (
                    <p className="text-[--azul-noche] dark:text-white font-medium">{email}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="sm:col-span-2">
                    <button
                      onClick={handleSave}
                      className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-[--azul-electrico] hover:bg-[--azul-crayon] text-white font-semibold"
                    >
                      Guardar cambios
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Estadísticas creativas */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative overflow-hidden rounded-xl border border-[--azul-niebla] dark:border-gray-700 bg-gradient-to-br from-[--azul-niebla] to-[--azul-crayon]/20 dark:from-blue-900/30 dark:to-indigo-900/20 p-4">
                  <div className="text-xs font-semibold text-[--azul-electrico] dark:text-blue-300">Participaciones</div>
                  <div className="mt-1 text-3xl font-extrabold text-[--azul-noche] dark:text-blue-100">{totalParticipations}</div>
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[--azul-crayon]/20 dark:bg-blue-800/40" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-[--azul-niebla] dark:border-gray-700 bg-gradient-to-br from-[--azul-niebla] to-[--azul-electrico]/20 dark:from-amber-900/30 dark:to-rose-900/20 p-4">
                  <div className="text-xs font-semibold text-[--azul-electrico] dark:text-amber-300">Competencias ganadas</div>
                  <div className="mt-1 text-3xl font-extrabold text-[--azul-noche] dark:text-amber-100">{totalWins}</div>
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[--azul-electrico]/20 dark:bg-amber-800/40" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-[--azul-niebla] dark:border-gray-700 bg-gradient-to-br from-[--azul-niebla] to-[--azul-ultramar]/20 dark:from-emerald-900/30 dark:to-teal-900/20 p-4">
                  <div className="text-xs font-semibold text-[--azul-ultramar] dark:text-emerald-300">Nivel</div>
                  <div className="mt-1 text-3xl font-extrabold text-[--azul-noche] dark:text-emerald-100">{level}</div>
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[--azul-ultramar]/20 dark:bg-emerald-800/40" />
                </div>
              </div>
            </div>
          </section>

          {/* Historial de competencias */}
          <section className="bg-[--white] dark:bg-gray-800 rounded-xl shadow-sm border border-[--azul-niebla] dark:border-gray-700 lg:max-h-[calc(100vh-14rem)] lg:overflow-auto">
            <div className="p-6 border-b border-[--azul-niebla] dark:border-gray-700 flex items-center justify-start">
              <h2 className="text-xl font-semibold text-[--azul-noche] dark:text-white">Historial de competencias</h2>
            </div>
            <ul className="p-4 space-y-3">
              {sortedCompetitions.map((c) => {
                const isUpcoming = c.status === "upcoming";
                return (
                  <li key={c.id} className="group">
                    <div className="flex items-start gap-4 p-4 rounded-lg border border-[--azul-niebla] dark:border-gray-700 bg-[--azul-niebla]/30 dark:bg-gray-700/50 hover:bg-[--azul-niebla]/50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${isUpcoming ? "bg-[--azul-electrico]" : c.placement === 1 ? "bg-emerald-600" : c.placement ? "bg-amber-600" : "bg-gray-500"}`}>
                          {isUpcoming ? (
                            <span>{new Date(c.date).toLocaleDateString(undefined, { day: "2-digit" })}</span>
                          ) : (
                            <span>{c.placement ?? "—"}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="text-base font-semibold text-[--azul-noche] dark:text-white truncate">
                            {c.name}
                          </h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${isUpcoming ? "bg-[--azul-niebla] text-[--azul-electrico] dark:bg-blue-900 dark:text-blue-200" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}>
                            {isUpcoming ? "Próxima" : "Finalizada"}
                          </span>
                        </div>
                        <p className="text-xs text-[--azul-ultramar] dark:text-gray-400 truncate">
                          {new Date(c.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                          {c.location ? ` · ${c.location}` : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isUpcoming ? (
                          <Link href="/auth/login" className="px-3 py-1.5 rounded-md text-sm bg-[--azul-electrico] hover:bg-[--azul-crayon] text-white">
                            Login
                          </Link>
                        ) : c.placement ? (
                          <span className={`px-2 py-1 rounded-md text-xs font-semibold ${c.placement === 1 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"}`}>
                            Puesto {c.placement}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}


