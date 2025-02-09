"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retryDelay: (attempt) => Math.min(2000 * attempt, 10000), // задержка запросов 2s -> 4s -> 6s
      retry: 3, // Количество повторных попыток
      refetchOnWindowFocus:false,
    },
    mutations:{}
  }
});

export const TanStackProvider = ({children}:{children:ReactNode}) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}