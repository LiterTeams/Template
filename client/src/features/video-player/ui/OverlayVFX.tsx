import { FC } from "react";

import Overlay from "./Overlay";

import { OverlayVFXProps } from "../types/player";

const OverlayVFX: FC<OverlayVFXProps> = ({...props}) => {

    const { useMovieMode, useAberrationEffect, useBlackoutEffect, useVFX } = props;

    const movieModeStyle = `absolute duration-300 left-0 top-0 flex flex-col justify-between size-full ${useMovieMode ? "opacity-100" : "opacity-0"}`;
    const aberrationEffectStyle = `noise duration-300 ${useAberrationEffect ? "opacity-100" : "opacity-0"}`;
    const blackoutEffectStyle = `blackout duration-300 ${useBlackoutEffect ? "opacity-100" : "opacity-0"}`;

    return(
        <Overlay className="pointer-events-none z-[1]">
            <div className={movieModeStyle}>
                <div className="w-full h-[10%] bg-black" />
                <div className="w-full h-[10%] bg-black" />
            </div>
            <div className={aberrationEffectStyle} />
            <div className={blackoutEffectStyle} />
        </Overlay>
    )
}

export default OverlayVFX;