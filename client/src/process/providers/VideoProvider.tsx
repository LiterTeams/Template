"use client";
import { createContext, useState, ReactNode } from "react";

import { VideoProps, VideoContextProps } from "@shared/types/system/video.interfaces";

export const VideoContext = createContext<VideoContextProps | null>(null);

export const VideoProvider = ({ children }: { readonly children: ReactNode }) => {
  const [video, setVideo] = useState<VideoProps>(null);

  return (
    <VideoContext.Provider value={{ video }}>
      {children}
    </VideoContext.Provider>
  );
}