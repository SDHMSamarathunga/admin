import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-emerald-500/30 text-white text-xs sm:text-sm font-medium shadow-2xl shadow-black/80 backdrop-blur-md pointer-events-auto animate-in slide-in-from-bottom-4 duration-200"
          role="status"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 size={15} />
          </div>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
