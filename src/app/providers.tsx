"use client";

import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "next-themes";

import queryClient from "@/services/queryClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
