"use client";

import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastifyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
