import {defineRouting} from "next-intl/routing";
import {createNavigation} from "next-intl/navigation";

import { LocalePropsT } from "@app/shared/types/system/types";

const locales: LocalePropsT[] = ["ru", "pl", "ua", "us", "de", "fr", "jp"];

export const routing = defineRouting({
  locales: locales,
  defaultLocale: "ru",
  localePrefix: "always",
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);