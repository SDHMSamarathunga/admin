import React, { useState } from 'react';
import {
  Shield,
  Key,
  Plus,
  Copy,
  Trash2,
  Check,
  Radio,
  RefreshCw
} from 'lucide-react';

export default function SecurityTab({
  apiKeys,
  setApiKeys,
  onOpenNewKeyModal,
  onTriggerToast
}) {
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [twoFactorEnforced, setTwoFactorEnforced] = useState(true);
  const [ipWhitelistActive, setIpWhitelistActive] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30m');

  const webhooks = [
    {
      id: 'wh-1',
      name: 'Stripe Billing Webhook',
      url: 'https://api.nexus.io/v1/webhooks/billing',
      events: ['invoice.paid', 'customer.subscription.deleted'],
      latency: '24ms'
    },
    {
      id: 'wh-2',
      name: 'Slack Incident Dispatcher',
      url: 'https://hooks.slack.com/services/T00/B00/X00',
      events: ['cluster.alert', 'security.anomaly'],
      latency: '82ms'
    }
  ];

  const handleCopyKey = (id, keyString) => {
    navigator.clipboard.writeText(keyString);
    setCopiedKeyId(id);
    onTriggerToast('API Token copied to clipboard');
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const handleRevokeKey = (id, name) => {
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
    onTriggerToast(`API Key "${name}" revoked immediately`);
  };

  return (
    <div className="space-y-6">
      {/* API Keys Management */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-base font-bold text-white">Production & Staging API Tokens</h2>
            <p className="text-xs text-slate-400">Cryptographic credentials for cluster mesh and SDK execution</p>
          </div>
          <button
            type="button"
            onClick={onOpenNewKeyModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 self-start sm:self-auto transition-all"
          >
            <Plus size={14} />
            <span>Generate Key</span>
          </button>
        </div>

        <div className="space-y-3">
          {apiKeys.map((k) => (
            <div
              key={k.id}
              className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <Key size={15} className="text-emerald-400 shrink-0" />
                  <span className="font-bold text-white text-xs sm:text-sm truncate">{k.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
                    {k.scope}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="font-mono text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 truncate">
                    {k.key}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopyKey(k.id, k.key)}
                    className="p-1 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
                    title="Copy token"
                  >
                    {copiedKeyId === k.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span>Created: {k.created}</span>
                  <span>•</span>
                  <span>Last invoked: {k.lastUsed}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRevokeKey(k.id, k.name)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-rose-400 hover:bg-rose-500/10 text-xs font-semibold self-start sm:self-auto transition-colors"
              >
                <Trash2 size={13} />
                <span>Revoke</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Policies & Webhooks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Access Governance */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Access Governance & Policies</h2>
              <p className="text-xs text-slate-400">Zero-trust security rules and restrictions</p>
            </div>
            <Shield size={18} className="text-emerald-400" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Enforce Hardware 2FA (WebAuthn/TOTP)</div>
                <div className="text-[11px] text-slate-400">Require multi-factor authorization for all tenant admins.</div>
              </div>
              <input
                type="checkbox"
                checked={twoFactorEnforced}
                onChange={(e) => {
                  setTwoFactorEnforced(e.target.checked);
                  onTriggerToast(`2FA Policy ${e.target.checked ? 'Enforced' : 'Relaxed'}`);
                }}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Strict IP CIDR Whitelisting</div>
                <div className="text-[11px] text-slate-400">Restrict access to authenticated corporate VPN subnets.</div>
              </div>
              <input
                type="checkbox"
                checked={ipWhitelistActive}
                onChange={(e) => {
                  setIpWhitelistActive(e.target.checked);
                  onTriggerToast(`IP Whitelist ${e.target.checked ? 'Activated' : 'Disabled'}`);
                }}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <div>
                <div className="text-xs font-bold text-white">Inactivity Session Timeout</div>
                <div className="text-[11px] text-slate-400">Evict dormant browser sessions after idle duration.</div>
              </div>
              <select
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium focus:outline-none"
                value={sessionTimeout}
                onChange={(e) => {
                  setSessionTimeout(e.target.value);
                  onTriggerToast(`Timeout set to ${e.target.value}`);
                }}
              >
                <option value="15m">15 Minutes</option>
                <option value="30m">30 Minutes</option>
                <option value="1h">1 Hour</option>
                <option value="8h">8 Hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Webhooks */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Webhooks & Alert Routing</h2>
              <p className="text-xs text-slate-400">Real-time HTTP push deliveries</p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              HEALTHY
            </span>
          </div>

          <div className="space-y-3">
            {webhooks.map((w) => (
              <div key={w.id} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <Radio size={14} className="text-emerald-400" />
                    <span>{w.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-400">{w.latency}</span>
                </div>
                <code className="block font-mono text-[11px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800 truncate">
                  {w.url}
                </code>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex gap-1.5 flex-wrap">
                    {w.events.map((ev, i) => (
                      <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {ev}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => onTriggerToast(`Ping sent to ${w.name} (HTTP 200 OK)`)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:underline"
                  >
                    <RefreshCw size={11} />
                    <span>Test Ping</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
