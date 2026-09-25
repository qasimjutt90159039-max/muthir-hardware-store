import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, Trash2, Phone, Calendar, Clock } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { PageLoader, TableRowSkeleton } from '../../components/common/LoadingSkeleton';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { success, error: toastError } = useToast();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/contact');
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      success(`Inquiry marked as ${status}.`);
      fetchMessages();
    } catch (err) {
      toastError('Failed to update inquiry status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this customer inquiry?')) {
      try {
        await api.delete(`/contact/${id}`);
        success('Message removed.');
        fetchMessages();
      } catch (err) {
        toastError('Failed to delete message.');
      }
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-heading font-black text-white uppercase">
          Customer Inquiries & <span className="text-orange-500">Contact Inbox</span>
        </h1>
        <p className="text-zinc-400 mt-0.5">
          Incoming messages and phone callback requests from the public store contact form
        </p>
      </div>

      <div className="bg-[#161616] border border-zinc-800 rounded overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#111111] text-zinc-400 border-b border-zinc-800 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Customer Details</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Message Body</th>
                <th className="py-3 px-4">Received Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {loading ? (
                <TableRowSkeleton cols={6} />
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No customer contact messages in inbox.
                  </td>
                </tr>
              ) : (
                messages.map((m) => (
                  <tr key={m._id} className="hover:bg-zinc-800/40">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{m.fullName}</div>
                      <a href={`tel:${m.phone}`} className="text-orange-400 hover:underline flex items-center gap-1 text-[11px]">
                        <Phone className="w-3 h-3" />
                        <span>{m.phone}</span>
                      </a>
                      {m.email && <div className="text-[10px] text-zinc-500">{m.email}</div>}
                    </td>

                    <td className="py-3 px-4 font-bold text-zinc-200">
                      {m.subject}
                    </td>

                    <td className="py-3 px-4 max-w-sm">
                      <p className="text-zinc-400 font-sans text-xs leading-relaxed">{m.message}</p>
                    </td>

                    <td className="py-3 px-4 text-zinc-400 text-[11px]">
                      {new Date(m.createdAt).toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          m.status === 'resolved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : m.status === 'read'
                            ? 'bg-zinc-800 text-zinc-300'
                            : 'bg-orange-950 text-orange-300 border border-orange-800'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {m.status !== 'resolved' && (
                          <button
                            onClick={() => handleUpdateStatus(m._id, 'resolved')}
                            className="px-2 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-[10px] font-bold uppercase"
                          >
                            Resolve
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(m._id)}
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

export default AdminMessages;
