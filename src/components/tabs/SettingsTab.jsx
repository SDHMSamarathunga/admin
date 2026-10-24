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
  Check,
  ShieldCheck
} from 'lucide-react';

export default function SettingsTab({
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

  return (
    <div className="space-y-6">
      {/* General Configuration */}
      <form onSubmit={handleSaveGeneral} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Organization Profile</h2>
            <p className="text-xs text-slate-500">Global identifiers, primary admin contacts, and localization</p>
          </div>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold shadow-md shadow-emerald-700/20 self-start sm:self-auto transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save size={14} />
            <span>Save Preferences</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Organization Name</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <Building size={16} className="text-slate-400 shrink-0" />
              <input
                type="text"
                className="bg-transparent border-0 text-slate-900 text-xs sm:text-sm focus:outline-none w-full"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Primary Contact Email</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <Mail size={16} className="text-slate-400 shrink-0" />
              <input
                type="email"
                className="bg-transparent border-0 text-slate-900 text-xs sm:text-sm focus:outline-none w-full"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Cluster Timezone</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <Globe size={16} className="text-slate-400 shrink-0" />
              <select
                className="bg-transparent border-0 text-slate-900 text-xs sm:text-sm focus:outline-none w-full cursor-pointer"
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
            <label className="text-xs font-bold text-slate-700">Base Currency</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <DollarSign size={16} className="text-slate-400 shrink-0" />
              <select
                className="bg-transparent border-0 text-slate-900 text-xs sm:text-sm focus:outline-none w-full cursor-pointer"
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

      {/* Visual Theme Section */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Console Theme Configuration</h2>
            <p className="text-xs text-slate-500">Current visual presentation profile</p>
          </div>
          <Palette size={18} className="text-emerald-600" />
        </div>

        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#064e3b] via-[#043e30] to-[#022c22] border border-emerald-600/30 flex items-center justify-center text-white shrink-0 shadow-sm">
              <ShieldCheck size={20} className="text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Green Sidebar & Pristine White Theme</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Deep Emerald & Forest Green navigation side panel with ultra-clean white canvas cards and tabs.
              </p>
            </div>
          </div>
          <div className="shrink-0 hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shadow-sm">
            <Check size={14} className="text-emerald-600" />
            <span>Enforced</span>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Automated Alerts & Digest Rules</h2>
            <p className="text-xs text-slate-500">Configure email and webhook notification delivery</p>
          </div>
          <Bell size={18} className="text-teal-600" />
        </div>

        <div className="space-y-3 divide-y divide-slate-100">
          <div className="flex items-center justify-between gap-4 pt-2">
            <div>
              <div className="text-xs font-bold text-slate-900">Critical Security & Threat Anomalies</div>
              <div className="text-[11px] text-slate-500">Immediate alerts on DDoS attacks or unauthorized access attempts.</div>
            </div>
            <input
              type="checkbox"
              checked={notifSecurity}
              onChange={(e) => {
                setNotifSecurity(e.target.checked);
                onTriggerToast('Security alerts updated');
              }}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-3">
            <div>
              <div className="text-xs font-bold text-slate-900">Invoicing & High-Value Receipts</div>
              <div className="text-[11px] text-slate-500">Alerts when transactions exceed $1,000 or annual contracts settle.</div>
            </div>
            <input
              type="checkbox"
              checked={notifBilling}
              onChange={(e) => {
                setNotifBilling(e.target.checked);
                onTriggerToast('Billing alert preferences updated');
              }}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-3">
            <div>
              <div className="text-xs font-bold text-slate-900">Weekly Executive Analytics Digest</div>
              <div className="text-[11px] text-slate-500">Consolidated weekly telemetry and customer churn metrics.</div>
            </div>
            <input
              type="checkbox"
              checked={notifWeeklyDigest}
              onChange={(e) => {
                setNotifWeeklyDigest(e.target.checked);
                onTriggerToast('Weekly digest toggled');
              }}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Critical Operations / Danger Zone */}
      <div className="p-6 rounded-2xl bg-rose-50/40 border border-rose-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-rose-700">Danger Zone</h2>
            <p className="text-xs text-rose-600/80">Irrevocable cluster maintenance operations</p>
          </div>
          <AlertTriangle size={18} className="text-rose-600" />
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div>
              <div className="text-xs font-bold text-slate-900">Maintenance Window Mode</div>
              <div className="text-[11px] text-slate-500">Reroute live traffic to standby nodes during rolling upgrades.</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setMaintenanceMode(!maintenanceMode);
                onTriggerToast(
                  !maintenanceMode ? 'MAINTENANCE MODE ACTIVATED' : 'Cluster returned to normal state'
                );
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 shadow-sm ${
                maintenanceMode
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {maintenanceMode ? 'Disable Maintenance' : 'Enable Maintenance'}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div>
              <div className="text-xs font-bold text-slate-900">Flush Distributed Vector Cache</div>
              <div className="text-[11px] text-slate-500">Purge warm 128GB zero-copy memory tier across all zones.</div>
            </div>
            <button
              type="button"
              onClick={() => onTriggerToast('Flushed in-memory vector cache')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shrink-0 shadow-sm transition-colors"
            >
              <Database size={13} className="text-slate-500" />
              <span>Flush Cache</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div>
              <div className="text-xs font-bold text-slate-900">Export Platform Database Snapshot</div>
              <div className="text-[11px] text-slate-500">Download an encrypted AES-256 backup dump of all records.</div>
            </div>
            <button
              type="button"
              onClick={() => onTriggerToast('Exporting encrypted platform backup dump...')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shrink-0 shadow-sm transition-colors"
            >
              <Download size={13} className="text-slate-500" />
              <span>Export Dump</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
