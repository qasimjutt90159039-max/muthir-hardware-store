import React, { useState, useEffect } from 'react';
import {
  Warehouse,
  AlertTriangle,
  ArrowUpDown,
  History,
  Search,
  CheckCircle,
  Plus,
  Minus,
} from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { PageLoader } from '../../components/common/LoadingSkeleton';

const AdminInventory = () => {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('alerts'); // 'alerts' | 'adjust' | 'history'

  // Adjust Form
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [adjustmentDelta, setAdjustmentDelta] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('Warehouse Shipment Arrival');
  const [newLowThreshold, setNewLowThreshold] = useState('');
  const [adjusting, setAdjusting] = useState(false);

  const { success, error: toastError } = useToast();

  const loadInventoryData = async () => {
    try {
      setLoading(true);
      const [sumRes, histRes, prodRes] = await Promise.all([
        api.get('/inventory/summary'),
        api.get('/inventory/history?pageSize=25'),
        api.get('/products?pageSize=100'),
      ]);

      setSummary(sumRes.data);
      setHistory(histRes.data.history);
      setProducts(prodRes.data.products);
      if (prodRes.data.products.length && !selectedProductId) {
        setSelectedProductId(prodRes.data.products[0]._id);
      }
    } catch (err) {
      console.error('Failed to load inventory data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventoryData();
  }, []);

  const handleAdjustSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductId || !adjustmentDelta) {
      toastError('Please select a product and enter the adjustment amount.');
      return;
    }

    try {
      setAdjusting(true);
      await api.post('/inventory/adjust', {
        productId: selectedProductId,
        adjustment: Number(adjustmentDelta),
        reason: adjustmentReason,
        newLowThreshold: newLowThreshold ? Number(newLowThreshold) : undefined,
      });

      success('Inventory adjusted and audit log recorded.');
      setAdjustmentDelta('');
      loadInventoryData();
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to adjust inventory.');
    } finally {
      setAdjusting(false);
    }
  };

  if (loading) {
    return <PageLoader text="Loading Inventory Hub..." />;
  }

  const selectedProduct = products.find((p) => p._id === selectedProductId);

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Title */}
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-heading font-black text-white uppercase">
          Inventory Control & <span className="text-orange-500">Stock Alerts</span>
        </h1>
        <p className="text-zinc-400 mt-0.5">
          Real-time stock audits, threshold alarms, and SKU replenishment tracking
        </p>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#161616] border border-zinc-800 p-4 rounded">
          <div className="text-zinc-400 uppercase text-[10px]">Total SKUs</div>
          <div className="text-xl font-bold text-white mt-1">{summary?.totalProducts || 0}</div>
        </div>
        <div className="bg-[#161616] border border-zinc-800 p-4 rounded">
          <div className="text-emerald-400 uppercase text-[10px]">In Stock SKUs</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{summary?.inStockCount || 0}</div>
        </div>
        <div className="bg-[#161616] border border-zinc-800 p-4 rounded">
          <div className="text-amber-400 uppercase text-[10px]">Low Stock Alarms</div>
          <div className="text-xl font-bold text-amber-400 mt-1">{summary?.lowStockCount || 0}</div>
        </div>
        <div className="bg-[#161616] border border-zinc-800 p-4 rounded">
          <div className="text-red-400 uppercase text-[10px]">Depleted / Out of Stock</div>
          <div className="text-xl font-bold text-red-400 mt-1">{summary?.outOfStockCount || 0}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 bg-[#161616] rounded-t overflow-hidden">
        <button
          onClick={() => setActiveTab('alerts')}
          className={`py-3 px-5 uppercase font-bold transition-colors ${
            activeTab === 'alerts'
              ? 'bg-orange-500 text-zinc-950'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Depletion Alerts ({summary?.lowStockAlerts?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('adjust')}
          className={`py-3 px-5 uppercase font-bold transition-colors ${
            activeTab === 'adjust'
              ? 'bg-orange-500 text-zinc-950'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Adjust Stock Levels
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-3 px-5 uppercase font-bold transition-colors ${
            activeTab === 'history'
              ? 'bg-orange-500 text-zinc-950'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Inventory Audit Log ({history.length})
        </button>
      </div>

      {/* TAB 1: LOW STOCK ALERTS */}
      {activeTab === 'alerts' && (
        <div className="bg-[#161616] border border-zinc-800 rounded-b p-5 space-y-4">
          <h2 className="text-sm font-heading font-bold uppercase text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span>Tools Below Minimum Jobsite Stock Threshold</span>
          </h2>

          {summary?.lowStockAlerts?.length === 0 ? (
            <div className="p-8 text-center text-emerald-400 bg-[#111111] rounded border border-emerald-900/40">
              All warehouse and shop items meet or exceed minimum stock safety thresholds.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#111111] text-zinc-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Tool</th>
                    <th className="py-2.5 px-4">SKU</th>
                    <th className="py-2.5 px-4">Brand</th>
                    <th className="py-2.5 px-4">Current Stock</th>
                    <th className="py-2.5 px-4">Threshold</th>
                    <th className="py-2.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {summary?.lowStockAlerts?.map((item) => (
                    <tr key={item._id} className="hover:bg-zinc-800/40">
                      <td className="py-3 px-4 font-bold text-white">{item.name}</td>
                      <td className="py-3 px-4 text-zinc-400">{item.sku}</td>
                      <td className="py-3 px-4 text-orange-400 font-bold">{item.brand}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            item.stock <= 0
                              ? 'bg-red-950 text-red-300 border border-red-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {item.stock} left
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-400">{item.lowStockThreshold} units</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            setSelectedProductId(item._id);
                            setActiveTab('adjust');
                          }}
                          className="px-2.5 py-1 bg-zinc-800 hover:bg-orange-500 hover:text-zinc-950 text-white rounded font-bold uppercase text-[10px]"
                        >
                          Restock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ADJUST STOCK FORM */}
      {activeTab === 'adjust' && (
        <div className="bg-[#161616] border border-zinc-800 rounded-b p-6 max-w-2xl space-y-4">
          <h2 className="text-sm font-heading font-bold uppercase text-white">
            Manual Inventory Restock & Stock Adjustment
          </h2>
          <p className="text-zinc-400 text-xs">
            Enter positive number to add incoming stock (e.g. +10) or negative number to write off damaged stock (e.g. -2).
          </p>

          <form onSubmit={handleAdjustSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-zinc-300 uppercase font-bold mb-1">Select Hardware SKU *</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
              >
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    [{p.sku}] {p.brand} - {p.name} (Current: {p.stock})
                  </option>
                ))}
              </select>
            </div>

            {selectedProduct && (
              <div className="p-3 bg-[#111111] rounded border border-zinc-800 flex justify-between items-center text-xs">
                <div>
                  <span className="text-zinc-400">Current Stock: </span>
                  <span className="font-bold text-white">{selectedProduct.stock} units</span>
                </div>
                <div>
                  <span className="text-zinc-400">Low Stock Trigger: </span>
                  <span className="font-bold text-orange-400">{selectedProduct.lowStockThreshold} units</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-zinc-300 uppercase font-bold mb-1">
                Quantity Delta Adjustment (+/-) *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 15 to add, -2 to deduct"
                value={adjustmentDelta}
                onChange={(e) => setAdjustmentDelta(e.target.value)}
                className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-300 uppercase font-bold mb-1">
                Reason / Memo for Inventory Trail
              </label>
              <input
                type="text"
                placeholder="e.g. New supplier carton received at Multan counter"
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-zinc-300 uppercase font-bold mb-1">
                Update Low Stock Threshold (Optional)
              </label>
              <input
                type="number"
                placeholder="Leave blank to maintain current"
                value={newLowThreshold}
                onChange={(e) => setNewLowThreshold(e.target.value)}
                className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
              />
            </div>

            <button
              type="submit"
              disabled={adjusting}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold uppercase rounded transition-colors disabled:opacity-50"
            >
              {adjusting ? 'Committing Adjustment...' : 'Commit Inventory Change'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: INVENTORY AUDIT HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-[#161616] border border-zinc-800 rounded-b p-5 space-y-4">
          <h2 className="text-sm font-heading font-bold uppercase text-white flex items-center gap-2">
            <History className="w-4 h-4 text-orange-500" />
            <span>Audit Trail of Stock Movements</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#111111] text-zinc-400 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">Date / Time</th>
                  <th className="py-2.5 px-4">SKU / Item</th>
                  <th className="py-2.5 px-4">Movement</th>
                  <th className="py-2.5 px-4">Delta</th>
                  <th className="py-2.5 px-4">Balance</th>
                  <th className="py-2.5 px-4">Reason</th>
                  <th className="py-2.5 px-4">Logged By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {history.map((h) => (
                  <tr key={h._id} className="hover:bg-zinc-800/40">
                    <td className="py-2.5 px-4 text-zinc-400">
                      {new Date(h.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-bold text-white">{h.sku}</div>
                      <div className="text-[10px] text-zinc-400 truncate max-w-xs">{h.productName}</div>
                    </td>
                    <td className="py-2.5 px-4 uppercase text-[10px] text-zinc-300">
                      {h.changeType}
                    </td>
                    <td className="py-2.5 px-4 font-bold">
                      <span className={h.quantityChanged >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {h.quantityChanged >= 0 ? `+${h.quantityChanged}` : h.quantityChanged}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      {h.previousStock} &rarr; <span className="font-bold text-white">{h.newStock}</span>
                    </td>
                    <td className="py-2.5 px-4 text-zinc-400 max-w-xs truncate">{h.reason}</td>
                    <td className="py-2.5 px-4 text-zinc-400">{h.updatedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;
