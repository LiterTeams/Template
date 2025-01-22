"use client";
import { useState } from "react";

export default function useInputRange(currentRange=50,minRange=0,maxRange=100){
    const [currentRangeValue, setCurrentRangeValue] = useState<number>(currentRange);
    const [minRangeValue, setMinRangeValue] = useState<number>(minRange);
    const [maxRangeValue, setMaxRangeValue] = useState<number>(maxRange);

    const updateRange = (range: number, type: "current"|"min"|"max") => {
        switch(type){
            case "current": setCurrentRangeValue(range); break;
            case "min": setMinRangeValue(range); break;
            case "max": setMaxRangeValue(range); break;
            default: return;
        }
    }

    return { currentRangeValue, minRangeValue, maxRangeValue, updateRange };
}