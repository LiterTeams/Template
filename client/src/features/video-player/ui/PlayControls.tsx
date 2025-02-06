import { FC } from "react";
import { RiPlayCircleFill, RiPauseCircleFill, RiRepeat2Fill, RiRewindFill, RiVolumeDownFill, RiVolumeMuteFill, RiSpeedFill} from "react-icons/ri";

import Button from "@shared/ui/buttons/Button";

import { PlayControlsProps } from "../types/player";

const PlayControls: FC<PlayControlsProps> = ({...props}) => {

    const { isPlaying, isEnded, isPictureToPicture, isMuted, iconSize = 18, volume } = props;
    const { handleTogglePlay, handelRepeat, toggleMute, handleBackwardSkip, handleForwardSkip, handelVolumeChange } = props;

    const currentPercentVolume = volume * 100;

    return(
        <div className={`${isPictureToPicture ? "hidden" : "flex"} items-center flex-shrink-0 gap-2`}>
            <Button className="group" onClick={!isEnded ? handleTogglePlay : handelRepeat} variant="ghost">
                {!isEnded && (isPlaying ? <RiPauseCircleFill size={iconSize} /> : <RiPlayCircleFill size={iconSize} />)}
                {isEnded && <RiRepeat2Fill className="group-hover:rotate-90 duration-300" size={iconSize} />}
            </Button>
            <Button onClick={handleBackwardSkip} variant="ghost">
                <RiRewindFill size={iconSize} />
            </Button>
            <Button onClick={handleForwardSkip} variant="ghost">
                <RiSpeedFill size={iconSize} />
            </Button>
            <div className="flex items-center gap-2 group">
                <Button onClick={toggleMute} variant="ghost">
                    {isMuted ? <RiVolumeMuteFill size={iconSize} /> : <RiVolumeDownFill size={iconSize} />}
                </Button>
                <div className={`
                    relative btn-ghost overflow-hidden duration-300 h-6 w-24
                    after:left-0 after:top-0 after:w-full after:h-px after:bg-white after:duration-300
                    `}>
                    <div style={{left:`${currentPercentVolume == 1 ? 92 : currentPercentVolume}%`}} className="relative block rounded-full size-2 bg-orange-500" />
                    <div style={{width:`${currentPercentVolume == 1 ? 80 : currentPercentVolume}%`}} className="absolute duration-300 left-2 top-[11px] rounded-full h-px bg-orange-500 pointer-events-none" />
                </div>
                <span className="text-xs">{currentPercentVolume}%</span>
            </div>
        </div>
    )
}

export default PlayControls;