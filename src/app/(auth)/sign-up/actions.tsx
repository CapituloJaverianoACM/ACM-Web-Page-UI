"use server";

import { createClient } from "@/lib/supabase/server";

const checkImage = async (url: string) => {
  let blob_image = null;
  try {
    const im = await fetch(url);
    console.log(im);
    blob_image = await im.blob();
    console.log(blob_image);
  } catch (e) {
    throw new Error("Image isn't valid");
  }

  return blob_image.type.startsWith("image/");
};

export async function signup(form_data: FormData) {
  const name = form_data.get("name").toString();
  const surname = form_data.get("surname").toString();
  const email = form_data.get("email").toString();
  const password = form_data.get("password").toString();
  const avatar_url = form_data.get("avatar_url")?.toString();

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
      const validImage = await checkImage(avatar_url);
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
