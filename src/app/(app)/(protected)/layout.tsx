"use client";

import React from "react";
import { useRouter } from "next/navigation";

import useAuth from "@utils/hook/use-auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { accessToken, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !accessToken) {
      router.replace("/login");
    }
  }, [accessToken, isLoading, router]);

  if (!accessToken) {
    return;
  }

  return <>{children}</>;
}
