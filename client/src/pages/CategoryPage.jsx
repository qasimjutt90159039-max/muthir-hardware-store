import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Wrench, ChevronRight, SlidersHorizontal } from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/common/ProductCard';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

const categoryMetaMap = {
  '/tools': { title: 'Tools & Workshop Equipment', category: 'Tools', desc: 'Power tools, hand tools, cutting discs, and workshop machinery.' },
  '/hand-tools': { title: 'Precision Hand Tools', subcategory: 'Hand Tools', desc: 'Drop-forged hammers, pliers, magnetic screwdrivers, spanners, and utility knives.' },
  '/power-tools': { title: 'Industrial Power Tools', subcategory: 'Power Tools', desc: 'Heavy duty impact drills, angle grinders, circular saws, and rotary tools.' },
  '/hardware': { title: 'Hardware, Fasteners & Locks', category: 'Hardware', desc: 'Screws, nuts, bolts, anchors, hinges, latches, and solid brass padlocks.' },
  '/electrical': { title: 'Electrical & Cables', category: 'Electrical', desc: 'Pure copper cables, switches, sockets, connectors, and insulating tapes.' },
  '/plumbing': { title: 'Plumbing & Valves', category: 'Plumbing', desc: 'Brass ball valves, Teflon PTFE tapes, pipes, and precision connectors.' },
  '/paint': { title: 'Paint & Surface Accessories', category: 'Paint & Accessories', desc: 'Natural bristle paint brushes, abrasives, WD-40 lubricants, and masking tapes.' },
  '/safety': { title: 'Safety Gear & PPE', category: 'Safety', desc: 'ANSI rated safety goggles, heavy split cowhide welding gloves, and helmets.' },
  '/new-arrivals': { title: 'New Hardware Arrivals', filter: 'isNew=true', desc: 'The newest additions to our Mutahir Hardware Store catalog.' },
  '/best-sellers': { title: 'Best Selling Hardware & Tools', filter: 'isBestSeller=true', desc: 'The most popular trade supplies and trusted craftsman essentials.' },
  '/deals': { title: 'Workshop Special Offers', filter: 'deals=true', desc: 'Special promotions and value packages for tradesmen and contractors.' },
};

const CategoryPage = () => {
  const location = useLocation();
  const meta = categoryMetaMap[location.pathname] || {
    title: 'Hardware Catalog',
    category: 'Tools',
    desc: 'Browse quality hardware and tools from Mutahir Hardware Store.',
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        let url = '/products?pageSize=20';

        if (meta.category) {
          url += `&category=${encodeURIComponent(meta.category)}`;
        }
        if (meta.subcategory) {
          url += `&subcategory=${encodeURIComponent(meta.subcategory)}`;
        }
        if (meta.filter) {
          url += `&${meta.filter}`;
        }

        const { data } = await api.get(url);
        setProducts(data.products);
      } catch (err) {
        console.error('Failed to load category products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Header Banner */}
      <div className="bg-[#111111] text-white p-6 md:p-8 rounded border-b-4 border-orange-500 mb-8 shadow-industrial">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-orange-400 font-bold uppercase">{meta.title}</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-heading font-black tracking-tight text-white mb-2">
          {meta.title}
        </h1>
        <p className="text-xs md:text-sm text-zinc-300 font-sans max-w-2xl leading-relaxed">
          {meta.desc}
        </p>
      </div>

      {/* Product List */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-200">
          <span className="text-xs font-mono text-zinc-600 font-bold uppercase">
            Showing {products.length} Products
          </span>
          <Link to="/shop" className="text-xs font-mono text-orange-600 hover:underline font-bold">
            Full Catalog Filters &rarr;
          </Link>
        </div>

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : products.length === 0 ? (
          <EmptyState
            title="No Items Currently in this Category"
            description="Our inventory updates continuously. Please contact our Multan shop directly to inquire about incoming batches."
            actionText="Browse All Shop Tools"
            actionLink="/shop"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
