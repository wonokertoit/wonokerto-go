'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  KeyRound,
  X,
  Search,
  UserCog,
  User,
  Shield,
} from 'lucide-react';
import {
  createUser,
  updateUser,
  deleteUser,
  resetUserPassword,
} from '@/app/actions/users';
import { useActionState } from 'react';

interface UserItem {
  id: string;
  email: string;
  role: string;
  createdAt: Date | null;
}

interface AkunClientProps {
  users: UserItem[];
}

export default function AkunClient({ users }: AkunClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'reset' | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (type: 'create' | 'edit' | 'reset', user?: UserItem) => {
    setModalType(type);
    setSelectedUser(user || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setSelectedUser(null);
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      await deleteUser(id);
      setDeleteConfirm(null);
      window.location.reload();
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c1917] flex items-center gap-2">
            <Users size={24} className="text-[#57534e]" />
            Manajemen Akun
          </h1>
          <p className="text-sm text-[#78716c] mt-1">Kelola akun warga dan admin.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal('create')}
          className="inline-flex items-center gap-2 bg-[#57534e] text-white px-4 py-2.5 rounded-xl font-medium hover:bg-[#44403c] transition-all text-sm"
        >
          <Plus size={16} />
          Tambah Akun
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
        <input
          type="text"
          placeholder="Cari berdasarkan email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e7e5e4] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#fafaf9] border-b border-[#e7e5e4]">
              <tr>
                <th className="text-left text-xs font-semibold text-[#57534e] uppercase tracking-wider px-5 py-3">Akun</th>
                <th className="text-left text-xs font-semibold text-[#57534e] uppercase tracking-wider px-5 py-3">Role</th>
                <th className="text-left text-xs font-semibold text-[#57534e] uppercase tracking-wider px-5 py-3">Terdaftar</th>
                <th className="text-right text-xs font-semibold text-[#57534e] uppercase tracking-wider px-5 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f4]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-[#a8a29e] text-sm">
                    Tidak ada akun yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#fafaf9]/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          user.role === 'admin' ? 'bg-[#1c1917] text-white' : 'bg-[#fafaf9] text-[#57534e] border border-[#e7e5e4]'
                        }`}>
                          {user.role === 'admin' ? <Shield size={14} /> : <User size={14} />}
                        </div>
                        <span className="text-sm font-medium text-[#1c1917]">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-[#1c1917] text-white'
                          : 'bg-[#f5f5f4] text-[#57534e] border border-[#e7e5e4]'
                      }`}>
                        {user.role === 'admin' ? <UserCog size={12} /> : <User size={12} />}
                        {user.role === 'admin' ? 'Admin' : 'Warga'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#78716c]">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '-'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openModal('edit', user)}
                          className="p-2 rounded-lg text-[#57534e] hover:bg-[#f5f5f4] transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openModal('reset', user)}
                          className="p-2 rounded-lg text-[#57534e] hover:bg-[#f5f5f4] transition-colors"
                          title="Reset Password"
                        >
                          <KeyRound size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(user.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            deleteConfirm === user.id
                              ? 'text-white bg-[#dc2626]'
                              : 'text-[#dc2626] hover:bg-[#fef2f2]'
                          }`}
                          title={deleteConfirm === user.id ? 'Klik lagi untuk konfirmasi' : 'Hapus'}
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-2xl border border-[#e7e5e4] shadow-xl w-full max-w-md pointer-events-auto overflow-hidden">
                {modalType === 'create' && <CreateUserForm onClose={closeModal} />}
                {modalType === 'edit' && selectedUser && <EditUserForm user={selectedUser} onClose={closeModal} />}
                {modalType === 'reset' && selectedUser && <ResetPasswordForm user={selectedUser} onClose={closeModal} />}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function CreateUserForm({ onClose }: { onClose: () => void }) {
  const [state, action, pending] = useActionState(createUser, undefined);

  return (
    <>
      <div className="flex items-center justify-between p-5 border-b border-[#e7e5e4]">
        <h3 className="font-semibold text-[#1c1917]">Tambah Akun Baru</h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f5f5f4] transition-colors">
          <X size={18} className="text-[#a8a29e]" />
        </button>
      </div>
      <form action={action} className="p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
            placeholder="nama@email.com"
          />
          {state?.errors?.email && <p className="text-[#dc2626] text-xs mt-1">{state.errors.email[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
            placeholder="••••••"
          />
          {state?.errors?.password && <p className="text-[#dc2626] text-xs mt-1">{state.errors.password[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Role</label>
          <select
            name="role"
            required
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all"
          >
            <option value="warga">Warga</option>
            <option value="admin">Admin</option>
          </select>
          {state?.errors?.role && <p className="text-[#dc2626] text-xs mt-1">{state.errors.role[0]}</p>}
        </div>

        {state?.message && (
          <p className="text-[#dc2626] text-sm bg-[#fef2f2] p-3 rounded-lg">{state.message}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#e7e5e4] text-[#57534e] font-medium hover:bg-[#fafaf9] transition-colors text-sm"
          >
            Batal
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={pending}
            className="flex-1 bg-[#57534e] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#44403c] disabled:opacity-50 transition-all text-sm"
          >
            {pending ? 'Menyimpan...' : 'Simpan'}
          </motion.button>
        </div>
      </form>
    </>
  );
}

function EditUserForm({ user, onClose }: { user: UserItem; onClose: () => void }) {
  const [state, action, pending] = useActionState(updateUser, undefined);

  return (
    <>
      <div className="flex items-center justify-between p-5 border-b border-[#e7e5e4]">
        <h3 className="font-semibold text-[#1c1917]">Edit Akun</h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f5f5f4] transition-colors">
          <X size={18} className="text-[#a8a29e]" />
        </button>
      </div>
      <form action={action} className="p-5 space-y-4">
        <input type="hidden" name="id" value={user.id} />
        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Email</label>
          <input
            name="email"
            type="email"
            required
            defaultValue={user.email}
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
          />
          {state?.errors?.email && <p className="text-[#dc2626] text-xs mt-1">{state.errors.email[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Role</label>
          <select
            name="role"
            required
            defaultValue={user.role}
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all"
          >
            <option value="warga">Warga</option>
            <option value="admin">Admin</option>
          </select>
          {state?.errors?.role && <p className="text-[#dc2626] text-xs mt-1">{state.errors.role[0]}</p>}
        </div>

        {state?.message && (
          <p className="text-[#dc2626] text-sm bg-[#fef2f2] p-3 rounded-lg">{state.message}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#e7e5e4] text-[#57534e] font-medium hover:bg-[#fafaf9] transition-colors text-sm"
          >
            Batal
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={pending}
            className="flex-1 bg-[#57534e] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#44403c] disabled:opacity-50 transition-all text-sm"
          >
            {pending ? 'Menyimpan...' : 'Simpan Perubahan'}
          </motion.button>
        </div>
      </form>
    </>
  );
}

function ResetPasswordForm({ user, onClose }: { user: UserItem; onClose: () => void }) {
  const [state, action, pending] = useActionState(resetUserPassword, undefined);

  return (
    <>
      <div className="flex items-center justify-between p-5 border-b border-[#e7e5e4]">
        <h3 className="font-semibold text-[#1c1917]">Reset Password</h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f5f5f4] transition-colors">
          <X size={18} className="text-[#a8a29e]" />
        </button>
      </div>
      <form action={action} className="p-5 space-y-4">
        <input type="hidden" name="id" value={user.id} />
        <p className="text-sm text-[#78716c]">
          Set password baru untuk akun <strong className="text-[#1c1917]">{user.email}</strong>.
        </p>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Password Baru</label>
          <input
            name="newPassword"
            type="password"
            required
            minLength={6}
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
            placeholder="••••••"
          />
          {state?.errors?.newPassword && <p className="text-[#dc2626] text-xs mt-1">{state.errors.newPassword[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#57534e] mb-1.5">Konfirmasi Password</label>
          <input
            name="confirmPassword"
            type="password"
            required
            className="w-full px-4 py-2.5 bg-[#fafaf9] rounded-lg text-sm text-[#1c1917] border border-[#e7e5e4] focus:border-[#a8a29e] focus:ring-2 focus:ring-[#e7e5e4] outline-none transition-all placeholder:text-[#a8a29e]"
            placeholder="••••••"
          />
          {state?.errors?.confirmPassword && <p className="text-[#dc2626] text-xs mt-1">{state.errors.confirmPassword[0]}</p>}
        </div>

        {state?.message && (
          <p className="text-[#dc2626] text-sm bg-[#fef2f2] p-3 rounded-lg">{state.message}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#e7e5e4] text-[#57534e] font-medium hover:bg-[#fafaf9] transition-colors text-sm"
          >
            Batal
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={pending}
            className="flex-1 bg-[#57534e] text-white px-4 py-2.5 rounded-lg font-medium hover:bg-[#44403c] disabled:opacity-50 transition-all text-sm"
          >
            {pending ? 'Mengubah...' : 'Reset Password'}
          </motion.button>
        </div>
      </form>
    </>
  );
}
