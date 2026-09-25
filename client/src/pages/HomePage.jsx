import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Hammer,
  Zap,
  Droplets,
  Paintbrush,
  Shield,
  ArrowRight,
  Phone,
  MapPin,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Tag,
  Star,
  BookOpen,
} from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/common/ProductCard';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState({
    featured: [],
    powerTools: [],
    handTools: [],
    newArrivals: [],
    bestSellers: [],
  });
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const [catRes, colRes, guideRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products/home-collections'),
          api.get('/guides'),
        ]);

        setCategories(catRes.data);
        setCollections(colRes.data);
        setGuides(guideRes.data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const categoryIcons = {
    tools: Wrench,
    hardware: Hammer,
    electrical: Zap,
    plumbing: Droplets,
    paint: Paintbrush,
    safety: Shield,
  };

  return (
    <div className="flex flex-col space-y-12 md:space-y-16 pb-16">
      {/* SECTION 3: FULL-WIDTH TOOL HERO */}
      <section className="relative bg-[#111111] text-white overflow-hidden border-b-4 border-orange-500">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1920&q=80"
            alt="Hardware tools workshop background"
            className="w-full h-full object-cover filter contrast-125 brightness-75"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-500/20 border border-orange-500/40 text-orange-400 font-mono text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              MUTAHIR HARDWARE STORE • MULTAN
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white leading-none">
              BUILD. REPAIR. <span className="text-orange-500">CREATE.</span>
            </h1>

            <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed max-w-xl">
              Quality hardware, tools and workshop essentials for everyday projects and professional work.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/tools"
                className="px-6 py-3.5 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-orange-glow flex items-center gap-2"
              >
                <span>SHOP TOOLS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/hardware"
                className="px-6 py-3.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-mono font-bold text-xs uppercase tracking-wider transition-all hover:border-orange-500 flex items-center gap-2"
              >
                <span>EXPLORE HARDWARE</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-800 text-xs font-mono">
              <div>
                <div className="text-orange-400 font-bold text-lg">100% REAL</div>
                <div className="text-zinc-400">Technical Specs</div>
              </div>
              <div>
                <div className="text-orange-400 font-bold text-lg">MULTAN</div>
                <div className="text-zinc-400">Haqbaho Market</div>
              </div>
              <div>
                <div className="text-orange-400 font-bold text-lg">C.O.D.</div>
                <div className="text-zinc-400">Cash on Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-200 pb-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
              SHOP BY <span className="text-orange-600">CATEGORY</span>
            </h2>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              High-durability catalog organized for trade professionals and workshop needs
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-mono font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const IconComponent = categoryIcons[cat.slug] || Wrench;
            return (
              <Link
                key={cat._id}
                to={`/${cat.slug}`}
                className="group relative bg-white border border-brand-border rounded p-4 flex flex-col items-center text-center transition-all duration-300 hover:border-orange-500 hover:shadow-industrial"
              >
                <div className="w-14 h-14 rounded-full bg-[#f8f8f7] group-hover:bg-orange-500 text-zinc-800 group-hover:text-zinc-950 flex items-center justify-center mb-3 transition-colors">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xs font-heading font-bold text-brand-black uppercase group-hover:text-orange-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono mt-1">
                  {cat.subcategories?.length || 0} Subcategories
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: FEATURED TOOLS */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-500 rounded-sm"></span>
              <h2 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
                FEATURED <span className="text-orange-600">WORKSHOP TOOLS</span>
              </h2>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              Handpicked tools for high endurance and continuous operation
            </p>
          </div>
          <Link
            to="/shop?isFeatured=true"
            className="text-xs font-mono font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>See More</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {collections.featured.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 6: HARDWARE ESSENTIALS SPLIT SECTION */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Split Left: Fasteners & Security */}
          <div className="relative rounded overflow-hidden bg-[#161616] text-white p-8 border-l-4 border-orange-500 flex flex-col justify-between min-h-[300px]">
            <div className="relative z-10 max-w-md space-y-3">
              <span className="text-[11px] font-mono text-orange-400 font-bold tracking-widest uppercase">
                FASTENERS • LOCKS • HINGES
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                ARCHITECTURAL & STRUCTURAL HARDWARE
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Solid brass padlocks, 304 stainless steel ball-bearing hinges, hardened drywall screws, and industrial anchor bolts.
              </p>
            </div>
            <div className="relative z-10 pt-6">
              <Link
                to="/hardware"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow"
              >
                <span>Browse Hardware</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80"
                alt="Hardware fasteners"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Split Right: Plumbing & Electrical Essentials */}
          <div className="relative rounded overflow-hidden bg-[#161616] text-white p-8 border-l-4 border-orange-500 flex flex-col justify-between min-h-[300px]">
            <div className="relative z-10 max-w-md space-y-3">
              <span className="text-[11px] font-mono text-orange-400 font-bold tracking-widest uppercase">
                PLUMBING • ELECTRICAL • VALVES
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                CONTRACTOR SUPPLIES & INSTALLATION
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                99.99% pure electrolytic copper cables, heavy brass PN25 ball valves, pure PTFE teflon sealant tapes, and PVC accessories.
              </p>
            </div>
            <div className="relative z-10 pt-6">
              <Link
                to="/electrical"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white hover:bg-orange-500 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow"
              >
                <span>Browse Electrical</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
                alt="Electrical and plumbing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: POWER TOOLS SHOWCASE */}
      <section className="bg-[#161616] text-white py-12 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <h2 className="text-2xl md:text-3xl font-heading font-black text-white">
                  POWER TOOLS <span className="text-orange-500">SHOWCASE</span>
                </h2>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Rotary hammers, angle grinders, cordless impact drills, and cut-off tools
              </p>
            </div>
            <Link
              to="/power-tools"
              className="text-xs font-mono font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              <span>Explore All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {collections.powerTools.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: HAND TOOLS GRID */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Hammer className="w-5 h-5 text-orange-600" />
              <h2 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
                PRECISION <span className="text-orange-600">HAND TOOLS</span>
              </h2>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              Forged carbon steel hammers, water pump pliers, FatMax tapes, and magnetic screwdrivers
            </p>
          </div>
          <Link
            to="/hand-tools"
            className="text-xs font-mono font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>View All Hand Tools</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collections.handTools.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 9: INDUSTRIAL PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="rounded bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-orange-950/40 text-white p-6 md:p-10 border border-zinc-800 shadow-industrial-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="px-2.5 py-0.5 rounded bg-orange-500 text-zinc-950 font-mono text-[10px] font-black uppercase">
              WORKSHOP SAVINGS
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-black text-white">
              USE COUPON CODE: <span className="text-orange-400 font-mono">WELCOME10</span>
            </h3>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Get 10% instant discount on orders above PKR 2,000. Combine with free local delivery on qualifying orders above PKR 5,000.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/shop"
              className="w-full sm:w-auto text-center px-6 py-3 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow"
            >
              Shop Catalog Now
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto text-center px-6 py-3 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors border border-zinc-700"
            >
              Contact Counter
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10 & 11: BEST SELLERS & NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h2 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
                BEST SELLERS & <span className="text-orange-600">NEW ARRIVALS</span>
              </h2>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              Customer favorites and the latest addition to our catalog
            </p>
          </div>
          <Link
            to="/best-sellers"
            className="text-xs font-mono font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collections.bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 12: HARDWARE GUIDES TEASER */}
      <section className="bg-white py-12 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <h2 className="text-2xl md:text-3xl font-heading font-black text-brand-black">
                  TECHNICAL <span className="text-orange-600">HARDWARE GUIDES</span>
                </h2>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Educational articles on tool selection, screw sizing, and jobsite safety
              </p>
            </div>
            <Link
              to="/hardware-guides"
              className="text-xs font-mono font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>All 10 Guides</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((g) => (
              <Link
                key={g._id}
                to={`/hardware-guides/${g.slug}`}
                className="group border border-brand-border rounded overflow-hidden flex flex-col justify-between hover:shadow-industrial transition-all duration-300"
              >
                <div>
                  <div className="aspect-video w-full overflow-hidden bg-zinc-100">
                    <img
                      src={g.image}
                      alt={g.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1.5">
                      <span className="text-orange-600 font-bold uppercase">{g.category}</span>
                      <span>{g.readTime}</span>
                    </div>
                    <h3 className="text-sm font-bold text-brand-black group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                      {g.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed">
                      {g.summary}
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-[#f8f8f7] border-t border-brand-border flex items-center justify-between text-xs font-mono font-bold text-orange-600">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: VERIFIED STORE CONTACT & MULTAN LOCATION */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-[#111111] text-white rounded border border-zinc-800 p-6 md:p-10 shadow-industrial-lg grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono text-xs font-bold uppercase">
              VISIT OUR PHYSICAL STORE
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-white">
              MUTAHIR HARDWARE STORE
            </h2>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              We operate an established walk-in hardware counter in Multan. Tradesmen, plumbers, electricians, and contractors are welcome to inspect tools, review specifications, and place wholesale inquiries in person.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white uppercase">Store Address:</div>
                  <div className="text-zinc-400">
                    Haqbaho Market, Vehari Chowk, Peoples Colony, Multan, Punjab, Pakistan
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white uppercase">Direct Phone Hotline:</div>
                  <a
                    href="tel:+923086236092"
                    className="text-orange-400 hover:underline font-bold text-sm"
                  >
                    +92 308 6236092
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href="tel:+923086236092"
                className="px-5 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store Now</span>
              </a>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors border border-zinc-700"
              >
                Send Message / Inquiry
              </Link>
            </div>
          </div>

          {/* Location Map Visual / Card */}
          <div className="rounded overflow-hidden border border-zinc-700 bg-[#1A1A1A] p-4 text-center">
            <div className="relative aspect-video w-full rounded overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <iframe
                title="Mutahir Hardware Store Location Multan"
                src="https://maps.google.com/maps?q=Vehari%20Chowk,%20Multan,%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter invert contrast-125 opacity-80"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="mt-3 text-[11px] font-mono text-zinc-400 flex items-center justify-between px-1">
              <span>Haqbaho Market, Vehari Chowk Multan</span>
              <span className="text-orange-400 font-bold">Counter Pickup Ready</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
