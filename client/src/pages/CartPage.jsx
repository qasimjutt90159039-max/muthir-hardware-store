import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, Truck, Tag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import DemoPriceBadge from '../components/common/DemoPriceBadge';
import EmptyState from '../components/common/EmptyState';

const CartPage = () => {
  const {
    cartItems,
    subtotal,
    deliveryFee,
    discount,
    coupon,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmptyState
          icon={ShoppingCart}
          title="Your Shopping Cart is Empty"
          description="You haven't added any hardware, power tools, or workshop supplies to your cart yet."
          actionText="Start Shopping"
          actionLink="/shop"
        />
      </div>
    );
  }

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    setApplyingCoupon(true);
    await applyCoupon(couponCodeInput);
    setApplyingCoupon(false);
    setCouponCodeInput('');
  };

  const freeDeliveryThreshold = 5000;
  const progressToFreeDelivery = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-200 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
            SHOPPING <span className="text-orange-600">CART</span>
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-0.5">
            Review order items before Cash on Delivery checkout
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-mono text-zinc-500 hover:text-red-600 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Free Delivery Meter */}
      <div className="mb-8 p-4 rounded bg-white border border-brand-border shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-orange-500" />
            {remainingForFreeDelivery > 0 ? (
              <span>
                Add <strong className="text-orange-600">PKR {remainingForFreeDelivery.toLocaleString()}</strong> more to qualify for <strong>FREE DELIVERY</strong> in Multan!
              </span>
            ) : (
              <span className="text-emerald-700 font-bold">
                Congratulations! You have unlocked FREE DELIVERY on this order!
              </span>
            )}
          </div>
          <span className="font-bold text-zinc-700">{progressToFreeDelivery}%</span>
        </div>
        <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-orange-500 h-full transition-all duration-500"
            style={{ width: `${progressToFreeDelivery}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Item Table */}
        <div className="lg:col-span-2 bg-white border border-brand-border rounded shadow-sm overflow-hidden">
          <div className="divide-y divide-zinc-200">
            {cartItems.map((item) => (
              <div key={item.product} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <Link to={`/product/${item.slug}`} className="w-20 h-20 bg-[#f8f8f7] rounded border border-zinc-200 p-2 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </Link>

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="text-[11px] font-mono text-orange-600 font-bold uppercase">
                    {item.brand} • SKU: {item.sku}
                  </div>
                  <Link
                    to={`/product/${item.slug}`}
                    className="font-bold text-sm text-zinc-900 hover:text-orange-600 line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-1 flex items-center justify-center sm:justify-start gap-2">
                    <span className="font-mono font-bold text-zinc-900 text-sm">
                      PKR {item.price.toLocaleString()}
                    </span>
                    <DemoPriceBadge size="xs" />
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-zinc-300 rounded font-mono text-xs bg-zinc-50">
                  <button
                    onClick={() => updateQuantity(item.product, item.quantity - 1)}
                    className="px-2.5 py-1.5 text-zinc-700 hover:bg-zinc-200"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 font-bold min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product, item.quantity + 1)}
                    className="px-2.5 py-1.5 text-zinc-700 hover:bg-zinc-200"
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                {/* Item Total & Remove */}
                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <span className="font-mono font-bold text-zinc-950 text-sm">
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product)}
                    className="text-zinc-400 hover:text-red-600 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex justify-between items-center text-xs font-mono">
            <Link to="/shop" className="text-orange-600 hover:underline flex items-center gap-1 font-bold">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary & Coupon Card */}
        <div className="space-y-6">
          {/* Coupon Form */}
          <div className="bg-white border border-brand-border rounded p-5 shadow-sm">
            <h3 className="text-xs font-mono font-bold uppercase text-zinc-800 mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange-500" />
              <span>Promotional Discount Code</span>
            </h3>

            {coupon ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded text-xs font-mono">
                <div>
                  <div className="font-bold text-emerald-800">{coupon.couponCode} Applied</div>
                  <div className="text-emerald-700">PKR {coupon.discountAmount.toLocaleString()} saved</div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-red-600 hover:underline font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleCouponSubmit} className="space-y-2 font-mono text-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. WELCOME10"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs uppercase focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    disabled={applyingCoupon}
                    className="px-4 py-2 bg-zinc-900 hover:bg-orange-500 text-white hover:text-zinc-950 font-bold uppercase rounded transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Tip: Use <strong>WELCOME10</strong> for 10% off orders over PKR 2,000.
                </p>
              </form>
            )}
          </div>

          {/* Order Financials */}
          <div className="bg-white border border-brand-border rounded p-6 shadow-sm font-mono text-xs space-y-3">
            <h3 className="font-heading font-bold text-sm uppercase text-zinc-900 border-b border-zinc-200 pb-2">
              Order Financial Summary
            </h3>

            <div className="flex justify-between text-zinc-600">
              <span>Items Subtotal:</span>
              <span className="font-bold text-zinc-900">PKR {subtotal.toLocaleString()}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Coupon Discount:</span>
                <span>- PKR {discount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-600">
              <span>Delivery Charges (Multan):</span>
              <span className="font-bold text-zinc-900">
                {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `PKR ${deliveryFee}`}
              </span>
            </div>

            <div className="pt-3 border-t-2 border-zinc-900 flex justify-between items-baseline text-base font-bold text-zinc-950">
              <span>Estimated Total:</span>
              <span className="text-xl text-orange-600 font-black">
                PKR {total.toLocaleString()}
              </span>
            </div>

            <div className="pt-2">
              <DemoPriceBadge size="xs" className="w-full justify-center" />
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-all shadow-orange-glow mt-4"
            >
              <span>Proceed to COD Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 text-[11px] text-zinc-500 space-y-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                <span>Zero pre-payment required. Pay on delivery.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
