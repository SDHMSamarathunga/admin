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
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Processed Volume</div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight">$148,920.40</div>
          <div className="text-[11px] font-semibold text-emerald-700 mt-1">+18.4% vs last billing cycle</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Settled Invoices</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">1,492</div>
          <div className="text-[11px] text-slate-500 mt-1">98.8% settlement rate</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Authorizations</div>
          <div className="text-2xl font-black text-amber-600 tracking-tight">$8,450.00</div>
          <div className="text-[11px] text-amber-700 mt-1 font-medium">5 transactions under review</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Disputed / Refunded</div>
          <div className="text-2xl font-black text-slate-700 tracking-tight">$1,240.00</div>
          <div className="text-[11px] text-slate-500 mt-1">0.8% dispute ratio</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm flex-1 max-w-md focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by order #, client, email or plan..."
              className="bg-transparent border-0 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 text-base"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <select
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:border-emerald-500 focus:bg-white cursor-pointer"
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
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:border-emerald-500 focus:bg-white cursor-pointer"
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-colors"
            >
              <Download size={14} className="text-slate-500" />
              <span>Export Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-3">Invoice Ref</th>
                <th className="py-3 px-3">Client / Tenant</th>
                <th className="py-3 px-3">Service Plan</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Gateway</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400 text-xs">
                    <ShoppingCart size={32} className="mx-auto mb-2 text-slate-300" />
                    <span>No orders matched your active filters</span>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{ord.id}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                          {ord.customer.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{ord.customer}</div>
                          <div className="text-[11px] text-slate-500">{ord.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-600 font-medium">{ord.tier}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 text-xs">{ord.amount}</td>
                    <td className="py-3 px-3">
                      <div className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                        <CreditCard size={13} className="text-slate-400" />
                        <span>{ord.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          ord.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : ord.status === 'Processing'
                            ? 'bg-teal-50 text-teal-700 border border-teal-200'
                            : ord.status === 'Refunded'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{ord.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-500">{ord.date}</td>
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewOrder(ord)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-colors"
                          title="View Invoice"
                        >
                          <Eye size={14} />
                        </button>
                        {ord.status !== 'Refunded' && (
                          <button
                            type="button"
                            onClick={() => handleRefund(ord.id, ord.amount)}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white text-amber-600 hover:bg-amber-50 shadow-sm transition-colors"
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
