"use client";
import { useTranslations } from "next-intl";

export default function HomePageView(){
    const localization = useTranslations("Home");

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
            <h2 className="block font-bold uppercase text-base">Beta 1.1.2</h2>
            <p className="text-white">{localization("hero")}</p>
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