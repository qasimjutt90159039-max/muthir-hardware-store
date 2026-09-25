import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('mhs_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem('mhs_coupon');
    return saved ? JSON.parse(saved) : null;
  });
  const { success, warning, error: toastError } = useToast();

  useEffect(() => {
    localStorage.setItem('mhs_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('mhs_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('mhs_coupon');
    }
  }, [coupon]);

  const addToCart = (product, quantity = 1) => {
    if (product.stock <= 0 || product.stockStatus === 'Out of Stock') {
      warning(`${product.name} is currently out of stock.`);
      return false;
    }

    const existingIndex = cartItems.findIndex((item) => item.product === product._id);

    if (existingIndex > -1) {
      const currentQty = cartItems[existingIndex].quantity;
      const newQty = currentQty + quantity;

      if (newQty > product.stock) {
        warning(`Cannot add more. Only ${product.stock} units available in stock.`);
        return false;
      }

      const updated = [...cartItems];
      updated[existingIndex].quantity = newQty;
      setCartItems(updated);
      success(`Updated ${product.name} quantity to ${newQty} in cart.`);
      return true;
    } else {
      if (quantity > product.stock) {
        warning(`Cannot add ${quantity} units. Only ${product.stock} available.`);
        return false;
      }

      const effectivePrice = product.salePrice ? product.salePrice : product.price;
      const newItem = {
        product: product._id,
        productId: product.productId,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        brand: product.brand,
        price: effectivePrice,
        regularPrice: product.price,
        image: product.images && product.images.length ? product.images[0] : '',
        stock: product.stock,
        quantity,
      };

      setCartItems((prev) => [...prev, newItem]);
      success(`Added ${product.name} to cart.`);
      return true;
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const item = cartItems.find((i) => i.product === productId);
    if (!item) return;

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (newQuantity > item.stock) {
      warning(`Stock limit reached! Only ${item.stock} units available.`);
      return;
    }

    setCartItems((prev) =>
      prev.map((i) => (i.product === productId ? { ...i, quantity: newQuantity } : i))
    );
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find((i) => i.product === productId);
    setCartItems((prev) => prev.filter((i) => i.product !== productId));
    if (item) {
      success(`Removed ${item.name} from cart.`);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
    localStorage.removeItem('mhs_cart');
    localStorage.removeItem('mhs_coupon');
  };

  // Subtotal computation
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Delivery fee rule: Free over PKR 5,000, else PKR 250
  const deliveryFee = cartItems.length === 0 ? 0 : subtotal >= 5000 ? 0 : 250;

  // Coupon application
  const applyCoupon = async (code) => {
    if (!code || !code.trim()) {
      toastError('Please enter a coupon code.');
      return false;
    }

    try {
      const { data } = await api.post('/coupons/validate', {
        code: code.trim(),
        subtotal,
      });

      if (data.valid) {
        setCoupon(data);
        success(data.message || 'Coupon applied successfully!');
        return true;
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid or expired coupon code.';
      toastError(msg);
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    success('Coupon removed.');
  };

  // Discount computation
  const discount = coupon ? coupon.discountAmount : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        subtotal,
        deliveryFee,
        discount,
        coupon,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
