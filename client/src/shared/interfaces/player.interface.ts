import { ChangeEvent, Ref, VideoHTMLAttributes } from "react";

interface OverlayIF {
    className?: string;
    children?: ReactNode
}

interface LCPVideoSourceIF {
    src: string;
    mimetype: string;
}

interface LCPVideoPlayerIF extends Pick<VideoHTMLAttributes<HTMLVideoElement>, "preload"|"loop"|"muted"|"autoPlay"|"poster"> {
    className?: string;
    sources?: LCPVideoSourceIF[] | LCPVideoSourceIF | string;
    volume?: number;
    useControls?: boolean;
    playOnClick?: boolean;
    playOnHover?: boolean;
}

interface LCPVideoIF extends Pick<LCPVideoPlayerIF, "playOnClick"|"playOnHover"|"poster"|"sources"|"muted"|"loop"|"preload">, Pick<VideoHTMLAttributes<HTMLVideoElement>, "onEnded"|"disablePictureInPicture"|"disableRemotePlayback"|"onLoadedMetadata"|"onTimeUpdate"> {
    ref: Ref<HTMLVideoElement> | undefined;
    isFullscreen: boolean;
    playOnClick?: boolean;
    playOnHover?: boolean;
    handleTogglePlay: () => void;
}

interface LCPVideoControlsIF extends Pick<LCPVideoIF, "handleTogglePlay"|"isFullscreen"> {
    isMuted: boolean;
    isPlaying: boolean;
    volume: number;
    progressBar: number;
    currentVideoDurationl: string;
    totalVideoDuration: string;
    handletoggleFullscreen: () => void;
    handleVolumeChange: (event:ChangeEvent<HTMLInputElement>) => void;
    handelMuteChange: () => void;
}

export type { OverlayIF, LCPVideoSourceIF, LCPVideoPlayerIF, LCPVideoIF, LCPVideoControlsIF }