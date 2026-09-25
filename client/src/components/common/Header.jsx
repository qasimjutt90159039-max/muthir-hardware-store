import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Wrench,
  Search,
  ShoppingCart,
  Heart,
  Repeat,
  User,
  Menu,
  X,
  Phone,
  MapPin,
  ShieldCheck,
  ChevronDown,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();
  const { user, isAdmin, logout } = useAuth();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowSuggestions(false);
  }, [location.pathname]);

  // Live search debouncing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        const { data } = await api.get(`/products/suggestions?q=${encodeURIComponent(searchQuery.trim())}`);
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Search suggestion error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle outside click for search suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Tools', path: '/tools' },
    { label: 'Hardware', path: '/hardware' },
    { label: 'Electrical', path: '/electrical' },
    { label: 'Plumbing', path: '/plumbing' },
    { label: 'Paint', path: '/paint' },
    { label: 'Safety', path: '/safety' },
    { label: 'Guides', path: '/hardware-guides' },
    { label: 'Brands', path: '/brands' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-industrial">
      {/* 1. Top Industrial Announcement Bar */}
      <div className="bg-[#111111] text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="font-semibold text-white tracking-wider">
              HARDWARE • TOOLS • WORKSHOP ESSENTIALS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Haqbaho Market, Vehari Chowk, Multan</span>
            </div>
            <a
              href="tel:+923086236092"
              className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+92 308 6236092</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="bg-[#1A1A1A] text-white py-3.5 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded bg-orange-500 flex items-center justify-center text-zinc-950 font-black shadow-orange-glow group-hover:bg-orange-600 transition-colors">
              <Wrench className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-heading font-extrabold tracking-tight text-white flex items-center gap-1">
                MUTAHIR <span className="text-orange-500">HARDWARE</span>
              </div>
              <div className="text-[10px] tracking-widest text-zinc-400 font-mono -mt-1">
                STORE • TOOLS • SUPPLIES
              </div>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-xl mx-6 relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                placeholder="Search drills, angle grinders, screws, valves, cables, SKU..."
                className="w-full bg-[#111111] text-zinc-100 placeholder-zinc-500 pl-4 pr-11 py-2.5 rounded border border-zinc-700 focus:outline-none focus:border-orange-500 text-sm font-sans transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-orange-500 hover:bg-orange-600 text-zinc-950 rounded flex items-center justify-center transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4 font-bold" />
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-1.5 bg-[#111111] border border-zinc-700 rounded shadow-industrial-lg z-50 overflow-hidden divide-y divide-zinc-800">
                <div className="px-3 py-1.5 text-[11px] font-mono uppercase text-zinc-400 bg-[#161616]">
                  Matching Catalog Products
                </div>
                {suggestions.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item.slug}`}
                    onClick={() => setShowSuggestions(false)}
                    className="flex items-center gap-3 p-2.5 hover:bg-zinc-800/60 transition-colors"
                  >
                    <img
                      src={item.images?.[0] || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=100&q=80'}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded bg-zinc-900 border border-zinc-700 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-zinc-200 truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        Brand: {item.brand} • SKU: {item.sku}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-orange-400">
                        PKR {item.price?.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        {item.stockStatus}
                      </div>
                    </div>
                  </Link>
                ))}
                <Link
                  to={`/shop?search=${encodeURIComponent(searchQuery)}`}
                  onClick={() => setShowSuggestions(false)}
                  className="block text-center py-2 text-xs font-bold text-orange-400 hover:text-orange-300 bg-[#161616] hover:bg-zinc-800 transition-colors"
                >
                  View All Search Results &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions (Right Icons) */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Compare */}
            <Link
              to="/compare"
              className="relative p-2 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Product Comparison"
            >
              <Repeat className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-zinc-950 text-[10px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-zinc-950 text-[10px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3 py-2 bg-[#111111] hover:bg-zinc-900 border border-zinc-700 hover:border-orange-500/60 rounded text-zinc-200 transition-all group"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-orange-500 group-hover:scale-105 transition-transform" />
              <div className="hidden sm:block text-left text-xs font-mono">
                <span className="text-zinc-400 block -mb-1">Cart</span>
                <span className="font-bold text-white">{totalItemCount} Items</span>
              </div>
              {totalItemCount > 0 && (
                <span className="sm:hidden absolute -top-1.5 -right-1.5 bg-orange-500 text-zinc-950 text-[10px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </Link>

            {/* Account / Admin Button */}
            {user ? (
              <div className="relative group">
                <Link
                  to={isAdmin ? '/admin' : '/account'}
                  className="flex items-center gap-2 p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                >
                  <User className="w-4 h-4 text-orange-400" />
                  <span className="hidden md:inline font-mono">
                    {isAdmin ? 'ADMIN' : user.name.split(' ')[0]}
                  </span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-[#111111] text-zinc-300 border-b border-zinc-800 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono tracking-wider uppercase font-semibold">
          <div className="flex items-center divide-x divide-zinc-800">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-3 px-4 transition-colors hover:text-orange-400 ${
                    isActive ? 'text-orange-500 bg-[#181818] border-b-2 border-orange-500' : 'text-zinc-300'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 py-2">
            <Link
              to="/deals"
              className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1"
            >
              <span className="bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded text-[10px]">PROMO</span>
              Special Offers
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="bg-orange-600 hover:bg-orange-500 text-white px-2.5 py-1 rounded text-[11px] font-bold"
              >
                Admin Suite
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 4. Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#161616] text-white border-b border-zinc-800 px-4 py-4 animate-slide-down">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, hardware..."
                className="w-full bg-[#111111] text-zinc-100 placeholder-zinc-500 pl-3 pr-10 py-2 rounded border border-zinc-700 text-sm"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-orange-500 text-zinc-950 rounded"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono uppercase pb-3 border-b border-zinc-800">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="p-2 rounded hover:bg-zinc-800 text-zinc-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={isAdmin ? '/admin' : '/account'}
                  className="flex items-center justify-between p-2 rounded bg-zinc-800 text-sm font-medium"
                >
                  <span>My Account ({user.name})</span>
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="p-2 rounded bg-orange-600 text-white text-sm font-bold text-center"
                  >
                    Go to Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-left p-2 text-zinc-400 hover:text-white text-xs"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="text-center py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-center py-2 rounded bg-orange-500 hover:bg-orange-600 text-zinc-950 text-xs font-bold uppercase"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
