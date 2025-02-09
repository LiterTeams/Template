"use client";
import { RefObject } from "react";

interface Props {
    playerRef: RefObject<HTMLDivElement> | null;
    isPictureToPicture: boolean;
    setIsFullscreen: (value: boolean) => void,
    setIsPictureToPicture: (value: boolean) => void,
}

export const usePlayerUI = ({playerRef,isPictureToPicture,setIsFullscreen,setIsPictureToPicture}:Props) => {
    const handleToggleFullscreen = async () => {
        if (!playerRef || !playerRef.current) return;

        try {
            if (document.fullscreenElement) { await document.exitFullscreen();
            } else { await playerRef.current.requestFullscreen();}
            setIsFullscreen(!document.fullscreenElement);
        } catch (error) {
            console.log(error);
        }
        setIsPictureToPicture(false);
    };

    const handleTogglePictureToPicture = () => {
        setIsFullscreen(false);
        setIsPictureToPicture(!isPictureToPicture);
    };

    return {
        handleToggleFullscreen,
        handleTogglePictureToPicture,
    };
};