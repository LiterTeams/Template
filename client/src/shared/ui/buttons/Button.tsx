"use client";
import { FC, useMemo } from "react";
import clsx from "clsx";

import useButtonSound from "@shared/lib/hooks/system/additionals/useButtonSound";

import { ButtonProps } from "@shared/types/system/button.interfaces";

import variants from "@shared/consts/variants";

const Button: FC<ButtonProps> = ({className, sound, children, label, font="mono", variant="primary", active = false, onClick, ...props}) => {

    const soundSrc = sound ? variants.sounds[sound as keyof typeof variants.sounds] ?? variants.sounds.scifi : undefined;
    const { handleButtonClick } = useButtonSound(soundSrc, onClick);

    const btnClassName = useMemo(() => clsx(
        variants.fonts[font as keyof typeof variants.fonts],
        variants.clxs[variant as keyof typeof variants.clxs],
        active && "active",
        className
    ), [font, variant, active, className]);

    return(
        <button onClick={handleButtonClick} className={btnClassName} {...props}>
            {children ?? label}
        </button>
    )
}

export default Button;