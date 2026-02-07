import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OGM - Premium Tequila",
  description: "Small batch reposado tequila made with passion, served with pride.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#141414] text-gray-300" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
