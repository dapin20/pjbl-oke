import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  createSession,
  findUser,
  verifyPassword,
} from "@/lib/auth-store";

export async function POST(request: Request) {
  const body = await request.json();
  const identifier = typeof body.emailOrWa === "string" ? body.emailOrWa : "";
  const password = typeof body.password === "string" ? body.password : "";
  const user = findUser(identifier);

  if (!user) {
    return NextResponse.json(
      {
        message: "Akun tidak ditemukan. Silakan daftar terlebih dahulu.",
        code: "ACCOUNT_NOT_FOUND",
      },
      { status: 404 },
    );
  }

  if (!verifyPassword(user, password)) {
    return NextResponse.json(
      { message: "Kata sandi salah." },
      { status: 401 },
    );
  }

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
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });
  return response;
}
