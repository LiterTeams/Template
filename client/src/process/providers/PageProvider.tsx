"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export const PageProvider = ({children}:{readonly children:ReactNode}) => {

    const pathname = usePathname();

    return ["/sign-in","/sign-up"].includes(pathname) ? children : <div>{children}</div>;
}