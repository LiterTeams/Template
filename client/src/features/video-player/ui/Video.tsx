import { FC } from "react";

import { VideoProps } from "../types/player";

const Video: FC<VideoProps> = ({...props}) => {

    const { ref, isLooped, isMuted, sources, currentQuality, currentSubtitle, subtitles, preload, disablePictureInPicture, disableRemotePlayback } = props;
    const { handleTogglePlay, handleLoadedMetadata, handleTimeUpdate, handleEnded, handleToggleFullscreen, handleError } = props;

    const subtitle = subtitles ? subtitles.find(elem => elem.id == currentSubtitle) : undefined;
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
            {/* {subtitle && <track label={subtitle.label} kind="subtitles" srcLang={subtitle.srclang} src={subtitle.src} default />} */}
            {/* {!Array.isArray(sources) && typeof sources !== "object" && <source src={sources} />}
            {Array.isArray(sources) && sources.map((source,index) => <source key={`source-${index}`} src={source.src} type={`video/${source.mimetype}`} />)} */}
        </video>
    )

}

{/* <track
label="English"
kind="subtitles"
srclang="en"
src="captions/vtt/sintel-en.vtt"
default />
<track
label="Deutsch"
kind="subtitles"
srclang="de"
src="captions/vtt/sintel-de.vtt" />
<track
label="Español"
kind="subtitles"
srclang="es"
src="captions/vtt/sintel-es.vtt" /> */}

export default Video;