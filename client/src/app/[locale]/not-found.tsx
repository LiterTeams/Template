import {useTranslations} from "next-intl";
import { Link } from "@app/i18n/routing";
 
export default function NotFoundPage() {
  const localization = useTranslations("NotFoundPage");
  return(
    <section className="size-full flex items-center justify-center">
      <div className="fixed -z-[5] left-0 top-0 w-screen h-screen bg-gradient-to-tr from-indigo-600/0 to-purple-500/15" />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
              <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{localization("missing")}</p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{localization("title")}</p>
              <Link href="/" className="">{localization("back")}</Link>
          </div>   
      </div>
  </section>
  )
}