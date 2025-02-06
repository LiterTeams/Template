interface ToastProps {
    id: number;
    className?: string;
    label?: string;
    message: string;
    type: "success" | "error" | "warning" | "info" | "pending";
    TTL?: string;
  }
  
interface ToastContextProps {
    toasts: ToastProps[];
    closingToasts: number[];
    showToast: (label: string, message: string, type?: ToastProps["type"]) => void;
    removeToast: (id: number) => void;
}

export type { ToastProps, ToastContextProps }