"use client";

import React from "react";
import { useRouter } from "next/navigation";

import useAuth from "@utils/hook/use-auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !token) {
      router.replace("/login");
    }
  }, [token, isLoading, router]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
