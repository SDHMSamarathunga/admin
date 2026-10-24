import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-emerald-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-xl shadow-slate-900/10 backdrop-blur-md pointer-events-auto animate-in slide-in-from-bottom-4 duration-200"
          role="status"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <CheckCircle2 size={16} />
          </div>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
