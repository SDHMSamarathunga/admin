import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  Activity,
  Shield,
  Settings,
  X,
  ArrowRight,
  Palette,
  Plus,
  RefreshCw
} from 'lucide-react';

export default function CommandPalette({
  isOpen,
  onClose,
  setActiveTab,
  onSelectTheme,
  onTriggerToast,
  onOpenNewItemModal
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allCommands = [
    { id: 'tab-dashboard', group: 'Navigation', label: 'Go to Dashboard Overview', icon: LayoutDashboard, action: () => { setActiveTab('dashboard'); onClose(); } },
    { id: 'tab-analytics', group: 'Navigation', label: 'Go to Analytics & Metrics', icon: BarChart3, action: () => { setActiveTab('analytics'); onClose(); } },
    { id: 'tab-users', group: 'Navigation', label: 'Go to Users & Team Directory', icon: Users, action: () => { setActiveTab('users'); onClose(); } },
    { id: 'tab-orders', group: 'Navigation', label: 'Go to Orders & Sales Ledger', icon: ShoppingCart, action: () => { setActiveTab('orders'); onClose(); } },
    { id: 'tab-products', group: 'Navigation', label: 'Go to Products & Catalog', icon: Package, action: () => { setActiveTab('products'); onClose(); } },
    { id: 'tab-activity', group: 'Navigation', label: 'Go to Security Audit Logs', icon: Activity, action: () => { setActiveTab('activity'); onClose(); } },
    { id: 'tab-security', group: 'Navigation', label: 'Go to API & Security Firewall', icon: Shield, action: () => { setActiveTab('security'); onClose(); } },
    { id: 'tab-settings', group: 'Navigation', label: 'Go to Platform Settings', icon: Settings, action: () => { setActiveTab('settings'); onClose(); } },
    
    { id: 'act-new-user', group: 'Quick Actions', label: 'Invite New Team Member', icon: Plus, action: () => { onClose(); onOpenNewItemModal('user'); } },
    { id: 'act-new-product', group: 'Quick Actions', label: 'Provision New Catalog SKU', icon: Plus, action: () => { onClose(); onOpenNewItemModal('product'); } },
    { id: 'act-new-key', group: 'Quick Actions', label: 'Generate API Bearer Token', icon: Plus, action: () => { onClose(); onOpenNewItemModal('api-key'); } },
    { id: 'act-refresh', group: 'Quick Actions', label: 'Sync Cluster Nodes', icon: RefreshCw, action: () => { onClose(); onTriggerToast('Cluster sync dispatched'); } },
    
    { id: 'theme-green', group: 'Themes', label: 'Switch to Emerald Mint Theme', icon: Palette, action: () => { onSelectTheme('green'); onClose(); } },
    { id: 'theme-dark', group: 'Themes', label: 'Switch to Nebula Violet Theme', icon: Palette, action: () => { onSelectTheme('dark'); onClose(); } },
    { id: 'theme-midnight', group: 'Themes', label: 'Switch to Midnight Azure Theme', icon: Palette, action: () => { onSelectTheme('midnight'); onClose(); } },
    { id: 'theme-cyberpunk', group: 'Themes', label: 'Switch to Cyberpunk Neon Theme', icon: Palette, action: () => { onSelectTheme('cyberpunk'); onClose(); } },
    { id: 'theme-light', group: 'Themes', label: 'Switch to Clean Arctic Light Theme', icon: Palette, action: () => { onSelectTheme('light'); onClose(); } }
  ];

  const filteredCommands = allCommands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.group.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd) => {
    cmd.action();
  };

  const handleKeyDownList = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredCommands[selectedIndex]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search size={18} className="text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-0 text-white placeholder-slate-500 text-sm focus:outline-none"
            placeholder="Type a command, search tab, or toggle theme..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownList}
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">
              No matching actions found for "{query}"
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => handleSelect(cmd)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-colors ${
                    isSelected ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon size={15} />
                    </div>
                    <div>
                      <div className="font-medium text-xs sm:text-sm">{cmd.label}</div>
                      <div className="text-[10px] text-slate-500">{cmd.group}</div>
                    </div>
                  </div>
                  <ArrowRight
                    size={14}
                    className={`transition-opacity ${isSelected ? 'opacity-100 text-emerald-400' : 'opacity-0'}`}
                  />
                </div>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-800/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">↓</kbd></span>
          <span>Execute <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">↵</kbd></span>
          <span>Close <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">ESC</kbd></span>
        </div>
      </div>
    </div>
  );
}
