"use client";
import { FC } from "react";
import Textarea from "../inputs/Textarea";

import { TextareaGroupProps } from "@shared/types/system/group.interfaces";
import clsx from "clsx";

const TextareaGroup: FC<TextareaGroupProps> = ({className = "", label = "Unknown", error, isValid = true, ...props}) => {
    return(
        <div className={clsx("mb-5 flex flex-col gap-1", className)}>
            <label className="block text-sm font-medium text-white">{label}</label>
            <Textarea {...props} />
            {!isValid && <span className="block text-red-600 font-xs pointer-events-none">{error}</span>}
        </div>
    )

}

export default TextareaGroup;