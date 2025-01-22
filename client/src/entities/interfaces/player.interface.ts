import { ChangeEvent, Ref, VideoHTMLAttributes } from "react";

interface _VideoSourceIF {
    src: string;
    mimetype: string;
}

interface VideoPlayerIF {
    className?: string;
    poster?: string;
    sources?: _VideoSourceIF[] | string;
    preload?: "none"|"metadata"|"auto";
    autoPlay?: boolean;
    volume?: number;
    loop?: boolean;
    muted?: boolean;
    useControls?: boolean;
    useOverlay?: boolean;
    playOnClick?: boolean;
    playOnHover?: boolean;
}

interface LCPVideoIF extends VideoHTMLAttributes<HTMLVideoElement>, Pick<VideoPlayerIF, "playOnClick"|"playOnHover"|"poster"|"sources"> {
    ref: Ref<HTMLVideoElement> | undefined;
    preload?: "none"|"metadata"|"auto";
    isFullscreen: boolean;
    loop: boolean;
    muted: boolean;
    playOnClick?: boolean;
    playOnHover?: boolean;
    togglePlay: () => void;
}

interface LCPVideoControlsIF extends Pick<LCPVideoIF, "togglePlay"> {
    isMuted: boolean;
    isPlaying: boolean;
    isFullscreen: boolean;
    volume: number;
    progress: number;
    currentVideoDurationl: string;
    totalVideoDuration: string;
    toggleFullscreen: () => void;
    handleVolumeChange: (event:ChangeEvent<HTMLInputElement>) => void;
    handelMuteChange: () => void;
}

// interface ArgonVideoIF extends VideoHTMLAttributes<HTMLVideoElement> {
//     ref: Ref<HTMLVideoElement> | undefined;
// }

export type { VideoPlayerIF, LCPVideoControlsIF, LCPVideoIF }