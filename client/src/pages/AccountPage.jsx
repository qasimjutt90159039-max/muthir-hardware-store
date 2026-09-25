import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Lock,
  LogOut,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle,
  Truck,
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PageLoader } from '../components/common/LoadingSkeleton';

const AccountPage = () => {
  const { user, logout, updateProfile } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Profile Form
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [newPassword, setNewPassword] = useState('');

  // Address Form
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [newAddress, setNewAddress] = useState({
    title: 'Work Site',
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: 'Multan',
    area: '',
    postalCode: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        setLoadingOrders(true);
        const { data } = await api.get('/orders/my-orders');
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updateData = { name: profileName, phone: profilePhone };
    if (newPassword) {
      if (newPassword.length < 6) {
        toastError('New password must be at least 6 characters.');
        return;
      }
      updateData.password = newPassword;
    }

    const res = await updateProfile(updateData);
    if (res.success) {
      setNewPassword('');
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newAddress.address.trim()) {
      toastError('Please enter full address text.');
      return;
    }

    try {
      const { data } = await api.post('/auth/address', newAddress);
      setAddresses(data);
      success('Delivery address added to profile.');
      setNewAddress({
        title: 'Site Address',
        fullName: user.name,
        phone: user.phone,
        address: '',
        city: 'Multan',
        area: '',
        postalCode: '',
      });
    } catch (err) {
      toastError('Failed to save address.');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const { data } = await api.delete(`/auth/address/${addressId}`);
      setAddresses(data);
      success('Address removed.');
    } catch (err) {
      toastError('Failed to delete address.');
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Account Title */}
      <div className="mb-8 border-b-2 border-zinc-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
            CUSTOMER <span className="text-orange-600">DASHBOARD</span>
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-0.5">
            Logged in as {user.name} ({user.email})
          </p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-mono transition-colors w-fit"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Tabs */}
        <aside className="space-y-1 bg-white p-3 rounded border border-brand-border font-mono text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3 py-2.5 rounded flex items-center gap-2.5 transition-colors ${
              activeTab === 'profile'
                ? 'bg-orange-500 text-zinc-950 font-bold'
                : 'text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Security</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-3 py-2.5 rounded flex items-center justify-between transition-colors ${
              activeTab === 'orders'
                ? 'bg-orange-500 text-zinc-950 font-bold'
                : 'text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>Order History</span>
            </div>
            <span className="text-[10px] bg-zinc-200 text-zinc-800 px-1.5 py-0.2 rounded font-bold">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-3 py-2.5 rounded flex items-center gap-2.5 transition-colors ${
              activeTab === 'addresses'
                ? 'bg-orange-500 text-zinc-950 font-bold'
                : 'text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>
        </aside>

        {/* Tab Content Display */}
        <div className="lg:col-span-3">
          {/* TAB 1: PROFILE & SECURITY */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-brand-border rounded p-6 shadow-sm space-y-6">
              <h2 className="text-sm font-heading font-bold uppercase text-zinc-900 pb-2 border-b border-zinc-200">
                Account Details & Password
              </h2>

              <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-lg font-mono text-xs">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full bg-zinc-200 border border-zinc-300 rounded px-3 py-2 text-xs text-zinc-500 cursor-not-allowed"
                  />
                  <span className="text-[10px] text-zinc-400">Email is fixed to your account identifier.</span>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Primary Phone Number</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-200">
                  <label className="block font-bold text-zinc-700 mb-1">
                    Change Password (Leave empty to keep current)
                  </label>
                  <input
                    type="password"
                    placeholder="New password (min 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-2 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-zinc-900 hover:bg-orange-500 text-white hover:text-zinc-950 font-bold uppercase rounded transition-colors shadow"
                >
                  Save Profile Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: ORDERS LIST */}
          {activeTab === 'orders' && (
            <div className="bg-white border border-brand-border rounded p-6 shadow-sm">
              <h2 className="text-sm font-heading font-bold uppercase text-zinc-900 pb-2 border-b border-zinc-200 mb-4">
                My Cash on Delivery Orders
              </h2>

              {loadingOrders ? (
                <PageLoader text="Loading Orders..." />
              ) : orders.length === 0 ? (
                <div className="text-center py-12 text-zinc-500 text-xs font-mono">
                  No orders have been placed with this account yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="border border-zinc-200 rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs hover:border-orange-500/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-950 text-sm">
                            #{order.orderNumber}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              order.orderStatus === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.orderStatus === 'Cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          Placed on: {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length} item(s)
                        </div>
                        <div className="text-[11px] text-zinc-600">
                          Payment: <span className="font-bold">{order.paymentMethod}</span> ({order.paymentStatus})
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span className="font-bold text-zinc-900 text-sm">
                          PKR {order.total.toLocaleString()}
                        </span>
                        <Link
                          to={`/account/orders/${order.orderNumber}`}
                          className="px-3 py-1.5 bg-zinc-900 hover:bg-orange-500 text-white hover:text-zinc-950 font-bold uppercase text-[10px] rounded transition-colors"
                        >
                          View Order Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="bg-white border border-brand-border rounded p-6 shadow-sm">
                <h2 className="text-sm font-heading font-bold uppercase text-zinc-900 pb-2 border-b border-zinc-200 mb-4">
                  Saved Jobsite & Home Addresses
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className="border border-zinc-200 rounded p-4 font-mono text-xs relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-zinc-900 uppercase text-xs">{addr.title}</span>
                          <button
                            onClick={() => handleDeleteAddress(addr._id)}
                            className="text-zinc-400 hover:text-red-600"
                            title="Delete address"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-zinc-700 font-semibold">{addr.fullName}</div>
                        <div className="text-zinc-500">{addr.phone}</div>
                        <div className="text-zinc-600 mt-2">{addr.address}</div>
                        <div className="text-zinc-500">{addr.city}, {addr.area}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Address Form */}
              <div className="bg-white border border-brand-border rounded p-6 shadow-sm">
                <h3 className="text-xs font-heading font-bold uppercase text-zinc-900 mb-3 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-orange-500" />
                  <span>Add Another Delivery Address</span>
                </h3>

                <form onSubmit={handleAddAddress} className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div>
                    <label className="block text-zinc-600 mb-1">Address Label</label>
                    <input
                      type="text"
                      placeholder="e.g. Fabrication Workshop"
                      value={newAddress.title}
                      onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded p-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-600 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded p-2 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-zinc-600 mb-1">Address Description</label>
                    <textarea
                      rows="2"
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      placeholder="Shop/Plot #, street, landmark..."
                      className="w-full bg-zinc-50 border border-zinc-300 rounded p-2 text-xs"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="sm:col-span-2 py-2.5 bg-orange-500 text-zinc-950 font-bold uppercase rounded"
                  >
                    Save Address
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
