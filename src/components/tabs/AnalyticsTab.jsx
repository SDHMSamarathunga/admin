import React, { useState } from 'react';
import {
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
    { source: 'Direct Enterprise Sign-ins', percentage: 44, visits: '64,200', color: 'bg-emerald-500' },
    { source: 'Organic Developer Search', percentage: 26, visits: '37,900', color: 'bg-teal-500' },
    { source: 'GitHub & Partner Integrations', percentage: 18, visits: '26,300', color: 'bg-cyan-500' },
    { source: 'Tech News & Substack', percentage: 12, visits: '17,500', color: 'bg-amber-500' }
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <Target size={18} className="text-emerald-700 shrink-0" />
          <span className="text-xs font-bold text-slate-700">Analytics Scope:</span>
          <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200">
            {['7d', '30d', '90d', 'ytd'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors ${
                  timeRange === range
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
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
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold self-start sm:self-auto transition-colors"
        >
          <Download size={14} />
          <span>Export Dossier</span>
        </button>
      </div>

      {/* 2-Column: Funnel + Traffic Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Customer Conversion Funnel</h2>
              <p className="text-xs text-slate-500">Visitor velocity from landing to paid enterprise tier</p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              3.3% OVERALL CVR
            </span>
          </div>

          <div className="space-y-4">
            {funnelSteps.map((f, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{f.step}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{f.count}</span>
                    <span className="text-slate-400 font-medium">({f.rate})</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all"
                    style={{ width: f.rate }}
                  />
                </div>
                {f.drop && (
                  <div className="text-right text-[10px] text-rose-500 font-bold">{f.drop} dropoff</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Acquisition Channels */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Acquisition Channels</h2>
                <p className="text-xs text-slate-500">Breakdown of inbound cloud console requests</p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                145.8K SESSIONS
              </span>
            </div>

            <div className="space-y-4 mb-6">
              {trafficSources.map((t, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{t.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">{t.visits}</span>
                      <span className="font-bold text-slate-900">{t.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Client Environments
            </div>
            <div className="grid grid-cols-3 gap-2">
              {deviceData.map((d, idx) => {
                const Icon = d.icon;
                return (
                  <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center">
                    <Icon size={14} className="mx-auto mb-1 text-slate-600" />
                    <div className="text-[10px] text-slate-500 truncate">{d.type}</div>
                    <div className="text-xs font-bold text-slate-900">{d.share}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Footprint */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Geographic Footprint & Revenue</h2>
            <p className="text-xs text-slate-500">Enterprise billing volume and MoM acceleration by region</p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            114 NATIONS REACHED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/70">
                <th className="py-2.5 px-3 rounded-l-lg">Territory</th>
                <th className="py-2.5 px-3">Gross Invoicing</th>
                <th className="py-2.5 px-3">Global Share</th>
                <th className="py-2.5 px-3">Acceleration</th>
                <th className="py-2.5 px-3 rounded-r-lg">Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {geoData.map((g) => (
                <tr key={g.code} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {g.code}
                      </span>
                      <span className="font-bold text-slate-900 text-xs">{g.country}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 text-xs">{g.revenue}</td>
                  <td className="py-3 px-3 text-xs text-slate-600 font-medium">{g.share}</td>
                  <td className="py-3 px-3">
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <TrendingUp size={12} />
                      <span>{g.growth}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 min-w-36">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: g.share }} />
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
