"use client";
import { FC, useRef } from "react";
import Image from "next/image";

import usePlayerState from "./hooks/usePlayerState";
import usePlayerPlayback from "./hooks/usePlayerPlayback";
import usePlayerVFX from "./hooks/usePlayerVFX";
import usePlayerUI from "./hooks/usePlayerUI";

import Controls from "./ui/Controls";
import Video from "./ui/Video";
import OverlaySourceError from "./ui/OverlaySourceError";
import OverlayVFX from "./ui/OverlayVFX";

import { PlayerProps } from "./types/player";

const Player: FC<PlayerProps> = ({...props}) => {
    
    const playerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const {
        className,
        autoPlay = false,
        preload = "auto",
        iconSize = 18,
        timeSkip = "15s",
        poster,
        showControls = true,
        autoRemoveMissingControllers = false,
        disablePictureInPicture = false,
        disableRemotePlayback = true,
    } = props;
    
    const size = iconSize;
    
    const playerData = {loop: props.loop, sources: props.sources || [], voices: props.voices, subtitles: props.subtitles};
    const vfxData = { movieMode: props.movieMode, aberrationEffect: props.aberrationEffect, blackoutEffect: props.blackoutEffect,VFX: props.VFX,};

    const player = usePlayerState(playerData);
    const playbackData = {videoRef, timeSkip, ...player}
    const vfx = usePlayerVFX(vfxData);
    const playback = usePlayerPlayback(playbackData);
    const ui = usePlayerUI(playerRef, player.isPictureToPicture, player.setIsFullscreen, player.setIsPictureToPicture);

    const videoProps = { 
        ref: videoRef,
        preload,
        isLooped: player.isLooped,
        isMuted: player.isMuted,
        poster,
        sources: playerData.sources,
        currentSubtitle: player.currentSubtitle,
        currentQuality: player.currentQuality,
        disablePictureInPicture,
        disableRemotePlayback,
        handleError: player.setIsError,
        handleToggleFullscreen: ui.handleToggleFullscreen,
        handleTogglePlay: playback.handleTogglePlay,
        handleLoadedMetadata: playback.handleLoadedMetadata,
        handleTimeUpdate: playback.handleTimeUpdate,
        handleEnded: playback.handleEnded,
    };

    const controlsProps = {
        ...player,
        ...playback,
        ...vfx,
        ...ui,
        sources: playerData.sources,
        iconSize: size,
        autoRemoveMissingControllers,
        handleToggleSubtitles: player.setCurrentSubtitle,
        handleChangeQuality: player.setCurrentQuality,
        handleVoiceChange: player.setCurrentVoice,
        handelVolumeChange: player.setVolume,
        handelTogglePictureToPicture: ui.handleTogglePictureToPicture,
      };

    return(
        <div 
        ref={playerRef}
        onMouseMove={playback.handelMouseMove}
        className={`${player.isPictureToPicture ? "fixed right-6 bottom-6 w-96 h-56" : "relative w-full h-full"} overflow-hidden pointer-events-none duration-300 border border-white border-opacity-15 ${className}`}
    >
            {player.isFirstStart && poster && <Image onDoubleClick={(e) => {e.preventDefault(); ui.handleToggleFullscreen();}} onClick={() => player.setIsFirstStart(false)} className="object-cover pointer-events-auto z-0" loading="lazy" fill src={poster} alt="poster" />}
            {playerData.sources && !player.isFirstStart && <Video {...videoProps} />}
            {showControls && <Controls {...controlsProps} />}
            {!playerData.sources || player.isError && <OverlaySourceError />}
            <OverlayVFX {...vfx} />
        </div>
    )
}

export default Player;