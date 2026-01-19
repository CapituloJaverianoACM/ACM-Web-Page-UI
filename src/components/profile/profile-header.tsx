import { Student } from "@/models/student.model";
import Link from "next/link";
import React from "react";

interface ProfileHeaderProps {
  student: Student | null;
  email: string;
  isEditing: boolean;
  formData: {
    name: string;
    surname: string;
    email: string;
    codeforcesHandle: string;
    avatarUrl: string | null;
  };
  onEditToggle: () => void;
  onSave: () => void;
  onInputChange: (field: string, value: string) => void;
  onAvatarUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      surname: string;
      email: string;
      codeforcesHandle: string;
      avatarUrl: string | null;
    }>
  >;
}

export const ProfileHeader = ({
  student,
  email,
  isEditing,
  formData,
  onEditToggle,
  onSave,
  onInputChange,
  onAvatarUrlChange,
  setFormData,
}: ProfileHeaderProps) => {
  return (
    <section className="bg-(--white) dark:bg-gray-800 rounded-xl shadow-sm border border-(--azul-niebla) dark:border-gray-700">
      <div className="p-6 border-b border-(--azul-niebla) dark:border-gray-700 flex items-center justify-start">
        <p className="text-xl font-semibold text-(--azul-noche) dark:text-white">
          Información básica
        </p>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onEditToggle}
            className="px-4 py-2 rounded-sm text-sm font-medium bg-(--azul-electrico) hover:bg-(--azul-crayon) text-white transition-colors flex items-center justify-center"
          >
            <div className="flex items-center justify-center w-full h-full mx-auto">
              {isEditing ? (
                <i className="fi fi-rr-cross w-4 h-4 m-0.5"></i>
              ) : (
                <i className="fi fi-rr-pencil w-4 h-4 m-0.5"></i>
              )}
            </div>
          </button>
          <Link
            href="/profile/change-password"
            className="no-underline inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors bg-(--azul-niebla) hover:bg-(--azul-crayon) dark:bg-gray-700 dark:hover:bg-gray-600 text-(--azul-noche) dark:text-gray-100 hover:text-white px-4 py-2 text-sm"
          >
            <i className="fi fi-rr-lock w-4 h-4 m-0.5"></i>
            <span className="hidden sm:inline">Cambiar contraseña</span>
          </Link>
        </div>
      </div>

      <div className="p-6 flex flex-col md:flex-row gap-6">
        {/* Avatar editable */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-(--azul-niebla) dark:ring-blue-900">
            {(isEditing ? formData.avatarUrl : student?.avatar) ? (
              <img
                src={
                  (isEditing ? formData.avatarUrl : student?.avatar) ||
                  undefined
                }
                alt="Avatar"
                className="w-full h-full object-cover"
                onError={() => {
                  if (isEditing) {
                    setFormData((prev) => ({ ...prev, avatarUrl: null }));
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-(--azul-electrico) to-(--azul-crayon) text-white text-3xl font-bold">
                {formData.name?.[0]?.toUpperCase() ||
                  student?.name?.[0]?.toUpperCase() ||
                  "U"}
              </div>
            )}
          </div>
          {isEditing && (
            <div className="w-full mt-4 space-y-2">
              <input
                type="url"
                value={formData.avatarUrl || ""}
                onChange={onAvatarUrlChange}
                placeholder="www.example.com/avatar.png"
                className="w-full px-3 py-2 rounded-lg bg-(--azul-niebla) dark:bg-gray-700 text-(--azul-noche) dark:text-white border border-(--azul-niebla) dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-(--azul-electrico) text-sm"
              />
              {formData.avatarUrl && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  La imagen se previsualizará arriba
                </p>
              )}
            </div>
          )}
        </div>

        {/* Campos editables */}
        <div className="md:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-(--azul-ultramar) dark:text-gray-400 mb-1">
              Nombres
            </label>
            {isEditing ? (
              <input
                value={formData.name}
                onChange={(e) => onInputChange("name", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-(--azul-niebla) dark:bg-gray-700 text-(--azul-noche) dark:text-white border border-(--azul-niebla) dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-(--azul-electrico)"
              />
            ) : (
              <p className="text-(--azul-noche) dark:text-white font-medium">
                {student?.name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm text-(--azul-ultramar) dark:text-gray-400 mb-1">
              Apellidos
            </label>
            {isEditing ? (
              <input
                value={formData.surname}
                onChange={(e) => onInputChange("surname", e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-(--azul-niebla) dark:bg-gray-700 text-(--azul-noche) dark:text-white border border-(--azul-niebla) dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-(--azul-electrico)"
              />
            ) : (
              <p className="text-(--azul-noche) dark:text-white font-medium">
                {student?.surname}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm text-(--azul-ultramar) dark:text-gray-400 mb-1">
              Correo
            </label>
            <p className="text-(--azul-noche) dark:text-white font-medium">
              {email}
            </p>
          </div>
          <div>
            <label className="block text-sm text-(--azul-ultramar) dark:text-gray-400 mb-1">
              Handle de Codeforces
            </label>
            {isEditing ? (
              <input
                value={formData.codeforcesHandle}
                onChange={(e) =>
                  onInputChange("codeforcesHandle", e.target.value)
                }
                placeholder="Tu usuario de Codeforces"
                className="w-full px-3 py-2 rounded-lg bg-(--azul-niebla) dark:bg-gray-700 text-(--azul-noche) dark:text-white border border-(--azul-niebla) dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-(--azul-electrico)"
              />
            ) : (
              <p className="text-(--azul-noche) dark:text-white font-medium">
                {student?.codeforces_handle || "No especificado"}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="sm:col-span-2">
              <button
                onClick={onSave}
                className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-(--azul-electrico) hover:bg-(--azul-crayon) text-white font-semibold"
              >
                Guardar cambios
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
