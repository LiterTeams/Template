"use client";
import { FC } from "react";

import usePlayer from "./hooks/usePlayer";

import Controls from "./ui/Controls";
import Video from "./ui/Video";
import OverlaySourceError from "./ui/OverlaySourceError";

import { PlayerProps } from "./types/controls.interfaces";

const Player: FC<PlayerProps> = ({...props}) => {

    const { className, loop, muted, poster, preload="auto", sources, iconSize, showControls, autoPlay, disablePictureInPicture, disableRemotePlayback } = props;
    const size = iconSize || 18;

    const { 
        videoRef,
        playerRef,
        isLoading,
        isPlaying,
        isEnded,
        isFullscreen,
        isLooped,
        isMuted,
        volume,
        currentTime,
        totalTime,
        progress,
        isPictureToPicture,
        handleTogglePlay,
        handelRepeat,
        handleForwardSkip,
        handleBackwardSkip,
        handleLoadedMetadata,
        handleTimeUpdate,
        handleEnded,
        handelMuteChange,
        handelVolumeChange,
        handleToggleFullscreen,
        handelTogglePictureToPicture
    } = usePlayer(loop,muted,autoPlay);

    const videoProps = { 
        ref: videoRef,
        preload,
        isLooped,
        isMuted,
        poster,
        sources,
        disablePictureInPicture,
        disableRemotePlayback,
        handleTogglePlay,
        handleLoadedMetadata,
        handleTimeUpdate,
        handleEnded,
    }

    const ControlsProps = {
        isPlaying,
        isEnded,
        isFullscreen,
        isPictureToPicture,
        isMuted,
        volume,
        currentTime,
        totalTime,
        progress,
        iconSize: size,
        handleTogglePlay,
        handelRepeat,
        handleForwardSkip,
        handleBackwardSkip,
        handelMuteChange,
        handelVolumeChange,
        handleToggleFullscreen,
        handelTogglePictureToPicture,
    }

    return(
        <div ref={playerRef} className={`${isPictureToPicture ? "fixed right-6 bottom-6 w-96 h-56" : "relative w-full h-full"} overflow-hidden pointer-events-none duration-300 border border-white border-opacity-15 ${className}`}>
            {sources && <Video {...videoProps} />}
            {showControls && <Controls {...ControlsProps} />}
            {!sources && <OverlaySourceError />}
        </div>
    )
}

export default Player;