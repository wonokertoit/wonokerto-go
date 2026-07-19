import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { verifySession } from "@/app/lib/session";
import { headers } from "next/headers";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ToastProvider from "./components/ToastProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIDEWO",
  description: "Pengajuan Surat dan Aduan Desa Wonokerto, Kabupaten Wonogiri",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const isPrintPage = pathname.includes("/pdf");

  return (
    <html
      lang="id"
      className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full bg-[#fafaf9]">
        <ToastProvider />
        {session && !isPrintPage ? (
          <div className="flex h-screen overflow-hidden">
            <Sidebar role={session.role} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <TopBar role={session.role} email={session.email} />
              <main className="flex-1 overflow-y-auto p-3 lg:p-4">
                {children}
              </main>
            </div>
          </div>
        ) : (
          <main className="min-h-screen">{children}</main>
        )}
      </body>
    </html>
  );
}
