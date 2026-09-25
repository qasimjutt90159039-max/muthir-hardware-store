import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  Repeat,
  ShieldCheck,
  Star,
  CheckCircle,
  Truck,
  RotateCcw,
  AlertTriangle,
  Package,
  Layers,
  FileText,
  MessageSquare,
  Wrench,
  ChevronRight,
  Phone,
} from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import DemoPriceBadge from '../components/common/DemoPriceBadge';
import ProductCard from '../components/common/ProductCard';
import { PageLoader } from '../components/common/LoadingSkeleton';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [loading, setLoading] = useState(true);

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare, removeFromCompare } = useCompare();
  const { user } = useAuth();
  const { success, warning, error: toastError } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/slug/${slug}`);
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
        setSelectedImage(0);

        // Fetch verified reviews for this product
        const revRes = await api.get(`/reviews/product/${data.product._id}`);
        setReviews(revRes.data);
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return <PageLoader text="Loading Hardware Specifications..." />;
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-heading font-black mb-4">Product Not Found</h2>
        <p className="text-sm text-zinc-500 mb-6">The hardware tool you are looking for is not listed or has been archived.</p>
        <Link to="/shop" className="px-6 py-2.5 bg-orange-500 text-zinc-950 font-mono font-bold rounded">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product._id);
  const isCompared = isInCompare(product._id);
  const isOutOfStock = product.stock <= 0 || product.stockStatus === 'Out of Stock';

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toastError('Please log in with your customer account to submit a verified purchase review.');
      return;
    }

    try {
      setSubmittingReview(true);
      await api.post('/reviews', {
        productId: product._id,
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
      });

      success('Review submitted! It will appear after moderation verification.');
      setReviewComment('');
      setReviewTitle('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit review.';
      toastError(msg);
    } finally {
      setSubmittingReview(false);
    }
  };

  const images = product.images?.length
    ? product.images
    : ['https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Bar */}
      <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-orange-600">Catalog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-orange-600">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-900 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Container */}
      <div className="bg-white border border-brand-border rounded shadow-sm p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Product Images & Gallery */}
        <div className="flex flex-col items-center">
          <div className="relative aspect-square w-full max-w-md bg-[#f8f8f7] border border-zinc-200 rounded p-6 flex items-center justify-center overflow-hidden">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
            <div className="absolute top-3 left-3">
              <span
                className={`text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded border shadow-sm ${
                  isOutOfStock
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                {product.stockStatus}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded border p-1 bg-white transition-all ${
                    selectedImage === idx
                      ? 'border-orange-500 ring-2 ring-orange-500/30'
                      : 'border-zinc-300 hover:border-zinc-400'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Technical Summary & Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            {/* Brand, Model & SKU */}
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-orange-600 font-bold uppercase text-sm tracking-wider">
                {product.brand}
              </span>
              <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded border border-zinc-200">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-heading font-black text-brand-black leading-tight">
              {product.name}
            </h1>

            {product.modelNumber && (
              <div className="text-xs font-mono text-zinc-500 mt-1">
                Model: <span className="font-semibold text-zinc-800">{product.modelNumber}</span>
              </div>
            )}

            {/* Ratings Bar */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-zinc-100 text-xs font-mono">
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating || 5) ? 'fill-current' : 'text-zinc-300'
                    }`}
                  />
                ))}
                <span className="ml-1.5 font-bold text-zinc-900">{product.rating || 5.0}</span>
              </div>
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-500">
                {reviews.length} Verified Customer Review{reviews.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Price Box */}
            <div className="my-5 p-4 rounded bg-[#f8f8f7] border border-zinc-200">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-mono font-black text-zinc-950">
                  PKR {(product.salePrice || product.price).toLocaleString()}
                </span>
                {product.salePrice && (
                  <span className="text-sm font-mono text-zinc-400 line-through">
                    PKR {product.price.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="mt-2">
                <DemoPriceBadge size="sm" />
              </div>
              <p className="text-[11px] text-zinc-500 font-mono mt-2">
                Pay via Cash on Delivery upon delivery or in-store inspection at Haqbaho Market, Multan.
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs text-zinc-600 leading-relaxed font-sans mb-6">
              {product.description || product.shortDescription}
            </p>

            {/* Quantity & Stock Check */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-zinc-300 rounded font-mono text-sm bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-zinc-700 hover:bg-zinc-100"
                  disabled={isOutOfStock}
                >
                  -
                </button>
                <span className="px-4 py-2 font-bold min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3.5 py-2 text-zinc-700 hover:bg-zinc-100"
                  disabled={isOutOfStock || quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <div className="text-xs font-mono">
                {product.stock > 0 ? (
                  <span className="text-emerald-700 font-bold">
                    {product.stock} units currently in store
                  </span>
                ) : (
                  <span className="text-red-600 font-bold">Currently Out of Stock</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`py-3 px-4 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-300'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-900 shadow'
                }`}
              >
                <ShoppingCart className="w-4 h-4 text-orange-400" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`py-3 px-4 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isOutOfStock
                    ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-zinc-950 shadow-orange-glow'
                }`}
              >
                <span>Buy Now (COD)</span>
              </button>
            </div>

            {/* Wishlist & Compare Buttons */}
            <div className="flex items-center gap-4 text-xs font-mono pt-3 border-t border-zinc-200">
              <button
                onClick={() => toggleWishlist(product)}
                className="flex items-center gap-1.5 text-zinc-600 hover:text-orange-600"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'text-orange-500 fill-current' : ''}`} />
                <span>{isFavorite ? 'Saved to Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={() => (isCompared ? removeFromCompare(product._id) : addToCompare(product))}
                className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-950"
              >
                <Repeat className="w-4 h-4" />
                <span>{isCompared ? 'In Compare Tray' : 'Compare Tool'}</span>
              </button>
            </div>
          </div>

          {/* Quick Confidence Strip */}
          <div className="bg-[#f8f8f7] border border-zinc-200 rounded p-3 text-xs font-mono text-zinc-600 space-y-1.5">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-500" />
              <span>Multan dispatch: Free delivery on orders over PKR 5,000</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              <span>Questions? Call our counter: +92 308 6236092</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: TABS (Specifications, Features, Package Contents, Reviews) */}
      <div className="mt-12 bg-white border border-brand-border rounded shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex flex-wrap border-b border-zinc-200 bg-[#161616] text-zinc-300 font-mono text-xs uppercase font-bold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3.5 px-6 transition-colors ${
              activeTab === 'specs'
                ? 'bg-orange-500 text-zinc-950 border-b-2 border-orange-600'
                : 'hover:text-white'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`py-3.5 px-6 transition-colors ${
              activeTab === 'features'
                ? 'bg-orange-500 text-zinc-950 border-b-2 border-orange-600'
                : 'hover:text-white'
            }`}
          >
            Features & Material
          </button>
          <button
            onClick={() => setActiveTab('contents')}
            className={`py-3.5 px-6 transition-colors ${
              activeTab === 'contents'
                ? 'bg-orange-500 text-zinc-950 border-b-2 border-orange-600'
                : 'hover:text-white'
            }`}
          >
            Package Contents
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 px-6 transition-colors ${
              activeTab === 'reviews'
                ? 'bg-orange-500 text-zinc-950 border-b-2 border-orange-600'
                : 'hover:text-white'
            }`}
          >
            Customer Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 md:p-8">
          {/* TAB 1: SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div>
              <h3 className="text-base font-heading font-bold text-zinc-900 uppercase mb-4">
                Full Specification Sheet
              </h3>
              {product.specifications && product.specifications.length > 0 ? (
                <div className="border border-zinc-200 rounded overflow-hidden">
                  <table className="w-full text-xs font-mono divide-y divide-zinc-200">
                    <tbody className="divide-y divide-zinc-100">
                      {product.specifications.map((spec, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}>
                          <td className="py-2.5 px-4 font-bold text-zinc-700 w-1/3 border-r border-zinc-200">
                            {spec.key}
                          </td>
                          <td className="py-2.5 px-4 text-zinc-900">{spec.value}</td>
                        </tr>
                      ))}
                      {product.weight && (
                        <tr className="bg-zinc-50">
                          <td className="py-2.5 px-4 font-bold text-zinc-700 border-r border-zinc-200">Weight</td>
                          <td className="py-2.5 px-4 text-zinc-900">{product.weight}</td>
                        </tr>
                      )}
                      {product.dimensions && (
                        <tr className="bg-white">
                          <td className="py-2.5 px-4 font-bold text-zinc-700 border-r border-zinc-200">Dimensions</td>
                          <td className="py-2.5 px-4 text-zinc-900">{product.dimensions}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-zinc-500 font-mono">
                  Standard specifications for this tool are available upon phone inquiry.
                </p>
              )}
            </div>
          )}

          {/* TAB 2: FEATURES & MATERIAL */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-base font-heading font-bold text-zinc-900 uppercase mb-3">
                    Key Performance Features
                  </h3>
                  <ul className="space-y-2 text-xs font-sans text-zinc-700">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.material && (
                <div>
                  <h3 className="text-base font-heading font-bold text-zinc-900 uppercase mb-2">
                    Construction Material
                  </h3>
                  <p className="text-xs text-zinc-700 font-mono bg-zinc-50 p-3 rounded border border-zinc-200">
                    {product.material}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PACKAGE CONTENTS */}
          {activeTab === 'contents' && (
            <div>
              <h3 className="text-base font-heading font-bold text-zinc-900 uppercase mb-3">
                Items Included in Package
              </h3>
              {product.packageContents && product.packageContents.length > 0 ? (
                <ul className="space-y-2 text-xs font-mono text-zinc-700 bg-zinc-50 p-4 rounded border border-zinc-200">
                  {product.packageContents.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-orange-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-zinc-500 font-mono">
                  1x {product.name} (standard packaging)
                </p>
              )}
            </div>
          )}

          {/* TAB 4: VERIFIED CUSTOMER REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-base font-heading font-bold text-zinc-900 uppercase mb-2">
                  Verified Purchaser Reviews
                </h3>
                <p className="text-xs text-zinc-500 font-mono mb-4">
                  In strict compliance with store policy, only authenticated customers who purchased this item through our platform can leave verified reviews.
                </p>

                {reviews.length === 0 ? (
                  <div className="p-6 bg-zinc-50 rounded border border-zinc-200 text-center text-xs font-mono text-zinc-500">
                    No verified reviews have been submitted for this hardware tool yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((rev) => (
                      <div key={rev._id} className="p-4 rounded border border-zinc-200 bg-zinc-50/50">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-zinc-900 font-mono">{rev.userName}</span>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.2 rounded font-bold">
                              Verified Purchase
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-400 font-mono">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-amber-500 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-zinc-300'}`}
                            />
                          ))}
                        </div>
                        {rev.title && <div className="text-xs font-bold text-zinc-900 mb-1">{rev.title}</div>}
                        <p className="text-xs text-zinc-700 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Review Form */}
              <div className="p-6 rounded bg-[#161616] text-white border border-zinc-800">
                <h4 className="text-sm font-heading font-bold uppercase tracking-wider text-orange-400 mb-2">
                  Submit a Verified Review
                </h4>
                <p className="text-xs text-zinc-400 mb-4 font-sans">
                  Have you purchased this tool? Share your feedback regarding performance, build quality, and durability.
                </p>

                {user ? (
                  <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                        Rating:
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="bg-[#111111] border border-zinc-700 rounded px-3 py-1.5 text-xs text-zinc-100 font-mono focus:outline-none focus:border-orange-500"
                      >
                        <option value="5">5 Stars - Outstanding Quality</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Average</option>
                        <option value="2">2 Stars - Below Expectations</option>
                        <option value="1">1 Star - Unsatisfactory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                        Review Title (Optional):
                      </label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Excellent motor torque on site"
                        className="w-full bg-[#111111] border border-zinc-700 rounded px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-zinc-300 mb-1">
                        Your Detailed Comments:
                      </label>
                      <textarea
                        rows="3"
                        required
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Describe how the tool performs in daily workshop tasks..."
                        className="w-full bg-[#111111] border border-zinc-700 rounded px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="px-5 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      {submittingReview ? 'Verifying Purchase...' : 'Submit Verified Review'}
                    </button>
                  </form>
                ) : (
                  <div className="text-xs font-mono text-zinc-400">
                    Please{' '}
                    <Link to="/login" className="text-orange-400 underline font-bold">
                      Log In
                    </Link>{' '}
                    to leave a verified purchase review.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6 border-b-2 border-zinc-200 pb-3">
            <h2 className="text-xl font-heading font-black text-brand-black">
              SIMILAR <span className="text-orange-600">WORKSHOP TOOLS</span>
            </h2>
            <Link to={`/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-xs font-mono font-bold text-orange-600 hover:underline">
              View Category &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
