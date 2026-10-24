import React, { useState } from 'react';
import {
  DollarSign,
  Users,
  ShoppingCart,
  Zap,
  TrendingUp,
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
      color: 'teal'
    },
    {
      id: 'orders',
      label: 'Fulfillment & Orders',
      value: '1,492',
      change: '+12.5%',
      trend: 'up',
      subtitle: '99.4% on-time delivery',
      icon: ShoppingCart,
      color: 'cyan'
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>LIVE TELEMETRY STREAM</span>
          </div>
          <span className="text-xs text-slate-500">Cluster synchronization: active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onTriggerToast('Exporting executive telemetry CSV...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenNewItemModal('user')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
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
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all hover:translate-y-[-2px]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</span>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    kpi.color === 'emerald'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : kpi.color === 'teal'
                      ? 'bg-teal-50 text-teal-700 border border-teal-200'
                      : kpi.color === 'cyan'
                      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  <Icon size={18} />
                </div>
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-2xl font-black text-slate-900 tracking-tight">{kpi.value}</div>
                <div className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
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
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Revenue & Invoicing Trajectory</h2>
              <p className="text-xs text-slate-500">Gross volume across global enterprise tenant tiers</p>
            </div>
            <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
              {['7d', '30d', '90d'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setChartPeriod(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors ${
                    chartPeriod === p
                      ? 'bg-white text-emerald-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Visual Container */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-6">
            <div className="flex flex-wrap gap-4 mb-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span className="text-slate-500">Gross:</span>
                <span className="font-bold text-slate-900">$148,920</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                <span className="text-slate-500">Net Margin:</span>
                <span className="font-bold text-slate-900">78.4%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
                <span className="text-slate-500">Avg Ticket:</span>
                <span className="font-bold text-slate-900">$1,850</span>
              </div>
            </div>

            {/* Bars */}
            <div className="flex items-end justify-between h-48 gap-3 sm:gap-6 pt-6 border-b border-dashed border-slate-200 pb-2">
              {currentPoints.map((pt, i) => {
                const heightPercent = Math.max(15, Math.round((pt.revenue / maxRevenue) * 100));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full group relative cursor-pointer">
                    {/* Tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-bold shadow-lg whitespace-nowrap z-10">
                      ${pt.revenue.toLocaleString()} ({pt.orders} orders)
                    </div>
                    {/* Track & Bar */}
                    <div className="w-full max-w-10 flex-1 flex items-end bg-slate-200/80 rounded-t-lg overflow-hidden">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t-lg transition-all duration-500 group-hover:brightness-95"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="mt-2 text-[11px] font-semibold text-slate-600 truncate">{pt.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="flex gap-6">
              <div>
                <div className="text-[11px] text-slate-400">Projected Run Rate</div>
                <div className="text-sm font-bold text-slate-900">$1.78M / yr</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Customer Retention</div>
                <div className="text-sm font-bold text-slate-900">97.8%</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">MRR Growth</div>
                <div className="text-sm font-bold text-emerald-700">+22.4%</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('analytics')}
              className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 self-start sm:self-auto"
            >
              <span>Explore Analytics</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Cluster Operations */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Cluster Operations</h2>
                <p className="text-xs text-slate-500">Global edge node health</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                OPTIMAL
              </span>
            </div>

            {/* Hardware mini gauges */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 mb-1">
                  <Cpu size={12} />
                  <span>CPU</span>
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">38%</div>
                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600" style={{ width: '38%' }} />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 mb-1">
                  <Layers size={12} />
                  <span>RAM</span>
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">64%</div>
                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600" style={{ width: '64%' }} />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 mb-1">
                  <Server size={12} />
                  <span>IOPS</span>
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">22%</div>
                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-600" style={{ width: '22%' }} />
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
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        node.status === 'Optimal' ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]' : 'bg-amber-500'
                      }`}
                    />
                    <span className="font-semibold text-slate-700 truncate">{node.region}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 shrink-0">
                    <span className="text-emerald-700 font-bold">{node.latency}</span>
                    <span>{node.load}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab('security')}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors"
          >
            <span>Configure Edge Firewall</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Table: Recent Orders */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Invoices & Transactions</h2>
            <p className="text-xs text-slate-500">Live enterprise settlement events</p>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('orders')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/70">
                <th className="py-2.5 px-3 rounded-l-lg">Ref ID</th>
                <th className="py-2.5 px-3">Client / Tenant</th>
                <th className="py-2.5 px-3">Service Tier</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono text-xs text-emerald-700 font-bold">{ord.id}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
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
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        ord.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : ord.status === 'Processing'
                          ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs text-slate-500">{ord.date}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => onViewOrder && onViewOrder(ord)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-colors"
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
