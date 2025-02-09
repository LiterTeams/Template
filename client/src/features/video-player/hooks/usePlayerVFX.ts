"use client";
import { useState } from "react";

interface Props {
    movieMode?: boolean;
    aberrationEffect?: boolean;
    blackoutEffect?: boolean;
    VFX?: boolean;
}

export const usePlayerVFX = ({movieMode = false, aberrationEffect = false, blackoutEffect = false, VFX = false}:Props) => {

    const [useMovieMode, setUseMovieMode] = useState(movieMode);
    const [useAberrationEffect, setUseAberrationEffect] = useState(aberrationEffect);
    const [useBlackoutEffect, setUseBlackoutEffect] = useState(blackoutEffect);
    const [useVFX, setUseVFX] = useState(VFX);

    const toggleMovieMode = () => setUseMovieMode(prev => !prev);
    const toggleAberrationEffect = () => setUseAberrationEffect(prev => !prev);
    const toggleBlackoutEffect = () => setUseBlackoutEffect(prev => !prev);
    const toggleVFX = () => setUseVFX(prev => !prev);

    return {
        useMovieMode, toggleMovieMode,
        useAberrationEffect, toggleAberrationEffect,
        useBlackoutEffect, toggleBlackoutEffect,
        useVFX, toggleVFX,
    }
}