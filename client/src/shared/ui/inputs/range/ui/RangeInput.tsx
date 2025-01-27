"use client";
import { ChangeEvent } from "react";

interface RangeInputIF {
    initial?: number;
    minRange?: number;
    maxRange?: number;
    stepRange?: number;
    handleRangeChange: (event:ChangeEvent<HTMLInputElement>) => void;
}

export default function RangeInput({initial,minRange,maxRange,stepRange,handleRangeChange}:RangeInputIF){
    return(
        <input className="rounded-full" type="range" value={initial} min={minRange} max={maxRange} step={stepRange} onChange={(event) => handleRangeChange(event)}
      />
    )
}