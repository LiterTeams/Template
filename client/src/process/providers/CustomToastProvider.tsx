"use client";
import { createContext, useState, ReactNode, useEffect } from "react";

import { ToastContainer } from "@shared/ui/toast/ToastContainer";

import timeToMs from "@shared/lib/helpers/system/timeToMs";

import { ToastProps, ToastContextProps } from "@shared/types/system/toast.interfaces";

export const ToastContext = createContext<Omit<ToastContextProps, "closingToasts"> | null>(null);

export const CustomToastProvider = ({ children }: { readonly children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [closingToasts, setClosingToasts] = useState<number[]>([]);

  const showToast = (label: string, message: string, type: ToastProps["type"] = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, label, message, type }]);
    // setTimeout(() => removeToast(id), timeToMs(TTL));
  };

  useEffect(() => {
    const timeouts = toasts.map((toast) =>
      setTimeout(() => setClosingToasts((prev) => [...prev, toast.id]), timeToMs("5s"))
    );

    return () => timeouts.forEach(clearTimeout);
  }, [toasts]);

  const removeToast = (id: number) => setToasts((prev) => prev.filter((toast) => toast.id !== id));

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} closingToasts={closingToasts} removeToast={removeToast}/>
    </ToastContext.Provider>
  );
}
