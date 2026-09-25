import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import DemoPriceBadge from '../components/common/DemoPriceBadge';
import EmptyState from '../components/common/EmptyState';

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save tools and hardware equipment you are planning to purchase for upcoming projects."
          actionText="Explore Hardware Catalog"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 border-b-2 border-zinc-200 pb-4">
        <h1 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
          MY SAVED <span className="text-orange-600">WISHLIST</span>
        </h1>
        <p className="text-xs font-mono text-zinc-500 mt-0.5">
          {wishlist.length} saved tool items
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const isOutOfStock = product.stock <= 0 || product.stockStatus === 'Out of Stock';
          return (
            <div
              key={product._id}
              className="bg-white border border-brand-border rounded overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-industrial transition-shadow"
            >
              <div>
                <div className="relative aspect-square w-full bg-[#f8f8f7] p-4 flex items-center justify-center">
                  <img
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80'}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white text-zinc-400 hover:text-red-500 shadow"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="text-xs font-mono text-orange-600 font-bold uppercase mb-1">
                    {product.brand}
                  </div>
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="text-xs font-bold text-zinc-900 line-clamp-2 hover:text-orange-600 leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-2 text-sm font-mono font-bold text-zinc-950">
                    PKR {(product.salePrice || product.price).toLocaleString()}
                  </div>
                  <DemoPriceBadge size="xs" className="mt-1" />
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => addToCart(product, 1)}
                  disabled={isOutOfStock}
                  className="w-full py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-200 disabled:text-zinc-400 text-zinc-950 font-mono text-xs font-bold uppercase rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{isOutOfStock ? 'Out of Stock' : 'Move to Cart'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;
