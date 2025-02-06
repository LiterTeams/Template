"use client";
import { FC } from "react";
import Input from "../inputs/Input";

import { InputGroupProps } from "@shared/types/system/group.interfaces";
import clsx from "clsx";

export const InputGroup: FC<InputGroupProps> = ({children, className = "", label = "Unknown", error = null, isValid = true, ...props}) => {
    return(
        <>
        <div className={clsx("flex flex-col gap-1", className)}>
            <label className="block text-sm font-medium text-white">{label}</label>
            <div className="block relative">
                <Input {...props} />
                {children}
            </div>
            {!isValid && <span className="block text-red-600 text-sm pointer-events-none">{error}</span>}
        </div>
        </>
    )

}