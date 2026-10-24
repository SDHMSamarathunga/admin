import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Target,
  Smartphone,
  Laptop,
  Radio
} from 'lucide-react';

export default function AnalyticsTab({ onTriggerToast }) {
  const [timeRange, setTimeRange] = useState('30d');

  const trafficSources = [
    { source: 'Direct Enterprise Sign-ins', percentage: 44, visits: '64,200', color: 'bg-emerald-400' },
    { source: 'Organic Developer Search', percentage: 26, visits: '37,900', color: 'bg-teal-400' },
    { source: 'GitHub & Partner Integrations', percentage: 18, visits: '26,300', color: 'bg-violet-400' },
    { source: 'Tech News & Substack', percentage: 12, visits: '17,500', color: 'bg-amber-400' }
  ];

  const funnelSteps = [
    { step: '1. Cluster Landing Visits', count: '145,800', rate: '100%', drop: null },
    { step: '2. Sandbox Playground Trials', count: '54,200', rate: '37.1%', drop: '-62.9%' },
    { step: '3. Team Onboarding Invites', count: '28,900', rate: '19.8%', drop: '-46.6%' },
    { step: '4. Paid Enterprise Tiers', count: '4,850', rate: '3.3%', drop: '-83.2%' }
  ];

  const geoData = [
    { country: 'United States', code: 'US', revenue: '$74,200', share: '49.8%', growth: '+18.4%' },
    { country: 'Germany & EU', code: 'DE', revenue: '$32,400', share: '21.7%', growth: '+24.1%' },
    { country: 'United Kingdom', code: 'GB', revenue: '$18,900', share: '12.6%', growth: '+15.2%' },
    { country: 'India & APAC', code: 'IN', revenue: '$14,800', share: '9.9%', growth: '+42.8%' },
    { country: 'Japan & East Asia', code: 'JP', revenue: '$8,620', share: '5.7%', growth: '+8.9%' }
  ];

  const deviceData = [
    { type: 'Desktop Workstations', icon: Laptop, share: '68%' },
    { type: 'Mobile & Companion', icon: Smartphone, share: '21%' },
    { type: 'CI/CD & Headless SDKs', icon: Radio, share: '11%' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Target size={18} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold text-slate-300">Analytics Scope:</span>
          <div className="flex p-1 rounded-xl bg-slate-800 border border-slate-700/80">
            {['7d', '30d', '90d', 'ytd'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase transition-colors ${
                  timeRange === range
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onTriggerToast('Synthesizing analytics dossier PDF...')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold self-start sm:self-auto transition-colors"
        >
          <Download size={14} />
          <span>Export Dossier</span>
        </button>
      </div>

      {/* 2-Column: Funnel + Traffic Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Customer Conversion Funnel</h2>
              <p className="text-xs text-slate-400">Visitor velocity from landing to paid enterprise tier</p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              3.3% OVERALL CVR
            </span>
          </div>

          <div className="space-y-4">
            {funnelSteps.map((f, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">{f.step}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{f.count}</span>
                    <span className="text-slate-500">({f.rate})</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
                    style={{ width: f.rate }}
                  />
                </div>
                {f.drop && (
                  <div className="text-right text-[10px] text-rose-400 font-semibold">{f.drop} dropoff</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Acquisition Channels */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-white">Acquisition Channels</h2>
                <p className="text-xs text-slate-400">Breakdown of inbound cloud console requests</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/20">
                145.8K SESSIONS
              </span>
            </div>

            <div className="space-y-4 mb-6">
              {trafficSources.map((t, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200">{t.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{t.visits}</span>
                      <span className="font-bold text-white">{t.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Client Environments
            </div>
            <div className="grid grid-cols-3 gap-2">
              {deviceData.map((d, idx) => {
                const Icon = d.icon;
                return (
                  <div key={idx} className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-center">
                    <Icon size={14} className="mx-auto mb-1 text-slate-400" />
                    <div className="text-[10px] text-slate-400 truncate">{d.type}</div>
                    <div className="text-xs font-bold text-white">{d.share}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Footprint */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Geographic Footprint & Revenue</h2>
            <p className="text-xs text-slate-400">Enterprise billing volume and MoM acceleration by region</p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
            114 NATIONS REACHED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Territory</th>
                <th className="pb-3">Gross Invoicing</th>
                <th className="pb-3">Global Share</th>
                <th className="pb-3">Acceleration</th>
                <th className="pb-3">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {geoData.map((g) => (
                <tr key={g.code} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {g.code}
                      </span>
                      <span className="font-semibold text-white text-xs">{g.country}</span>
                    </div>
                  </td>
                  <td className="py-3 font-mono font-bold text-white text-xs">{g.revenue}</td>
                  <td className="py-3 text-xs text-slate-300">{g.share}</td>
                  <td className="py-3">
                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                      <TrendingUp size={12} />
                      <span>{g.growth}</span>
                    </div>
                  </td>
                  <td className="py-3 min-w-36">
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: g.share }} />
                    </div>
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
