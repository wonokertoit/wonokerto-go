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
  ChevronRight,
  Home,
  Users,
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
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-gray-50">
          <img 
            src="/Logo%20wonogiti.png" 
            alt="Logo Kab Wonogiri" 
            className="w-10 h-10 object-contain rounded-lg"
          />
          <div>
            <h1 className="font-bold text-gray-900 text-sm leading-tight">Desa Wonokerto</h1>
            <p className="text-[10px] text-gray-500 leading-tight">Kabupaten Wonogiri</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menu.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <div
                key={item.href}
              >
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 font-medium shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-50">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-all text-sm"
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
