"use client";
import { useRef, useState, useEffect, useCallback } from "react";


const usePlayer = (loop=false, muted=true, autoPlay=false, timeSkip="15s") => {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<HTMLDivElement | null>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [isPictureToPicture, setIsPictureToPicture] = useState<boolean>(false);
    const [isEnded, setIsEnded] = useState<boolean>(false);
    const [isLooped, setIsLooped] = useState<boolean>(loop);
    const [isMuted, setIsMuted] = useState<boolean>(muted);

    const [volume, setVolume] = useState<number>(0.25);
    const [progress, setProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [totalTime, setTotalTime] = useState<number>(0)

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateMetadata = () => {
            setTotalTime(video.duration);
            setIsLoading(false);
        };

        switch(video.readyState >= 1){
            case true: updateMetadata(); break;
            default: video.addEventListener("loadedmetadata", updateMetadata);
        }

        return () => video.removeEventListener("loadedmetadata", updateMetadata);
    }, []);

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setCurrentTime(videoRef.current.currentTime);
        setProgress((videoRef.current.currentTime / totalTime) * 100);
    }

    const handleLoadedMetadata = () => {
        if (!videoRef.current) return;
        setTotalTime(videoRef.current.duration);
        setIsLoading(false);
    }

    const handleTogglePlay = useCallback(() => {
        if (!videoRef.current) return;
        switch(isPlaying){
            case true: videoRef.current.pause(); break;
            default: videoRef.current.play();
        }
        setIsPlaying(prev => !prev);
    }, [isPlaying])

    const handelRepeat = () => {
        handleTogglePlay();
        setIsEnded(false);
    }

    const handleForwardSkip = () => {
        if (!videoRef.current) return;
        const newTimeline = currentTime + 15;
        switch(newTimeline > totalTime){
            case true: videoRef.current.currentTime = totalTime; break;
            default: videoRef.current.currentTime = newTimeline;
        }
    }

    const handleBackwardSkip = () => {
        if (!videoRef.current) return;
        const newTimeline = currentTime - 15;
        switch(0 > newTimeline){
            case true: videoRef.current.currentTime = 0; break;
            default: videoRef.current.currentTime = newTimeline;
        }
    }

    const handleEnded = () => {
        switch(currentTime == totalTime || progress >= 100){
            case true: setIsPlaying(false); setIsEnded(true); break;
        }
    }

    const handelMuteChange = () => setIsMuted(prev => !prev);

    const handelLoopChange = () => setIsLooped(prev => !prev);

    const handelVolumeChange = (newVolume: number) => {
        if (!videoRef.current) return;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
    }

    const handleToggleFullscreen = async () => {
        const player = playerRef.current;
        if (!player) return;
        
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await player.requestFullscreen();
            }
            setIsFullscreen(!document.fullscreenElement);
        } catch (error) {
            console.log(error);
        }
        setIsPictureToPicture(false);
    }

    const handelTogglePictureToPicture = () => {
        setIsPictureToPicture(prev => !prev);
        setIsFullscreen(false);
    }

    useEffect(() => {
        if (autoPlay && !isPlaying) handleTogglePlay();
    },[autoPlay, handleTogglePlay, isPlaying]);

    return {
        videoRef,
        playerRef,
        isPlaying,
        isEnded,
        isFullscreen,
        isPictureToPicture,
        isMuted,
        isLoading,
        isLooped,
        volume,
        progress,
        currentTime,
        totalTime,
        handleTogglePlay,
        handelRepeat,
        handleForwardSkip,
        handleBackwardSkip,
        handleLoadedMetadata,
        handleTimeUpdate,
        handleEnded,
        handelMuteChange,
        handelLoopChange,
        handelVolumeChange,
        handleToggleFullscreen,
        handelTogglePictureToPicture,
    }
}

export default usePlayer;