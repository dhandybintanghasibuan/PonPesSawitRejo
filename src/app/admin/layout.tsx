import AdminLayoutWrapper from "./AdminLayoutWrapper";


export const metadata = {
  title: {
    default: "Admin | Pondok Pesantren Sawit Rejo",
    template: "%s | Admin PPSR",
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-100">
        <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
      </body>
    </html>
  );
}
