import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CommandPalette from './components/CommandPalette';
import Toast from './components/Toast';

// Tab Views
import DashboardTab from './components/tabs/DashboardTab';
import AnalyticsTab from './components/tabs/AnalyticsTab';
import UsersTab from './components/tabs/UsersTab';
import OrdersTab from './components/tabs/OrdersTab';
import ProductsTab from './components/tabs/ProductsTab';
import ActivityTab from './components/tabs/ActivityTab';
import SecurityTab from './components/tabs/SecurityTab';
import SettingsTab from './components/tabs/SettingsTab';

// Modals
import NewUserModal from './components/modals/NewUserModal';
import NewProductModal from './components/modals/NewProductModal';
import NewApiKeyModal from './components/modals/NewApiKeyModal';
import OrderDetailsModal from './components/modals/OrderDetailsModal';

// Initial Mock Dataset
const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'Harsh Vardhan',
    email: 'harsh.admin@nexus.io',
    role: 'Super Admin',
    department: 'Core Infrastructure',
    status: 'Active',
    twoFactor: true,
    lastActive: 'Active Now',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-2',
    name: 'Elena Rostova',
    email: 'elena.r@enterprise.de',
    role: 'Security Architect',
    department: 'Cloud Security',
    status: 'Active',
    twoFactor: true,
    lastActive: '14 min ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-3',
    name: 'Marcus Chen',
    email: 'marcus.c@vanguard.io',
    role: 'DevOps Lead',
    department: 'Platform SRE',
    status: 'Active',
    twoFactor: true,
    lastActive: '1 hr ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-4',
    name: 'Sarah Jenkins',
    email: 'sarah.j@biotech.eu',
    role: 'Product Manager',
    department: 'Product Ops',
    status: 'Active',
    twoFactor: false,
    lastActive: '3 hrs ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-5',
    name: 'Devin Kowalski',
    email: 'devin.k@quantumedge.com',
    role: 'Senior Engineer',
    department: 'Machine Learning',
    status: 'Suspended',
    twoFactor: true,
    lastActive: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-6',
    name: 'Aisha Al-Mansoor',
    email: 'aisha.m@solaria.ae',
    role: 'Senior Engineer',
    department: 'Core Infrastructure',
    status: 'Active',
    twoFactor: true,
    lastActive: 'Just now',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-9842',
    customer: 'Acme Corp Labs',
    email: 'billing@acme.ai',
    tier: 'Enterprise Dedicated Cluster',
    amount: '$4,800.00',
    paymentMethod: 'Credit Card (Stripe)',
    status: 'Completed',
    date: 'Just now'
  },
  {
    id: 'ORD-9841',
    customer: 'Vanguard FinTech',
    email: 'ops@vanguard.io',
    tier: 'Kubernetes Mesh Scaler',
    amount: '$2,450.00',
    paymentMethod: 'Wire Transfer',
    status: 'Completed',
    date: '12 min ago'
  },
  {
    id: 'ORD-9840',
    customer: 'QuantEdge Analytics',
    email: 'infra@quantedge.com',
    tier: 'Vector Inference Dedicated Node',
    amount: '$1,200.00',
    paymentMethod: 'Credit Card (Stripe)',
    status: 'Processing',
    date: '45 min ago'
  },
  {
    id: 'ORD-9839',
    customer: 'Hyperion Biotech',
    email: 'research@hyperion.bio',
    tier: 'Neural Cache Global Multi-Region',
    amount: '$8,900.00',
    paymentMethod: 'Wire Transfer',
    status: 'In Review',
    date: '2 hrs ago'
  },
  {
    id: 'ORD-9838',
    customer: 'Solaria Energy',
    email: 'iot@solaria.eu',
    tier: 'Standard Cloud Cluster',
    amount: '$650.00',
    paymentMethod: 'Credit Card (Stripe)',
    status: 'Completed',
    date: '4 hrs ago'
  },
  {
    id: 'ORD-9837',
    customer: 'Apex Logistics',
    email: 'accounts@apexlog.com',
    tier: 'Autonomous Guardrail Sentinel',
    amount: '$3,150.00',
    paymentMethod: 'Crypto Settlement',
    status: 'Refunded',
    date: 'Yesterday'
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 'prd-1',
    title: 'Distributed Vector Cache Cluster',
    sku: 'NX-8921',
    category: 'Infrastructure',
    price: '$2,400.00',
    stock: 18,
    description: 'Sub-5ms zero-copy embedding cache with sub-millisecond warm eviction across 14 zones.'
  },
  {
    id: 'prd-2',
    title: 'Autonomous Fraud & Threat Sentinel',
    sku: 'NX-4102',
    category: 'Security & Guardrails',
    price: '$3,800.00',
    stock: 4,
    description: 'Zero-day stream validator with cryptographic kill-switch triggers and automated mitigation.'
  },
  {
    id: 'prd-3',
    title: 'Predictive Pod Autoscaler Engine',
    sku: 'NX-7719',
    category: 'Infrastructure',
    price: '$1,650.00',
    stock: 32,
    description: 'Neural surge forecasting for Kubernetes pods with pre-warm node allocation.'
  },
  {
    id: 'prd-4',
    title: 'Nova-4 Ultra Large Model Router',
    sku: 'NX-9901',
    category: 'AI & Vector Models',
    price: '$4,200.00',
    stock: 12,
    description: 'Multi-provider reasoning router with fallback latency protection and cost arbitrage.'
  },
  {
    id: 'prd-5',
    title: 'Zero-Copy NVMe TimeSeries DB',
    sku: 'NX-3042',
    category: 'Storage & Databases',
    price: '$1,950.00',
    stock: 3,
    description: 'Distributed persistence layer tuned for high-frequency telemetry and columnar analytics.'
  }
];

