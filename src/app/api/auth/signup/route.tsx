import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, surname, email, password, avatar_url } = await req.json();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 400 },
      );
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
      return NextResponse.json(
        { data: null, error: dbResponse.error.message },
        { status: 400 },
      );
    }

    return NextResponse.json({ data, error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: `Error inesperado: ${error}` },
      { status: 500 },
    );
  }
}
