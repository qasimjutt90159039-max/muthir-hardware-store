import React, { useState, useEffect } from 'react';
import { TicketPercent, Plus, Edit, Trash2, X, Check } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { PageLoader, TableRowSkeleton } from '../../components/common/LoadingSkeleton';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const initialForm = {
    couponCode: '',
    discountType: 'percentage',
    discountValue: '',
    minimumOrder: '2000',
    maximumDiscount: '1000',
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    usageLimit: '200',
    description: '',
    isActive: true,
  };

  const [formData, setFormData] = useState(initialForm);
  const { success, error: toastError } = useToast();

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/coupons');
      setCoupons(data);
    } catch (err) {
      console.error('Failed to load coupons:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const openModal = (cpn = null) => {
    if (cpn) {
      setEditingCoupon(cpn);
      setFormData({
        couponCode: cpn.couponCode,
        discountType: cpn.discountType,
        discountValue: cpn.discountValue,
        minimumOrder: cpn.minimumOrder,
        maximumDiscount: cpn.maximumDiscount || '',
        expiryDate: new Date(cpn.expiryDate).toISOString().split('T')[0],
        usageLimit: cpn.usageLimit || '',
        description: cpn.description || '',
        isActive: cpn.isActive,
      });
    } else {
      setEditingCoupon(null);
      setFormData(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCoupon) {
        await api.put(`/coupons/${editingCoupon._id}`, formData);
        success('Coupon updated.');
      } else {
        await api.post('/coupons', formData);
        success('Coupon created.');
      }
      setIsModalOpen(false);
      fetchCoupons();
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to save coupon.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this coupon?')) {
      try {
        await api.delete(`/coupons/${id}`);
        success('Coupon deleted.');
        fetchCoupons();
      } catch (err) {
        toastError('Failed to delete coupon.');
      }
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-white uppercase">
            Coupon & Promotion <span className="text-orange-500">Engine</span>
          </h1>
          <p className="text-zinc-400 mt-0.5">
            Configure trade discounts, minimum purchase caps, and promotional campaign codes
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold uppercase transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Coupon</span>
        </button>
      </div>

      <div className="bg-[#161616] border border-zinc-800 rounded overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#111111] text-zinc-400 border-b border-zinc-800 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Order Rules</th>
                <th className="py-3 px-4">Usage Count</th>
                <th className="py-3 px-4">Expiry</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {loading ? (
                <TableRowSkeleton cols={7} />
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500">
                    No active discount coupons.
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c._id} className="hover:bg-zinc-800/40">
                    <td className="py-3 px-4 font-bold text-orange-400 text-sm">
                      {c.couponCode}
                    </td>

                    <td className="py-3 px-4 font-bold text-white">
                      {c.discountType === 'percentage'
                        ? `${c.discountValue}% OFF`
                        : `PKR ${c.discountValue.toLocaleString()} FLAT`}
                    </td>

                    <td className="py-3 px-4">
                      <div>Min: PKR {c.minimumOrder.toLocaleString()}</div>
                      {c.maximumDiscount && (
                        <div className="text-[10px] text-zinc-500">
                          Max Cap: PKR {c.maximumDiscount.toLocaleString()}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 text-zinc-300">
                      {c.usedCount} used {c.usageLimit && `/ ${c.usageLimit} max`}
                    </td>

                    <td className="py-3 px-4 text-zinc-400">
                      {new Date(c.expiryDate).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          c.isActive
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openModal(c)}
                          className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] border border-zinc-700 rounded-lg max-w-md w-full p-6 text-zinc-100 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <h2 className="font-heading font-bold text-sm uppercase text-white">
                {editingCoupon ? 'Edit Coupon' : 'Create New Promotional Coupon'}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WORKSHOP10"
                  value={formData.couponCode}
                  onChange={(e) => setFormData({ ...formData, couponCode: e.target.value.toUpperCase() })}
                  className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Type *</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (PKR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 10 for 10%"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Min. Order (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minimumOrder}
                    onChange={(e) => setFormData({ ...formData, minimumOrder: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Max Cap (PKR)</label>
                  <input
                    type="number"
                    placeholder="Leave empty for uncapped"
                    value={formData.maximumDiscount}
                    onChange={(e) => setFormData({ ...formData, maximumDiscount: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Usage Limit</label>
                  <input
                    type="number"
                    placeholder="e.g. 100"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. 10% discount on drills & grinders"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>Coupon Is Currently Active</span>
                </label>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-zinc-800 rounded font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-orange-500 text-zinc-950 font-bold uppercase rounded"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
