"use client";

import { LCPVideoIF } from "@app/entities/interfaces/player.interface";

export default function LiteConnectVideo({ref,loop,muted,isFullscreen,sources,poster,playOnClick,playOnHover,preload,disablePictureInPicture,disableRemotePlayback,onTimeUpdate,onLoadedMetadata,onEnded,togglePlay}:LCPVideoIF){

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
            onClick={() => playOnClick ? togglePlay() : null}
            onMouseOver={() => playOnHover ? togglePlay() : null}
            onMouseOut={() => playOnHover ? togglePlay() : null}
            className={`absolute w-full h-full object-cover pointer-events-auto`}
        >
            {Array.isArray(sources)
            ? sources.map((source,index) => <source key={`source-${index}`} src={source.src} type={`video/${source.mimetype}`} />)
            : <source src={sources} />
            }
        </video>
    )
}