import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin | Pondok Pesantren Sawit Rejo",
    template: "%s | Admin PPSR",
  },
};

export default function AdminLayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
