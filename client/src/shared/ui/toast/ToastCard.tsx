"use client";
import { FC, ReactNode } from "react";

import { FaCircleInfo } from "react-icons/fa6";
import { BiSolidError } from "react-icons/bi";
import { RiAlarmWarningFill, RiCheckDoubleFill, RiBlazeFill } from "react-icons/ri";

import { ToastProps } from "@shared/types/system/toast.interfaces";

const toastIcons: Record<ToastProps["type"], ReactNode> = {
    "success": <RiCheckDoubleFill  size={24} />,
    "error": <BiSolidError size={24} />,
    "warning": <RiAlarmWarningFill size={24} />,
    "pending": <RiBlazeFill size={24} />,
    "fetching": <RiBlazeFill size={24} />,
    "info": <FaCircleInfo size={24} />,
}

export const ToastCard: FC<ToastProps> = ({...props}) => {
    const { label, message, type="info" } = props;

    return(
        <div className={`toast-wrapper animate-fade-in-up ${type}`}>
            <div className="icon">
                {toastIcons[type]}
            </div>
            <div className="content">
                <h2>{label}</h2>
                <p>{message}</p>
            </div>
        </div>
    )
}