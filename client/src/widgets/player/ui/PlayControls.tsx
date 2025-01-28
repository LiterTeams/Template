import { FC } from "react";
import { RiPlayCircleFill, RiPauseCircleFill, RiRepeat2Fill, RiRewindFill, RiVolumeDownFill, RiVolumeMuteFill, RiSpeedFill} from "react-icons/ri";

import Button from "@shared/ui/buttons/Button";

import { PlayControlsProps } from "../types/controls.interfaces";

const PlayControls: FC<PlayControlsProps> = ({...props}) => {

    const { isPlaying, isEnded, isPictureToPicture, isMuted, iconSize, volume } = props;
    const { handleTogglePlay, handelRepeat, handelMuteChange, handleBackwardSkip, handleForwardSkip, handelVolumeChange } = props;

    const size = iconSize || 18;

    return(
        <div className={`${isPictureToPicture ? "hidden" : "flex"} flex-shrink-0 gap-2`}>
            <Button onClick={isEnded ? handleTogglePlay : handelRepeat} variant="ghost">
                {isPlaying && !isEnded ? <RiPauseCircleFill size={size} /> : <RiPlayCircleFill size={iconSize} />}
                {isEnded && <RiRepeat2Fill size={size} />}
            </Button>
            <Button onClick={handleBackwardSkip} variant="ghost">
                <RiRewindFill size={size} />
            </Button>
            <Button onClick={handleForwardSkip} variant="ghost">
                <RiSpeedFill size={size} />
            </Button>
            <Button onClick={handelMuteChange} variant="ghost">
                {isMuted ? <RiVolumeMuteFill size={size} /> : <RiVolumeDownFill size={size} />}
                <div className="hidden group-hover:flex">
                    {volume}
                </div>
            </Button>
        </div>
    )
}

export default PlayControls;