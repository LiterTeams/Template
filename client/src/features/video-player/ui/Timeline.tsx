import { FC, MouseEvent } from "react";

import { ProgressBar, TimeLineChapters } from "./";

import { durationConver } from "@shared/lib/helpers/system";

import { TimelineControlsProps } from "../types/player";

export const Timeline: FC<TimelineControlsProps> = ({...props}) => {

    const { currentTime, totalTime, progress, onSeek } = props;
    const currentDuration = durationConver(currentTime);
    const totalDuration = durationConver(totalTime);

    const handleSeek = (e: MouseEvent<HTMLDivElement>) => {
        if (totalTime <= 0) return;

        const timeline = e.currentTarget;
        const rect = timeline.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newTime = (offsetX / rect.width) * totalTime;

        onSeek(newTime);
    };

    return(
        <div className="flex flex-grow items-center gap-3">
            <p className="flex-shrink-0 pointer-events-none">{currentDuration} / {totalDuration}</p>
            <div onClick={handleSeek} className="relative duration-300 w-full h-2 hover:h-3 bg-white/20 rounded-full group cursor-pointer">
                <ProgressBar progress={progress} />
                <TimeLineChapters totalTime={totalTime} />
            </div>
        </div>
    )
}