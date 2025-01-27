"use client";
import { useState, useEffect, useCallback, useRef, ChangeEvent } from "react";

import durationConver from "@lib/durationConver";

export default function useVideoPlayer(autoPlay: boolean = false, mute: boolean = true){
    const ref = useRef<HTMLVideoElement | null>(null);
    
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isEnded, setIsEnded] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(mute);

    const [progressBar, setProgressBar] = useState<number>(0);
    const [volume, setVolume] = useState<number>(.5);

    const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
    const [totalVideoTime, setTotalVideoTime] = useState<number>(0);

    const [currentVideoDurationl, setCurrentVideoDuration] = useState<string>("00:00:00");
    const [totalVideoDuration, setTotalVideoDuration] = useState<string>("00:00:00");

    const _handleOnPlay = useCallback(() => {
        if (!ref.current) return;
        ref.current.play();
        setIsPlaying(true);
    }, []);
    
    const _handleOnPause = useCallback(() => {
        if (!ref.current) return;
        ref.current.pause();
        setIsPlaying(false);
    }, []);

    const handleTogglePlay = useCallback(() => {
        if (!ref.current) return;
        switch(isPlaying){
            case true: _handleOnPause(); break;
            case false: _handleOnPlay(); break;
            default: console.log("Unknown Error");
        }
    }, [isPlaying, _handleOnPlay, _handleOnPause]);

    const handleToggleFullscreen = () => setIsFullscreen(!isFullscreen);

    const handleVolumeChange = (event:ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!ref.current) return;
        setVolume(parseFloat(event.target.value));
        ref.current.volume = volume;
    }

    const handelMuteChange = () => setIsMuted(!isMuted);

    const onLoadedMetadata = () => {
        if (!ref.current) return;
        _updateTotalDuration();
        onTimeUpdate();
    }

    const _updateTotalDuration = () => {
        if (!ref.current) return;
        const duration = ref.current.duration;
        setTotalVideoTime(duration);
        setTotalVideoDuration(durationConver(duration));
        _updateProgressBar();
        _updateEnded();
    };

    const _updateProgressBar = () => {
        setProgressBar((currentVideoTime / totalVideoTime) * 100);
    }

    const _updateEnded = () => {
        if (currentVideoTime == totalVideoTime || progressBar >= 100){
            setIsEnded(true);
            setIsPlaying(false);
        }
    }

    const onTimeUpdate = () => {
        if (!ref.current) return;
        if (totalVideoTime == 0) _updateTotalDuration();
        const currentTime = ref.current.currentTime;
        setCurrentVideoTime(currentTime);
        setCurrentVideoDuration(durationConver(currentTime));
        _updateProgressBar();
        _updateEnded();
    }

    useEffect(() => {
        if (autoPlay && !isPlaying) handleTogglePlay();
    }, [ref, isPlaying, autoPlay, handleTogglePlay]);

    return {
        ref, isPlaying, isEnded, isMuted, isFullscreen,
        progressBar, volume, currentVideoDurationl, totalVideoDuration,
        handleTogglePlay, handleToggleFullscreen, handleVolumeChange, handelMuteChange, onLoadedMetadata, onTimeUpdate,
    }
}