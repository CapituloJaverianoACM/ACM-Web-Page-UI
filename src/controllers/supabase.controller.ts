"use server";

import { createClient } from "@/lib/supabase/server";
import { Student } from "@/models/student.model";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

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

export const getAccessToken = async (): Promise<string | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data?.session?.access_token) {
    return null;
  }
  return data.session.access_token;
};

const STUDENT_TABLE: string = "student";
const STUDENT_ID_COLUMN: string = "supabase_user_id";

export const getUserTableFromSupabaseId = async (
  user_id: string,
): Promise<Student | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(STUDENT_TABLE)
    .select()
    .eq(STUDENT_ID_COLUMN, user_id);

  if (error || !data || data.length == 0) return null;

  return data[0] as Student;
};

export const logout = async (): Promise<void> => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/log-in");
};
