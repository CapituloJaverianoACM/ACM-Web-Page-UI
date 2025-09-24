import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { data: null, error: error.message },
        { status: 400 },
      );
    }



    const res = NextResponse.json({data:data.user, error:null},{status:200});
    res.cookies.set("sb-access-token",data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    /**
     * Aca haria falta guardar en una cookie pienso yo el url del avatar
     * para no tener que hacer otra consulta, y ponerle el mismo maxAge
     * del access-token
     */

    return res;
  } catch (error) {
    return NextResponse.json(
      { data: null, error: `Error inesperado: ${error}` },
      { status: 500 },
    );
  }
}
