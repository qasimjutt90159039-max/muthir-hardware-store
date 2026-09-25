import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { PageLoader } from '../components/common/LoadingSkeleton';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchBrands();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return <PageLoader text="Loading Catalog Brands..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="bg-[#111111] text-white p-8 rounded border-b-4 border-orange-500 mb-8 shadow-industrial">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-orange-400 font-bold uppercase">Store Brands</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-white mb-2">
          FEATURED <span className="text-orange-500">HARDWARE BRANDS</span>
        </h1>
        <p className="text-xs md:text-sm text-zinc-300 font-sans max-w-2xl leading-relaxed">
          Brands whose genuine models and specifications are currently inventoried or available upon customer request at Mutahir Hardware Store.
        </p>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((b) => (
          <Link
            key={b._id}
            to={`/shop?brand=${encodeURIComponent(b.name)}`}
            className="group bg-white border border-brand-border rounded p-6 flex flex-col justify-between hover:shadow-industrial hover:border-orange-500/60 transition-all duration-300"
          >
            <div>
              <div className="h-14 flex items-center justify-between mb-4 border-b border-zinc-100 pb-3">
                <span className="text-xl font-heading font-black text-brand-black group-hover:text-orange-600 transition-colors">
                  {b.name}
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono text-xs font-bold">
                  {b.productCount || 0} Tools
                </span>
              </div>

              <p className="text-xs text-zinc-600 font-sans leading-relaxed line-clamp-3">
                {b.description || `Browse quality tools and hardware equipment manufactured by ${b.name}.`}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono font-bold text-orange-600">
              <span>View Brand Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
