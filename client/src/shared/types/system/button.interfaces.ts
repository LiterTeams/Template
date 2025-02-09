import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonFontPropsT, ButtonVariantPropsT, LinkRoutePropsT } from "./types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariantPropsT
    font?: ButtonFontPropsT;
    active?: boolean;
    children?: ReactNode;
    label?: string;
}

interface LinkButtonProps extends Pick<ButtonProps, "className"|"active"|"style"|"font"|"variant"|"children"|"label"|"disabled"> {
    href?: string;
    prefix?: LinkRoutePropsT;
    route?: LinkRoutePropsT;
}

export type { ButtonProps, LinkButtonProps }