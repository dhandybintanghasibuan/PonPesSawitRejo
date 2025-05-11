import "./globals.css"; // Tailwind CSS
import "../styles/style.css"; // CSS kustom
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pondok Pesantren Sawit Rejo",
  description:
    "Website resmi Pondok Pesantren Sawit Rejo - Kutalimbaru, Deli Serdang",
  icons: {
    icon: "/favicon.png", // pastikan file ini ada di folder public
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
