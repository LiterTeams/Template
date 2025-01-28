import { FC } from "react";

import { RiBringForward, RiFullscreenFill } from "react-icons/ri";

import PlayControls from "./PlayControls";
import Timeline from "./Timeline";
import PreferenseControls from "./PreferenseControls";

import { ControlsProps } from "../types/controls.interfaces";
import Button from "@app/shared/ui/buttons/Button";

const Controls: FC<ControlsProps> = ({...props}) => {

    const { isPlaying, isEnded, isFullscreen, isPictureToPicture, isMuted, volume, progress, currentTime, totalTime, iconSize } = props;
    const { handleTogglePlay, handelRepeat, handleForwardSkip, handleBackwardSkip, handelMuteChange, handelVolumeChange } = props;
    const { handleToggleFullscreen, handelTogglePictureToPicture } = props;

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
        handelMuteChange,
        handelVolumeChange,
    }

    const TimelineProps = {
        currentTime,
        totalTime,
        progress
    }

    const PreferenseControlsProps = { 
        iconSize: size,
        isFullscreen,
        isPictureToPicture,
        handelTogglePictureToPicture,
        handleToggleFullscreen,
    }

    return(
        <>
            <div className={`absolute z-[2] left-0 bottom-0 duration-300 ${isFullscreen ? "p-6" : "p-3"} w-full h-auto pointer-events-none`}>
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