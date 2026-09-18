import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/profil", "/profil/:path*", "/pesanan", "/pesanan/:path*"],
};

export function middleware(request: NextRequest) {
  const session = request.cookies.get("klethisan_session")?.value;

  if (!session) {
    const loginUrl = new URL("/masuk", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
