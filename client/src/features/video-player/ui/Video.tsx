import { FC } from "react";

import { VideoProps } from "../types/player";

export const Video: FC<VideoProps> = ({...props}) => {

    const { ref, isLooped, isMuted, sources, currentQuality, currentSubtitle, subtitles, preload, disablePictureInPicture, disableRemotePlayback } = props;
    const { handleTogglePlay, handleLoadedMetadata, handleTimeUpdate, handleEnded, handleToggleFullscreen, handleError } = props;

    const source = sources ? sources.find(elem => elem.id == currentQuality) : undefined

    return(
        <video
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={(e) => {console.log(e); handleError(true);}}
            onEnded={handleEnded}
            ref={ref}
            loop={isLooped}
            muted={isMuted}
            preload={preload}
            disablePictureInPicture={disablePictureInPicture}
            disableRemotePlayback={disableRemotePlayback}
            onClick={handleTogglePlay}
            onDoubleClick={(e) => {e.stopPropagation(); e.preventDefault(); handleToggleFullscreen();}}
            className={`absolute aspect-video w-full h-full object-cover pointer-events-auto`}
        >
            {source && <source src={source.src} type={`video/${source.mimetype}`} />}
        </video>
    )

}