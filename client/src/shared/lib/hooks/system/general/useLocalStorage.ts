"use client";
import { useState, useEffect } from "react";

const isServer = typeof window === "undefined";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (isServer) return initialValue;
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return { state, setValue: setState };
}