import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

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

export type { InputGroupProps, TextareaGroupProps } 