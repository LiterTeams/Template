"use client";

export default function LiteConnectOverlay({className,children}:{className?:string,children?:React.ReactNode}){
    return(
        <div className={`absolute z-[1] left-0 top-0 p-2 size-full pointer-events-auto ${className}`}>
            {children}
        </div>
    )
}