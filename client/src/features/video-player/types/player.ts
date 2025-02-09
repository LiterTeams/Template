import { ReactNode, Ref, VideoHTMLAttributes } from "react";

interface BaseProps {
    id: number;
    label: string;
    src: string;
    default?: boolean;
}

interface SourceProps extends BaseProps {
    quality?: string;
    mimetype: string;
}

interface VoiceProps extends BaseProps {
    mimetype: string;
}

interface SubtitleProps extends BaseProps {
    srclang?: "ru" | "en" | "us" | "jp" | string;
}

interface ControlsProps {
    isPictureToPicture: boolean;
    showControls: boolean;
    isPlaying: boolean;
    isEnded: boolean;
    isMuted: boolean;
    isLooped: boolean;
    isFullscreen: boolean;
    volume: number;
    currentTime: number;
    totalTime: number;
    progress: number;
    currentQuality?: number;
    currentVoice?: number;
    currentSubtitle?: number;
    sources?: SourceProps[];
    voices?: VoiceProps[];
    subtitles?: SubtitleProps[];
    autoRemoveMissingControllers?: boolean;
    iconSize?: number;
    useMovieMode: boolean;
    useAberrationEffect: boolean;
    useBlackoutEffect: boolean;
    useVFX: boolean;

    // Handlers
    toggleMovieMode: () => void;
    toggleVFX: () => void;
    toggleAberrationEffect: () => void;
    toggleBlackoutEffect: () => void;
    toggleLoop: () => void;
    toggleMute: () => void;

    onSeek: (time: number) => void;

    handleToggleSubtitles: (id: number) => void;
    handleChangeQuality: (id: number) => void;
    handleVoiceChange: (id: number) => void;
    handleForwardSkip: () => void;
    handleBackwardSkip: () => void;
    handleTogglePlay: () => void;
    handleToggleFullscreen: () => void;
    handelVolumeChange: (newVolume: number) => void;
    handelTogglePictureToPicture: () => void;
    handelRepeat: () => void;
}

type PlayControlsProps = Pick<
    ControlsProps,
    | "isPictureToPicture"
    | "isPlaying"
    | "isEnded"
    | "isMuted"
    | "volume"
    | "iconSize"
    | "handleForwardSkip"
    | "handleBackwardSkip"
    | "handleTogglePlay"
    | "toggleMute"
    | "handelVolumeChange"
    | "handelRepeat"
>;

type PreferenseControlsProps = Pick<
    ControlsProps,
    | "isPictureToPicture"
    | "isFullscreen"
    | "useMovieMode"
    | "useAberrationEffect"
    | "useBlackoutEffect"
    | "useVFX"
    | "iconSize"
    | "isLooped"
    | "autoRemoveMissingControllers"
    | "sources"
    | "voices"
    | "subtitles"
    | "currentQuality"
    | "currentVoice"
    | "currentSubtitle"
    | "handleToggleFullscreen"
    | "handelTogglePictureToPicture"
    | "handleToggleSubtitles"
    | "handleVoiceChange"
    | "toggleLoop"
    | "handleChangeQuality"
    | "toggleAberrationEffect"
    | "toggleBlackoutEffect"
    | "toggleMovieMode"
    | "toggleVFX"
    | "showControls"
>;

type TimelineControlsProps = Pick<
    ControlsProps,
    "progress" | "currentTime" | "totalTime" | "onSeek"
>;

interface OverlayVFXProps
    extends Pick<
        ControlsProps,
        | "useMovieMode"
        | "useAberrationEffect"
        | "useBlackoutEffect"
        | "useVFX"
    > {}

interface PlayerProps
    extends Pick<
            VideoHTMLAttributes<HTMLVideoElement>,
            | "loop"
            | "muted"
            | "autoPlay"
            | "poster"
            | "disablePictureInPicture"
            | "disableRemotePlayback"
        > {
    className?: string;
    movieMode?: boolean;
    aberrationEffect?: boolean;
    blackoutEffect?: boolean;
    VFX?: boolean;
    preload?: "none" | "metadata" | "auto";
    showControls?: boolean;
    iconSize?: number;
    children?: ReactNode;
    timeSkip?: string;
    sources?: SourceProps[];
    subtitles?: SubtitleProps[];
    voices?: VoiceProps[];
    autoRemoveMissingControllers?: boolean;
}

interface VideoProps
    extends Pick<
            ControlsProps,
            | "handleTogglePlay"
            | "handleToggleFullscreen"
        > {
    ref: Ref<HTMLVideoElement> | null;
    isLooped: boolean;
    isMuted: boolean;
    handleLoadedMetadata: () => void;
    handleTimeUpdate: () => void;
    handleEnded: () => void;
    handleError: (value: boolean) => void;
    preload?: "none" | "metadata" | "auto";
    sources?: SourceProps[];
    subtitles?: SubtitleProps[];
    currentQuality?: number;
    currentSubtitle?: number;
    poster?: string;
    disablePictureInPicture?: boolean;
    disableRemotePlayback?: boolean;
}

export type {
    ControlsProps,
    PlayControlsProps,
    PreferenseControlsProps,
    TimelineControlsProps,
    OverlayVFXProps,
    PlayerProps,
    VideoProps,
    SourceProps,
    VoiceProps,
    SubtitleProps,
};