"use client";

import { usePathname } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLoginPage = pathname === "/admin/login";
  return isLoginPage ? <>{children}</> : <AdminLayout>{children}</AdminLayout>;
}
