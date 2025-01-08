"use client";
import { useState, useEffect, useCallback, useRef } from "react";

import durationConver from "@lib/durationConver";

export default function useVideoPlayer(autoPlay: boolean = false, mute: boolean = false, volume: number = 0.1){
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isEnded, setIsEnded] = useState(false);

    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [currentDurationl, setCurrentDuration] = useState("00:00:00");
    const [totalDuration, setTotalDuration] = useState("00:00:00");
    const [frames, setFrames] = useState(0);

    const play = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.volume = mute ? 0 : volume;
        videoRef.current.play();
        setIsPlaying(true);
    }, [mute, volume]);
    
    const pause = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.pause();
        setIsPlaying(false);
    }, []);

    const toggle = useCallback(() => {
        if (!videoRef.current) return;
        return !isPlaying ? play() : pause();
    }, [isPlaying, play, pause]);

    const globalUpdate = () => {
        if (!videoRef.current) return;
        updateTotalDuration();
        updateCurrentDuration();
        updateVideoFrames();
    }

    const updateTotalDuration = () => {
        if (!videoRef.current) return;
        setDuration(videoRef.current.duration);
        setTotalDuration(durationConver(videoRef.current.duration));
    };

    const updateCurrentDuration = () => {
        if (!videoRef.current) return;
        setTime(videoRef.current.currentTime);
        setCurrentDuration(durationConver(videoRef.current.currentTime));
        if (time == duration) setIsEnded(true);
    }

    const updateVideoFrames = () => {
        if (!videoRef.current) return;
        setFrames(videoRef.current.currentTime * 24);
    }

    useEffect(() => {
        if (autoPlay) toggle();
    }, [isPlaying, totalDuration, frames, autoPlay, toggle]);

    return { isPlaying, isEnded, videoRef, frames, time, duration, currentDurationl, totalDuration, toggle, updateCurrentDuration, globalUpdate }
}