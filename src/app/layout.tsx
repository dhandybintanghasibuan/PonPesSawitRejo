// src/app/layout.tsx
import "./globals.css";
import "../styles/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import type { Metadata } from "next";
import { ReactNode } from "react";
import ClientLayout from "src/app/ClientLayout";

export const metadata: Metadata = {
  title: "Pondok Pesantren Sawit Rejo",
  description:
    "Website resmi Pondok Pesantren Sawit Rejo - Kutalimbaru, Deli Serdang",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@300;400;500;600&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="text-gray-800 bg-[#f8f5ee]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
