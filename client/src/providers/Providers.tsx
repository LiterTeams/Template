"use client";
import MobxProvider from "./MobxProvider";
import TanStackProvider from "./TanStackProvider";
import PageProvider from "./PageProvider";

export default function Providers({children}:{children:React.ReactNode}){
    return(
        <MobxProvider>
            <TanStackProvider>
                <PageProvider>{children}</PageProvider>
            </TanStackProvider>
        </MobxProvider>
    )
}