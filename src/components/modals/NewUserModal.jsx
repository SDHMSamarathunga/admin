import React, { useState } from 'react';
import { X, UserPlus, Mail, User } from 'lucide-react';

export default function NewUserModal({ isOpen, onClose, onAddUser, onTriggerToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Senior Engineer');
  const [department, setDepartment] = useState('Core Infrastructure');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role,
      department,
      status: 'Active',
      twoFactor: false,
      lastActive: 'Just registered',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };

    onAddUser(newUser);
    onTriggerToast(`Invited ${name} with ${role} permissions`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <UserPlus size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Invite Team Member</h3>
              <p className="text-[11px] text-slate-500">Assign role and organizational access</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Full Name</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <User size={15} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="e.g. Alex Mercer"
                className="bg-transparent border-0 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Corporate Email</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <Mail size={15} className="text-slate-400 shrink-0" />
              <input
                type="email"
                placeholder="alex.mercer@enterprise.io"
                className="bg-transparent border-0 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Access Role</label>
              <select
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:border-emerald-500 focus:bg-white cursor-pointer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Super Admin">Super Admin</option>
                <option value="DevOps Lead">DevOps Lead</option>
                <option value="Security Architect">Security Architect</option>
                <option value="Senior Engineer">Senior Engineer</option>
                <option value="Product Manager">Product Manager</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Department</label>
              <select
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:border-emerald-500 focus:bg-white cursor-pointer"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Core Infrastructure">Core Infrastructure</option>
                <option value="Cloud Security">Cloud Security</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Product Ops">Product Ops</option>
                <option value="Platform SRE">Platform SRE</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
