"use client";

import Header from "@widgets/header/ui/Header";
import Footer from "@widgets/footer/ui/Footer";

// import { usePathname } from "next/navigation";

export default function PageProvider({children}:{children:React.ReactNode}){
    // const pathname = usePathname();
    return(
        <div className="wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}