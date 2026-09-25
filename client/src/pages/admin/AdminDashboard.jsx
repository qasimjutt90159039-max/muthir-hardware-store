import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Boxes,
  Mail,
  Star,
  ExternalLink
} from 'lucide-react';
import api from '../../services/api';
import { PageLoader } from '../../components/common/LoadingSkeleton';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/admin/dashboard');
        setStats(data);
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <PageLoader text="Loading Store Metrics & Analytics..." />;
  }

  const cards = [
    {
      label: 'Total Store Revenue',
      value: `PKR ${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10 border-orange-500/30',
      subtitle: 'From confirmed & delivered orders',
    },
    {
      label: 'Total Orders Placed',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
      subtitle: `${stats?.pendingOrders || 0} currently pending`,
    },
    {
      label: 'Active Hardware Items',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      subtitle: 'Catalog SKUs',
    },
    {
      label: 'Registered Customers',
      value: stats?.totalCustomers || 0,
      icon: Users,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30',
      subtitle: 'Tradesmen & accounts',
    },
    {
      label: 'Low Stock Alerts',
      value: stats?.lowStockCount || 0,
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/30',
      subtitle: 'Needs replenishment',
      link: '/admin/inventory',
    },
    {
      label: 'Inbound Inquiries',
      value: stats?.unreadMessages || 0,
      icon: Mail,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      subtitle: 'Customer counter messages',
      link: '/admin/messages',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-black tracking-tight text-white uppercase">
            Store Performance <span className="text-orange-500">Dashboard</span>
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">
            Real-time status for Mutahir Hardware Store (Multan, Pakistan)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="px-3.5 py-2 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 font-mono text-xs font-bold uppercase transition-colors"
          >
            + Add New Product
          </Link>
          <Link
            to="/admin/inventory"
            className="px-3.5 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs font-bold uppercase transition-colors"
          >
            Adjust Stock
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className={`p-5 rounded border ${c.bg} bg-[#161616] flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-zinc-400 uppercase font-semibold">
                  {c.label}
                </span>
                <div className={`p-2 rounded ${c.color} bg-black/40`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-2xl md:text-3xl font-mono font-black text-white">
                  {c.value}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-1 flex items-center justify-between">
                  <span>{c.subtitle}</span>
                  {c.link && (
                    <Link to={c.link} className="text-orange-400 hover:underline flex items-center gap-1 font-bold">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tables Row: Recent Orders & Low Stock Alarms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders Table */}
        <div className="bg-[#161616] border border-zinc-800 rounded p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-heading font-bold uppercase text-white flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-orange-500" />
              <span>Recent Customer Orders</span>
            </h2>
            <Link to="/admin/orders" className="text-xs font-mono text-orange-400 hover:underline">
              View All &rarr;
            </Link>
          </div>

          {stats?.recentOrders?.length === 0 ? (
            <div className="text-xs font-mono text-zinc-500 py-6 text-center">No orders yet.</div>
          ) : (
            <div className="space-y-3 font-mono text-xs">
              {stats?.recentOrders?.map((ord) => (
                <div
                  key={ord._id}
                  className="p-3 rounded bg-[#1f1f1f] border border-zinc-800/80 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>#{ord.orderNumber}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                          ord.orderStatus === 'Delivered'
                            ? 'bg-emerald-900/60 text-emerald-300'
                            : ord.orderStatus === 'Cancelled'
                            ? 'bg-red-900/60 text-red-300'
                            : 'bg-orange-900/60 text-orange-300'
                        }`}
                      >
                        {ord.orderStatus}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {ord.customerDetails?.fullName} • {ord.customerDetails?.phone}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-orange-400">PKR {ord.total.toLocaleString()}</div>
                    <Link
                      to={`/admin/orders`}
                      className="text-[10px] text-zinc-400 hover:text-white underline"
                    >
                      Manage Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-[#161616] border border-zinc-800 rounded p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-heading font-bold uppercase text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>Low Stock & Depleted Alerts</span>
            </h2>
            <Link to="/admin/inventory" className="text-xs font-mono text-orange-400 hover:underline">
              Inventory Console &rarr;
            </Link>
          </div>

          {stats?.lowStockList?.length === 0 ? (
            <div className="text-xs font-mono text-emerald-400 py-6 text-center">
              All inventory levels are currently healthy!
            </div>
          ) : (
            <div className="space-y-3 font-mono text-xs">
              {stats?.lowStockList?.map((prod) => (
                <div
                  key={prod._id}
                  className="p-3 rounded bg-[#1f1f1f] border border-zinc-800 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white truncate">{prod.name}</div>
                    <div className="text-[11px] text-zinc-400">
                      SKU: {prod.sku} • Brand: {prod.brand}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        prod.stock <= 0
                          ? 'bg-red-900/60 text-red-300 border border-red-700'
                          : 'bg-amber-900/60 text-amber-300 border border-amber-700'
                      }`}
                    >
                      {prod.stock} units left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
