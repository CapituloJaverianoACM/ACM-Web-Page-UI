"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadAvatar } from "@/lib/supabase/storage";

export async function signup(form_data: FormData) {
  const name = form_data.get("name")?.toString();
  const surname = form_data.get("surname")?.toString();
  const email = form_data.get("email")?.toString();
  const password = form_data.get("password")?.toString();
  const avatarFile = form_data.get("avatar") as File | null;

  try {
    if (!name || !surname || !email || !password) {
      throw new Error("Por favor, completa todos los campos.");
    }
    if (!email.endsWith("@javeriana.edu.co")) {
      throw new Error(
        "El correo electrónico debe ser de la Pontificia Universidad Javeriana.",
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user?.id) {
      throw new Error("Error al crear el usuario.");
    }

    // Subir avatar si se proporcionó
    let avatarUrl: string | null = null;
    if (avatarFile && avatarFile.size > 0) {
      try {
        avatarUrl = await uploadAvatar(avatarFile, data.user.id);
      } catch (uploadError) {
        // Si falla la subida del avatar, continuar sin él
        console.error("Error al subir avatar:", uploadError);
        // No lanzamos error aquí para no bloquear el registro
      }
    }

    const dbResponse = await supabase.from("student").insert([
      {
        name,
        surname,
        avatar: avatarUrl,
        supabase_user_id: data.user.id,
      },
    ]);

    if (dbResponse.error) {
      throw new Error(dbResponse.error.message);
    }

    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
