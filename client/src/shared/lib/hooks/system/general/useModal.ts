"use client";
import { useState } from "react"
export default function useModal(initial: boolean = false){
    const [isShow, setIsShow] = useState(initial);
    const toggle =() => setIsShow(!isShow);
    return {isShow, toggle}
}