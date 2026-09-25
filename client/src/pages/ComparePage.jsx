import React from 'react';
import { Link } from 'react-router-dom';
import { Repeat, X, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import DemoPriceBadge from '../components/common/DemoPriceBadge';
import EmptyState from '../components/common/EmptyState';

const ComparePage = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  if (compareItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmptyState
          icon={Repeat}
          title="Comparison Tray is Empty"
          description="You have not added any tools to compare yet. Click the compare icon on product cards to view technical side-by-side specifications."
          actionText="Browse Power & Hand Tools"
          actionLink="/shop"
        />
      </div>
    );
  }

  // Gather unique specification keys across all compared items
  const allSpecKeys = Array.from(
    new Set(
      compareItems.flatMap((item) =>
        item.specifications ? item.specifications.map((s) => s.key) : []
      )
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b-2 border-zinc-200 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
            TOOL SPECIFICATION <span className="text-orange-600">COMPARISON</span>
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-0.5">
            Side-by-side technical metrics ({compareItems.length}/4 tools selected)
          </p>
        </div>

        <button
          onClick={clearCompare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-mono transition-colors w-fit"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Comparison Tray</span>
        </button>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white border border-brand-border rounded shadow-sm overflow-x-auto">
        <table className="w-full text-xs font-mono border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#161616] text-white divide-x divide-zinc-800">
              <th className="p-4 text-left w-48 font-mono text-zinc-400 uppercase text-[11px]">
                Product Overview
              </th>
              {compareItems.map((item) => (
                <th key={item._id} className="p-4 text-left w-64 align-top">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-orange-400 font-bold uppercase text-[11px]">
                      {item.brand}
                    </span>
                    <button
                      onClick={() => removeFromCompare(item._id)}
                      className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="aspect-square w-24 h-24 bg-white rounded p-1 mx-auto mb-2 flex items-center justify-center border border-zinc-700">
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=200&q=80'}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <Link
                    to={`/product/${item.slug}`}
                    className="font-bold text-white hover:text-orange-400 line-clamp-2 leading-tight block mb-2"
                  >
                    {item.name}
                  </Link>

                  <div className="text-sm font-bold text-orange-400 font-mono mb-1">
                    PKR {(item.salePrice || item.price).toLocaleString()}
                  </div>
                  <DemoPriceBadge size="xs" className="mb-3" />

                  <button
                    onClick={() => addToCart(item, 1)}
                    disabled={item.stock <= 0}
                    className="w-full py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-700 text-zinc-950 font-bold uppercase text-[10px] rounded flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>{item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            {/* Model Number */}
            <tr className="bg-zinc-50 divide-x divide-zinc-200">
              <td className="p-3 font-bold text-zinc-700">Model Number</td>
              {compareItems.map((item) => (
                <td key={item._id} className="p-3 text-zinc-900 font-semibold">
                  {item.modelNumber || 'N/A'}
                </td>
              ))}
            </tr>

            {/* SKU */}
            <tr className="divide-x divide-zinc-200">
              <td className="p-3 font-bold text-zinc-700">SKU Code</td>
              {compareItems.map((item) => (
                <td key={item._id} className="p-3 text-zinc-900">
                  {item.sku}
                </td>
              ))}
            </tr>

            {/* Stock Status */}
            <tr className="bg-zinc-50 divide-x divide-zinc-200">
              <td className="p-3 font-bold text-zinc-700">Stock Availability</td>
              {compareItems.map((item) => (
                <td key={item._id} className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.stockStatus} ({item.stock} in stock)
                  </span>
                </td>
              ))}
            </tr>

            {/* Material */}
            <tr className="divide-x divide-zinc-200">
              <td className="p-3 font-bold text-zinc-700">Material</td>
              {compareItems.map((item) => (
                <td key={item._id} className="p-3 text-zinc-800">
                  {item.material || 'Standard Industrial Grade'}
                </td>
              ))}
            </tr>

            {/* Weight */}
            <tr className="bg-zinc-50 divide-x divide-zinc-200">
              <td className="p-3 font-bold text-zinc-700">Weight</td>
              {compareItems.map((item) => (
                <td key={item._id} className="p-3 text-zinc-800">
                  {item.weight || 'N/A'}
                </td>
              ))}
            </tr>

            {/* Dynamic Technical Specifications */}
            {allSpecKeys.map((key) => (
              <tr key={key} className="divide-x divide-zinc-200">
                <td className="p-3 font-bold text-zinc-700">{key}</td>
                {compareItems.map((item) => {
                  const specObj = item.specifications?.find((s) => s.key === key);
                  return (
                    <td key={item._id} className="p-3 text-zinc-900">
                      {specObj ? specObj.value : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;
