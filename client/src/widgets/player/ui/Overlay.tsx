"use client";
import { FC, ReactNode } from "react";

const Overlay: FC<{className?: string; children?: ReactNode;}> = ({className,children}) => {

    const styles = className ? (className.includes("pointer-events") ? className : `pointer-events-auto ${className}`) : "pointer-events-auto";

    return(
        <div className={`absolute left-0 top-0 p-2 size-full ${styles}`}>
            {children}
        </div>
    )
}

export default Overlay;