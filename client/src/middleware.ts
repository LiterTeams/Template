import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";

export const config = {
  matcher: ["/", "/(ru|us|de|jp|ua|pl|fr)/:path*"]
}

export default createMiddleware(routing);