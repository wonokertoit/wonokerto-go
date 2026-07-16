'use client';

import { useState, useEffect, useCallback } from "react";
import { Bell, Search, X, FileText, FileCheck, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/app/actions/applications";

interface TopBarProps {
  role: string;
  email: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  read: string;
  createdAt: Date;
  applicationId: string | null;
}

export default function TopBar({ role, email }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingNotif, setLoadingNotif] = useState(false);

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

  const unreadCount = notifications.filter(n => n.read === "false").length;

  const fetchNotifications = useCallback(async () => {
    setLoadingNotif(true);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoadingNotif(false);
    }
  }, []);

  useEffect(() => {
    if (notifOpen) {
      fetchNotifications();
    }
  }, [notifOpen, fetchNotifications]);

  // Poll every 30 seconds when notif panel is closed
  useEffect(() => {
    const interval = setInterval(() => {
      if (!notifOpen) {
        fetchNotifications();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [notifOpen, fetchNotifications]);

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: "true" } : n));
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: "true" })));
  };

  const formatTime = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
    
    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

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
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-[#dc2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
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
                    <div className="flex items-center gap-1">
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-[10px] text-[#78716c] hover:text-[#57534e] px-2 py-1 hover:bg-[#fafaf9] rounded transition-colors"
                        >
                          Tandai dibaca
                        </button>
                      )}
                      <button 
                        onClick={() => setNotifOpen(false)}
                        className="p-1 hover:bg-[#fafaf9] rounded transition-colors"
                      >
                        <X size={14} className="text-[#78716c]" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {loadingNotif ? (
                      <div className="p-6 flex items-center justify-center">
                        <Loader2 size={16} className="text-[#a8a29e] animate-spin" />
                      </div>
                    ) : notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          onClick={() => {
                            if (notif.read === "false") handleMarkAsRead(notif.id);
                          }}
                          className={`p-3 border-b border-[#f5f5f4] hover:bg-[#fafaf9] transition-colors cursor-pointer ${
                            notif.read === "false" ? "bg-[#fafaf9]" : ""
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                              notif.read === "false" ? "bg-[#dc2626]" : "bg-[#d6d3d1]"
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#1c1917] truncate">{notif.title}</p>
                              <p className="text-xs text-[#78716c] mt-0.5 line-clamp-2">{notif.message}</p>
                              <p className="text-[10px] text-[#a8a29e] mt-1">{formatTime(notif.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-sm text-[#a8a29e]">Belum ada notifikasi</p>
                      </div>
                    )}
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
