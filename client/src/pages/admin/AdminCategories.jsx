import React, { useState, useEffect } from 'react';
import { Boxes, Plus, Edit, Trash2, X, Check } from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { PageLoader } from '../../components/common/LoadingSkeleton';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [subcategoriesStr, setSubcategoriesStr] = useState('');

  const { success, error: toastError } = useToast();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openModal = (cat = null) => {
    if (cat) {
      setEditingCategory(cat);
      setName(cat.name);
      setDescription(cat.description || '');
      setImage(cat.image || '');
      setSubcategoriesStr(
        cat.subcategories ? cat.subcategories.map((s) => s.name).join(', ') : ''
      );
    } else {
      setEditingCategory(null);
      setName('');
      setDescription('');
      setImage('');
      setSubcategoriesStr('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const subs = subcategoriesStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => ({
          name: s,
          slug: s.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
        }));

      const payload = {
        name,
        description,
        image,
        subcategories: subs,
      };

      if (editingCategory) {
        await api.put(`/categories/${editingCategory._id}`, payload);
        success('Category updated.');
      } else {
        await api.post('/categories', payload);
        success('Category created.');
      }

      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to save category.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Archive this category?')) {
      try {
        await api.delete(`/categories/${id}`);
        success('Category archived.');
        fetchCategories();
      } catch (err) {
        toastError('Failed to archive category.');
      }
    }
  };

  if (loading) {
    return <PageLoader text="Loading Category Directory..." />;
  }

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-white uppercase">
            Category <span className="text-orange-500">Management</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Organize the hardware taxonomy, subcategories, and category banners
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 text-xs font-bold uppercase"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-[#161616] border border-zinc-800 rounded p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
                <span className="font-heading font-bold text-sm text-white uppercase">
                  {cat.name}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openModal(cat)}
                    className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="p-1 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-3">
                {cat.description || 'No description added.'}
              </p>

              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Subcategories:</div>
                  <div className="flex flex-wrap gap-1">
                    {cat.subcategories.map((sub, i) => (
                      <span key={i} className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-0.5 rounded">
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] border border-zinc-700 rounded-lg max-w-md w-full p-6 text-zinc-100 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
              <h2 className="font-heading font-bold text-sm uppercase text-white">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Category Name *</label>
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
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">
                  Subcategories (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Hand Tools, Power Tools, Workshop Tools"
                  value={subcategoriesStr}
                  onChange={(e) => setSubcategoriesStr(e.target.value)}
                  className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                />
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

export default AdminCategories;
