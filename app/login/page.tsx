'use client';

import { login } from '@/app/actions/auth';
import { useActionState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 rounded-lg border border-[#e7e5e4]">
            <div className="flex items-center gap-3 mb-8">
            <img src="/Logo%20wonogiti.png" alt="Logo Kab Wonogiri" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-[#1c1917]">Login</h1>
              <p className="text-sm text-[#a8a29e]">Masuk ke akun Anda</p>
            </div>
          </div>

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

            <div>
              <label className="block text-sm font-medium text-[#57534e] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
                  placeholder="••••••"
                />
              </div>
              {state?.errors?.password && (
                <p className="text-[#dc2626] text-xs mt-1.5">{state.errors.password[0]}</p>
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
                <> Login <ArrowRight size={18} /> </>
              )}
            </motion.button>
          </form>

          <div className="flex items-center justify-between mt-4">
            <Link href="/lupa-password" className="text-sm text-[#a8a29e] hover:text-[#57534e] transition-colors">
              Lupa password?
            </Link>
          </div>

          <p className="text-center mt-6 text-sm text-[#a8a29e]">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#57534e] font-medium hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
