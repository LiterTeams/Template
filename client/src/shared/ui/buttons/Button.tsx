"use client";
import { FC, useMemo } from "react";
import clsx from "clsx";

import { ButtonProps } from "@shared/types/system/button.interfaces";

import variants from "@shared/consts/variants";

export const Button: FC<ButtonProps> = ({className, children, label, font="mono", variant="primary", active = false, ...props}) => {

    const btnClassName = useMemo(() => clsx(
        variants.fonts[font as keyof typeof variants.fonts],
        variants.clxs[variant as keyof typeof variants.clxs],
        active && "active",
        className
    ), [font, variant, active, className]);

    return(
        <button className={btnClassName} {...props}>
            {children ?? label}
        </button>
    )
}