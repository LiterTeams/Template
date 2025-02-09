"use client";
import { createContext, useState, ReactNode } from "react";

import { ToastContainer } from "@shared/ui/toast/ToastContainer";

import { timeToMs } from "@shared/lib/helpers/system";

import { ToastProps, ToastContextProps } from "@shared/types/system/toast.interfaces";

export const ToastContext = createContext<ToastContextProps | null>(null);

export const ToastProvider = ({ children }: { readonly children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = (label: string, message: string, type: ToastProps["type"] = "info", TTL: string = "8s") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, label, message, type }]);
    setTimeout(() => removeToast(id), timeToMs(TTL));
  };

  const removeToast = (id: number) => setToasts((prev) => prev.filter((toast) => toast.id !== id));

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts}/>
    </ToastContext.Provider>
  );
}
