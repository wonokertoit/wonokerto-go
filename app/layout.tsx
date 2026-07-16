import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { verifySession } from "@/app/lib/session";
import { headers } from "next/headers";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistem Informasi Desa Wonokerto",
  description: "Pengajuan Surat Desa Wonokerto",
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
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#fafaf9]">
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
