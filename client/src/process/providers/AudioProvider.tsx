"use client";
import { createContext, useState, ReactNode } from "react";

import { AudioProps, AudioContextProps } from "@shared/types/system/audio.interfaces";

export const AudioContext = createContext<AudioContextProps | null>(null);

export const AudioProvider = ({ children }: { readonly children: ReactNode }) => {
  const [audio, setAudio] = useState<AudioProps>(null);

  return (
    <AudioContext.Provider value={{ audio }}>
      {children}
    </AudioContext.Provider>
  );
}