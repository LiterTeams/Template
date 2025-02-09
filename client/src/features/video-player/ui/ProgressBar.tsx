import { FC } from "react";

import { TimelineControlsProps } from "../types/player";

export const ProgressBar: FC<Pick<TimelineControlsProps, "progress">> = ({progress}) => {
    return(
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
            <div style={{ width: `${progress}%` }} className="block h-full bg-orange-500 rounded-full pointer-events-none" />
            <div style={{ left: `${progress - .5}%` }} className="absolute pointer-events-auto cursor-pointer top-0 bottom-0 my-auto duration-300 bg-orange-500 rounded-full ease-in-out size-3 group-hover:size-4" />
        </div>
    )
}