const INITIAL_LOGS = [
  {
    id: 'log-1',
    timestamp: '19:54:12 UTC',
    severity: 'Success',
    event: 'Automatic TLS Certificate Rotation',
    details: 'Wildcard *.nexus.io issued via Let\'s Encrypt ACME with zero downtime',
    actor: 'system-cert-bot',
    ip: '10.0.4.12'
  },
  {
    id: 'log-2',
    timestamp: '19:48:30 UTC',
    severity: 'Info',
    event: 'Autoscaler Scaled Replicas +12',
    details: 'Pre-warmed prod-us-east-cluster nodes ahead of projected traffic spike',
    actor: 'k8s-mesh-scaler',
    ip: '10.12.8.90'
  },
  {
    id: 'log-3',
    timestamp: '19:32:05 UTC',
    severity: 'Warning',
    event: 'API Rate Limit Threshold 85%',
    details: 'Tenant Vanguard FinTech reached 215,000 req/min on endpoint /v1/infer',
    actor: 'rate-guard-daemon',
    ip: '192.0.2.14'
  },
  {
    id: 'log-4',
    timestamp: '18:15:44 UTC',
    severity: 'Success',
    event: 'Database Snapshot Consensus Reached',
    details: 'Snapshot snp-20261024-alpha successfully replicated to cold storage',
    actor: 'harsh.admin@nexus.io',
    ip: '103.212.14.88'
  },
  {
    id: 'log-5',
    timestamp: '17:02:18 UTC',
    severity: 'Error',
    event: 'Webhook Delivery Timeout (HTTP 504)',
    details: 'Retrying webhook delivery to partner endpoint https://webhook.target.internal',
    actor: 'dispatcher-worker-03',
    ip: '10.0.18.2'
  }
];

const INITIAL_KEYS = [
  {
    id: 'key-1',
    name: 'Production Kubernetes Cluster Key',
    key: 'nx_live_8f3a9e2c4b10984da7201bce49f',
    scope: 'Full Admin (Read/Write/Deploy)',
    created: 'Oct 12, 2026',
    lastUsed: 'Just now (12s ago)'
  },
  {
    id: 'key-2',
    name: 'Telemetry Ingestion & Readonly Metric Daemon',
    key: 'nx_live_1b994cc02e1857fa882a93bce12',
    scope: 'Read-Only Telemetry',
    created: 'Sep 28, 2026',
    lastUsed: '2 min ago'
  },
  {
    id: 'key-3',
    name: 'Staging CI/CD GitHub Runner',
    key: 'nx_live_55a71df089e341ca0921fb94ce8',
    scope: 'CI/CD Release Automation',
    created: 'Oct 04, 2026',
    lastUsed: '4 hrs ago'
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'alert',
    title: 'High Cache Hit Surge',
    message: 'Cache hit ratio reached 99.4% on edge region eu-central-1.',
    time: '5m ago',
    read: false
  },
  {
    id: 'notif-2',
    type: 'security',
    title: 'Hardware 2FA Verified',
    message: 'Admin session started from verified IP 103.212.14.88.',
    time: '25m ago',
    read: false
  },
  {
    id: 'notif-3',
    type: 'info',
    title: 'New High-Value Invoice #ORD-9842',
    message: 'Acme Corp Labs completed $4,800.00 enterprise tier renewal.',
    time: '1h ago',
    read: false
  }
];

