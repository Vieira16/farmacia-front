import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farmácia",
  description: "Sistema de gerenciamento de farmácia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}