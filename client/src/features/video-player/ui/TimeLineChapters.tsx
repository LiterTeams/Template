import { FC } from "react";

import { TimelineControlsProps } from "../types/player";

export const TimeLineChapters: FC<Pick<TimelineControlsProps, "totalTime">> = ({totalTime}) => {

    const chapters = [
        { id: 1,  label: "Превью", start: 0, end: 60,},
        { id: 2, label: "Реклама", start: 60, end: 200,},
        { id: 3, label: "Project Zomboid", start: 200, end: totalTime,},
    ];

    return(
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
            
        </div>
    )
}