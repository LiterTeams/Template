"use client";
import { FC, ReactNode } from "react";

import { FaCircleInfo } from "react-icons/fa6";
import { BiSolidError } from "react-icons/bi";
import { RiAlarmWarningFill, RiCheckDoubleFill, RiBlazeFill } from "react-icons/ri";

import { ToastProps } from "@shared/types/system/toast.interfaces";
import timeToMs from "@app/shared/lib/helpers/system/timeToMs";

const toastIcons: Record<ToastProps["type"], ReactNode> = {
    "success": <RiCheckDoubleFill  size={24} />,
    "error": <BiSolidError size={24} />,
    "warning": <RiAlarmWarningFill size={24} />,
    "pending": <RiBlazeFill size={24} />,
    "info": <FaCircleInfo size={24} />,
}

export const ToastCard: FC<ToastProps & {closingToasts: number[], removeToast: (id: number) => void;}> = ({...props}) => {
    const { id, label, message, type="info", closingToasts, removeToast } = props;

    return(
        <div onAnimationEnd={() => {
            if (closingToasts.includes(id)) setTimeout(() => removeToast(id), timeToMs("1s"));
        }} className={`toast-wrapper ${type} ${closingToasts.includes(id) ? "animate-fade-in-up-reverse" : "animate-fade-in-up"}`}>
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