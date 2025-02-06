"use client";
import { TanStackProvider } from "./TanStackProvider";
import { ThemeProvider } from "./ThemeProvider";
import { MobxProvider } from "./MobxProvider";
import { SoundProvider } from "./SoundProvider";
// import { ToastifyProvider } from "./ToastifyProvider";
import { CustomToastProvider } from "./CustomToastProvider";
import { PageProvider } from "./PageProvider";

export const Providers = ({children}:{children:React.ReactNode}) => {
    return(
        <TanStackProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <MobxProvider>
                    <SoundProvider>
                        <CustomToastProvider>
                            <PageProvider>
                                {children}
                            </PageProvider>
                        </CustomToastProvider>
                    </SoundProvider>
                </MobxProvider>
            </ThemeProvider>
        </TanStackProvider>
    )
}