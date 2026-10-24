import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Download,
  Eye,
  CreditCard,
  RotateCcw
} from 'lucide-react';

export default function OrdersTab({
  orders,
  setOrders,
  onViewOrder,
  onTriggerToast
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.tier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    const matchesPayment = paymentFilter === 'ALL' || o.paymentMethod === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleRefund = (orderId, amount) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Refunded' } : o))
    );
    onTriggerToast(`Refund issued for order ${orderId} (${amount})`);
  };

  return (
    <div className="space-y-6">
      {/* Top Volume Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Processed Volume</div>
          <div className="text-2xl font-black text-emerald-400 tracking-tight">$148,920.40</div>
          <div className="text-[11px] text-slate-500 mt-1">+18.4% vs last billing cycle</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Settled Invoices</div>
          <div className="text-2xl font-black text-white tracking-tight">1,492</div>
          <div className="text-[11px] text-slate-500 mt-1">98.8% settlement rate</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Pending Authorizations</div>
          <div className="text-2xl font-black text-amber-400 tracking-tight">$8,450.00</div>
          <div className="text-[11px] text-slate-500 mt-1">5 transactions under review</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Disputed / Refunded</div>
          <div className="text-2xl font-black text-slate-300 tracking-tight">$1,240.00</div>
          <div className="text-[11px] text-slate-500 mt-1">0.8% dispute ratio</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-sm flex-1 max-w-md">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by order #, client, email or plan..."
              className="bg-transparent border-0 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <select
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="In Review">In Review</option>
              <option value="Refunded">Refunded</option>
            </select>

            <select
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="ALL">All Payment Types</option>
              <option value="Credit Card (Stripe)">Credit Card (Stripe)</option>
              <option value="Wire Transfer">Wire Transfer</option>
              <option value="Crypto Settlement">Crypto Settlement</option>
            </select>

            <button
              type="button"
              onClick={() => onTriggerToast(`Exporting billing ledger CSV...`)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <Download size={14} />
              <span>Export Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Invoice Ref</th>
                <th className="pb-3">Client / Tenant</th>
                <th className="pb-3">Service Plan</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Gateway</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-slate-500 text-xs">
                    <ShoppingCart size={28} className="mx-auto mb-2 text-slate-600" />
                    <span>No orders matched your active filters</span>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 font-mono text-xs text-emerald-400 font-semibold">{ord.id}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {ord.customer.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-xs">{ord.customer}</div>
                          <div className="text-[11px] text-slate-400">{ord.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-xs text-slate-300">{ord.tier}</td>
                    <td className="py-3 font-mono font-bold text-white text-xs">{ord.amount}</td>
                    <td className="py-3">
                      <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                        <CreditCard size={13} />
                        <span>{ord.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          ord.status === 'Completed'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                            : ord.status === 'Processing'
                            ? 'bg-teal-500/15 text-teal-400 border border-teal-500/20'
                            : ord.status === 'Refunded'
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{ord.status}</span>
                      </span>
                    </td>
                    <td className="py-3 text-xs text-slate-400">{ord.date}</td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewOrder(ord)}
                          className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors"
                          title="View Invoice"
                        >
                          <Eye size={14} />
                        </button>
                        {ord.status !== 'Refunded' && (
                          <button
                            type="button"
                            onClick={() => handleRefund(ord.id, ord.amount)}
                            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700 transition-colors"
                            title="Refund Order"
                          >
                            <RotateCcw size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
