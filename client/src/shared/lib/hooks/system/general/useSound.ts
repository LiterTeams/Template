"use client";
import { useState, useContext, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { SoundContext } from "@process/providers/SoundProvider";

export default function useSound() {
  const { state, setValue } = useLocalStorage("sound-effects", true);
  const [isActive, setIsActive] = useState<boolean>(state);
  const context = useContext(SoundContext);

  if (!context) throw new Error("useSound must be used within a SoundProvider");

  useEffect(() => {
    setIsActive(state);
  }, [state]);

  const toggleSoundEffect = () => {
    setValue((prev: boolean) => !prev);
  };

  return { isActive, toggleSoundEffect, context };
}