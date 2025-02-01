"use client";
import { useState } from "react";

export default function useText(initialState: string = ""){
    const [value, setValue] = useState(initialState);
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };
    
    const reset = () => setValue(initialState);

    return { value, handleChange, reset }
}