export default function App() {
  // Tab routing state synchronized with URL hash
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['dashboard', 'analytics', 'users', 'orders', 'products', 'activity', 'security', 'settings'];
    return validTabs.includes(hash) ? hash : 'dashboard';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState('green');

  // Sync activeTab with URL hash for browser history and deep linking
  const setActiveTab = (tabId) => {
    setActiveTabState(tabId);
    window.location.hash = tabId;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['dashboard', 'analytics', 'users', 'orders', 'products', 'activity', 'security', 'settings'];
      if (validTabs.includes(hash)) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Centralized Live Data State
  const [users, setUsers] = useState(INITIAL_USERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [apiKeys, setApiKeys] = useState(INITIAL_KEYS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Modals State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [inspectingOrder, setInspectingOrder] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Toast dispatcher
  const triggerToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleSelectTheme = (newTheme) => {
    setTheme(newTheme);
    triggerToast(`Theme switched to ${newTheme.toUpperCase()}`);
  };

  const handleOpenNewItem = (type) => {
    if (type === 'user' || activeTab === 'users') {
      setIsUserModalOpen(true);
    } else if (type === 'product' || activeTab === 'products') {
      setIsProductModalOpen(true);
    } else if (type === 'api-key' || activeTab === 'security') {
      setIsApiKeyModalOpen(true);
    } else {
      setIsUserModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Side Panel */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onTriggerToast={triggerToast}
      />

      {/* Main Administrative Canvas */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onOpenNewItemModal={() => handleOpenNewItem()}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          setMobileOpen={setMobileOpen}
          theme={theme}
          onSelectTheme={handleSelectTheme}
          onTriggerToast={triggerToast}
          notifications={notifications}
          setNotifications={setNotifications}
        />

        {/* Dynamic Tab Router Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab
              onSelectTab={setActiveTab}
              onOpenNewItemModal={handleOpenNewItem}
              onTriggerToast={triggerToast}
              onViewOrder={(order) => setInspectingOrder(order)}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'users' && (
            <UsersTab
              users={users}
              setUsers={setUsers}
              onOpenNewUserModal={() => setIsUserModalOpen(true)}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTab
              orders={orders}
              setOrders={setOrders}
              onViewOrder={(order) => setInspectingOrder(order)}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              setProducts={setProducts}
              onOpenNewProductModal={() => setIsProductModalOpen(true)}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'activity' && (
            <ActivityTab
              logs={logs}
              setLogs={setLogs}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'security' && (
            <SecurityTab
              apiKeys={apiKeys}
              setApiKeys={setApiKeys}
              onOpenNewKeyModal={() => setIsApiKeyModalOpen(true)}
              onTriggerToast={triggerToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              theme={theme}
              onSelectTheme={handleSelectTheme}
              onTriggerToast={triggerToast}
            />
          )}
        </main>
      </div>

      {/* Global Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        setActiveTab={setActiveTab}
        onSelectTheme={handleSelectTheme}
        onTriggerToast={triggerToast}
        onOpenNewItemModal={handleOpenNewItem}
      />

      {/* Action Modals */}
      <NewUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onAddUser={(user) => setUsers((prev) => [user, ...prev])}
        onTriggerToast={triggerToast}
      />

      <NewProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddProduct={(prod) => setProducts((prev) => [prod, ...prev])}
        onTriggerToast={triggerToast}
      />

      <NewApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onAddKey={(key) => setApiKeys((prev) => [key, ...prev])}
        onTriggerToast={triggerToast}
      />

      <OrderDetailsModal
        isOpen={Boolean(inspectingOrder)}
        onClose={() => setInspectingOrder(null)}
        order={inspectingOrder}
        onTriggerToast={triggerToast}
      />

      {/* Toast System */}
      <Toast toasts={toasts} />
    </div>
  );
}
