import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navigation/nav-bar";
import { StorageProvider } from "@/provider/storage-provider";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniStream",
  description: "Generated by create next app",
  icons: {
    icon: "/anistream.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 min-h-screen flex flex-col`}
      >
        <StorageProvider>
          <NavBar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </StorageProvider>
      </body>
    </html>
  );
}
