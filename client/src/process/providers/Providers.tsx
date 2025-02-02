"use client";
import MobxProvider from "./MobxProvider";
import TanStackProvider from "./TanStackProvider";
import { SoundProvider } from "./SoundProvider";
import PageProvider from "./PageProvider";

export default function Providers({children}:{children:React.ReactNode}){
    return(
        <MobxProvider>
            <TanStackProvider>
                <PageProvider>
                    <SoundProvider>
                        {children}
                    </SoundProvider>
                </PageProvider>
            </TanStackProvider>
        </MobxProvider>
    )
}