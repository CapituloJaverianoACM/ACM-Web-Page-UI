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
  status: "upcoming" | "in-progress" | "past";
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
  const [level] = useState<"Initial" | "Advanced">("Advanced");

  const competitions: Competition[] = useMemo(
    () => [
      { id: "c4", name: "ICPC Regional 2025", date: "2025-03-16", location: "Bogotá", status: "upcoming" },
      { id: "c3", name: "Competencia Nacional ACM", date: "2025-03-15", location: "Bogotá", status: "in-progress" },
      { id: "c2", name: "Maratón Nacional 2025", date: "2025-02-15", location: "Medellín", placement: 2, status: "past" },
      { id: "c1", name: "Hackathon Universitaria 2024", date: "2024-10-02", location: "Cali", placement: 1, status: "past" }
    ],
    []
  );

  const sortedCompetitions = useMemo(() => {
    return [...competitions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [competitions]);

  const totalParticipations = competitions.length;
  const totalWins = competitions.filter(c => c.placement === 1).length;

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
    <div className="min-h-[100dvh] flex flex-col dark:from-black dark:to-black bg-gradient-to-b from-[--azul-niebla] to-[--white]">
      <MainNavbar navLinks={navLinks} />
      <div className="flex-1 max-w-6xl mx-auto p-6 md:p-8 w-full mt-[10rem]">
        <h1 className="text-3xl md:text-4xl font-bold text-[--azul-noche] dark:text-white mb-6">Perfil</h1>

        <div className="space-y-6">
          {/* Información básica */}
          <section className="bg-[--white] dark:bg-gray-800 rounded-xl shadow-sm border border-[--azul-niebla] dark:border-gray-700">
            <div className="p-6 border-b border-[--azul-niebla] dark:border-gray-700 flex items-center justify-start">
              <p className="text-xl font-semibold text-[--azul-noche] dark:text-white">Información básica</p>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setIsEditing(prev => !prev)}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[--azul-electrico] hover:bg-[--azul-crayon] text-white transition-colors flex items-center justify-center"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    {isEditing ? (
                      <i className="fi fi-rr-cross text-sm"></i>
                    ) : (
                      <i className="fi fi-rr-pencil text-sm"></i>
                    )}
                  </div>
                </button>
                <Link
                  href="/auth/change-password"
                  className="no-underline px-4 py-2 rounded-lg text-sm font-medium hover:text-white bg-[--azul-niebla] hover:bg-[--azul-crayon] dark:bg-gray-700 dark:hover:bg-gray-600 text-[--azul-noche] dark:text-gray-100 transition-colors"
                >
                  Cambiar contraseña
                </Link>
              </div>
            </div>

            <div className="p-6 flex flex-col md:flex-row gap-6">
              {/* Avatar editable */}
              <div className="flex flex-col items-center md:w-1/3">
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
                  <div className="w-full flex justify-center mt-4">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[--azul-niebla] dark:bg-blue-900 text-[--azul-electrico] dark:text-blue-200 cursor-pointer text-sm">
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                      Subir avatar
                    </label>
                  </div>
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
                <div className="relative overflow-hidden rounded-xl border border-blue-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-indigo-900/20 p-4">
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-300">Participaciones</div>
                  <div className="mt-1 text-3xl font-extrabold text-blue-800 dark:text-blue-100">{totalParticipations}</div>
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-200/60 dark:bg-blue-800/40" />
                </div>
                <div className="relative overflow-hidden rounded-xl border border-emerald-200 dark:border-gray-700 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-teal-900/20 p-4">
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">Competencias ganadas</div>
                  <div className="mt-1 text-3xl font-extrabold text-emerald-800 dark:text-emerald-100">{totalWins}</div>
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-200/60 dark:bg-emerald-800/40" />
                </div>
                <div className={`relative overflow-hidden rounded-xl border p-4 ${level === "Advanced"
                  ? "border-purple-200 dark:border-gray-700 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-violet-900/20"
                  : "border-amber-200 dark:border-gray-700 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-rose-900/20"
                  }`}>
                  <div className={`text-xs font-semibold ${level === "Advanced"
                    ? "text-purple-600 dark:text-purple-300"
                    : "text-amber-600 dark:text-amber-300"
                    }`}>Nivel</div>
                  <div className={`mt-1 text-3xl font-extrabold ${level === "Advanced"
                    ? "text-purple-800 dark:text-purple-100"
                    : "text-amber-800 dark:text-amber-100"
                    }`}>{level}</div>
                  <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full ${level === "Advanced"
                    ? "bg-purple-200/60 dark:bg-purple-800/40"
                    : "bg-amber-200/60 dark:bg-amber-800/40"
                    }`} />
                </div>
              </div>
            </div>
          </section>

          {/* Historial de competencias */}
          <section className="bg-[--white] dark:bg-gray-800 rounded-xl shadow-sm border border-[--azul-niebla] dark:border-gray-700">
            <div className="p-6 border-b border-[--azul-niebla] dark:border-gray-700 flex items-center justify-start">
              <p className="text-xl font-semibold text-[--azul-noche] dark:text-white">Historial de competencias</p>
            </div>
            <ul className="p-4 space-y-3">
              {sortedCompetitions.map((c) => {
                const isUpcoming = c.status === "upcoming";
                const isInProgress = c.status === "in-progress";

                const getStatusInfo = () => {
                  if (isUpcoming) return { text: "Próxima", classes: "bg-[--azul-niebla] text-[--azul-electrico] dark:bg-blue-900 dark:text-blue-200" };
                  if (isInProgress) return { text: "En curso", classes: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" };
                  return { text: "Finalizada", classes: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200" };
                };

                const statusInfo = getStatusInfo();

                return (
                  <li key={c.id} className="group">
                    <div className="flex items-start gap-4 p-4 rounded-lg border border-[--azul-niebla] dark:border-gray-700 bg-[--azul-niebla]/30 dark:bg-gray-700/50 hover:bg-[--azul-niebla]/50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-base mb-0 font-semibold text-[--azul-noche] dark:text-white truncate">
                          {c.name}
                        </p>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mt-1 ${statusInfo.classes}`}>
                          {statusInfo.text}
                        </span>
                        <p className="text-xs text-[--azul-ultramar] dark:text-gray-400 truncate mt-1">
                          {new Date(c.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                          {c.location ? ` · ${c.location}` : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isUpcoming ? (
                          <Link href="/auth/login" className="no-underline px-2 py-1 rounded-md text-xs font-semibold bg-[--azul-electrico] hover:bg-[--azul-crayon] text-white hover:text-white">
                            Check in
                          </Link>
                        ) : isInProgress ? (
                          <Link href="/rank" className="no-underline px-2 py-1 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white">
                            Ver progreso
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


