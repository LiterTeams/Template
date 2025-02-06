"use client";

import { ThemeProvider as NextThemeProvider} from "next-theme";
import { type ThemeProviderProps } from "next-theme/dist/provider/index.props";

export const ThemeProvider = ({children, ...props}: ThemeProviderProps) => {
    return(
        <NextThemeProvider {...props}>
            {children}
        </NextThemeProvider>
    )
}