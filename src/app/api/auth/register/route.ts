import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  createSession,
  createUser,
} from "@/lib/auth-store";

export async function POST(request: Request) {
  const body = await request.json();
  const fullName = typeof body.fullName === "string" ? body.fullName : "";
  const identifier = typeof body.emailOrWa === "string" ? body.emailOrWa : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!fullName.trim() || !identifier.trim() || password.length < 8) {
    return NextResponse.json(
      { message: "Data pendaftaran belum lengkap." },
      { status: 400 },
    );
  }

  try {
    const user = createUser({
      fullName,
      password,
      email: identifier.includes("@") ? identifier : undefined,
      whatsapp: identifier.includes("@") ? undefined : identifier,
    });

    const token = createSession(user.id);
    const response = NextResponse.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        whatsapp: user.whatsapp,
        imageUrl: user.imageUrl,
      },
    });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    const message = error instanceof Error && error.message.includes("EMAIL")
      ? "Email sudah terdaftar."
      : "Nomor WhatsApp sudah terdaftar.";
    return NextResponse.json({ message }, { status: 409 });
  }
}
