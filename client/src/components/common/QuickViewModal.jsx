import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Repeat, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import DemoPriceBadge from './DemoPriceBadge';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  if (!isOpen || !product) return null;

  const isFavorite = isInWishlist(product._id);
  const isCompared = isInCompare(product._id);
  const isOutOfStock = product.stock <= 0 || product.stockStatus === 'Out of Stock';

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
      onClose();
    }
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-zinc-700 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-zinc-900/80 text-white hover:bg-orange-500 hover:text-zinc-950 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 bg-[#f8f8f7] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200">
          <div className="relative aspect-square w-full max-w-sm flex items-center justify-center p-4">
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded border p-1 bg-white flex-shrink-0 ${
                    activeImageIndex === idx ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-zinc-300'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Technical Specs & Add to Cart */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Brand & Stock */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-600">
                {product.brand}
              </span>
              <span
                className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                  isOutOfStock
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                {product.stockStatus || (product.stock > 0 ? 'In Stock' : 'Out of Stock')}
              </span>
            </div>

            <h2 className="text-lg font-bold text-zinc-900 leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 mt-1 pb-3 border-b border-zinc-200">
              <span>SKU: {product.sku}</span>
              {product.modelNumber && <span>• Model: {product.modelNumber}</span>}
              <span>• Cat: {product.category}</span>
            </div>

            {/* Pricing */}
            <div className="my-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-extrabold text-zinc-950">
                  PKR {(product.salePrice || product.price).toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-sm font-mono text-zinc-400 line-through">
                    PKR {product.price.toLocaleString()}
                  </span>
                )}
              </div>
              <DemoPriceBadge size="xs" className="mt-1" />
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-600 leading-relaxed mb-4">
              {product.description || product.shortDescription}
            </p>

            {/* Technical Specifications Highlights */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-mono font-bold uppercase text-zinc-800 mb-2">
                  Technical Specifications:
                </div>
                <div className="bg-zinc-50 border border-zinc-200 rounded p-2.5 text-xs font-mono space-y-1">
                  {product.specifications.slice(0, 4).map((spec, i) => (
                    <div key={i} className="flex justify-between border-b border-zinc-200/60 pb-1 last:border-none last:pb-0">
                      <span className="text-zinc-500">{spec.key}:</span>
                      <span className="font-semibold text-zinc-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-zinc-200 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-zinc-300 rounded font-mono text-sm bg-zinc-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-zinc-700 hover:bg-zinc-200"
                  disabled={isOutOfStock}
                >
                  -
                </button>
                <span className="px-3 py-2 font-bold min-w-[36px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 text-zinc-700 hover:bg-zinc-200"
                  disabled={isOutOfStock || quantity >= product.stock}
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-2.5 px-4 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-zinc-950 shadow-md'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <button
                onClick={() => toggleWishlist(product)}
                className="flex items-center gap-1.5 text-zinc-600 hover:text-orange-600"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'text-orange-500 fill-current' : ''}`} />
                <span>{isFavorite ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={() => isCompared ? removeFromCompare(product._id) : addToCompare(product)}
                className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-950"
              >
                <Repeat className="w-4 h-4" />
                <span>{isCompared ? 'Comparing' : 'Compare Tool'}</span>
              </button>

              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-1 text-orange-600 font-bold hover:underline"
              >
                <span>Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
