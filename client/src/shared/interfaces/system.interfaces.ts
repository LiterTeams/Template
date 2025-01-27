import { ButtonHTMLAttributes } from "react";
import { ExtensionsEnumT } from "@entities/types/enum.types";

interface _BaseIF {
    readonly id: number;
    readonly created_at: Date;
    updated_at: Date;
}

interface _MetaIF {
    page: number;
    pages: number;
    items: number;
    status: number;
}

interface _ValidateOptionsIF {
    required?: boolean;
    type?: "str" | "int";
    lang?: "Ru" | "Eng";
    format?: "email" | "tel" | "IP";
    lengthMin?: number; lengthMax?: number; lengthBetween?: number[];
    quantityMin?: number; quantityMax?: number; quantityBetween?: number[];
    sizeMin?: string; sizeMax?: string; sizeBetween?: string[];
    extension?: ExtensionsEnumT[];
}

interface _ButtonIF extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLink?: boolean;
    children?: React.ReactNode;
    label?: string;
}

interface _LinkIF {
    isActive?: boolean;
    className?: string;
    href?: string;
    children?: React.ReactNode;
}

export type {
    _BaseIF,
    _MetaIF,
    _ButtonIF,
    _LinkIF,
    _ValidateOptionsIF,
} 