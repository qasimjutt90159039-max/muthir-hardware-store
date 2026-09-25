import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Repeat, Eye, Star, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import DemoPriceBadge from './DemoPriceBadge';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();

  const isFavorite = isInWishlist(product._id);
  const isCompared = isInCompare(product._id);
  const isOutOfStock = product.stock <= 0 || product.stockStatus === 'Out of Stock';

  const handleCompareToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product._id);
    } else {
      addToCompare(product);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80';

  return (
    <>
      <div className="group relative bg-white border border-brand-border rounded overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-industrial-lg hover:border-orange-500/60">
        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-start justify-between pointer-events-none">
          <div className="flex flex-col gap-1">
            {product.salePrice && (
              <span className="bg-orange-500 text-zinc-950 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded shadow">
                SALE
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-zinc-900 text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded shadow border border-zinc-700">
                FEATURED
              </span>
            )}
            {product.isNew && (
              <span className="bg-blue-600 text-white text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded shadow">
                NEW
              </span>
            )}
          </div>

          {/* Stock Status Pill */}
          <div className="pointer-events-auto">
            <span
              className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border shadow-sm ${
                isOutOfStock
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : product.stockStatus === 'Low Stock'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
            >
              {product.stockStatus || (product.stock > 0 ? 'In Stock' : 'Out of Stock')}
            </span>
          </div>
        </div>

        {/* Product Image & Quick Action Overlay */}
        <div className="relative aspect-square w-full bg-[#f8f8f7] overflow-hidden flex items-center justify-center p-4">
          <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
            <img
              src={primaryImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </Link>

          {/* Floating Action Buttons */}
          <div className="absolute right-2.5 top-12 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
            <button
              onClick={handleWishlistToggle}
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                isFavorite
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-zinc-700 hover:bg-orange-500 hover:text-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={handleCompareToggle}
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                isCompared
                  ? 'bg-zinc-900 text-orange-400'
                  : 'bg-white text-zinc-700 hover:bg-zinc-900 hover:text-white'
              }`}
              title="Compare Specifications"
            >
              <Repeat className="w-4 h-4" />
            </button>
            <button
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full bg-white text-zinc-700 hover:bg-orange-500 hover:text-white flex items-center justify-center shadow-md transition-colors"
              title="Quick Technical View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Content Details */}
        <div className="p-4 flex flex-col flex-1 justify-between bg-white border-t border-brand-border">
          <div>
            {/* Brand & Model */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
              <span className="font-bold text-orange-600 uppercase tracking-wider">{product.brand}</span>
              {product.modelNumber && (
                <span className="text-[11px] bg-zinc-100 px-1.5 py-0.2 rounded border border-zinc-200">
                  {product.modelNumber}
                </span>
              )}
            </div>

            {/* Product Title */}
            <Link to={`/product/${product.slug}`}>
              <h3 className="text-sm font-bold text-brand-black line-clamp-2 hover:text-orange-600 transition-colors leading-snug">
                {product.name}
              </h3>
            </Link>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Rating Stars & SKU */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-dashed border-zinc-200 text-xs">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-zinc-800 text-[11px] font-mono">
                  {product.rating > 0 ? product.rating.toFixed(1) : '4.8'}
                </span>
                <span className="text-zinc-400 text-[10px] font-mono">
                  ({product.reviewCount || 0})
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                SKU: {product.sku}
              </span>
            </div>
          </div>

          {/* Pricing & Add to Cart Action */}
          <div className="mt-3 pt-3 border-t border-brand-border">
            <div className="mb-2">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-mono font-extrabold text-brand-black">
                  PKR {(product.salePrice || product.price).toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-xs font-mono text-zinc-400 line-through">
                    PKR {product.price.toLocaleString()}
                  </span>
                )}
              </div>
              <DemoPriceBadge size="xs" className="mt-1" />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-2.5 px-3 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isOutOfStock
                  ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-300'
                  : 'bg-zinc-900 hover:bg-orange-500 text-white hover:text-zinc-950 border border-zinc-800'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
