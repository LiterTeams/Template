"use client";
import { FC } from "react";

import { ToastCard } from "./ToastCard";

import { ToastContextProps } from "@shared/types/system/toast.interfaces";

export const ToastContainer: FC<Pick<ToastContextProps, "toasts">> = ({toasts}) => {
    return (
        <div className="fixed right-5 bottom-5 z-50 space-y-2">
            {toasts.map((toastItem, index) => 
                <ToastCard
                    key={`toast-${index}`}
                    {...toastItem}
                />
            )}
        </div>
    );
}