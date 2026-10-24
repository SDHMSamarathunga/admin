import React from 'react';
import { X, FileText, Download } from 'lucide-react';

export default function OrderDetailsModal({ isOpen, onClose, order, onTriggerToast }) {
  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <FileText size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Invoice #{order.id}</h3>
              <p className="text-[11px] text-slate-500">Nexus Autonomous Billing Engine</p>
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

        {/* Amount Hero */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center mb-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                order.status === 'Completed'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {order.status}
            </span>
            <span className="font-medium text-slate-500">{order.date}</span>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">{order.amount}</div>
          <div className="text-xs text-emerald-700 font-semibold mt-1">Settled via {order.paymentMethod}</div>
        </div>

        {/* Client & Merchant Info */}
        <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Tenant</span>
            <div className="font-bold text-slate-900 text-xs">{order.customer}</div>
            <div className="text-slate-500 text-[11px]">{order.email}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Merchant</span>
            <div className="font-bold text-slate-900 text-xs">Nexus Cloud Systems Inc.</div>
            <div className="text-slate-500 text-[11px]">billing-support@nexus.io</div>
          </div>
        </div>

        {/* Line Items */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-5 text-xs">
          <div className="flex justify-between font-bold text-[10px] text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-200 mb-2.5">
            <span>Service Description</span>
            <span>Amount</span>
          </div>
          <div className="flex justify-between items-start py-1">
            <div>
              <div className="font-bold text-slate-900">{order.tier}</div>
              <div className="text-[11px] text-slate-500">Sub-20ms edge latency, 99.98% SLA</div>
            </div>
            <div className="font-mono font-bold text-slate-900">{order.amount}</div>
          </div>
          <div className="flex justify-between items-center pt-2.5 mt-2 border-t border-slate-200 text-slate-500 text-[11px]">
            <span>Surcharge & Regional Taxes</span>
            <span className="font-semibold text-slate-700">$0.00 (Exempt)</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onTriggerToast(`PDF invoice for ${order.id} downloaded`)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-colors"
          >
            <Download size={14} className="text-slate-500" />
            <span>Download PDF</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
