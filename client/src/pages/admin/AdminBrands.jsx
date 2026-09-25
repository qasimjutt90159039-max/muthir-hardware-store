import React, { useState, useEffect } from 'react';
import { Tag, Plus, Edit, Trash2, X } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { PageLoader } from '../../components/common/LoadingSkeleton';

const AdminBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');

  const { success, error: toastError } = useToast();

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/brands');
      setBrands(data);
    } catch (err) {
      console.error('Failed to load brands:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const openModal = (brand = null) => {
    if (brand) {
      setEditingBrand(brand);
      setName(brand.name);
      setDescription(brand.description || '');
      setLogo(brand.logo || '');
    } else {
      setEditingBrand(null);
      setName('');
      setDescription('');
      setLogo('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, description, logo };
      if (editingBrand) {
        await api.put(`/brands/${editingBrand._id}`, payload);
        success('Brand updated.');
      } else {
        await api.post('/brands', payload);
        success('Brand created.');
      }
      setIsModalOpen(false);
      fetchBrands();
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to save brand.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Archive this brand?')) {
      try {
        await api.delete(`/brands/${id}`);
        success('Brand archived.');
        fetchBrands();
      } catch (err) {
        toastError('Failed to archive brand.');
      }
    }
  };

  if (loading) {
    return <PageLoader text="Loading Brands Directory..." />;
  }

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-white uppercase">
            Brand <span className="text-orange-500">Management</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage genuine hardware manufacturers and distributors cataloged in store
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 text-xs font-bold uppercase"
        >
          <Plus className="w-4 h-4" />
          <span>Add Brand</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((b) => (
          <div
            key={b._id}
            className="bg-[#161616] border border-zinc-800 rounded p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
                <span className="font-heading font-bold text-sm text-white uppercase">
                  {b.name}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openModal(b)}
                    className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-orange-400 font-bold mb-2">
                {b.productCount || 0} Products in Catalog
              </div>

              <p className="text-xs text-zinc-400 font-sans line-clamp-3">
                {b.description || 'Verified manufacturer.'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] border border-zinc-700 rounded-lg max-w-md w-full p-6 text-zinc-100 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <h2 className="font-heading font-bold text-sm uppercase text-white">
                {editingBrand ? 'Edit Brand' : 'Add Brand'}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Description</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-zinc-800 rounded font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-orange-500 text-zinc-950 font-bold uppercase rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBrands;
