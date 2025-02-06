"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{refetchOnWindowFocus:false},
    mutations:{}
  }
});

export const TanStackProvider = ({children}:{children:ReactNode}) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}