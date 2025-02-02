import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from "next/headers";
import { routing } from './routing';
import { LocalePropsT } from "@app/shared/types/system/types";

export default getRequestConfig(async ({ requestLocale }) => {
  // Получаем локаль из requestLocale (если есть), иначе ищем в cookies или accept-language
  let locale = await requestLocale;

  const headersList = await headers();
  const defaultLocale = headersList.get("accept-language");

  // Берём локаль из cookies или fallback на defaultLocale (или 'en' если нет)
  const cookiesList = await cookies();
  locale = cookiesList.get("NEXT_LOCALE")?.value || defaultLocale || "en";

  // Если локаль некорректная, используем локаль по умолчанию
  if (!locale || !routing.locales.includes(locale as LocalePropsT)) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`../../localization/${locale}.json`)).default;

  return { locale, messages };
});

