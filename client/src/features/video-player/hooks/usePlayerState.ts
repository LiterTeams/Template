"use client";
import { useState, useEffect } from "react";
import { SourceProps, SubtitleProps, VoiceProps } from "../types/player";

interface Props {
    loop?: boolean | undefined,
    sources:SourceProps[],
    voices?:VoiceProps[],
    subtitles?:SubtitleProps[],
}

export default function usePlayerState({loop = false, sources = [], voices = [], subtitles = []}:Props){

    const [isFirstStart, setIsFirstStart] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [isPictureToPicture, setIsPictureToPicture] = useState<boolean>(false);
    const [isEnded, setIsEnded] = useState<boolean>(false);
    const [isLooped, setIsLooped] = useState<boolean>(loop);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [showControls, setShowControls] = useState<boolean>(false);
    
    const [volume, setVolume] = useState<number>(0.25);
    const [progress, setProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);

    const [currentQuality, setCurrentQuality] = useState<number>(sources.find((source) => source.default)?.id || 1);
    const [currentVoice, setCurrentVoice] = useState<number>(voices ? voices.find((voice) => voice.default)?.id || 1 : 0);
    const [currentSubtitle, setCurrentSubtitle] = useState<number>(subtitles ? subtitles.find((subtitle) => subtitle.default)?.id || 0 : 0);

    useEffect(() => {
        if (isFirstStart) return;
        const defaultSource = sources.find((source) => source.default) || sources[0];
        setCurrentQuality(defaultSource.id);
    }, [sources, isFirstStart]);

    return {
        isFirstStart, setIsFirstStart,
        isPlaying, setIsPlaying,
        isLoading, setIsLoading,
        isFullscreen, setIsFullscreen,
        isPictureToPicture, setIsPictureToPicture,
        isEnded, setIsEnded,
        isLooped, setIsLooped,
        isMuted, setIsMuted,
        currentQuality, setCurrentQuality,
        currentVoice, setCurrentVoice,
        currentSubtitle, setCurrentSubtitle,
        volume, setVolume,
        progress, setProgress,
        currentTime, setCurrentTime,
        totalTime, setTotalTime,
        showControls, setShowControls,
        isError, setIsError,
    };
}