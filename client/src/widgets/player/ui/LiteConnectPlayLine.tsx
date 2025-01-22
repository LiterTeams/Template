"use client";

import { LCPVideoControlsIF } from "@entities/interfaces/player.interface";

export default function LiteConnectPlayLine({progress}:Pick<LCPVideoControlsIF, "progress">){

    return(
        <div className="relative h-[2px]">
            <div style={{width:`${progress}%`}} className={`absolute z-[1] duration-300 left-0 top-0 h-inherit bg-orange-600 rounded-lg`} />
            <span className="absolute z-[1] bg-orange-600 rounded-full duration-300 size-2 -top-1" style={{left: `${progress}%`}} />
            <div className="absolute z-[0] left-0 top-0 w-full h-inherit bg-white rounded-lg" />
        </div>
    )
}