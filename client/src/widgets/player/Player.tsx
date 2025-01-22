"use client";
import useVideoPlayer from "@features/hooks/system/useVideoPlayer";
import LiteConnectVideo from "./ui/LiteConnectVideo";
import LiteConnectOverlay from "./ui/LiteConnectOverlay";
import LiteConnectControls from "./ui/LiteConnectControls";

import { TbError404Off } from "react-icons/tb";

import { VideoPlayerIF } from "@app/entities/interfaces/player.interface";

export default function Player({className, sources, poster, preload="auto", autoPlay, loop=false, muted=true, useControls=false, useOverlay=false, volume, playOnClick, playOnHover}:VideoPlayerIF){

    const { videoRef, isPlaying, progress, isFullscreen, isMuted, videoVolume, currentVideoDurationl, totalVideoDuration, togglePlay, toggleFullScreen, handelMuteChange, handleVolumeChange, onLoadedMetadata, onTimeUpdate } = useVideoPlayer(autoPlay, muted, volume);

    return(
        <div className={`${isFullscreen ? "fixed left-0 top-0 w-dvw h-dvh z-10" : "relative"} overflow-hidden pointer-events-none duration-300 ${className}`}>
            {sources && <LiteConnectVideo
                ref={videoRef}
                preload={preload}
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
                loop={loop}
                isFullscreen={isFullscreen}
                muted={isMuted}
                sources={sources}
                poster={poster}
                togglePlay={togglePlay}
                playOnClick={playOnClick}
                playOnHover={playOnHover}
            />}

            {isFullscreen && sources && 
                <div className="absolute w-full h-full left-0 top-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full bg-black h-16" />
                    <div className="w-full bg-black h-16" />
                </div>
            }
            
            {useOverlay && <LiteConnectOverlay />}
            {!sources &&
                <LiteConnectOverlay className="flex flex-col flex-center border border-white border-opacity-25 rounded-xl">
                    <TbError404Off className="text-orange-500 duration-300 animate-pulse" size={64} />
                    <h2 className="text-orange-500 duration-300 font-bold animate-pulse">Не удалось загрузить видео из источников или их нет</h2>
                </LiteConnectOverlay>
            }
            
            {useControls && sources && 
                <LiteConnectControls
                    togglePlay={togglePlay}
                    toggleFullscreen={toggleFullScreen}
                    handleVolumeChange={handleVolumeChange}
                    handelMuteChange={handelMuteChange}
                    isMuted={isMuted}
                    isPlaying={isPlaying}
                    isFullscreen={isFullscreen}
                    volume={videoVolume}
                    progress={progress}
                    currentVideoDurationl={currentVideoDurationl} totalVideoDuration={totalVideoDuration}
                />
            }
        </div>
    )
}