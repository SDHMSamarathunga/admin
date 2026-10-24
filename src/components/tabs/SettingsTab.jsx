import React, { useState } from 'react';
import {
  Save,
  Building,
  Mail,
  Globe,
  DollarSign,
  Palette,
  Bell,
  AlertTriangle,
  Database,
  Download,
  Check
} from 'lucide-react';

export default function SettingsTab({
  theme,
  onSelectTheme,
  onTriggerToast
}) {
  const [orgName, setOrgName] = useState('Nexus Enterprise Cloud Ops');
  const [adminEmail, setAdminEmail] = useState('harsh.admin@nexus.io');
  const [timezone, setTimezone] = useState('Asia/Kolkata (UTC+5:30)');
  const [currency, setCurrency] = useState('USD ($)');

  const [notifSecurity, setNotifSecurity] = useState(true);
  const [notifBilling, setNotifBilling] = useState(true);
  const [notifWeeklyDigest, setNotifWeeklyDigest] = useState(false);

  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    onTriggerToast('Platform preferences updated successfully');
  };

  const themes = [
    { id: 'green', name: 'Emerald Mint', desc: 'Vibrant, high-contrast dark green & glass', color: '#10b981' },
    { id: 'dark', name: 'Nebula Violet', desc: 'Deep cosmic violet with radiant cyan accents', color: '#8b5cf6' },
    { id: 'midnight', name: 'Midnight Azure', desc: 'Executive navy slate with electric blue glow', color: '#3b82f6' },
    { id: 'cyberpunk', name: 'Cyberpunk Neon', desc: 'High voltage hot magenta & turquoise neon', color: '#ff007f' },
    { id: 'light', name: 'Clean Arctic', desc: 'Ultra-crisp workspace for daytime focus', color: '#6366f1' }
  ];

  return (
    <div className="space-y-6">
      {/* General Configuration */}
      <form onSubmit={handleSaveGeneral} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">Organization Profile</h2>
            <p className="text-xs text-slate-400">Global identifiers, primary admin contacts, and localization</p>
          </div>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 self-start sm:self-auto transition-all"
          >
            <Save size={14} />
            <span>Save Preferences</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Organization Name</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm">
              <Building size={16} className="text-slate-500 shrink-0" />
              <input
                type="text"
                className="bg-transparent border-0 text-white text-xs sm:text-sm focus:outline-none w-full"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Primary Contact Email</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm">
              <Mail size={16} className="text-slate-500 shrink-0" />
              <input
                type="email"
                className="bg-transparent border-0 text-white text-xs sm:text-sm focus:outline-none w-full"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Cluster Timezone</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm">
              <Globe size={16} className="text-slate-500 shrink-0" />
              <select
                className="bg-transparent border-0 text-white text-xs sm:text-sm focus:outline-none w-full cursor-pointer"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="Asia/Kolkata (UTC+5:30)">Asia/Kolkata (UTC+05:30)</option>
                <option value="America/New_York (UTC-5:00)">America/New_York (UTC-05:00)</option>
                <option value="Europe/London (UTC+0:00)">Europe/London (UTC+00:00)</option>
                <option value="Asia/Tokyo (UTC+9:00)">Asia/Tokyo (UTC+09:00)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Base Currency</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm">
              <DollarSign size={16} className="text-slate-500 shrink-0" />
              <select
                className="bg-transparent border-0 text-white text-xs sm:text-sm focus:outline-none w-full cursor-pointer"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD ($)">USD - US Dollar ($)</option>
                <option value="EUR (€)">EUR - Euro (€)</option>
                <option value="GBP (£)">GBP - British Pound (£)</option>
                <option value="INR (₹)">INR - Indian Rupee (₹)</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      {/* Visual Theme Selection */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Visual Palette</h2>
            <p className="text-xs text-slate-400">Select accent styling for your admin console session</p>
          </div>
          <Palette size={18} className="text-emerald-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {themes.map((t) => (
            <div
              key={t.id}
              onClick={() => onSelectTheme(t.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                theme === t.id
                  ? 'bg-slate-800 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-xs font-bold text-white">{t.name}</span>
                </div>
                {theme === t.id && <Check size={14} className="text-emerald-400" />}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Automated Alerts & Digest Rules</h2>
            <p className="text-xs text-slate-400">Configure email and webhook notification delivery</p>
          </div>
          <Bell size={18} className="text-teal-400" />
        </div>

        <div className="space-y-3 divide-y divide-slate-800">
          <div className="flex items-center justify-between gap-4 pt-2">
            <div>
              <div className="text-xs font-bold text-white">Critical Security & Threat Anomalies</div>
              <div className="text-[11px] text-slate-400">Immediate alerts on DDoS attacks or unauthorized access attempts.</div>
            </div>
            <input
              type="checkbox"
              checked={notifSecurity}
              onChange={(e) => {
                setNotifSecurity(e.target.checked);
                onTriggerToast('Security alerts updated');
              }}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-3">
            <div>
              <div className="text-xs font-bold text-white">Invoicing & High-Value Receipts</div>
              <div className="text-[11px] text-slate-400">Alerts when transactions exceed $1,000 or annual contracts settle.</div>
            </div>
            <input
              type="checkbox"
              checked={notifBilling}
              onChange={(e) => {
                setNotifBilling(e.target.checked);
                onTriggerToast('Billing alert preferences updated');
              }}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-3">
            <div>
              <div className="text-xs font-bold text-white">Weekly Executive Analytics Digest</div>
              <div className="text-[11px] text-slate-400">Consolidated weekly telemetry and customer churn metrics.</div>
            </div>
            <input
              type="checkbox"
              checked={notifWeeklyDigest}
              onChange={(e) => {
                setNotifWeeklyDigest(e.target.checked);
                onTriggerToast('Weekly digest toggled');
              }}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Critical Operations / Danger Zone */}
      <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-rose-400">Danger Zone</h2>
            <p className="text-xs text-slate-400">Irrevocable cluster maintenance operations</p>
          </div>
          <AlertTriangle size={18} className="text-rose-400" />
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Maintenance Window Mode</div>
              <div className="text-[11px] text-slate-400">Reroute live traffic to standby nodes during rolling upgrades.</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setMaintenanceMode(!maintenanceMode);
                onTriggerToast(
                  !maintenanceMode ? 'MAINTENANCE MODE ACTIVATED' : 'Cluster returned to normal state'
                );
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                maintenanceMode
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {maintenanceMode ? 'Disable Maintenance' : 'Enable Maintenance'}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Flush Distributed Vector Cache</div>
              <div className="text-[11px] text-slate-400">Purge warm 128GB zero-copy memory tier across all zones.</div>
            </div>
            <button
              type="button"
              onClick={() => onTriggerToast('Flushed in-memory vector cache')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold shrink-0 transition-colors"
            >
              <Database size={13} />
              <span>Flush Cache</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Export Platform Database Snapshot</div>
              <div className="text-[11px] text-slate-400">Download an encrypted AES-256 backup dump of all records.</div>
            </div>
            <button
              type="button"
              onClick={() => onTriggerToast('Exporting encrypted platform backup dump...')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold shrink-0 transition-colors"
            >
              <Download size={13} />
              <span>Export Dump</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
