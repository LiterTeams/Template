"use client";
import { useState, useEffect, useCallback, useRef } from "react";

import durationConver from "@lib/durationConver";

export default function useAudioPlayer(autoPlay: boolean = false, mute: boolean = false, volume: number = 0.1){
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isEnded, setIsEnded] = useState(false);

    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const [currentDuration, setCurrentDuration] = useState("00:00:00");
    const [totalDuration, setTotalDuration] = useState("00:00:00");

    const play = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = mute ? 0 : volume;
        audioRef.current.play();
        setIsPlaying(true);
    }, [mute, volume]);
    
    const pause = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setIsPlaying(false);
    }, []);

    const toggle = useCallback(() => {
        if (!audioRef.current) return;
        return !isPlaying ? play() : pause();
    }, [isPlaying, , play, pause]);

    const globalUpdate = () => {
        if (!audioRef.current) return;
        updateTotalDuration();
        updateCurrentDuration();
    }

    const updateTotalDuration = () => {
        if (!audioRef.current) return;
        setDuration(audioRef.current.duration);
        setTotalDuration(durationConver(audioRef.current.duration));
    };

    const updateCurrentDuration = () => {
        if (!audioRef.current) return;
        setTime(audioRef.current.currentTime);
        setCurrentDuration(durationConver(audioRef.current.currentTime));
        if (time == duration) setIsEnded(true);
    }

    useEffect(() => {
        if (autoPlay) toggle();
    }, [isPlaying, totalDuration, autoPlay, toggle]);

    return { isPlaying, isEnded, audioRef, time, duration, currentDuration, totalDuration, toggle, updateCurrentDuration, globalUpdate }
}