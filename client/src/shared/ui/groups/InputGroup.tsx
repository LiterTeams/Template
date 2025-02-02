"use client";
import { FC } from "react";
import Input from "../inputs/Input";

import { InputGroupProps } from "@shared/types/system/group.interfaces";
import clsx from "clsx";

const InputGroup: FC<InputGroupProps> = ({className = "", label = "Unknown", error = null, isValid = true, ...props}) => {
    return(
        <div className={clsx("mb-5 flex flex-col gap-1", className)}>
            <label className="block text-sm font-medium text-white">{label}</label>
            <Input {...props} />
            {!isValid && <span className="block text-red-600 text-sm pointer-events-none">{error}</span>}
        </div>
    )

}

export default InputGroup;