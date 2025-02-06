"use client";
import { ReactNode } from "react";
import { createContext, useRef } from "react";

interface SoundContextProps {
    playSound: (src: string) => void;
}

export const SoundContext = createContext<SoundContextProps | null>(null);

export const SoundProvider = ({ children }: { readonly children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volume = .1;

  const playSound = (src: string) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.src = src;
    audioRef.current.play();
  };

  return (
    <SoundContext.Provider value={{ playSound }}>
      <audio ref={audioRef} preload="auto"></audio>
      {children}
    </SoundContext.Provider>
  );
};