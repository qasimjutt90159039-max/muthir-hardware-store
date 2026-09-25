import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, Layers, DollarSign } from 'lucide-react';
import api from '../../services/api';
import { PageLoader } from '../../components/common/LoadingSkeleton';

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/admin/dashboard');
        setStats(data);
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return <PageLoader text="Compiling Store Analytics..." />;
  }

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-heading font-black text-white uppercase">
          Sales & Catalog <span className="text-orange-500">Analytics</span>
        </h1>
        <p className="text-zinc-400 mt-0.5">
          Real database aggregations across orders, hardware categories, and customer spending
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-[#161616] border border-zinc-800 rounded p-6 space-y-4">
          <h2 className="text-sm font-heading font-bold uppercase text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-500" />
            <span>Product Catalog Breakdown by Category</span>
          </h2>

          <div className="space-y-3 pt-2">
            {stats?.categoryBreakdown?.map((cat) => {
              const totalProds = stats.totalProducts || 1;
              const pct = Math.round((cat.count / totalProds) * 100);
              return (
                <div key={cat._id} className="space-y-1">
                  <div className="flex justify-between text-zinc-300">
                    <span className="font-bold">{cat._id}</span>
                    <span>{cat.count} Items ({pct}%)</span>
                  </div>
                  <div className="w-full bg-[#111111] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-orange-500 h-full rounded-full"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-[#161616] border border-zinc-800 rounded p-6 space-y-4">
          <h2 className="text-sm font-heading font-bold uppercase text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span>Order Pipeline Volume by Status</span>
          </h2>

          <div className="space-y-3 pt-2">
            {stats?.ordersByStatus?.map((status) => {
              const totalOrds = stats.totalOrders || 1;
              const pct = Math.round((status.count / totalOrds) * 100);
              return (
                <div key={status._id} className="space-y-1">
                  <div className="flex justify-between text-zinc-300">
                    <span className="font-bold">{status._id}</span>
                    <span>{status.count} Orders ({pct}%)</span>
                  </div>
                  <div className="w-full bg-[#111111] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
