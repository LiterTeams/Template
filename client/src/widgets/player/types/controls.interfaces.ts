import { Ref, VideoHTMLAttributes } from "react";

interface ControlsProps {
    isPictureToPicture: boolean;
    isPlaying: boolean;
    isEnded: boolean;
    isMuted: boolean;
    isFullscreen: boolean;
    volume: number;
    currentTime: number;
    totalTime: number;
    progress: number;
    handleForwardSkip: () => void;
    handleBackwardSkip: () => void;
    handleTogglePlay: () => void;
    handleToggleFullscreen: () => void;
    handelMuteChange: () => void;
    handelVolumeChange: (newVolume: number) => void;
    handelTogglePictureToPicture: () => void;
    handelRepeat: () => void;
    iconSize?: number;
}

interface PlayControlsProps extends Pick<ControlsProps, 
"isPictureToPicture"|"isPlaying"|"isEnded"|"isMuted"|"volume"|"iconSize"|
"handleForwardSkip"|"handleBackwardSkip"|"handleTogglePlay"|
"handelMuteChange"|"handelVolumeChange"|"handelRepeat"
> {}

interface PreferenseControlsProps extends Pick<ControlsProps,
"isPictureToPicture"|"isFullscreen"|"iconSize"|
"handleToggleFullscreen"|"handelTogglePictureToPicture"
> {}

interface TimelineControlsProps extends Pick<ControlsProps, "progress"|"currentTime"|"totalTime"> {}

interface PlayerProps extends Pick<VideoHTMLAttributes<HTMLVideoElement>, "loop"|"muted"|"autoPlay"|"poster"|"disablePictureInPicture"|"disableRemotePlayback">{
    className?: string;
    preload?: "none" | "metadata" | "auto";
    showControls?: boolean;
    iconSize?: number;
    sources?: _VideoSourceProps[] | _VideoSourceProps | string;
}

interface VideoProps extends Pick<ControlsProps, "handleTogglePlay">, Pick<PlayerProps, "preload"|"sources"|"poster"|"disablePictureInPicture"|"disableRemotePlayback"> {
    ref: Ref<HTMLVideoElement> | null;
    isLooped: boolean;
    isMuted: boolean;
    handleLoadedMetadata: () => void;
    handleTimeUpdate: () => void;
    handleEnded: () => void;
}

interface _VideoSourceProps {
    src: string;
    mimetype: string;
}

export type { ControlsProps, PlayControlsProps, PreferenseControlsProps, TimelineControlsProps, PlayerProps, VideoProps, _VideoSourceProps };