"use client";
import { RefObject, useCallback, useEffect, useRef } from "react";

import { parseTime } from "@app/shared/lib/helpers/system";

interface Props {
    videoRef: RefObject<HTMLVideoElement>;
    timeSkip: string;
    isFirstStart: boolean;
    isError: boolean;
    isPlaying: boolean;
    isLooped: boolean;
    isMuted: boolean;
    showControls: boolean;
    currentTime: number;
    totalTime: number;
    setShowControls: (value: boolean) => void;
    setIsFirstStart: (value: boolean) => void;
    setIsPlaying: (value: boolean) => void;
    setIsLooped: (value: boolean) => void;
    setIsMuted: (value: boolean) => void;
    setIsEnded: (value: boolean) => void;
    setIsLoading: (value: boolean) => void;
    setCurrentTime: (value: number) => void;
    setTotalTime: (value: number) => void;
    setProgress: (value: number) => void;
}

export const usePlayerPlayback = ({
    videoRef,timeSkip,isFirstStart,isPlaying,isError,isLooped,isMuted,currentTime,totalTime,
    setIsFirstStart,setIsPlaying,setIsLooped,setIsMuted,setIsEnded,setIsLoading,
    setCurrentTime,setTotalTime,setProgress,setShowControls,
}:Props) => {

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleTogglePlay = useCallback(() => {
        if (isFirstStart) setIsFirstStart(!isFirstStart);
        if (!videoRef.current || isError) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isError, isFirstStart, setIsFirstStart, videoRef, setIsPlaying]);

    const handleTimeUpdate = () => {
        if (!videoRef.current || isError) return;
        setCurrentTime(videoRef.current.currentTime);
        setProgress((videoRef.current.currentTime / totalTime) * 100);
        handleEnded();
    };

    const handleLoadedMetadata = () => {
        if (!videoRef.current || isError) return;
        setTotalTime(videoRef.current.duration);
        setIsLoading(false);
    };

    const handleEnded = () => {
        if (isError) return;
        if (currentTime === totalTime || currentTime >= totalTime) {
            setIsPlaying(false);
            setIsEnded(true);
        }
    };

    const handleForwardSkip = () => {
        if (!videoRef.current || isError) return;
        const newTime = currentTime + parseTime(timeSkip);
        videoRef.current.currentTime = newTime > totalTime ? totalTime : newTime;
    };

    const handleBackwardSkip = () => {
        if (!videoRef.current || isError) return;
        const newTime = currentTime - parseTime(timeSkip);
        videoRef.current.currentTime = newTime < 0 ? 0 : newTime;
    };

    const handelRepeat = () => {
        if (!videoRef.current || isError) return;
        setCurrentTime(0);
        handleTogglePlay();
    }

    const toggleMute = () => setIsMuted(!isMuted);

    const toggleLoop = () => setIsLooped(!isLooped);

    const handelMouseMove = () => {
        setShowControls(true);
        if (!isPlaying) return;
        
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {setShowControls(false)}, 2000);
    }

    const onSeek = (time: number) => {
        if (!videoRef.current || isError) return;
        if (!videoRef) return;
        videoRef.current.currentTime = time;
    }

    useEffect(() => {
        return () => {if (timeoutRef.current) {clearTimeout(timeoutRef.current)}};
    }, []);

    return {
        handleTogglePlay,
        handleTimeUpdate,
        handleLoadedMetadata,
        handleEnded,
        handelRepeat,
        handleForwardSkip,
        handleBackwardSkip,
        toggleMute,
        toggleLoop,
        handelMouseMove,
        onSeek,
    };
};