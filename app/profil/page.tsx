'use client';

import { updateMyPassword } from '@/app/actions/users';
import { useActionState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';

export default function ProfilPage() {
  const [state, action, pending] = useActionState(updateMyPassword, undefined);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-[#1c1917] mb-2">Ubah Password</h1>
        <p className="text-[#78716c] mb-8">Ganti password akun Anda untuk keamanan lebih baik.</p>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e7e5e4] shadow-sm">
          {state?.success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle size={48} className="mx-auto text-emerald-500 mb-4" />
              <h3 className="text-lg font-semibold text-[#1c1917] mb-2">Password Berhasil Diubah</h3>
              <p className="text-sm text-[#78716c]">{state.message}</p>
            </motion.div>
          ) : (
            <form action={action} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-1.5">Password Saat Ini</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
                  <input
                    name="currentPassword"
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
                    placeholder="••••••"
                  />
                </div>
                {state?.errors?.currentPassword && (
                  <p className="text-[#dc2626] text-xs mt-1.5">{state.errors.currentPassword[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-1.5">Password Baru</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
                  <input
                    name="newPassword"
                    type="password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
                    placeholder="••••••"
                  />
                </div>
                {state?.errors?.newPassword && (
                  <p className="text-[#dc2626] text-xs mt-1.5">{state.errors.newPassword[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-1.5">Konfirmasi Password Baru</label>
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
                    Ubah Password <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
