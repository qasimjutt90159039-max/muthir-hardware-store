import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Search,
  Filter,
  CheckCircle,
  Truck,
  Eye,
  X,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { PageLoader, TableRowSkeleton } from '../../components/common/LoadingSkeleton';

const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Delivered',
  'Cancelled',
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Selected Order Modal
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const { success, error: toastError } = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url = `/orders?status=${statusFilter}&search=${encodeURIComponent(search)}`;
      const { data } = await api.get(url);
      setOrders(data.orders);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus);
    setNewPaymentStatus(order.paymentStatus);
    setStatusNote('');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const { data } = await api.put(`/orders/${selectedOrder._id}/status`, {
        status: newStatus,
        paymentStatus: newPaymentStatus,
        note: statusNote,
      });

      success(`Order #${selectedOrder.orderNumber} status changed to ${newStatus}`);
      setSelectedOrder(data);
      fetchOrders();
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to update order status.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Title */}
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-heading font-black text-white uppercase">
          Order Processing & <span className="text-orange-500">Fulfillment Pipeline</span>
        </h1>
        <p className="text-zinc-400 mt-0.5">
          Transition customer Cash on Delivery orders through packaging and Multan dispatch
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#161616] p-4 rounded border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search order #, customer name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#111111] border border-zinc-700 rounded px-3 py-1.5 text-zinc-200 placeholder-zinc-500 w-full sm:w-72 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-zinc-400">Order Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111111] border border-zinc-700 rounded px-3 py-1.5 text-zinc-200 focus:outline-none focus:border-orange-500"
          >
            <option value="all">All Statuses</option>
            {ORDER_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#161616] border border-zinc-800 rounded overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#111111] text-zinc-400 border-b border-zinc-800 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Items / Qty</th>
                <th className="py-3 px-4">Total (PKR)</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {loading ? (
                <TableRowSkeleton cols={7} />
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500 font-mono">
                    No orders matching criteria.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">
                      #{ord.orderNumber}
                      <div className="text-[10px] text-zinc-500 font-normal">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-zinc-200">{ord.customerDetails.fullName}</div>
                      <div className="text-[11px] text-zinc-400">{ord.customerDetails.phone}</div>
                      <div className="text-[10px] text-zinc-500">{ord.customerDetails.city}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-zinc-200">{ord.items?.length} Items</span>
                      <div className="text-[10px] text-zinc-500 truncate max-w-xs">
                        {ord.items?.[0]?.name}
                        {ord.items?.length > 1 && ` +${ord.items.length - 1} more`}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-bold text-orange-400">
                      PKR {ord.total.toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-zinc-300 uppercase text-[10px] font-bold">
                        {ord.paymentMethod}
                      </div>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                          ord.paymentStatus === 'Paid'
                            ? 'bg-emerald-950 text-emerald-400'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {ord.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ord.orderStatus === 'Delivered'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : ord.orderStatus === 'Cancelled'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : 'bg-orange-950 text-orange-300 border border-orange-800'
                        }`}
                      >
                        {ord.orderStatus}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => openOrderModal(ord)}
                        className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-orange-500 hover:text-zinc-950 text-white uppercase text-[10px] font-bold transition-colors"
                      >
                        Process Order
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROCESS ORDER MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] border border-zinc-700 rounded-lg max-w-2xl w-full p-6 text-zinc-100 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <div>
                <h2 className="text-base font-heading font-bold uppercase text-white">
                  Process Order #{selectedOrder.orderNumber}
                </h2>
                <div className="text-[11px] text-zinc-400">
                  Customer: {selectedOrder.customerDetails.fullName} ({selectedOrder.customerDetails.phone})
                </div>
              </div>
              <button onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5 text-zinc-400 hover:text-white" />
              </button>
            </div>

            {/* Address snapshot */}
            <div className="bg-[#111111] p-3 rounded border border-zinc-800 mb-4 text-xs space-y-1">
              <div className="font-bold text-orange-400 uppercase">Delivery Address:</div>
              <div className="text-zinc-300">
                {selectedOrder.customerDetails.address}, {selectedOrder.customerDetails.city}
              </div>
              {selectedOrder.customerDetails.orderNotes && (
                <div className="text-amber-400 text-[11px]">
                  <strong>Customer Note:</strong> {selectedOrder.customerDetails.orderNotes}
                </div>
              )}
            </div>

            {/* Items */}
            <div className="mb-4">
              <div className="text-zinc-400 uppercase font-bold text-[10px] mb-2">Order Items:</div>
              <div className="divide-y divide-zinc-800 bg-[#111111] rounded border border-zinc-800 max-h-36 overflow-y-auto">
                {selectedOrder.items?.map((it, idx) => (
                  <div key={idx} className="p-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">{it.name}</span>
                      <span className="text-zinc-500 text-[10px] ml-2">SKU: {it.sku}</span>
                    </div>
                    <div className="font-bold text-orange-400">
                      {it.quantity} × PKR {it.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Transition Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-3 border-t border-zinc-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    Transition Pipeline Status *
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Payment Status</label>
                  <select
                    value={newPaymentStatus}
                    onChange={(e) => setNewPaymentStatus(e.target.value)}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  >
                    <option value="Pending">Pending (COD Uncollected)</option>
                    <option value="Paid">Paid (Cash Collected)</option>
                    <option value="Failed">Failed / Refused</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">
                  Status Memo / Courier Rider Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dispatched with Multan City courier rider at 3:00 PM"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-zinc-800 rounded font-bold uppercase"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold uppercase rounded transition-colors"
                >
                  {updating ? 'Updating...' : 'Commit Status Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
