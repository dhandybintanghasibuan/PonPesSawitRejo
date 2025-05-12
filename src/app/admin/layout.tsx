// src/app/admin/layout.tsx
import "../globals.css";
import "../../styles/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import type { Metadata } from "next";
import { ReactNode } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

export const metadata: Metadata = {
  title: "Admin | Pondok Pesantren Sawit Rejo",
  description: "Halaman admin",
  icons: {
    icon: "/favicon.png",
  },
};

export default function AdminLayoutRoot({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
