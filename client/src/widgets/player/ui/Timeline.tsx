import { FC } from "react";

import { TimelineControlsProps } from "../types/controls.interfaces";

import durationConver from "@shared/lib/durationConver";

const Timeline: FC<TimelineControlsProps> = ({...props}) => {

    const { currentTime, totalTime, progress } = props;
    const currentDuration = durationConver(currentTime);
    const totalDuration = durationConver(totalTime);

    return(
        <div className="flex flex-grow items-center gap-3">
            <p>{currentDuration} / {totalDuration}</p>
            <div className="relative flex-grow h-[2px]">
                <div style={{width:`${progress}%`}} className={`absolute z-[1] duration-300 left-0 top-0 h-inherit bg-orange-600 rounded-lg`} />
                <span className="absolute z-[1] bg-orange-600 rounded-full duration-300 size-2 -top-1" style={{left: `${progress}%`}} />
                <div className="absolute z-[0] left-0 top-0 w-full h-inherit bg-white rounded-lg" />
            </div>
        </div>
    )
}

export default Timeline;