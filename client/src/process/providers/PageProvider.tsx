"use client";

import Header from "@widgets/header/Header";
import Footer from "@widgets/footer/Footer";

export default function PageProvider({children}:{children:React.ReactNode}){
    return(
        <div className="wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}