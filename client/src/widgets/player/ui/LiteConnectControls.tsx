"use client";
import LiteConnectPlayLine from "./LiteConnectPlayLine";

import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineFullscreen, AiOutlineFullscreenExit, AiFillSetting  } from "react-icons/ai";
import { BsFillVolumeDownFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { MdFeaturedVideo } from "react-icons/md";

import { LCPVideoControlsIF } from "@shared/interfaces/player.interface";
import RangeInput from "@shared/ui/inputs/range/ui/RangeInput";


export default function LiteConnectControls({isPlaying,isFullscreen,isMuted,volume,progressBar,currentVideoDurationl,totalVideoDuration,handleTogglePlay,handletoggleFullscreen,handleVolumeChange,handelMuteChange}:LCPVideoControlsIF){
    
    const iconSize = 24;

    return(
        <div className="absolute z-[2] left-0 bottom-0 w-full min-h-12 p-3 pointer-events-auto">
            <div className="flex mx-auto flex-col gap-3">
                <LiteConnectPlayLine progressBar={progressBar} />
                <div className="flex gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={handleTogglePlay}>
                            {isPlaying ? <AiFillPauseCircle size={iconSize} color="white" /> : <AiFillPlayCircle size={iconSize} color="white" />}
                        </button>
                        <div className="flex items-center gap-2 group">
                            <button onClick={handelMuteChange}>
                                {isMuted ? <BsFillVolumeMuteFill size={iconSize} color="white" /> : <BsFillVolumeDownFill size={iconSize} color="white" />}
                            </button>
                            <div className="relative flex gap-2 items-center duration-300 translate-y-12 group-hover:translate-y-0">
                                <RangeInput initial={volume} minRange={0} maxRange={1} stepRange={0.01} handleRangeChange={handleVolumeChange} />
                                <p className="text-xs pointer-events-none">{Math.round(volume * 100)}%</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-white text-xs font-bold text-center mx-auto">{currentVideoDurationl} / {totalVideoDuration}</p>
                    <div className="flex items-center gap-3">
                        <button>
                            <AiFillSetting size={iconSize} color="white" />
                        </button>
                        <button>
                            <MdFeaturedVideo size={iconSize} color="white" />
                        </button>
                        <button onClick={handletoggleFullscreen}>
                            {isFullscreen ? <AiOutlineFullscreenExit size={iconSize} color="white" /> : <AiOutlineFullscreen size={iconSize} color="white" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}