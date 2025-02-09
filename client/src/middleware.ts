import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  const localePattern = /^\/(ru|us|de|jp|ua|pl|fr)(\/|$)/;
  const match = request.nextUrl.pathname.match(localePattern);
  const locale = match ? match[1] : "us";

  const cleanPath = request.nextUrl.pathname.replace(localePattern, "/");
  const isAuthPage = ["/sign-in", "/sign-up"].includes(cleanPath);

  // ✅ Если пользователь **авторизован** и пытается зайти на страницу входа → редирект на главную
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // ✅ Если пользователь **не авторизован** и пытается зайти на закрытые страницы → редирект на логин
  const protectedRoutes = ["/dashboard", "/profile"];
  if (!session && protectedRoutes.includes(cleanPath)) {
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ru|us|de|jp|ua|pl|fr)/:path*"]
}

export default createMiddleware(routing);