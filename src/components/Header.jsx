import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Check,
  RefreshCw,
  Plus,
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
  onTriggerToast,
  notifications,
  setNotifications
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onTriggerToast('Cluster telemetry synchronized');
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
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 px-4 lg:px-8 flex items-center justify-between gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Left Section: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Admin</span>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-700 font-bold capitalize">{activeTab}</span>
          </div>
          <h1 className="text-base lg:text-lg font-extrabold text-slate-900 truncate leading-tight">
            {currentTabInfo.title}
          </h1>
        </div>
      </div>

      {/* Middle Section: Quick Search Command Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-2">
        <div
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-white cursor-pointer transition-all text-sm group shadow-inner"
        >
          <div className="flex items-center gap-2.5">
            <Search size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="truncate text-xs sm:text-sm">Search commands, users, logs...</span>
          </div>
          <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200 shadow-sm">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section: Actions & Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Status Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
          <span>Uptime: 99.98%</span>
        </div>

        {/* Refresh Sync Button */}
        <button
          type="button"
          onClick={handleRefresh}
          className="w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors shadow-sm"
          title="Sync cluster data"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin text-emerald-600' : ''} />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-colors shadow-sm"
            title="Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center shadow-md">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="text-xs text-emerald-700 hover:underline font-semibold"
                    >
                      Mark read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      type="button"
                      onClick={clearNotifications}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                      title="Clear notifications"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                    <CheckCircle2 size={24} className="text-slate-300" />
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
                      className={`p-3.5 flex gap-3 hover:bg-slate-50 cursor-pointer transition-colors relative ${
                        !n.read ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {n.type === 'alert' && <AlertTriangle size={16} className="text-amber-500" />}
                        {n.type === 'security' && <ShieldCheck size={16} className="text-emerald-600" />}
                        {n.type === 'info' && <Info size={16} className="text-teal-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-bold text-slate-900 truncate">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{n.message}</p>
                      </div>
                      {!n.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 self-center" />
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
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={15} />
          <span className="hidden sm:inline">New Entry</span>
        </button>
      </div>
    </header>
  );
}
