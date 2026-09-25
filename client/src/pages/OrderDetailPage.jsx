import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Package,
  Truck,
  MapPin,
  Calendar,
  CheckCircle,
  Printer,
  ArrowLeft,
  Clock,
  Phone,
} from 'lucide-react';
import api from '../services/api';
import DemoPriceBadge from '../components/common/DemoPriceBadge';
import { PageLoader } from '../components/common/LoadingSkeleton';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error('Failed to load order:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return <PageLoader text="Loading Order Details..." />;
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-heading font-black mb-3">Order Not Found</h2>
        <p className="text-xs font-mono text-zinc-500 mb-6">Order #{id} could not be retrieved.</p>
        <Link to="/shop" className="px-5 py-2 bg-orange-500 text-zinc-950 font-mono font-bold text-xs uppercase rounded">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b-2 border-zinc-200 pb-4">
        <div>
          <Link to="/account" className="text-xs font-mono text-orange-600 hover:underline flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Orders</span>
          </Link>
          <h1 className="text-2xl font-heading font-black text-brand-black flex items-center gap-2">
            <span>ORDER #{order.orderNumber}</span>
          </h1>
          <div className="text-xs font-mono text-zinc-500 mt-0.5">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase transition-colors"
          >
            <Printer className="w-4 h-4 text-orange-400" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Status Lifecycle Banner */}
        <div className="bg-[#111111] text-white p-6 rounded border-l-4 border-orange-500 shadow-industrial">
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-xs">
              <span className="text-zinc-400">Order Status: </span>
              <span className="font-bold text-orange-400 uppercase text-sm">{order.orderStatus}</span>
            </div>
            <div className="font-mono text-xs">
              <span className="text-zinc-400">Payment: </span>
              <span className="font-bold text-white uppercase">{order.paymentMethod}</span> ({order.paymentStatus})
            </div>
          </div>

          {/* Timeline */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="pt-3 border-t border-zinc-800 space-y-2">
              <div className="text-[11px] font-mono text-zinc-400 uppercase font-bold">
                Order Activity Trail:
              </div>
              <div className="space-y-1.5">
                {order.statusHistory.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-mono text-zinc-300">
                    <CheckCircle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white uppercase">{step.status}</span>
                      {step.note && <span className="text-zinc-400"> — {step.note}</span>}
                      <span className="text-zinc-500 text-[10px] ml-2">
                        ({new Date(step.timestamp).toLocaleTimeString()})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Customer & Shipping Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-white border border-brand-border rounded p-5 shadow-sm space-y-2">
            <h3 className="font-heading font-bold text-xs uppercase text-zinc-900 border-b border-zinc-200 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Delivery Recipient</span>
            </h3>
            <div className="font-bold text-zinc-900">{order.customerDetails.fullName}</div>
            <div className="text-zinc-600 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>{order.customerDetails.phone}</span>
            </div>
            {order.customerDetails.email && (
              <div className="text-zinc-500">{order.customerDetails.email}</div>
            )}
            <div className="pt-2 text-zinc-700">
              {order.customerDetails.address}, {order.customerDetails.city}
              {order.customerDetails.area && `, ${order.customerDetails.area}`}
            </div>
            {order.customerDetails.orderNotes && (
              <div className="pt-2 text-amber-700 bg-amber-50 p-2 rounded border border-amber-200 text-[11px]">
                <strong>Note:</strong> {order.customerDetails.orderNotes}
              </div>
            )}
          </div>

          <div className="bg-white border border-brand-border rounded p-5 shadow-sm space-y-2">
            <h3 className="font-heading font-bold text-xs uppercase text-zinc-900 border-b border-zinc-200 pb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-500" />
              <span>Dispatcher & Store Notice</span>
            </h3>
            <div className="text-zinc-700 font-bold">Mutahir Hardware Store Multan</div>
            <div className="text-zinc-500">Haqbaho Market, Vehari Chowk, Peoples Colony, Multan</div>
            <div className="text-zinc-500">Store Contact: +92 308 6236092</div>
            <div className="pt-2">
              <DemoPriceBadge size="xs" />
            </div>
          </div>
        </div>

        {/* Ordered Hardware Items */}
        <div className="bg-white border border-brand-border rounded p-6 shadow-sm font-mono text-xs">
          <h3 className="font-heading font-bold text-sm uppercase text-zinc-900 border-b border-zinc-200 pb-3 mb-4">
            Items Included in Order
          </h3>

          <div className="divide-y divide-zinc-200">
            {order.items.map((item) => (
              <div key={item._id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=100&q=80'}
                    alt={item.name}
                    className="w-12 h-12 object-contain bg-zinc-50 rounded border border-zinc-200 p-1"
                  />
                  <div>
                    <div className="font-bold text-zinc-950 text-xs">{item.name}</div>
                    <div className="text-[11px] text-zinc-500">
                      SKU: {item.sku} • Qty: {item.quantity} × PKR {item.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="font-bold text-zinc-950 text-sm">
                  PKR {item.total.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Totals Breakdown */}
          <div className="mt-6 pt-4 border-t-2 border-zinc-200 space-y-2 max-w-xs ml-auto text-right">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal:</span>
              <span className="font-bold text-zinc-900">PKR {order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Coupon Discount ({order.couponCode}):</span>
                <span>- PKR {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-600">
              <span>Delivery Charges:</span>
              <span className="font-bold text-zinc-900">
                {order.deliveryFee === 0 ? 'FREE' : `PKR ${order.deliveryFee}`}
              </span>
            </div>
            <div className="pt-2 border-t border-zinc-900 flex justify-between items-baseline font-bold text-zinc-950 text-base">
              <span>Total Payable:</span>
              <span className="text-lg text-orange-600 font-black">
                PKR {order.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
