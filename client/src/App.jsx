import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';

// Layouts
import CustomerLayout from './components/common/CustomerLayout';
import AdminLayout from './components/admin/AdminLayout';

// Customer Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import ComparePage from './pages/ComparePage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import OrderDetailPage from './pages/OrderDetailPage';
import BrandsPage from './pages/BrandsPage';
import HardwareGuidesPage from './pages/HardwareGuidesPage';
import GuideDetailPage from './pages/GuideDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { FAQPage, ShippingPage, ReturnsPage, PrivacyPage, TermsPage } from './pages/StaticPages';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBrands from './pages/admin/AdminBrands';
import AdminInventory from './pages/admin/AdminInventory';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminReviews from './pages/admin/AdminReviews';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminMessages from './pages/admin/AdminMessages';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <Routes>
                  {/* Public Customer Routes */}
                  <Route element={<CustomerLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/tools" element={<CategoryPage />} />
                    <Route path="/hand-tools" element={<CategoryPage />} />
                    <Route path="/power-tools" element={<CategoryPage />} />
                    <Route path="/hardware" element={<CategoryPage />} />
                    <Route path="/electrical" element={<CategoryPage />} />
                    <Route path="/plumbing" element={<CategoryPage />} />
                    <Route path="/paint" element={<CategoryPage />} />
                    <Route path="/safety" element={<CategoryPage />} />
                    <Route path="/brands" element={<BrandsPage />} />
                    <Route path="/new-arrivals" element={<CategoryPage />} />
                    <Route path="/best-sellers" element={<CategoryPage />} />
                    <Route path="/deals" element={<CategoryPage />} />
                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                    <Route path="/search" element={<ShopPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/account/orders" element={<AccountPage />} />
                    <Route path="/account/orders/:id" element={<OrderDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/hardware-guides" element={<HardwareGuidesPage />} />
                    <Route path="/hardware-guides/:slug" element={<GuideDetailPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/shipping" element={<ShippingPage />} />
                    <Route path="/returns" element={<ReturnsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/404" element={<NotFoundPage />} />
                  </Route>

                  {/* Protected Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="brands" element={<AdminBrands />} />
                    <Route path="inventory" element={<AdminInventory />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="coupons" element={<AdminCoupons />} />
                    <Route path="messages" element={<AdminMessages />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>

                  {/* Catch-all */}
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
