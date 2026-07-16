'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  FileCheck,
  FileClock,
} from "lucide-react";
import { logout } from "@/app/actions/auth";

interface SidebarProps {
  role: string;
}

const wargaMenu = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pengajuan/sku", label: "Surat Keterangan Usaha", icon: FileText },
  { href: "/pengajuan/skck", label: "Surat Pengantar SKCK", icon: FileCheck },
  { href: "/riwayat", label: "Riwayat Pengajuan", icon: History },
];

const adminMenu = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pengajuan", label: "Daftar Pengajuan", icon: FileClock },
  { href: "/admin/settings", label: "Pengaturan", icon: Settings },
];

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menu = role === "admin" ? adminMenu : wargaMenu;

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#e7e5e4] flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-[#e7e5e4]">
          <img 
            src="/Logo%20wonogiti.png" 
            alt="Logo Kab Wonogiri" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="font-bold text-[#1c1917] text-sm leading-tight">Desa Wonokerto</h1>
            <p className="text-[10px] text-[#a8a29e] leading-tight">Kabupaten Wonogiri</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menu.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                    isActive
                      ? "bg-[#f5f5f4] text-[#1c1917] font-medium"
                      : "text-[#78716c] hover:bg-[#fafaf9] hover:text-[#57534e]"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#78716c]"></div>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#e7e5e4]">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[#dc2626] hover:bg-[#fef2f2] transition-all text-sm"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
