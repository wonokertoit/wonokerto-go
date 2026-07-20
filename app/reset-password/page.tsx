'use client';

import { Suspense } from 'react';
import { resetPassword } from '@/app/actions/password-reset';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ArrowLeft } from 'lucide-react';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [state, action, pending] = useActionState(resetPassword, undefined);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#1c1917] mb-2">Tautan Tidak Valid</h2>
          <p className="text-sm text-[#78716c] mb-4">Tautan reset password tidak ditemukan atau sudah kadaluarsa.</p>
          <Link href="/lupa-password" className="text-[#57534e] font-medium hover:underline text-sm">
            Minta tautan baru
          </Link>
        </div>
      </div>
    );
  }

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
              <h1 className="text-xl font-bold text-[#1c1917]">Reset Password</h1>
              <p className="text-sm text-[#a8a29e]">Buat password baru untuk akun Anda</p>
            </div>
          </div>

          <form action={action} className="space-y-5">
            <input type="hidden" name="token" value={token} />

            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-1.5">Password Baru</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
                  placeholder="••••••"
                />
              </div>
              {state?.errors?.password && (
                <p className="text-[#dc2626] text-xs mt-1.5">{state.errors.password[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-1.5">Konfirmasi Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
                  placeholder="••••••"
                />
              </div>
              {state?.errors?.confirmPassword && (
                <p className="text-[#dc2626] text-xs mt-1.5">{state.errors.confirmPassword[0]}</p>
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
              className="w-full bg-[#57534e] text-white py-2.5 rounded-lg font-medium hover:bg-[#44403c] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {pending ? 'Memproses...' : (
                <>
                  Reset Password <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            <p className="text-center text-sm text-[#a8a29e]">
              <Link href="/login" className="inline-flex items-center gap-1 text-[#57534e] font-medium hover:underline">
                <ArrowLeft size={14} />
                Kembali ke Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <div className="text-sm text-[#a8a29e]">Memuat...</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
