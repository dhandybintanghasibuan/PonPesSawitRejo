// src/app/ClientWrapper.tsx
"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

type Props = {
  children: ReactNode;
};

export default function ClientWrapper({ children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main>{children}</main>
      {/* Footer tidak ditampilkan dari layout */}
    </>
  );
}
    