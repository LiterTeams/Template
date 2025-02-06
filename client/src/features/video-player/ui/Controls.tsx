import { FC } from "react";

import { RiBringForward, RiFullscreenFill } from "react-icons/ri";

import PlayControls from "./PlayControls";
import Timeline from "./Timeline";
import PreferenseControls from "./PreferenseControls";

import { ControlsProps } from "../types/player";
import Button from "@app/shared/ui/buttons/Button";

const Controls: FC<ControlsProps> = ({...props}) => {

    console.log(props);

    const {
        isPlaying,
        isEnded,
        isFullscreen,
        isPictureToPicture,
        isMuted,
        volume,
        showControls,
        progress,
        currentTime,
        totalTime,
        iconSize,
        isLooped,
        voices,
        sources,
        subtitles,
        currentQuality,
        currentSubtitle,
        currentVoice,
        autoRemoveMissingControllers,
        useAberrationEffect,
        useBlackoutEffect,
        useMovieMode,
        useVFX,
    } = props;

    const {
        handleTogglePlay,
        handelRepeat,
        handleForwardSkip,
        handleBackwardSkip,
        handelVolumeChange,
        handleToggleFullscreen,
        handelTogglePictureToPicture,
        handleToggleSubtitles,
        handleChangeQuality,
        handleVoiceChange,
        toggleMute,
        toggleLoop,
        toggleVFX,
        toggleMovieMode,
        toggleAberrationEffect,
        toggleBlackoutEffect,
        onSeek,
    } = props;

    const size = iconSize || 18;

    const PlayControlsProps = { 
        iconSize: size,
        volume,
        isPlaying,
        isEnded,
        isMuted,
        isPictureToPicture,
        handleTogglePlay,
        handelRepeat,
        handleForwardSkip,
        handleBackwardSkip,
        toggleMute,
        handelVolumeChange,
    }

    const TimelineProps = {
        currentTime,
        totalTime,
        progress,
        onSeek,
    }

    const PreferenseControlsProps = { 
        iconSize: size,
        isFullscreen,
        showControls,
        useAberrationEffect,
        useBlackoutEffect,
        useMovieMode,
        useVFX,
        isLooped,
        isPictureToPicture,
        voices,
        sources,
        subtitles,
        currentQuality,
        currentSubtitle,
        currentVoice,
        autoRemoveMissingControllers,
        handelTogglePictureToPicture,
        handleToggleFullscreen,
        handleVoiceChange,
        handleToggleSubtitles,
        handleChangeQuality,
        toggleLoop,
        toggleVFX,
        toggleMovieMode,
        toggleAberrationEffect,
        toggleBlackoutEffect,
    }

    return(
        <>
            <div className={`absolute ${showControls ? "opacity-100" : "opacity-0"} z-[2] left-0 bottom-0 duration-300 ${isFullscreen ? "p-6" : "p-3"} w-full h-auto`}>
                <div className="flex flex-grow gap-6 rounded-xl bg-black/50 p-2 pointer-events-auto">
                    <PlayControls {...PlayControlsProps} />
                    <Timeline {...TimelineProps} />
                    <PreferenseControls {...PreferenseControlsProps} />
                </div>
            </div>
            {isPictureToPicture &&
                <div className="absolute left-3 top-3 flex items-center gap-2 pointer-events-auto">
                    <Button onClick={handelTogglePictureToPicture} variant="ghost" ><RiBringForward size={size} /></Button>
                    <Button onClick={handleToggleFullscreen} variant="ghost" ><RiFullscreenFill size={size} /></Button>
                </div>
            }
        </>
    )
}

export default Controls;