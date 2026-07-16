'use client';

import { useState } from "react";
import { Bell, Search, X, FileText, FileCheck, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

interface TopBarProps {
  role: string;
  email: string;
}

export default function TopBar({ role, email }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = role === "admin" 
    ? [
        { label: "Dashboard", href: "/admin/dashboard", icon: FileText },
        { label: "Daftar Pengajuan", href: "/admin/pengajuan", icon: FileCheck },
        { label: "Pengaturan", href: "/admin/settings", icon: Clock },
      ]
    : [
        { label: "Dashboard", href: "/dashboard", icon: FileText },
        { label: "Surat Keterangan Usaha", href: "/pengajuan/sku", icon: FileCheck },
        { label: "Surat Pengantar SKCK", href: "/pengajuan/skck", icon: FileCheck },
        { label: "Riwayat Pengajuan", href: "/riwayat", icon: Clock },
      ];

  const filteredMenu = menuItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const notifications = [
    { id: 1, title: "Pengajuan SKU baru", desc: "Pengajuan menunggu verifikasi", time: "2 menit yang lalu", read: false },
    { id: 2, title: "Status diperbarui", desc: "Pengajuan Anda telah disetujui", time: "1 jam yang lalu", read: false },
    { id: 3, title: "Pengajuan selesai", desc: "Surat telah selesai diproses", time: "3 jam yang lalu", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="h-14 bg-white border-b border-[#e7e5e4] flex items-center justify-between px-4 lg:px-6 shrink-0">
        <div className="flex items-center gap-3 flex-1">
          <button 
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#fafaf9] rounded-lg border border-[#e7e5e4] hover:border-[#d6d3d1] transition-all text-sm text-[#a8a29e] w-full max-w-xs"
          >
            <Search size={14} />
            <span className="hidden sm:inline">Cari menu...</span>
            <span className="sm:hidden">Cari...</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-lg hover:bg-[#fafaf9] transition-colors"
            >
              <Bell size={18} className="text-[#78716c]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#dc2626] rounded-full border border-white"></span>
              )}
            </button>

            {notifOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setNotifOpen(false)}
                />
                <div className="absolute right-0 top-10 w-80 bg-white rounded-xl border border-[#e7e5e4] shadow-lg z-50 overflow-hidden">
                  <div className="p-3 border-b border-[#e7e5e4] flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-[#1c1917]">Notifikasi</h3>
                    <button 
                      onClick={() => setNotifOpen(false)}
                      className="p-1 hover:bg-[#fafaf9] rounded transition-colors"
                    >
                      <X size={14} className="text-[#78716c]" />
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-3 border-b border-[#f5f5f4] hover:bg-[#fafaf9] transition-colors cursor-pointer ${
                          !notif.read ? "bg-[#fafaf9]" : ""
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                            !notif.read ? "bg-[#dc2626]" : "bg-[#d6d3d1]"
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#1c1917]">{notif.title}</p>
                            <p className="text-xs text-[#78716c] mt-0.5">{notif.desc}</p>
                            <p className="text-[10px] text-[#a8a29e] mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-[#e7e5e4]">
                    <button className="w-full text-center text-xs text-[#78716c] hover:text-[#57534e] py-1 transition-colors">
                      Tandai semua dibaca
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 pl-3 border-l border-[#e7e5e4]">
            <div className="w-8 h-8 bg-[#f5f5f4] rounded-full flex items-center justify-center border border-[#e7e5e4]">
              <span className="text-[#57534e] font-medium text-sm">
                {email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-[#1c1917]">{email}</p>
              <p className="text-[10px] text-[#a8a29e] capitalize">{role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
          />
          <div className="fixed inset-x-4 top-20 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-lg bg-white rounded-xl border border-[#e7e5e4] shadow-xl z-50 overflow-hidden">
            <div className="p-3 border-b border-[#e7e5e4] flex items-center gap-2">
              <Search size={16} className="text-[#a8a29e]" />
              <input
                type="text"
                autoFocus
                placeholder="Cari menu..."
                className="flex-1 bg-transparent outline-none text-sm text-[#1c1917] placeholder:text-[#a8a29e]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-1 hover:bg-[#fafaf9] rounded transition-colors"
              >
                <X size={14} className="text-[#78716c]" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#fafaf9] transition-colors border-b border-[#f5f5f4]"
                  >
                    <item.icon size={16} className="text-[#78716c]" />
                    <span className="text-sm text-[#1c1917]">{item.label}</span>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-[#a8a29e]">Tidak ada hasil untuk "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
