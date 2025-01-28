"use client";
import { FC, ReactNode } from "react";

const Overlay: FC<{className?: string; children?: ReactNode;}> = ({className,children}) => {
    return(
        <div className={`absolute left-0 top-0 p-2 size-full pointer-events-auto ${className}`}>
            {children}
        </div>
    )
}

export default Overlay;