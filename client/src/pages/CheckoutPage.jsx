import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  MapPin,
  Phone,
  AlertCircle,
  ArrowRight,
  Store,
  CheckCircle,
} from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import DemoPriceBadge from '../components/common/DemoPriceBadge';

const CheckoutPage = () => {
  const { cartItems, subtotal, discount, deliveryFee, total, coupon, clearCart } = useCart();
  const { user } = useAuth();
  const { error: toastError, success } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.addresses?.[0]?.address || '',
    city: user?.addresses?.[0]?.city || 'Multan',
    area: user?.addresses?.[0]?.area || '',
    postalCode: user?.addresses?.[0]?.postalCode || '',
    orderNotes: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      toastError('Please fill in all required shipping fields (Name, Phone, Address).');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        customerDetails: {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          city: formData.city.trim() || 'Multan',
          area: formData.area.trim(),
          postalCode: formData.postalCode.trim(),
          orderNotes: formData.orderNotes.trim(),
        },
        items: cartItems.map((item) => ({
          product: item.product,
          name: item.name,
          quantity: item.quantity,
        })),
        couponCode: coupon?.couponCode || '',
        paymentMethod: formData.paymentMethod,
      };

      const { data } = await api.post('/orders', payload);

      clearCart();
      success(`Order placed successfully! Reference: #${data.orderNumber}`);
      navigate(`/account/orders/${data.orderNumber}`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to place order. Please review your details.';
      toastError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="mb-8 border-b-2 border-zinc-200 pb-4">
        <h1 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
          CASH ON DELIVERY <span className="text-orange-600">CHECKOUT</span>
        </h1>
        <p className="text-xs font-mono text-zinc-500 mt-0.5">
          Verified delivery address in Multan & nationwide dispatcher
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Customer Information Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Customer Details */}
          <div className="bg-white border border-brand-border rounded p-6 shadow-sm">
            <h2 className="text-sm font-heading font-bold uppercase text-zinc-900 mb-4 pb-2 border-b border-zinc-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Recipient & Delivery Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-zinc-700 mb-1">
                  Full Recipient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Muhammad Tariq"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Active Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +92 300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                />
                <span className="text-[10px] text-zinc-400">Our rider calls this number prior to arrival.</span>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. contractor@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-zinc-700 mb-1">
                  Delivery Street Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  rows="2"
                  placeholder="House/Plot #, Street, Colony, Landmark..."
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Area / Colony</label>
                <input
                  type="text"
                  name="area"
                  placeholder="e.g. Peoples Colony, Vehari Chowk"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-zinc-700 mb-1">
                  Special Delivery Instructions / Workshop Landmark
                </label>
                <textarea
                  name="orderNotes"
                  rows="2"
                  placeholder="e.g. Please deliver near the fabrication shed behind the market."
                  value={formData.orderNotes}
                  onChange={handleChange}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section: Payment Method */}
          <div className="bg-white border border-brand-border rounded p-6 shadow-sm">
            <h2 className="text-sm font-heading font-bold uppercase text-zinc-900 mb-4 pb-2 border-b border-zinc-200">
              Payment Method
            </h2>

            <div className="space-y-3 font-mono text-xs">
              <label
                className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all ${
                  formData.paymentMethod === 'Cash on Delivery'
                    ? 'border-orange-500 bg-orange-50/30'
                    : 'border-zinc-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={formData.paymentMethod === 'Cash on Delivery'}
                  onChange={handleChange}
                  className="mt-1 text-orange-500 focus:ring-orange-500"
                />
                <div>
                  <div className="font-bold text-zinc-950 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-500" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Pay the exact order amount in cash directly to the courier rider upon package inspection.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all ${
                  formData.paymentMethod === 'In-Store Pickup'
                    ? 'border-orange-500 bg-orange-50/30'
                    : 'border-zinc-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="In-Store Pickup"
                  checked={formData.paymentMethod === 'In-Store Pickup'}
                  onChange={handleChange}
                  className="mt-1 text-orange-500 focus:ring-orange-500"
                />
                <div>
                  <div className="font-bold text-zinc-950 flex items-center gap-2">
                    <Store className="w-4 h-4 text-orange-500" />
                    <span>Direct In-Store Counter Pickup</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Collect in person at: Haqbaho Market, Vehari Chowk, Peoples Colony, Multan. Zero delivery fee.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Snapshot & Confirmation Button */}
        <div className="space-y-6">
          <div className="bg-white border border-brand-border rounded p-6 shadow-sm font-mono text-xs">
            <h3 className="font-heading font-bold text-sm uppercase text-zinc-900 border-b border-zinc-200 pb-3 mb-4">
              Order Confirmation Snapshot
            </h3>

            {/* Item Mini List */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-zinc-100">
              {cartItems.map((item) => (
                <div key={item.product} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-zinc-900 truncate">{item.name}</div>
                    <div className="text-[10px] text-zinc-500">
                      Qty: {item.quantity} × PKR {item.price.toLocaleString()}
                    </div>
                  </div>
                  <span className="font-bold text-zinc-900">
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="mt-4 pt-4 border-t border-zinc-200 space-y-2">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal:</span>
                <span className="font-bold text-zinc-900">PKR {subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount ({coupon?.couponCode}):</span>
                  <span>- PKR {discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-600">
                <span>Delivery:</span>
                <span className="font-bold text-zinc-900">
                  {formData.paymentMethod === 'In-Store Pickup' || deliveryFee === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    `PKR ${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t-2 border-zinc-900 flex justify-between items-baseline text-base font-bold text-zinc-950">
                <span>Total Amount:</span>
                <span className="text-xl text-orange-600 font-black">
                  PKR {(formData.paymentMethod === 'In-Store Pickup' ? total - deliveryFee : total).toLocaleString()}
                </span>
              </div>

              <div className="pt-2">
                <DemoPriceBadge size="xs" className="w-full justify-center" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow-orange-glow mt-6 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Confirming Order...' : 'Confirm & Place Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 text-[10px] text-zinc-500 text-center leading-relaxed">
              By confirming this order, you authorize Mutahir Hardware Store to dispatch this shipment via Cash on Delivery.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
