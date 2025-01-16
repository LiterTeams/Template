"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import breadcrumbGenerate from "@shared/lib/breadcrumbGenerate";
import { BreadcrumbIF } from "@entities/interfaces/breadcrumb.interfaces";

export default function Breadcrumb({className, items = undefined}:{className?: string; items?:BreadcrumbIF[] | undefined}){
    const pathname = usePathname();
    const breadcrumbs = items ? items : breadcrumbGenerate(pathname);

    return(
        <ol className={`${className} flex items-center w-full space-x-2 text-sm font-medium text-center shadow-sm sm:text-base sm:space-x-3 rtl:space-x-reverse`}>
            {breadcrumbs.map((breadcrumb,index) =>
                <li key={`breadcrumb-${index}`} >
                    <Link className={`block ${breadcrumb.active && "text-blue"} px-3 py-1 rounded-full bg-dark-secondaty`} href={breadcrumb.href}>{breadcrumb.label}</Link>
                </li>
            )}
        </ol>
    )
}