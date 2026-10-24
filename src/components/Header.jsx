import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Check,
  RefreshCw,
  Plus,
  Palette,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export default function Header({
  activeTab,
  onOpenNewItemModal,
  onOpenCommandPalette,
  setMobileOpen,
  theme,
  onSelectTheme,
  onTriggerToast,
  notifications,
  setNotifications
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const notifRef = useRef(null);
  const themeRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setShowThemePicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onTriggerToast('Live data synchronized with cluster');
    }, 700);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    onTriggerToast('All notifications marked as read');
  };

  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
    onTriggerToast('Notifications cleared');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const themes = [
    { id: 'green', name: 'Emerald Mint', color: '#10b981' },
    { id: 'dark', name: 'Nebula Violet', color: '#8b5cf6' },
    { id: 'midnight', name: 'Midnight Azure', color: '#3b82f6' },
    { id: 'cyberpunk', name: 'Cyberpunk Neon', color: '#ff007f' },
    { id: 'light', name: 'Clean Arctic', color: '#6366f1' }
  ];

  const tabTitles = {
    dashboard: { title: 'Executive Overview', desc: 'Real-time telemetry, revenue trajectory & cluster operations' },
    analytics: { title: 'Analytics & Insights', desc: 'Cohort retention, geo-distribution, traffic conversions' },
    users: { title: 'User & Team Directory', desc: 'Identity access management, role assignments & RBAC policies' },
    orders: { title: 'Sales & Transactions', desc: 'Enterprise billing, invoices, payment gateways & refunds' },
    products: { title: 'Products & Catalog', desc: 'SKUs inventory, pricing tiers, API subscription bundles' },
    activity: { title: 'Security & Audit Logs', desc: 'Immutable event streams, anomalous signals & compliance trails' },
    security: { title: 'API Keys & Firewall', desc: 'Cryptographic tokens, webhook endpoints & threat mitigation' },
    settings: { title: 'System Settings', desc: 'Cluster configuration, maintenance window & integrations' }
  };

  const currentTabInfo = tabTitles[activeTab] || { title: 'Admin Console', desc: 'Nexus Platform Management' };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left Section: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>Admin</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-semibold capitalize">{activeTab}</span>
          </div>
          <h1 className="text-base lg:text-lg font-bold text-white truncate leading-tight">
            {currentTabInfo.title}
          </h1>
        </div>
      </div>

      {/* Middle Section: Quick Search Command Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-2">
        <div
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:border-slate-600 hover:bg-slate-800/90 cursor-pointer transition-all text-sm group"
        >
          <div className="flex items-center gap-2.5">
            <Search size={16} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
            <span className="truncate">Search commands, users, logs...</span>
          </div>
          <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-700/80 text-slate-300 border border-slate-600/60">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section: Actions & Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Status Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span>Uptime: 99.98%</span>
        </div>

        {/* Refresh Sync Button */}
        <button
          type="button"
          onClick={handleRefresh}
          className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
          title="Sync cluster data"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin text-emerald-400' : ''} />
        </button>

        {/* Theme Picker Dropdown */}
        <div className="relative" ref={themeRef}>
          <button
            type="button"
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="w-9 h-9 rounded-xl border border-slate-700 bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
            title="Switch color palette"
          >
            <Palette size={16} />
          </button>

          {showThemePicker && (
            <div className="absolute right-0 mt-2 w-52 p-2 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-800 mb-1 text-[11px] font-bold text-slate-400">
                <span>Color Palette</span>
                <span className="font-mono text-emerald-400 uppercase">{theme}</span>
              </div>
              <div className="space-y-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      onSelectTheme(t.id);
                      setShowThemePicker(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      theme === t.id
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                      <span>{t.name}</span>
                    </div>
                    {theme === t.id && <Check size={14} className="text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-9 h-9 rounded-xl border border-slate-700 bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
            title="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center shadow-lg shadow-rose-500/50">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 bg-slate-800/60 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="text-xs text-emerald-400 hover:underline font-semibold"
                    >
                      Mark read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      type="button"
                      onClick={clearNotifications}
                      className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors"
                      title="Clear notifications"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
                    <CheckCircle2 size={24} className="text-slate-600" />
                    <span>No unread notifications</span>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setNotifications((prev) =>
                          prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
                        );
                      }}
                      className={`p-3.5 flex gap-3 hover:bg-slate-800/50 cursor-pointer transition-colors relative ${
                        !n.read ? 'bg-slate-800/30' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {n.type === 'alert' && <AlertTriangle size={16} className="text-amber-400" />}
                        {n.type === 'security' && <ShieldCheck size={16} className="text-emerald-400" />}
                        {n.type === 'info' && <Info size={16} className="text-teal-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-semibold text-white truncate">{n.title}</span>
                          <span className="text-[10px] text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{n.message}</p>
                      </div>
                      {!n.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 self-center" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onOpenNewItemModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={15} />
          <span className="hidden sm:inline">New Entry</span>
        </button>
      </div>
    </header>
  );
}
