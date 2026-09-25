import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { PageLoader, TableRowSkeleton } from '../../components/common/LoadingSkeleton';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const initialForm = {
    name: '',
    brand: '',
    category: 'Tools',
    subcategory: '',
    sku: '',
    modelNumber: '',
    price: '',
    salePrice: '',
    stock: '',
    lowStockThreshold: 5,
    description: '',
    shortDescription: '',
    images: '',
    weight: '',
    dimensions: '',
    material: '',
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    specifications: [{ key: '', value: '' }],
  };

  const [formData, setFormData] = useState(initialForm);
  const { success, error: toastError } = useToast();

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, brandRes] = await Promise.all([
        api.get(`/products?pageSize=100&search=${encodeURIComponent(search)}&category=${categoryFilter}`),
        api.get('/categories'),
        api.get('/brands'),
      ]);
      setProducts(prodRes.data.products);
      setCategories(catRes.data);
      setBrands(brandRes.data);
    } catch (err) {
      console.error('Failed to load products list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, [categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCatalog();
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      brand: prod.brand,
      category: prod.category,
      subcategory: prod.subcategory || '',
      sku: prod.sku,
      modelNumber: prod.modelNumber || '',
      price: prod.price,
      salePrice: prod.salePrice || '',
      stock: prod.stock,
      lowStockThreshold: prod.lowStockThreshold || 5,
      description: prod.description,
      shortDescription: prod.shortDescription || '',
      images: prod.images ? prod.images.join(', ') : '',
      weight: prod.weight || '',
      dimensions: prod.dimensions || '',
      material: prod.material || '',
      isFeatured: !!prod.isFeatured,
      isNew: !!prod.isNew,
      isBestSeller: !!prod.isBestSeller,
      specifications: prod.specifications && prod.specifications.length
        ? prod.specifications
        : [{ key: '', value: '' }],
    });
    setIsModalOpen(true);
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...formData.specifications];
    updated[index][field] = value;
    setFormData({ ...formData, specifications: updated });
  };

  const addSpecRow = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: '', value: '' }],
    });
  };

  const removeSpecRow = (index) => {
    const updated = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const cleanImages = formData.images
        .split(',')
        .map((img) => img.trim())
        .filter(Boolean);

      const cleanSpecs = formData.specifications.filter(
        (s) => s.key.trim() && s.value.trim()
      );

      const payload = {
        ...formData,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : null,
        stock: Number(formData.stock),
        lowStockThreshold: Number(formData.lowStockThreshold),
        images: cleanImages.length ? cleanImages : ['https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'],
        specifications: cleanSpecs,
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, payload);
        success('Product specifications updated successfully.');
      } else {
        await api.post('/products', payload);
        success('New hardware product created in catalog.');
      }

      setIsModalOpen(false);
      fetchCatalog();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save product.';
      toastError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to archive this product?')) {
      try {
        await api.delete(`/products/${id}`);
        success('Product archived.');
        fetchCatalog();
      } catch (err) {
        toastError('Failed to archive product.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl font-heading font-black tracking-tight text-white uppercase">
            Product & Inventory <span className="text-orange-500">Management</span>
          </h1>
          <p className="text-xs font-mono text-zinc-400 mt-0.5">
            Add, edit, inspect specifications, and manage product catalog status
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 font-mono text-xs font-bold uppercase transition-colors shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Product</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-[#161616] p-4 rounded border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name, SKU, or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#111111] border border-zinc-700 rounded px-3 py-1.5 text-zinc-200 placeholder-zinc-500 w-full sm:w-72 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-zinc-400">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#111111] border border-zinc-700 rounded px-3 py-1.5 text-zinc-200 focus:outline-none focus:border-orange-500"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#161616] border border-zinc-800 rounded overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-[#111111] text-zinc-400 border-b border-zinc-800 uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Tool / Hardware</th>
                <th className="py-3 px-4">SKU / Model</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (PKR)</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {loading ? (
                <TableRowSkeleton cols={6} />
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500 font-mono">
                    No hardware products found.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=100&q=80'}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded bg-[#111111] border border-zinc-700 p-1"
                        />
                        <div className="max-w-xs">
                          <div className="font-bold text-white truncate">{p.name}</div>
                          <div className="text-[10px] text-orange-400 font-bold uppercase">{p.brand}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-zinc-200">{p.sku}</div>
                      <div className="text-[10px] text-zinc-500">{p.modelNumber || '—'}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px]">
                        {p.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-bold text-white">
                      PKR {p.price.toLocaleString()}
                      {p.salePrice && (
                        <div className="text-[10px] text-orange-400">Sale: {p.salePrice.toLocaleString()}</div>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          p.stock <= 0
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : p.stockStatus === 'Low Stock'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {p.stock} in stock
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-1.5 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
                          title="Archive Product"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1A1A1A] border border-zinc-700 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 text-zinc-100 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <h2 className="text-base font-heading font-bold uppercase text-white">
                {editingProduct ? 'Edit Hardware Product' : 'Create New Catalog Product'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Brand *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bosch, INGCO, TOTAL"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BOS-GSB550"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Model Number</label>
                  <input
                    type="text"
                    placeholder="e.g. GSB 550"
                    value={formData.modelNumber}
                    onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Subcategory</label>
                  <input
                    type="text"
                    placeholder="e.g. Power Tools, Screws"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Sale Price (Optional)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Low Stock Threshold</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    Image URLs (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    placeholder="https://..., https://..."
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-400 uppercase font-bold mb-1">
                    Full Description *
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#111111] border border-zinc-700 rounded p-2 text-white"
                  ></textarea>
                </div>
              </div>

              {/* Technical Specifications Section */}
              <div className="pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-zinc-300 font-bold uppercase">
                    Technical Specifications
                  </label>
                  <button
                    type="button"
                    onClick={addSpecRow}
                    className="text-orange-400 hover:underline"
                  >
                    + Add Spec Row
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.specifications.map((spec, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Key (e.g. Wattage)"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(i, 'key', e.target.value)}
                        className="w-1/2 bg-[#111111] border border-zinc-700 rounded p-1.5 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 550 W)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                        className="w-1/2 bg-[#111111] border border-zinc-700 rounded p-1.5 text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecRow(i)}
                        className="px-2 text-zinc-400 hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Flags */}
              <div className="pt-4 border-t border-zinc-800 flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>Featured Item</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>New Arrival</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  <span>Best Seller</span>
                </label>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded font-bold uppercase transition-colors"
                >
                  {submitting ? 'Saving Changes...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
