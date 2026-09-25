import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Search, RefreshCw } from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/common/ProductCard';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Filters from query params
  const currentCategory = searchParams.get('category') || 'all';
  const currentBrand = searchParams.get('brand') || '';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'featured';
  const currentAvailability = searchParams.get('availability') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';

  // Local filter states
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [minPriceInput, setMinPriceInput] = useState(currentMinPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(currentMaxPrice);

  // Fetch categories and brands metadata
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          api.get('/categories'),
          api.get('/brands'),
        ]);
        setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        setBrands(Array.isArray(brandRes.data) ? brandRes.data : []);
      } catch (err) {
        console.error('Failed to load filter metadata:', err);
      }
    };
    fetchMetadata();
  }, []);

  // Fetch products based on active params
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        params.set('pageSize', '12');

        const { data } = await api.get(`/products?${params.toString()}`);
        setProducts(Array.isArray(data?.products) ? data.products : []);
        setTotalPages(data?.pages || 1);
        setTotalProducts(data?.total || (Array.isArray(data?.products) ? data.products.length : 0));
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, page]);

  const updateFilters = (newParams) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([k, v]) => {
      if (v === '' || v === 'all' || v === null || v === undefined) {
        next.delete(k);
      } else {
        next.set(k, v);
      }
    });
    setPage(1);
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setMinPriceInput('');
    setMaxPriceInput('');
    setPage(1);
    setSearchParams({});
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({ search: searchInput.trim() });
  };

  const handlePriceApply = (e) => {
    e.preventDefault();
    updateFilters({ minPrice: minPriceInput, maxPrice: maxPriceInput });
  };

  const handleBrandToggle = (brandName) => {
    const selected = currentBrand ? currentBrand.split(',').filter(Boolean) : [];
    const index = selected.indexOf(brandName);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(brandName);
    }
    updateFilters({ brand: selected.join(',') });
  };

  const handleAvailabilityToggle = (status) => {
    const selected = currentAvailability ? currentAvailability.split(',').filter(Boolean) : [];
    const index = selected.indexOf(status);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(status);
    }
    updateFilters({ availability: selected.join(',') });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Breadcrumb & Title Bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <div className="text-xs font-mono text-zinc-500 uppercase">
            Store / Hardware Catalog
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
            HARDWARE & TOOL <span className="text-orange-600">CATALOG</span>
          </h1>
          <p className="text-xs font-mono text-zinc-500 mt-0.5">
            Showing {totalProducts} verified hardware items
          </p>
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 rounded bg-zinc-900 text-white font-mono text-xs uppercase"
          >
            <Filter className="w-4 h-4 text-orange-400" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-zinc-500 hidden sm:inline">Sort:</span>
            <select
              value={currentSort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="bg-white border border-brand-border rounded px-3 py-2 text-xs font-mono text-zinc-900 focus:outline-none focus:border-orange-500"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block space-y-6 bg-white p-5 rounded border border-brand-border sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-orange-500" />
              <span>Catalog Filters</span>
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-[11px] font-mono text-orange-600 hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1.5">
              Search Catalog
            </label>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Name, SKU, model..."
                className="w-full bg-zinc-50 border border-zinc-300 rounded px-3 py-1.5 text-xs text-zinc-900 pr-8 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-2 text-zinc-600 hover:text-orange-600"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Categories Filter */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-2">
              Categories
            </label>
            <div className="space-y-1 text-xs font-mono max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => updateFilters({ category: 'all' })}
                className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                  currentCategory === 'all'
                    ? 'bg-orange-500 text-zinc-950 font-bold'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => updateFilters({ category: cat.slug })}
                  className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center justify-between ${
                    currentCategory.toLowerCase() === cat.slug.toLowerCase()
                      ? 'bg-orange-500 text-zinc-950 font-bold'
                      : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-2">
              Brands
            </label>
            <div className="space-y-1.5 text-xs font-mono max-h-40 overflow-y-auto pr-1">
              {brands.map((b) => {
                const checked = currentBrand
                  .toLowerCase()
                  .split(',')
                  .includes(b.name.toLowerCase());
                return (
                  <label
                    key={b._id}
                    className="flex items-center gap-2 cursor-pointer text-zinc-700 hover:text-zinc-950"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleBrandToggle(b.name)}
                      className="rounded border-zinc-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span>{b.name}</span>
                    <span className="text-zinc-400 text-[10px]">({b.productCount || 0})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-2">
              Price Range (PKR)
            </label>
            <form onSubmit={handlePriceApply} className="space-y-2 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(e.target.value)}
                  className="bg-zinc-50 border border-zinc-300 rounded px-2 py-1.5 text-xs"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                  className="bg-zinc-50 border border-zinc-300 rounded px-2 py-1.5 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-zinc-900 hover:bg-orange-500 text-white hover:text-zinc-950 rounded uppercase font-bold text-[11px] transition-colors"
              >
                Apply Price
              </button>
            </form>
          </div>

          {/* Stock Availability */}
          <div className="border-t border-zinc-200 pt-4">
            <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-2">
              Stock Availability
            </label>
            <div className="space-y-1.5 text-xs font-mono">
              {['In Stock', 'Low Stock', 'Out of Stock'].map((status) => {
                const checked = currentAvailability.split(',').includes(status);
                return (
                  <label
                    key={status}
                    className="flex items-center gap-2 cursor-pointer text-zinc-700 hover:text-zinc-950"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleAvailabilityToggle(status)}
                      className="rounded border-zinc-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span>{status}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* PRODUCT GRID SECTION */}
        <div className="lg:col-span-3">
          {/* Active Filters Pill Bar */}
          {(currentSearch || currentBrand || currentCategory !== 'all' || currentAvailability || currentMinPrice || currentMaxPrice) && (
            <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-zinc-100 rounded text-xs font-mono">
              <span className="text-zinc-500 font-bold">Active Filters:</span>

              {currentSearch && (
                <span className="inline-flex items-center gap-1 bg-white border border-zinc-300 px-2 py-0.5 rounded">
                  Search: "{currentSearch}"
                  <button onClick={() => updateFilters({ search: '' })}><X className="w-3 h-3 text-red-500" /></button>
                </span>
              )}

              {currentCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-white border border-zinc-300 px-2 py-0.5 rounded">
                  Category: {currentCategory}
                  <button onClick={() => updateFilters({ category: 'all' })}><X className="w-3 h-3 text-red-500" /></button>
                </span>
              )}

              {currentBrand && (
                <span className="inline-flex items-center gap-1 bg-white border border-zinc-300 px-2 py-0.5 rounded">
                  Brand: {currentBrand}
                  <button onClick={() => updateFilters({ brand: '' })}><X className="w-3 h-3 text-red-500" /></button>
                </span>
              )}

              {currentAvailability && (
                <span className="inline-flex items-center gap-1 bg-white border border-zinc-300 px-2 py-0.5 rounded">
                  Stock: {currentAvailability}
                  <button onClick={() => updateFilters({ availability: '' })}><X className="w-3 h-3 text-red-500" /></button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-orange-600 hover:underline font-bold ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length === 0 ? (
            <EmptyState
              title="No Hardware Products Found"
              description="No tools match your current filter parameters. Try adjusting your category selection, price range, or search keywords."
              actionText="Reset All Filters"
              actionLink="/shop"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 pt-6 border-t border-zinc-200 flex items-center justify-between font-mono text-xs">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-4 py-2 rounded bg-zinc-900 text-white disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed"
                  >
                    &larr; Previous Page
                  </button>

                  <div className="text-zinc-600">
                    Page <span className="font-bold text-zinc-900">{page}</span> of{' '}
                    <span className="font-bold text-zinc-900">{totalPages}</span>
                  </div>

                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="px-4 py-2 rounded bg-zinc-900 text-white disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed"
                  >
                    Next Page &rarr;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
                <h3 className="font-heading font-bold text-sm uppercase">Catalog Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div className="mb-6">
                <label className="block text-xs font-mono font-bold uppercase mb-2">Category</label>
                <div className="space-y-1 text-xs font-mono">
                  <button
                    onClick={() => {
                      updateFilters({ category: 'all' });
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-zinc-100"
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c._id}
                      onClick={() => {
                        updateFilters({ category: c.slug });
                        setIsMobileFilterOpen(false);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-zinc-100"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 space-y-2">
              <button
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2 bg-zinc-200 text-zinc-800 rounded font-mono text-xs uppercase"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-2 bg-orange-500 text-zinc-950 font-bold rounded font-mono text-xs uppercase"
              >
                Apply & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
