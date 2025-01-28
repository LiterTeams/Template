import { FC } from "react";

import { 
    RiFlagFill, RiBardFill, RiCreativeCommonsFill, RiFullscreenFill,
    RiMic2AiFill, RiSettings2Fill, RiShadowFill, RiVipDiamondFill,
    RiFullscreenExitFill, RiBringForward,
} from "react-icons/ri";

import Button from "@shared/ui/buttons/Button";

import { PreferenseControlsProps } from "../types/controls.interfaces";

const DropdownMenu: FC = () => {
    return(
        <div className="absolute left-12 bottom-24 w-[128px] h-[224px] p-2 rounded-md bg-black/50" />
    )
}

const PreferenseControls: FC<PreferenseControlsProps> = ({...props}) => {

    const { isFullscreen, isPictureToPicture, iconSize } = props;
    const { handleToggleFullscreen, handelTogglePictureToPicture } = props;

    const size = iconSize || 18;

    return(
        <>
            <div className={`${isPictureToPicture ? "hidden" : "flex"} flex-shrink-0 gap-2`}>
                <Button className="relative" variant="ghost">
                    <RiVipDiamondFill size={size} />
                    {/* <DropdownMenu /> */}
                </Button>
                <Button variant="ghost">
                    <RiMic2AiFill size={size} />
                </Button>
                <Button variant="ghost">
                    <RiCreativeCommonsFill size={size} />
                </Button>
                <Button variant="ghost">
                    <RiBardFill size={size} />
                </Button>
                <Button variant="ghost">
                    <RiFlagFill size={size} />
                </Button>
                <Button variant="ghost">
                    <RiSettings2Fill size={size} />
                </Button>
                <Button onClick={handelTogglePictureToPicture} variant="ghost">
                    <RiShadowFill size={size} />
                </Button>
                <Button onClick={handleToggleFullscreen} variant="ghost">
                    {isFullscreen ? <RiFullscreenExitFill size={size} /> : <RiFullscreenFill size={size} />}
                </Button>
            </div>
        </>
    )
}

export default PreferenseControls;