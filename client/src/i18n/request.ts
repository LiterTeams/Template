import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

import { LocaleEnumT } from "@shared/types/enum.types";

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  if (!locale || !routing.locales.includes(locale as LocaleEnumT)) locale = routing.defaultLocale;
 
  return { locale, messages: (await import(`../../localization/${locale}.json`)).default};
});