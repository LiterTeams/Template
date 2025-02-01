"use client";
import { useState } from "react";

export default function useError(initialState: string | null = null){
    const [error, setError] = useState(initialState);

    return [error, setError]
}