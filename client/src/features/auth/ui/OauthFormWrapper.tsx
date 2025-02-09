"use client";
import { FC, FormEvent, ReactNode } from "react";
import { Link } from "@app/i18n/routing";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import { OauthFormSocials } from "./OauthFormSocials";

interface OauthFormWrapperProps {
    className?: string;
    children?: ReactNode;
    isSignIn?: boolean;
    isSignUp?: boolean;
    showSocials?: boolean;
    handleSubmit: (event: FormEvent) => void;
}

export const OauthFormWrapper: FC<OauthFormWrapperProps> = ({...props}) => {

    const localization = useTranslations("Words");

    const { className = "", children, isSignIn = false, isSignUp = false, showSocials=true, handleSubmit } = props;

    const text = isSignIn ? localization("Registration") : (isSignUp ? localization("Login") : "#");
    const href = isSignIn ? "/sign-up" : (isSignUp ? "/sign-in" : "#");

    return(
        <div className={clsx("sm:max-w-96 w-full flex flex-col gap-4 p-3 sm:border border-white border-opacity-15 rounded-xl",className)}>
            <div className="flex gap-1 justify-between items-baseline">
                <h1 className="block text-4xl font-bold uppercase text-white tracking-widest">Nexst<span className="text-lg">.js</span></h1>
                <h2 className="block font-bold uppercase text-base text-neutral-500">Beta 1.1.6</h2>
            </div>
            {showSocials && <OauthFormSocials />}
            {children && 
                <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-3">
                    {children}
                    {(isSignIn || isSignUp) && <button type="submit" className="text-center flex-grow p-2 rounded-lg bg-neutral-900 duration-300 hover:bg-sky-500">{localization(isSignIn ? "Login" : "Registration")}</button>}
                </form>}
            <div className="flex flex-col gap-2">
                {(isSignIn || isSignUp) && <Link className="text-sky-500 text-sm text-center" href={href}>{text}</Link>}
                <Link className="text-neutral-500 text-sm text-center" href="/">{localization("Back")}</Link>
            </div>
        </div>
    )
}