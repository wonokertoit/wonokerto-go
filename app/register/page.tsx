'use client';

import { signup } from '@/app/actions/auth';
import { useActionState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Home, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Home className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Daftar Akun</h1>
              <p className="text-sm text-gray-500">Buat akun warga baru</p>
            </div>
          </div>

          <form action={action} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-900 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="nama@email.com"
                />
              </div>
              {state?.errors?.email && (
                <p className="text-red-500 text-xs mt-1.5">{state.errors.email[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm text-gray-900 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Minimal 6 karakter"
                />
              </div>
              {state?.errors?.password && (
                <p className="text-red-500 text-xs mt-1.5">{state.errors.password[0]}</p>
              )}
            </div>

            {state?.message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm bg-red-50 p-3 rounded-xl"
              >
                {state.message}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={pending}
              className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {pending ? 'Mendaftar...' : (
                <> <UserPlus size={18} /> Daftar </>
              )}
            </motion.button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-emerald-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
