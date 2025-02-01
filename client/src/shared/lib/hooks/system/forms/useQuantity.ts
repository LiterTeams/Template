"use client";
import { useState } from "react";

export default function useQuantity(initialState: number = 0){
    const [value, setValue] = useState(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        if (isNaN(newValue)) return console.warn("useQuantity (handleChange) - TYPE!")
        setValue(newValue);
    };
    
    const reset = () => setValue(initialState);

    return { value, handleChange, reset }
}