"use client";
import { TanStackProvider, ThemeProvider, MobxProvider, ToastProvider, PageProvider } from "./";

export const Providers = ({children}:{children:React.ReactNode}) => {
    return(
        <TanStackProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <MobxProvider>
                    <ToastProvider>
                         <PageProvider>
                            {children}
                        </PageProvider>
                    </ToastProvider>
                </MobxProvider>
            </ThemeProvider>
        </TanStackProvider>
    )
}