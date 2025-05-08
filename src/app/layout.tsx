import "./globals.css"; // Tailwind CSS
import "../styles/style.css"; // CSS kustom kamu
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pondok Pesantren Sawit Rejo",
  description:
    "Website resmi Pondok Pesantren Sawit Rejo - Kutalimbaru, Deli Serdang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Import Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@300;400;500;600&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-gray-800 bg-[#f8f5ee]">{children}</body>
    </html>
  );
}
