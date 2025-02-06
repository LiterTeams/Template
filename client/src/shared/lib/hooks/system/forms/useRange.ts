"use client";
import { useState } from "react";

export const useRange = (initialState: number = 0, initialMinState: number = 0, initialMaxState: number = 100) => {
    const [value, setValue] = useState(initialState);
    const [min, setMin] = useState<number>(initialMinState);
    const [max, setMax] = useState<number>(initialMaxState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        if (isNaN(newValue)) return console.warn("useRange (handleChange) - TYPE!");
        if (newValue < min || newValue > max) return console.warn("useRange (handleChange) - RANGE!");
        setValue(newValue);
    };

    const updateRange = (range: number, key: "current"|"min"|"max") => {
        switch(key){
            case "current": setValue(range); break;
            case "min": setMin(range); break;
            case "max": setMax(range); break;
            default: console.warn("useRange (updateRange) - KEY!");
        }
    }
    
    const reset = () => setValue(initialState);

    return { value, handleChange, updateRange, reset }
}