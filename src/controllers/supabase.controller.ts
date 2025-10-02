"use server";

import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export const sendResetEmail = async (email: string): Promise<void> => {
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email);
};

export const updatePasswordUser = async (
  password: string,
): Promise<boolean> => {
  const supabase = await createClient();
  const userResponse = await supabase.auth.updateUser({ password });
  if (userResponse.error) {
    console.log(userResponse.error);
    return false;
  }

  return true;
};

export const getUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log(error);
    return null;
  }
  return data.user;
};
