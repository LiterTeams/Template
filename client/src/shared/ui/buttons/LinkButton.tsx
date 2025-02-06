"use client";
import { FC, useMemo } from "react";
import Link from "next/link";
import clsx from "clsx";

import useButtonSound from "@shared/lib/hooks/system/additionals/useButtonSound";

import variants from "@shared/consts/variants";

import { LinkButtonProps } from "@shared/types/system/button.interfaces";

export const LinkButton: FC<LinkButtonProps> = ({children, route, sound="echo", prefix, active=false, href="#", variant="primary", font="impact", label, className, ...props}) => {

    const soundSrc = variants.sounds[sound as keyof typeof variants.sounds] ?? variants.sounds.scifi;
    const { handleAnchorClick } = useButtonSound(soundSrc);

    const btnClassName = useMemo(() => clsx(
        variants.fonts[font as keyof typeof variants.fonts],
        variants.clxs[variant as keyof typeof variants.clxs],
        active && "active",
        className
    ), [font, variant, active, className]);

    const routePrefix = prefix && variants.routes[prefix as keyof typeof variants.routes];
    const routeHref = route ? variants.routes[route as keyof typeof variants.routes] : href;
    const link = routePrefix ? `${routePrefix}/${routeHref}` : routeHref;

    return(
        <Link href={link} onClick={handleAnchorClick} className={btnClassName} {...props}>
            {children ?? label}
        </Link>
    )
}