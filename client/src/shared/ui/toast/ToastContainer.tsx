"use client";
import { FC } from "react";

import { ToastCard } from "./ToastCard";

import { ToastContextProps } from "@shared/types/system/toast.interfaces";

export const ToastContainer: FC<Pick<ToastContextProps, "toasts"|"closingToasts"|"removeToast">> = ({toasts,closingToasts,removeToast}) => {

    // ${closingToasts.includes(toast.id) ? "animate-fade-out-up" : "animate-fade-in-up"}

    return (
        <div className="fixed left-5 bottom-5 z-50 space-y-2">
            {toasts.map((toastItem, index) => 
                <ToastCard
                    key={`toast-${index}`}
                    removeToast={removeToast}
                    closingToasts={closingToasts}
                    {...toastItem}
                />
            )}
        </div>
    );
}