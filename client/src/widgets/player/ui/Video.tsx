import { FC } from "react";

import { VideoProps } from "../types/controls.interfaces";

const Video: FC<VideoProps> = ({...props}) => {

    const { ref, isLooped, isMuted, sources, poster, preload, disablePictureInPicture, disableRemotePlayback } = props;
    const { handleTogglePlay, handleLoadedMetadata, handleTimeUpdate, handleEnded } = props;

    return(
        <video
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={(event) => console.log(event)}
            onEnded={handleEnded}
            ref={ref}
            poster={poster}
            loop={isLooped}
            muted={isMuted}
            preload={preload}
            disablePictureInPicture={disablePictureInPicture}
            disableRemotePlayback={disableRemotePlayback}
            onClick={handleTogglePlay}
            className={`absolute aspect-video w-full h-full object-cover pointer-events-auto`}
        >
            {!Array.isArray(sources) && typeof sources !== "object" && <source src={sources} />}
            {Array.isArray(sources) && sources.map((source,index) => <source key={`source-${index}`} src={source.src} type={`video/${source.mimetype}`} />)}
        </video>
    )

}

export default Video;