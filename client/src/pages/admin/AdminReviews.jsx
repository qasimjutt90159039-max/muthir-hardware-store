import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, EyeOff, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { PageLoader, TableRowSkeleton } from '../../components/common/LoadingSkeleton';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, error: toastError } = useToast();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/reviews/admin');
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/reviews/${id}/status`, { status });
      success(`Review status changed to ${status}.`);
      fetchReviews();
    } catch (err) {
      toastError('Failed to update review status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this customer review?')) {
      try {
        await api.delete(`/reviews/${id}`);
        success('Review deleted.');
        fetchReviews();
      } catch (err) {
        toastError('Failed to delete review.');
      }
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-heading font-black text-white uppercase">
          Review Moderation & <span className="text-orange-500">Verification</span>
        </h1>
        <p className="text-zinc-400 mt-0.5">
          Approve or hide customer reviews submitted by verified purchasers
        </p>
      </div>

      <div className="bg-[#161616] border border-zinc-800 rounded overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#111111] text-zinc-400 border-b border-zinc-800 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Hardware Tool</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Comment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {loading ? (
                <TableRowSkeleton cols={6} />
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No customer reviews in moderation queue.
                  </td>
                </tr>
              ) : (
                reviews.map((rev) => (
                  <tr key={rev._id} className="hover:bg-zinc-800/40">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white max-w-xs truncate">
                        {rev.product?.name || 'Unknown Product'}
                      </div>
                      <div className="text-[10px] text-zinc-400">SKU: {rev.product?.sku}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-zinc-200">{rev.userName}</div>
                      <div className="text-[10px] text-emerald-400 font-bold uppercase">
                        Verified Buyer
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-zinc-600'}`}
                          />
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 max-w-md">
                      {rev.title && <div className="font-bold text-white mb-0.5">{rev.title}</div>}
                      <p className="text-zinc-400 text-xs font-sans line-clamp-2">{rev.comment}</p>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          rev.status === 'approved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : rev.status === 'hidden'
                            ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {rev.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => handleStatusUpdate(rev._id, 'approved')}
                            className="px-2 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-[10px] font-bold uppercase"
                          >
                            Approve
                          </button>
                        )}
                        {rev.status !== 'hidden' && (
                          <button
                            onClick={() => handleStatusUpdate(rev._id, 'hidden')}
                            className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold uppercase"
                          >
                            Hide
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(rev._id)}
                          className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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

export default AdminReviews;
