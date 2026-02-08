import type { Metadata } from "next";
import "./globals.css";
import AgeVerification from "@/components/AgeVerification";

export const metadata: Metadata = {
  title: "OGM - Premium Tequila",
  description: "Small batch reposado tequila made with passion, served with pride.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=ranade@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased text-gray-800" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F2 50%, #F9F1C8 100%)' }} suppressHydrationWarning>
        <AgeVerification />
        {children}
      </body>
    </html>
  );
}
