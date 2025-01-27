"use client";

import { LCPVideoIF } from "@shared/interfaces/player.interface";

export default function LiteConnectVideo({ref,loop,muted,isFullscreen,sources,poster,playOnClick,playOnHover,preload,disablePictureInPicture,disableRemotePlayback,onTimeUpdate,onLoadedMetadata,onEnded,handleTogglePlay}:LCPVideoIF){

    return(
        <video
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={onEnded}
            ref={ref}
            poster={poster}
            loop={loop}
            muted={muted}
            preload={preload}
            disablePictureInPicture={disablePictureInPicture}
            disableRemotePlayback={disableRemotePlayback}
            onClick={() => playOnClick ? handleTogglePlay() : null}
            onMouseOver={() => playOnHover ? handleTogglePlay() : null}
            onMouseOut={() => playOnHover ? handleTogglePlay() : null}
            className={`absolute w-full h-full object-cover pointer-events-auto`}
        >
            {Array.isArray(sources)
                ? sources.map((source,index) => <source key={`source-${index}`} src={source.src} type={`video/${source.mimetype}`} />)
                : (typeof sources === "object" 
                    ? <source src={sources.src} type={`video/${sources.mimetype}`} />
                    : <source src={sources} />
                )
            }
        </video>
    )
}