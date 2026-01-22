"use server";

import { uploadAvatar, deleteAvatar } from "@/lib/supabase/storage";
import { getUser } from "@/controllers/supabase.controller";

/**
 * Server action para subir un avatar desde el cliente
 */
export async function uploadAvatarAction(formData: FormData) {
  try {
    const file = formData.get("avatar") as File;
    const user = await getUser();

    if (!user?.id) {
      return { error: "Usuario no autenticado", url: null };
    }

    if (!file || file.size === 0) {
      return { error: "No se proporcionó ningún archivo", url: null };
    }

    const avatarUrl = await uploadAvatar(file, user.id);
    return { error: null, url: avatarUrl };
  } catch (error) {
    return { error: (error as Error).message, url: null };
  }
}

/**
 * Server action para eliminar un avatar
 */
export async function deleteAvatarAction(avatarUrl: string) {
  try {
    await deleteAvatar(avatarUrl);
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
