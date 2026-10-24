import React, { useState } from 'react';
import {
  Package,
  Search,
  Plus,
  Grid,
  List,
  Trash2,
  Server,
  Cpu,
  Database,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ProductsTab({
  products,
  setProducts,
  onOpenNewProductModal,
  onTriggerToast
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (id, title) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    onTriggerToast(`Product "${title}" removed from catalog`);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Infrastructure':
        return Server;
      case 'AI & Vector Models':
        return Sparkles;
      case 'Security & Guardrails':
        return Shield;
      case 'Storage & Databases':
        return Database;
      default:
        return Layers;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-sm flex-1 max-w-md">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search catalog by title, SKU, specs..."
              className="bg-transparent border-0 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <select
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="AI & Vector Models">AI & Vector Models</option>
              <option value="Security & Guardrails">Security & Guardrails</option>
              <option value="Storage & Databases">Storage & Databases</option>
            </select>

            {/* Grid / List View Toggle */}
            <div className="flex p-1 rounded-xl bg-slate-800 border border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-slate-700 text-emerald-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid Cards"
              >
                <Grid size={15} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-slate-700 text-emerald-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Table View"
              >
                <List size={15} />
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenNewProductModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all"
            >
              <Plus size={14} />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-500 text-xs">
              <Package size={32} className="mx-auto mb-2 text-slate-600" />
              <span>No products match the filter criteria</span>
            </div>
          ) : (
            filteredProducts.map((p) => {
              const Icon = getCategoryIcon(p.category);
              return (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl flex flex-col justify-between hover:border-slate-700 transition-all hover:translate-y-[-2px] shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Icon size={20} />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {p.sku}
                        </span>
                        {p.stock <= 5 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20">
                            Low Stock: {p.stock}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">{p.description}</p>
                    <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-teal-400 border border-slate-700 mb-4">
                      {p.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <div>
                      <span className="text-base font-black text-white font-mono">{p.price}</span>
                      <span className="text-[11px] text-slate-500 ml-1">/ mo</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(p.id, p.title)}
                      className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Table View */
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3">Product Name</th>
                  <th className="pb-3">SKU</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Monthly Price</th>
                  <th className="pb-3">Provisioned Units</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3">
                      <div className="font-semibold text-white text-xs">{p.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{p.description}</div>
                    </td>
                    <td className="py-3 font-mono text-xs text-slate-400">{p.sku}</td>
                    <td className="py-3 text-xs text-slate-300">{p.category}</td>
                    <td className="py-3 font-mono font-bold text-white text-xs">{p.price}</td>
                    <td className="py-3 text-xs text-slate-300">
                      <span className={p.stock <= 5 ? 'text-amber-400 font-bold' : ''}>
                        {p.stock} nodes
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        Active
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id, p.title)}
                        className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
