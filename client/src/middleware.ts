import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const session = request.cookies.get("session")?.value;

  const protectedAuthRoutes = ["/sign-in","/sign-up"];

  if (session && protectedAuthRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/sign-in","/sign-up","/profile/:path*"], // Ограничиваем выполнение middleware только для этих маршрутов
};