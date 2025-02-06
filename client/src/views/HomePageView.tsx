"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@app/i18n/routing";

import { useToast } from "@shared/lib/hooks/system/general/useToast";

export default function HomePageView(){
    const { showToast } = useToast();
    const locale = useLocale();

    const localization = useTranslations("Home");
    const localization2 = useTranslations("Languages");

    const languages = [
        {value: "ru", label: localization2("Russian")},
        {value: "pl", label: localization2("Polish")},
        {value: "ua", label: localization2("Ukrainian")},
        {value: "us", label: localization2("English")},
        {value: "de", label: localization2("German")},
        {value: "fr", label: localization2("French")},
        {value: "jp", label: localization2("Japanese")},
    ];
    const data = [
        {
            label: localization("changelog"),
            text: localization("changelog-text"),
            href: "#",
        },
        {
            label: localization("templates"),
            text: localization("templates-text"),
            href: "#",
        },
        {
            label: localization("libraries"),
            text: localization("libraries-text"),
            href: "#",
        },
    ];

    return(
        <div className="flex h-screen flex-col items-center justify-center mx-auto max-w-7xl">
            <div className="fixed -z-[5] left-0 top-0 w-screen h-screen bg-gradient-to-tr from-indigo-600/0 to-purple-500/15" />
            <h1 className="block text-4xl font-bold uppercase text-white tracking-widest">Nexst<span className="text-lg">.js</span></h1>
            <h2 className="block font-bold uppercase text-base">Beta 1.1.4</h2>
            <p className="text-white">{localization("hero")}</p>
            <div className="flex gap-3 mt-4">
            <button onClick={() => showToast("Test Pending Toast", "message test toast", "pending")} className="duration-300 px-4 py-1 bg-white/5 rounded border border-white border-opacity-15 hover:bg-sky-500">Pending Toast</button>
                <button onClick={() => showToast("Test Success Toast", "message test toast", "success")} className="duration-300 px-4 py-1 bg-white/5 rounded border border-white border-opacity-15 hover:bg-green-600">Success Toast</button>
                <button onClick={() => showToast("Test Error Toast", "message test toast", "error")} className="duration-300 px-4 py-1 bg-white/5 rounded border border-white border-opacity-15 hover:bg-red-700">Error Toast</button>
                <button onClick={() => showToast("Test Warning Toast", "message test toast", "warning")} className="duration-300 px-4 py-1 bg-white/5 rounded border border-white border-opacity-15 hover:bg-yellow-600">Warning Toast</button>
                <button onClick={() => showToast("Test Info Toast", "message test toast", "info")} className="duration-300 px-4 py-1 bg-white/5 rounded border border-white border-opacity-15 hover:bg-gray-500">Info Toast</button>
            </div>
            <div className="flex gap-2 items-center mt-4">
                {languages.map((language,index) =>
                    <Link
                        key={index}
                        href="/"
                        locale={language.value}
                        className={`bg-white border border-white rounded px-4 py-1 cursor-pointer duration-300 hover:bg-opacity-15 hover:border-opacity-25 ${locale == language.value ? "bg-opacity-15 border-opacity-25" : "bg-opacity-5 border-opacity-15"}`}
                        >
                            {language.label}
                    </Link>
                )}
            </div>
            <div className="grid grid-cols-2 w-full gap-3 mt-8">
                {data.map((dataItem, index) =>
                    <a key={index} href={dataItem.href} className={`border duration-300 border-white border-opacity-15 p-3 rounded-lg hover:bg-white/5 hover:border-opacity-25 ${index == data.length - 1 && "col-span-2"}`}>
                        <h3 className="uppercase text-center font-bold tracking-widest">{dataItem.label}</h3>
                        <p className="text-sm text-center mt-2 text-gray-500">{dataItem.text}</p>
                    </a>
                )}
            </div>
            <div className="flex flex-col gap-1 w-full mt-4 text-gray-500 text-sm">
                <p>{localization("system-custom")}</p>
                <p>{localization("system")}</p>
                <p>{localization("custom")}</p>
            </div>
        </div>
    )
}