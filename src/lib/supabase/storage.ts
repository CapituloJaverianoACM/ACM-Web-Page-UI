"use server";

import { createClient } from "./server";

const AVATAR_BUCKET = "avatars";
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/**
 * Sube un archivo de avatar a Supabase Storage
 * @param file - El archivo a subir
 * @param userId - El ID del usuario de Supabase (para crear una ruta única)
 * @returns La URL pública del avatar subido
 */
export async function uploadAvatar(
  file: File,
  userId: string,
): Promise<string> {
  const supabase = await createClient();

  // Validar tipo de archivo
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      "Tipo de archivo no válido. Solo se permiten imágenes (JPEG, PNG, WEBP).",
    );
  }

  // Validar tamaño
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("El archivo es demasiado grande. Máximo 1MB.");
  }

  // Generar nombre único para el archivo
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // Convertir File a ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  // Subir el archivo
  const { data, error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(filePath, fileBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    if (error.message.includes("Bucket not found")) {
      throw new Error(
        `El bucket '${AVATAR_BUCKET}' no existe. Por favor, créalo en Supabase Storage. ` +
        `Ve a Storage > Buckets > New bucket y crea un bucket llamado '${AVATAR_BUCKET}' con acceso público.`
      );
    }
    throw new Error(`Error al subir el avatar: ${error.message}`);
  }

  // Obtener la URL pública
  const {
    data: { publicUrl },
  } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);

  if (!publicUrl) {
    throw new Error("No se pudo generar la URL pública del avatar.");
  }

  return publicUrl;
}

/**
 * Elimina un avatar de Supabase Storage
 * @param avatarUrl - La URL del avatar a eliminar
 */
export async function deleteAvatar(avatarUrl: string): Promise<void> {
  if (!avatarUrl) return;

  try {
    const supabase = await createClient();
    const url = new URL(avatarUrl);
    const pathParts = url.pathname.split("/");
    const bucketIndex = pathParts.findIndex((part) => part === AVATAR_BUCKET);

    if (bucketIndex === -1) {
      // Si no es una URL de Supabase Storage, no intentar eliminar
      return;
    }

    const filePath = pathParts.slice(bucketIndex + 1).join("/");

    await supabase.storage.from(AVATAR_BUCKET).remove([filePath]);
  } catch (error) {
    // No lanzar error si falla la eliminación, solo loguear
    console.error("Error al eliminar avatar:", error);
  }
}
