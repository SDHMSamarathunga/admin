import React, { useState } from 'react';
import { X, UserPlus, Shield, Mail, Building, User } from 'lucide-react';

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
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <UserPlus size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Invite Team Member</h3>
              <p className="text-[11px] text-slate-400">Assign role and organizational access</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm">
              <User size={15} className="text-slate-500 shrink-0" />
              <input
                type="text"
                placeholder="e.g. Alex Mercer"
                className="bg-transparent border-0 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Corporate Email</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm">
              <Mail size={15} className="text-slate-500 shrink-0" />
              <input
                type="email"
                placeholder="alex.mercer@enterprise.io"
                className="bg-transparent border-0 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Access Role</label>
              <select
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none cursor-pointer"
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
              <label className="text-xs font-semibold text-slate-300">Department</label>
              <select
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none cursor-pointer"
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

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold shadow-md shadow-emerald-500/20"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
