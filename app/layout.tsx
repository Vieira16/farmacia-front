import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-gradient-to-r from-blue-900 to-blue-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}