"use client";
import { OverlayIF } from "@shared/interfaces/player.interface";
export default function LiteConnectOverlay({className,children}:OverlayIF){
    return(
        <div className={`absolute z-[1] left-0 top-0 p-2 size-full pointer-events-auto ${className}`}>
            {children}
        </div>
    )
}