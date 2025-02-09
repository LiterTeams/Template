"use client";
import { usePathname } from "next/navigation";
import { Link } from "@app/i18n/routing";

import { FaBurger } from "react-icons/fa6";

import { headerLinksNavigation } from "@shared/consts/navigations";

export default function Header(){

    const pathname = usePathname();

    return(
        <header>
            <div className="container">
                <div className="flex justify-between items-center desktop:justify-start gap-6 h-inherit bg-black-secondaty/25 backdrop-blur-md rounded-xl py-3 px-6">
                    <nav className="hidden laptop:block">
                        <ul className="flex items-center gap-3">
                            {headerLinksNavigation.map((link, key) =>
                                <li key={`nav-${key}`}>
                                    <Link className={`block text-sm py-[2px] text-center px-3 rounded-xl border border-solid duration-300 ${pathname == link.href ? "bg-blue-200 drop-shadow-glow_blue border-white/25" : `border-white/15 hover:border-white/25 ${link.block ? "opacity-50 hover:bg-red-500 hover:drop-shadow-glow_red" : "hover:bg-blue hover:drop-shadow-glow_blue"}`}`} href={!link.block ? link.href : "#"}>{link.label}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                    <button className="block laptop:hidden">
                        <FaBurger size={36} color="white" />
                    </button>
                </div>
            </div>
        </header>
    )
}