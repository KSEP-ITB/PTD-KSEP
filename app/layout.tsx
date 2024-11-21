// Metadata Import
import type { Metadata } from "next";

// CSS Import
import "./globals.css";

// Components Import
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

// Auth Impoty
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "PTD KSEP ITB",
  description: "Pendidikan Tingkat Dasar KSEP ITB adalah program pendidikan yang fokus pada pembelajaran ekonomi dan pasar modal serta pembentukan karakter melalui kebersamaan dan kekeluargaan.",
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://ptdksep.com',
    title: 'PTD KSEP ITB | Pendidikan Tingkat Dasar',
    description: 'Pelajari lebih dalam tentang dunia ekonomi dan pasar modal bersama PTD KSEP ITB. Program ini bertujuan menciptakan pembelajar berkualitas dengan menjunjung kebersamaan dan kekeluargaan.',
    siteName: 'PTD KSEP ITB',
  },
  keywords: [
    "Pendidikan Tingkat Dasar",
    "KSEP ITB",
    "PTD KSEP",
    "Ekonomi",
    "Pasar Modal",
    "Kaderisasi",
    "Visi dan Misi",
    "ITB",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`font-futura antialiased`}>
          <SessionProvider>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </SessionProvider>
        </body>
    </html>
  );
}
