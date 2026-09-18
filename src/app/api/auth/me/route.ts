import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, getSessionUser } from "@/lib/auth-store";

export async function GET() {
  const user = getSessionUser(cookies().get(SESSION_COOKIE)?.value);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      whatsapp: user.whatsapp,
      imageUrl: user.imageUrl,
    },
  });
}
