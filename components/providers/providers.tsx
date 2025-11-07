"use client";

import { Toaster } from "sonner";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import AuthReminder from "@/components/AuthReminder";

interface ProvidersProps {
  readonly children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      {children}
      <AuthReminder />
      <Toaster richColors position="top-right" expand={false} />
    </SessionProvider>
  );
}
