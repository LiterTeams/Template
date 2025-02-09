import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
    prefix?: string;
}

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | null;
    isValid?: boolean;
}

interface TextareaGroupProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string | null;
    isValid?: boolean;
}

export type { InputGroupProps, TextareaGroupProps, SearchProps } 