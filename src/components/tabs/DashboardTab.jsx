import React, { useState } from 'react';
import {
  DollarSign,
  Users,
  ShoppingCart,
  Zap,
  TrendingUp,
  TrendingDown,
  Download,
  Plus,
  Eye,
  Server,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function DashboardTab({
  onSelectTab,
  onOpenNewItemModal,
  onTriggerToast,
  onViewOrder
}) {
  const [chartPeriod, setChartPeriod] = useState('30d');

  const kpis = [
    {
      id: 'rev',
      label: 'Gross Volume / Revenue',
      value: '$148,920.40',
      change: '+16.4%',
      trend: 'up',
      subtitle: 'vs. $127,900 last month',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      id: 'users',
      label: 'Active Cloud Tenants',
      value: '42,850',
      change: '+8.2%',
      trend: 'up',
      subtitle: '3,410 onboarded this week',
      icon: Users,
      color: 'violet'
    },
    {
      id: 'orders',
      label: 'Fulfillment & Orders',
      value: '1,492',
      change: '+12.5%',
      trend: 'up',
      subtitle: '99.4% on-time delivery',
      icon: ShoppingCart,
      color: 'teal'
    },
    {
      id: 'latency',
      label: 'Global Edge Latency',
      value: '18.4 ms',
      change: '-4.2ms',
      trend: 'up',
      subtitle: 'Sub-20ms in 14 regions',
      icon: Zap,
      color: 'amber'
    }
  ];

  const chartDatasets = {
    '7d': [
      { label: 'Mon', revenue: 14200, orders: 120 },
      { label: 'Tue', revenue: 18500, orders: 154 },
      { label: 'Wed', revenue: 16400, orders: 139 },
      { label: 'Thu', revenue: 22100, orders: 188 },
      { label: 'Fri', revenue: 24800, orders: 210 },
      { label: 'Sat', revenue: 19600, orders: 165 },
      { label: 'Sun', revenue: 28400, orders: 242 }
    ],
    '30d': [
      { label: 'W1', revenue: 32000, orders: 280 },
      { label: 'W2', revenue: 38400, orders: 340 },
      { label: 'W3', revenue: 44200, orders: 390 },
      { label: 'W4', revenue: 52100, orders: 482 }
    ],
    '90d': [
      { label: 'Month 1', revenue: 112000, orders: 1100 },
      { label: 'Month 2', revenue: 134000, orders: 1280 },
      { label: 'Month 3', revenue: 148920, orders: 1492 }
    ]
  };

  const currentPoints = chartDatasets[chartPeriod] || chartDatasets['30d'];
  const maxRevenue = Math.max(...currentPoints.map((p) => p.revenue));

  const recentOrders = [
    {
      id: 'ORD-9842',
      customer: 'Acme Corp Labs',
      email: 'billing@acme.ai',
      tier: 'Enterprise Dedicated',
      amount: '$4,800.00',
      status: 'Completed',
      date: 'Just now'
    },
    {
      id: 'ORD-9841',
      customer: 'Vanguard FinTech',
      email: 'ops@vanguard.io',
      tier: 'Kubernetes Scale',
      amount: '$2,450.00',
      status: 'Completed',
      date: '12 min ago'
    },
    {
      id: 'ORD-9840',
      customer: 'QuantEdge Analytics',
      email: 'infra@quantedge.com',
      tier: 'Vector Inference Node',
      amount: '$1,200.00',
      status: 'Processing',
      date: '45 min ago'
    },
    {
      id: 'ORD-9839',
      customer: 'Hyperion Biotech',
      email: 'research@hyperion.bio',
      tier: 'Neural Cache Multi-Region',
      amount: '$8,900.00',
      status: 'In Review',
      date: '2 hrs ago'
    },
    {
      id: 'ORD-9838',
      customer: 'Solaria Energy',
      email: 'iot@solaria.eu',
      tier: 'Standard Cloud Cluster',
      amount: '$650.00',
      status: 'Completed',
      date: '4 hrs ago'
    }
  ];

  const edgeNodes = [
    { region: 'us-east-1 (N. Virginia)', status: 'Optimal', latency: '11ms', load: '42%' },
    { region: 'eu-central-1 (Frankfurt)', status: 'Optimal', latency: '19ms', load: '58%' },
    { region: 'ap-south-1 (Mumbai)', status: 'Optimal', latency: '24ms', load: '36%' },
    { region: 'sa-east-1 (São Paulo)', status: 'Elevated', latency: '38ms', load: '71%' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE TELEMETRY STREAM</span>
          </div>
          <span className="text-xs text-slate-400">Cluster synchronization: active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onTriggerToast('Exporting executive telemetry CSV...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-semibold transition-colors"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenNewItemModal('user')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all"
          >
            <Plus size={14} />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl flex flex-col justify-between hover:border-slate-700 transition-all hover:translate-y-[-2px] shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">{kpi.label}</span>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    kpi.color === 'emerald'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                      : kpi.color === 'violet'
                      ? 'bg-violet-500/15 text-violet-400 border border-violet-500/20'
                      : kpi.color === 'teal'
                      ? 'bg-teal-500/15 text-teal-400 border border-teal-500/20'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  <Icon size={18} />
                </div>
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-2xl font-black text-white tracking-tight">{kpi.value}</div>
                <div className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                  <TrendingUp size={13} />
                  <span>{kpi.change}</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500">{kpi.subtitle}</div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Revenue Trajectory + Cluster Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Revenue Curve */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Revenue & Invoicing Trajectory</h2>
              <p className="text-xs text-slate-400">Gross volume across global enterprise tenant tiers</p>
            </div>
            <div className="flex p-1 rounded-xl bg-slate-800/80 border border-slate-700/80 self-start sm:self-auto">
              {['7d', '30d', '90d'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setChartPeriod(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-colors ${
                    chartPeriod === p
                      ? 'bg-slate-700 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Visual Container */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 mb-6">
            <div className="flex flex-wrap gap-4 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-slate-400">Gross:</span>
                <span className="font-bold text-white">$148,920</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                <span className="text-slate-400">Net Margin:</span>
                <span className="font-bold text-white">78.4%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                <span className="text-slate-400">Avg Ticket:</span>
                <span className="font-bold text-white">$1,850</span>
              </div>
            </div>

            {/* Bars */}
            <div className="flex items-end justify-between h-48 gap-3 sm:gap-6 pt-6 border-b border-dashed border-slate-700 pb-2">
              {currentPoints.map((pt, i) => {
                const heightPercent = Math.max(15, Math.round((pt.revenue / maxRevenue) * 100));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full group relative cursor-pointer">
                    {/* Tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none px-2 py-1 rounded-md bg-white text-slate-900 text-[10px] font-bold shadow-lg whitespace-nowrap z-10">
                      ${pt.revenue.toLocaleString()} ({pt.orders} orders)
                    </div>
                    {/* Track & Bar */}
                    <div className="w-full max-w-10 flex-1 flex items-end bg-slate-800/80 rounded-t-lg overflow-hidden">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 via-emerald-500 to-teal-400 rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="mt-2 text-[11px] font-medium text-slate-400 truncate">{pt.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
            <div className="flex gap-6">
              <div>
                <div className="text-[11px] text-slate-500">Projected Run Rate</div>
                <div className="text-sm font-bold text-white">$1.78M / yr</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">Customer Retention</div>
                <div className="text-sm font-bold text-white">97.8%</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500">MRR Growth</div>
                <div className="text-sm font-bold text-emerald-400">+22.4%</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('analytics')}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 self-start sm:self-auto"
            >
              <span>Explore Analytics</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Cluster Operations */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-white">Cluster Operations</h2>
                <p className="text-xs text-slate-400">Global edge node health</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                OPTIMAL
              </span>
            </div>

            {/* Hardware mini gauges */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400 mb-1">
                  <Cpu size={12} />
                  <span>CPU</span>
                </div>
                <div className="text-sm font-bold text-white mb-1">38%</div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: '38%' }} />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400 mb-1">
                  <Layers size={12} />
                  <span>RAM</span>
                </div>
                <div className="text-sm font-bold text-white mb-1">64%</div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-400" style={{ width: '64%' }} />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400 mb-1">
                  <Server size={12} />
                  <span>IOPS</span>
                </div>
                <div className="text-sm font-bold text-white mb-1">22%</div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-400" style={{ width: '22%' }} />
                </div>
              </div>
            </div>

            {/* Edge regions list */}
            <div className="space-y-2 mb-6">
              <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                Active Gateways
              </div>
              {edgeNodes.map((node, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        node.status === 'Optimal' ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-amber-400'
                      }`}
                    />
                    <span className="font-medium text-slate-300 truncate">{node.region}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 shrink-0">
                    <span className="text-emerald-400">{node.latency}</span>
                    <span>{node.load}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab('security')}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 text-xs font-semibold transition-colors"
          >
            <span>Configure Edge Firewall</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Table: Recent Orders */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Recent Invoices & Transactions</h2>
            <p className="text-xs text-slate-400">Live enterprise settlement events</p>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('orders')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Ref ID</th>
                <th className="pb-3">Tenant / Client</th>
                <th className="pb-3">Service Tier</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentOrders.map((ord) => (
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
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        ord.status === 'Completed'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : ord.status === 'Processing'
                          ? 'bg-teal-500/15 text-teal-400 border border-teal-500/20'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-slate-400">{ord.date}</td>
                  <td className="py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onViewOrder && onViewOrder(ord)}
                      className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Inspect"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
