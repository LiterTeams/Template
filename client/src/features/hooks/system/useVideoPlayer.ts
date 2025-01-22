"use client";
import { useState, useEffect, useCallback, useRef, ChangeEvent } from "react";

import durationConver from "@lib/durationConver";

export default function useVideoPlayer(autoPlay: boolean = false, mute: boolean = true, volume: number = .5){
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isEnded, setIsEnded] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [videoVolume, setVideoVolume] = useState<number>(volume);
    const [isMuted, setIsMuted] = useState<boolean>(mute);

    const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
    const [totalVideoTime, setTotalVideoTime] = useState<number>(0);

    const [currentVideoDurationl, setCurrentVideoDuration] = useState<string>("00:00:00");
    const [totalVideoDuration, setTotalVideoDuration] = useState<string>("00:00:00");

    const play = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.play();
        setIsPlaying(true);
    }, []);
    
    const pause = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.pause();
        setIsPlaying(false);
    }, []);

    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;
        return !isPlaying ? play() : pause();
    }, [isPlaying, play, pause]);

    const toggleFullScreen = () => setIsFullscreen(!isFullscreen);

    const handleVolumeChange = (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!videoRef.current) return;
        setVideoVolume(parseFloat(event.target.value));
        videoRef.current.volume = videoVolume;
    }

    const handelMuteChange = () => setIsMuted(!isMuted);

    const onLoadedMetadata = () => {
        if (!videoRef.current) return;
        updateTotalDuration();
        onTimeUpdate();
    }

    const updateTotalDuration = () => {
        if (!videoRef.current) return;
        // if (isNaN(videoRef.current.duration)) return;
        const duration = videoRef.current.duration;
        setTotalVideoTime(duration);
        setTotalVideoDuration(durationConver(duration));
    };

    const onTimeUpdate = () => {
        if (!videoRef.current) return;
        if (totalVideoTime == 0) updateTotalDuration();
        const currentTime = videoRef.current.currentTime;
        setCurrentVideoTime(currentTime);
        setCurrentVideoDuration(durationConver(currentTime));
        setProgress((currentTime / totalVideoTime) * 100);
        if (currentVideoTime == totalVideoTime || progress >= 100) setIsEnded(true);
    }

    useEffect(() => {
        if (autoPlay && !isPlaying) togglePlay();
    }, [videoRef, isPlaying, autoPlay, togglePlay]);

    return { isPlaying, isFullscreen, videoVolume, isMuted, isEnded, progress, videoRef, currentVideoTime, totalVideoTime, currentVideoDurationl, totalVideoDuration, togglePlay, toggleFullScreen, handleVolumeChange, handelMuteChange, onTimeUpdate, onLoadedMetadata }
}