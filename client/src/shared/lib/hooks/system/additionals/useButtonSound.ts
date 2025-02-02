import { useEffect, useRef, useCallback, MouseEvent } from "react";

export default function useButtonSound(
    soundSrc: string | undefined,
    onClickButton?: (event: MouseEvent<HTMLButtonElement>) => void,
    onClickAnchor?: (event: MouseEvent<HTMLAnchorElement>) => void,
){
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!soundSrc) return;
        if (typeof window !== "undefined" && !audioRef.current) {
            audioRef.current = new Audio(soundSrc);
            audioRef.current.volume = 0.2;
        }
    }, [soundSrc]);

    const handleButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        onClickButton?.(event);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    }, [onClickButton]);

    const handleAnchorClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        onClickAnchor?.(event);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    }, [onClickAnchor]);

    return { handleButtonClick, handleAnchorClick };
};