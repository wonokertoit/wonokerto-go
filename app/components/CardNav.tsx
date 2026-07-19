'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href?: string;
  ariaLabel?: string;
}

interface NavItem {
  label: string;
  bgColor?: string;
  textColor?: string;
  links: NavLink[];
}

interface CardNavProps {
  logo?: React.ReactNode;
  logoAlt?: string;
  items: NavItem[];
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  theme?: 'light' | 'dark';
}

export default function CardNav({
  logo,
  logoAlt = 'Logo',
  items,
  baseColor = '#fff',
  menuColor = '#000',
  buttonBgColor = '#111',
  buttonTextColor = '#fff',
  theme = 'light',
}: CardNavProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      {/* Desktop + Mobile Nav */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
        style={{ color: menuColor }}
      >
        <div className="max-w-7xl mx-auto pt-4">
          <div
            className="flex items-center justify-between px-5 py-3 rounded-2xl border backdrop-blur-xl shadow-sm"
            style={{
              backgroundColor: isDark ? 'rgba(27,23,34,0.90)' : 'rgba(255,255,255,0.92)',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              {logo && (
                <span className="w-8 h-8 flex items-center justify-center">
                  {logo}
                </span>
              )}
              <span
                className="font-bold text-sm tracking-tight transition-opacity group-hover:opacity-70"
                style={{ color: menuColor }}
              >
                {logoAlt}
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {items.map((item, index) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeIndex === index ? 'bg-[#f5f5f4] text-[#1c1917]' : 'hover:bg-[#f5f5f4]/60'
                    }`}
                    style={{ color: menuColor }}
                    aria-expanded={activeIndex === index}
                    aria-haspopup="true"
                  >
                    {item.label}
                  </button>

                  {/* Card Dropdown */}
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5"
                      >
                        <div
                          className="rounded-2xl p-5 shadow-2xl border min-w-[240px]"
                          style={{
                            backgroundColor: item.bgColor || (isDark ? '#2F293A' : '#fff'),
                            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                          }}
                        >
                          <p
                            className="text-[11px] font-bold uppercase tracking-widest mb-3 opacity-60"
                            style={{ color: item.textColor || menuColor }}
                          >
                            {item.label}
                          </p>
                          <div className="flex flex-col gap-0.5">
                            {item.links.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href || '#'}
                                className="px-3 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80 hover:translate-x-0.5"
                                style={{ color: item.textColor || menuColor }}
                                aria-label={link.ariaLabel}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium px-4 py-2 rounded-xl transition-colors hover:bg-[#fafaf9]"
                style={{ color: menuColor }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:opacity-90 hover:shadow-lg"
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              >
                Daftar
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-xl transition-colors hover:bg-[#fafaf9]"
              style={{ color: menuColor }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
            onClick={() => {
              setMobileOpen(false);
              setMobileActiveIndex(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-xs md:hidden shadow-2xl"
            style={{
              backgroundColor: isDark ? '#1B1722' : baseColor,
              color: menuColor,
            }}
          >
            <div className="flex items-center justify-between p-5 border-b"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
            >
              <span className="font-bold text-sm">Menu</span>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setMobileActiveIndex(null);
                }}
                className="p-2 rounded-xl transition-colors hover:bg-[#fafaf9]"
                style={{ color: menuColor }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-1">
              {items.map((item, index) => (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setMobileActiveIndex(mobileActiveIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                    style={{
                      backgroundColor:
                        mobileActiveIndex === index
                          ? isDark
                            ? 'rgba(255,255,255,0.06)'
                            : 'rgba(0,0,0,0.04)'
                          : 'transparent',
                      color: menuColor,
                    }}
                  >
                    {item.label}
                    <motion.span
                      animate={{ rotate: mobileActiveIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs opacity-40"
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileActiveIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div
                          className="mx-2 mb-2 rounded-xl p-3"
                          style={{
                            backgroundColor: item.bgColor || (isDark ? '#2F293A' : '#f8fafc'),
                          }}
                        >
                          {item.links.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href || '#'}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileActiveIndex(null);
                              }}
                              className="block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                              style={{ color: item.textColor || menuColor }}
                              aria-label={link.ariaLabel}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-auto p-4 border-t flex flex-col gap-2"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
            >
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors hover:bg-[#fafaf9]"
                style={{ color: menuColor }}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              >
                Daftar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
