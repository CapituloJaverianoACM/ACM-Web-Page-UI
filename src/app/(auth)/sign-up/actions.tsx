"use server";

import { createClient } from "@/lib/supabase/server";

export async function signup(
  name: string,
  surname: string,
  email: string,
  password: string,
  avatar_url: string,
) {
  try {
    if (!name || !surname || !email || !password) {
      throw new Error("Por favor, completa todos los campos.");
    }
    if (!email.endsWith("@javeriana.edu.co")) {
      throw new Error(
        "El correo electrónico debe ser de la Pontificia Universidad Javeriana.",
      );
    }
    if (avatar_url) {
      const img = new Image();
      const isValidImage = new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = avatar_url;
      });
      const validImage = await isValidImage;
      if (!validImage) {
        throw new Error("El URL del avatar no apunta a una imagen válida.");
      }
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    const dbResponse = await supabase.from("student").insert([
      {
        name,
        surname,
        avatar: avatar_url || null,
        supabase_user_id: data.user?.id,
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
