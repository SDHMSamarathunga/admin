import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  Activity,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  Database
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  onTriggerToast
}) {
  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Live' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { id: 'users', label: 'Users & Team', icon: Users, badge: '28' },
        { id: 'orders', label: 'Orders & Sales', icon: ShoppingCart, badge: '12 new', isNew: true },
        { id: 'products', label: 'Products & Catalog', icon: Package }
      ]
    },
    {
      title: 'INFRA & SECURITY',
      items: [
        { id: 'activity', label: 'Activity Logs', icon: Activity },
        { id: 'security', label: 'API & Security', icon: Shield, badge: 'Active' }
      ]
    },
    {
      title: 'PREFERENCES',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Green Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-gradient-to-b from-[#064e3b] via-[#043e30] to-[#022c22] text-white border-r border-emerald-800/50 shadow-xl transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header / Brand */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-emerald-800/60 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-200 text-emerald-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-950/40 shrink-0">
              <Sparkles size={20} className="animate-pulse text-emerald-950" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white">NEXUS</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-200 border border-emerald-300/30">
                    ADMIN
                  </span>
                </div>
                <span className="text-xs text-emerald-200/70 truncate">Cloud Ops Console</span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-7 h-7 rounded-lg border border-emerald-700/60 bg-emerald-900/60 text-emerald-200 hover:text-white hover:bg-emerald-800 items-center justify-center transition-colors shrink-0"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Workspace Quick Status Banner */}
        <div className="px-3 pt-3 pb-1">
          {!isCollapsed ? (
            <div className="p-2.5 rounded-xl bg-emerald-900/50 border border-emerald-700/50 flex items-center gap-2.5 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-200 shrink-0">
                <Database size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-emerald-50 truncate">Prod-Cluster Alpha</div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                  <span>99.98% Latency: 18ms</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-800/80 text-emerald-200 border border-emerald-700/60">
                v2.4
              </span>
            </div>
          ) : (
            <div
              className="w-10 h-10 mx-auto rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center"
              title="Prod-Cluster Alpha (Healthy)"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>
          )}
        </div>

        {/* Navigation Tabs List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5 scrollbar-thin scrollbar-thumb-emerald-800">
          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-bold tracking-wider text-emerald-300/60 uppercase">
                  {section.title}
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                        isActive
                          ? 'bg-white text-emerald-950 font-bold shadow-md shadow-emerald-950/30'
                          : 'text-emerald-100/75 hover:text-white hover:bg-emerald-800/50'
                      } ${isCollapsed ? 'justify-center px-0' : ''}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          size={18}
                          className={`shrink-0 transition-colors ${
                            isActive ? 'text-emerald-900' : 'text-emerald-300 group-hover:text-white'
                          }`}
                        />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>

                      {!isCollapsed && item.badge && (
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : item.isNew
                              ? 'bg-emerald-400/25 text-emerald-200 border border-emerald-400/40'
                              : 'bg-emerald-900/80 text-emerald-200 border border-emerald-700/60'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-emerald-500 rounded-r" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Storage Quota Meter (when expanded) */}
        {!isCollapsed && (
          <div className="px-4 pb-3">
            <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/60">
              <div className="flex justify-between text-xs font-semibold text-emerald-100 mb-1.5">
                <span>Storage Quota</span>
                <span className="text-emerald-300 font-bold">74%</span>
              </div>
              <div className="h-1.5 w-full bg-emerald-950 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all"
                  style={{ width: '74%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-emerald-200/70">
                <span>37.2 GB of 50 GB</span>
                <button
                  type="button"
                  onClick={() => onTriggerToast('Storage scale panel requested')}
                  className="text-teal-200 hover:text-white hover:underline font-semibold"
                >
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Profile Card */}
        <div className="p-3 border-t border-emerald-800/60 bg-emerald-950/70 shrink-0">
          <div
            className={`flex items-center gap-3 p-2 rounded-xl bg-emerald-900/60 border border-emerald-700/60 ${
              isCollapsed ? 'justify-center p-1 bg-transparent border-0' : ''
            }`}
          >
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Admin"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-emerald-400/40"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-950" />
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">Harsh Vardhan</div>
                <div className="text-[11px] text-emerald-200/70 truncate">Super Administrator</div>
              </div>
            )}

            {!isCollapsed && (
              <button
                type="button"
                onClick={() => onTriggerToast('Admin session locked')}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-rose-300 hover:bg-rose-500/20 transition-colors"
                title="Sign Out"
              >
                <LogOut size={15} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
