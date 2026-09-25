import React, { useState, useEffect } from 'react';
import { Users, Search, ShieldCheck, CheckCircle, Ban } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { PageLoader, TableRowSkeleton } from '../../components/common/LoadingSkeleton';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const { success, error: toastError } = useToast();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/customers');
      setCustomers(data);
    } catch (err) {
      console.error('Failed to load customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleToggleStatus = async (id) => {
    try {
      const { data } = await api.patch(`/admin/customers/${id}/status`);
      success(data.message);
      fetchCustomers();
    } catch (err) {
      toastError('Failed to change customer status.');
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-heading font-black text-white uppercase">
          Customer <span className="text-orange-500">Directory</span>
        </h1>
        <p className="text-zinc-400 mt-0.5">
          Registered tradesmen, contractors, and retail buyers
        </p>
      </div>

      <div className="bg-[#161616] p-4 rounded border border-zinc-800">
        <input
          type="text"
          placeholder="Filter customers by name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#111111] border border-zinc-700 rounded px-3 py-2 text-zinc-200 w-full sm:w-80 focus:outline-none focus:border-orange-500"
        />
      </div>

      <div className="bg-[#161616] border border-zinc-800 rounded overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#111111] text-zinc-400 border-b border-zinc-800 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Phone / Email</th>
                <th className="py-3 px-4">Orders Count</th>
                <th className="py-3 px-4">Total Purchases</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {loading ? (
                <TableRowSkeleton cols={6} />
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filtered.map((cust) => (
                  <tr key={cust._id} className="hover:bg-zinc-800/40">
                    <td className="py-3 px-4 font-bold text-white">
                      {cust.name}
                      <div className="text-[10px] text-zinc-500 font-normal">
                        Joined: {new Date(cust.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-zinc-300">{cust.phone}</div>
                      <div className="text-zinc-500 text-[10px]">{cust.email}</div>
                    </td>

                    <td className="py-3 px-4 font-bold text-zinc-200">
                      {cust.orderCount || 0} Orders
                    </td>

                    <td className="py-3 px-4 font-bold text-orange-400">
                      PKR {(cust.totalSpent || 0).toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          cust.isActive
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-red-950 text-red-300 border border-red-800'
                        }`}
                      >
                        {cust.isActive ? 'Active' : 'Suspended'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(cust._id)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                          cust.isActive
                            ? 'bg-zinc-800 hover:bg-red-900 text-zinc-300 hover:text-white'
                            : 'bg-emerald-800 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {cust.isActive ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
