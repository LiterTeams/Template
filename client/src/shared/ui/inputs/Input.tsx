"use client";
import { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({className="",...props }) => {

    return <input {...props} className={clsx("w-full rounded-lg p-2 shadow bg-neutral-900 placeholder:text-neutral-500 outline-none", className)} />
};
export default Input;