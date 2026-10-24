import React, { useState } from 'react';
import { X, Key, ShieldCheck } from 'lucide-react';

export default function NewApiKeyModal({ isOpen, onClose, onAddKey, onTriggerToast }) {
  const [name, setName] = useState('');
  const [scope, setScope] = useState('Full Admin (Read/Write/Deploy)');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const randomSuffix = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 36).toString(36)
    ).join('');

    const newKey = {
      id: `key-${Date.now()}`,
      name: name.trim(),
      key: `nx_live_${randomSuffix}`,
      scope,
      created: 'Just now',
      lastUsed: 'Never invoked'
    };

    onAddKey(newKey);
    onTriggerToast(`API Token "${name}" generated successfully`);
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
              <Key size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Generate API Token</h3>
              <p className="text-[11px] text-slate-400">Bearer token for edge mesh invocation</p>
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
            <label className="text-xs font-semibold text-slate-300">Token Description</label>
            <input
              type="text"
              placeholder="e.g. GitHub Actions CI/CD Pipeline"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Permission Scope</label>
            <select
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:outline-none cursor-pointer"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
            >
              <option value="Full Admin (Read/Write/Deploy)">Full Admin (Read/Write/Deploy)</option>
              <option value="Read-Only Telemetry">Read-Only Telemetry</option>
              <option value="Inference API Gateway">Inference API Gateway</option>
              <option value="CI/CD Release Automation">CI/CD Release Automation</option>
            </select>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-slate-300 flex items-start gap-2.5">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Tokens grant cryptographic access across active edge endpoints. Keep securely stored in your vault.
            </span>
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
              Generate Token
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
