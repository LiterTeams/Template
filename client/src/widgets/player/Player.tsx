"use client";
import React from "react";
import useVideoPlayer from "@shared/hooks/system/useVideoPlayer";

import { TbError404Off } from "react-icons/tb";

import LiteConnectVideo from "./ui/LiteConnectVideo";
import LiteConnectControls from "./ui/LiteConnectControls";
import LiteConnectOverlay from "./ui/LiteConnectOverlay";

import { LCPVideoPlayerIF } from "@shared/interfaces/player.interface";

export default function LiteConnectPlayer({className, sources, poster, preload="auto", autoPlay, loop=false, muted=true, useControls=false, playOnClick, playOnHover}:LCPVideoPlayerIF){

    const { ref, isPlaying, progressBar, isFullscreen, isMuted, volume, currentVideoDurationl, totalVideoDuration, handleTogglePlay, handleToggleFullscreen, handelMuteChange, handleVolumeChange, onLoadedMetadata, onTimeUpdate } = useVideoPlayer(autoPlay, muted);

    return(
        <div className={`${isFullscreen ? "fixed left-0 top-0 w-dvw h-dvh z-10" : "relative"} overflow-hidden pointer-events-none duration-300 ${className}`}>
            {sources && <LiteConnectVideo
                ref={ref}
                preload={preload}
                loop={loop}
                isFullscreen={isFullscreen}
                muted={isMuted}
                sources={sources}
                poster={poster}
                playOnClick={playOnClick}
                playOnHover={playOnHover}
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
                handleTogglePlay={handleTogglePlay}
            />}

            {isFullscreen && sources && 
                <div className="absolute w-full h-full left-0 top-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full bg-black h-16" />
                    <div className="w-full bg-black h-16" />
                </div>
            }
            
            {!sources &&
                <LiteConnectOverlay className="flex flex-col flex-center border border-white border-opacity-25 rounded-xl">
                    <TbError404Off className="text-orange-500 duration-300 animate-pulse" size={64} />
                    <h2 className="text-orange-500 duration-300 font-bold animate-pulse">Не удалось загрузить видео из источников или их нет</h2>
                </LiteConnectOverlay>
            }
            
            {useControls && sources && 
                <LiteConnectControls
                    isMuted={isMuted}
                    isPlaying={isPlaying}
                    isFullscreen={isFullscreen}
                    volume={volume}
                    progressBar={progressBar}
                    currentVideoDurationl={currentVideoDurationl}
                    totalVideoDuration={totalVideoDuration}
                    handleTogglePlay={handleTogglePlay}
                    handletoggleFullscreen={handleToggleFullscreen}
                    handleVolumeChange={handleVolumeChange}
                    handelMuteChange={handelMuteChange}
                />
            }
        </div>
    )
}