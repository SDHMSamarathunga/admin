import React from 'react';
import { X, FileText, Download, CheckCircle2, CreditCard } from 'lucide-react';

export default function OrderDetailsModal({ isOpen, onClose, order, onTriggerToast }) {
  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileText size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Invoice #{order.id}</h3>
              <p className="text-[11px] text-slate-400">Nexus Autonomous Billing Engine</p>
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

        {/* Amount Hero */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 text-center mb-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                order.status === 'Completed'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
              }`}
            >
              {order.status}
            </span>
            <span>{order.date}</span>
          </div>
          <div className="text-3xl font-black text-white font-mono">{order.amount}</div>
          <div className="text-xs text-emerald-400 font-medium mt-1">Settled via {order.paymentMethod}</div>
        </div>

        {/* Client & Merchant Info */}
        <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Tenant</span>
            <div className="font-bold text-white text-xs">{order.customer}</div>
            <div className="text-slate-400 text-[11px]">{order.email}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Merchant</span>
            <div className="font-bold text-white text-xs">Nexus Cloud Systems Inc.</div>
            <div className="text-slate-400 text-[11px]">billing-support@nexus.io</div>
          </div>
        </div>

        {/* Line Items */}
        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 mb-5 text-xs">
          <div className="flex justify-between font-bold text-[10px] text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800 mb-2.5">
            <span>Service Description</span>
            <span>Amount</span>
          </div>
          <div className="flex justify-between items-start py-1">
            <div>
              <div className="font-semibold text-white">{order.tier}</div>
              <div className="text-[11px] text-slate-400">Sub-20ms edge latency, 99.98% SLA</div>
            </div>
            <div className="font-mono font-bold text-white">{order.amount}</div>
          </div>
          <div className="flex justify-between items-center pt-2.5 mt-2 border-t border-slate-800 text-slate-400 text-[11px]">
            <span>Surcharge & Regional Taxes</span>
            <span>$0.00 (Exempt)</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => onTriggerToast(`PDF invoice for ${order.id} downloaded`)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold shadow-md shadow-emerald-500/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
