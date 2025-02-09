"use client";
import { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({className="",...props }) => {
    return <input {...props} className={clsx("w-full rounded-md p-2 shadow bg-[#251D2B] border border-[#46404C] placeholder:text-neutral-500 outline-none", className)} />
};