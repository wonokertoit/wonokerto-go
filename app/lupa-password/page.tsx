'use client';

import { requestPasswordReset } from '@/app/actions/password-reset';
import { useActionState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function LupaPasswordPage() {
  const [state, action, pending] = useActionState(requestPasswordReset, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3 mb-6">
            <img src="/Logo%20wonogiti.png" alt="Logo Kab Wonogiri" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-[#1c1917]">Lupa Password</h1>
              <p className="text-sm text-[#a8a29e]">Masukkan email untuk reset password</p>
            </div>
          </div>

          {state?.success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <CheckCircle size={48} className="mx-auto text-emerald-500 mb-4" />
              <h3 className="text-lg font-semibold text-[#1c1917] mb-2">Email Terkirim</h3>
              <p className="text-sm text-[#78716c] mb-6">{state.message}</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-[#57534e] font-medium hover:underline text-sm"
              >
                <ArrowLeft size={16} />
                Kembali ke Login
              </Link>
            </motion.div>
          ) : (
            <form action={action} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
                    placeholder="nama@email.com"
                  />
                </div>
                {state?.errors?.email && (
                  <p className="text-[#dc2626] text-xs mt-1.5">{state.errors.email[0]}</p>
                )}
              </div>

              {state?.message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#dc2626] text-sm bg-[#fef2f2] p-3 rounded-lg"
                >
                  {state.message}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={pending}
                className="w-full bg-[#57534e] text-white py-2.5 rounded-lg font-medium hover:bg-[#44403c] disabled:opacity-50 transition-all"
              >
                {pending ? 'Mengirim...' : 'Kirim Tautan Reset'}
              </motion.button>

              <p className="text-center text-sm text-[#a8a29e]">
                <Link href="/login" className="inline-flex items-center gap-1 text-[#57534e] font-medium hover:underline">
                  <ArrowLeft size={14} />
                  Kembali ke Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
