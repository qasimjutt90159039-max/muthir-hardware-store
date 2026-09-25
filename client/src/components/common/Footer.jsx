import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Phone, MapPin, ShieldCheck, Truck, Clock, AlertCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-zinc-300 border-t-2 border-orange-500">
      {/* 1. Value Badges Bar */}
      <div className="border-b border-zinc-800 bg-[#161616] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm font-sans">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-white uppercase text-xs tracking-wider">
                Industrial Durability
              </div>
              <div className="text-xs text-zinc-400">Real verified hardware specifications</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-white uppercase text-xs tracking-wider">
                Local Multan Counter
              </div>
              <div className="text-xs text-zinc-400">Direct pickup at Haqbaho Market</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-white uppercase text-xs tracking-wider">
                Cash On Delivery
              </div>
              <div className="text-xs text-zinc-400">Pay securely upon package inspection</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-bold text-white uppercase text-xs tracking-wider">
                Direct Phone Hotline
              </div>
              <a href="tel:+923086236092" className="text-xs text-orange-400 hover:underline font-mono font-bold">
                +92 308 6236092
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Business Identity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-orange-500 flex items-center justify-center text-zinc-950 font-black">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="text-xl font-heading font-extrabold text-white">
              MUTAHIR <span className="text-orange-500">HARDWARE</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
            Professional hardware shop and tool marketplace serving homeowners, master craftsmen, contractors, and industrial workshops across Multan and Southern Punjab.
          </p>

          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <span>Haqbaho Market, Vehari Chowk, Peoples Colony, Multan, Punjab, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <a href="tel:+923086236092" className="text-white hover:text-orange-400 font-bold">
                +92 308 6236092
              </a>
            </div>
          </div>

          <div className="p-3 rounded bg-[#1A1A1A] border border-amber-600/30 text-amber-400 text-[11px] leading-tight">
            <strong>NOTICE:</strong> All catalog prices are labeled as development demo figures until verified with daily wholesale market rates.
          </div>
        </div>

        {/* SHOP Links */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-4">
            Shop Catalog
          </h3>
          <ul className="space-y-2 text-xs font-mono">
            <li><Link to="/tools" className="hover:text-orange-400 transition-colors">Tools (Power & Hand)</Link></li>
            <li><Link to="/hardware" className="hover:text-orange-400 transition-colors">Fasteners & Hardware</Link></li>
            <li><Link to="/electrical" className="hover:text-orange-400 transition-colors">Electrical & Cables</Link></li>
            <li><Link to="/plumbing" className="hover:text-orange-400 transition-colors">Plumbing & Valves</Link></li>
            <li><Link to="/paint" className="hover:text-orange-400 transition-colors">Paint & Sanding</Link></li>
            <li><Link to="/safety" className="hover:text-orange-400 transition-colors">Safety & PPE Gear</Link></li>
            <li><Link to="/brands" className="hover:text-orange-400 transition-colors">Store Brands</Link></li>
          </ul>
        </div>

        {/* CUSTOMER Links */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-4">
            Customer Area
          </h3>
          <ul className="space-y-2 text-xs font-mono">
            <li><Link to="/account" className="hover:text-orange-400 transition-colors">My Profile</Link></li>
            <li><Link to="/account/orders" className="hover:text-orange-400 transition-colors">Order History</Link></li>
            <li><Link to="/wishlist" className="hover:text-orange-400 transition-colors">Saved Wishlist</Link></li>
            <li><Link to="/compare" className="hover:text-orange-400 transition-colors">Tool Comparison</Link></li>
            <li><Link to="/cart" className="hover:text-orange-400 transition-colors">Shopping Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-orange-400 transition-colors">COD Checkout</Link></li>
          </ul>
        </div>

        {/* INFORMATION Links */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-4">
            Information
          </h3>
          <ul className="space-y-2 text-xs font-mono">
            <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Mutahir Hardware</Link></li>
            <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Store Contact & Map</Link></li>
            <li><Link to="/hardware-guides" className="hover:text-orange-400 transition-colors">10 Hardware Guides</Link></li>
            <li><Link to="/faq" className="hover:text-orange-400 transition-colors">Store FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-orange-400 transition-colors">Shipping & Delivery</Link></li>
            <li><Link to="/returns" className="hover:text-orange-400 transition-colors">Return Policy</Link></li>
            <li><Link to="/privacy" className="hover:text-orange-400 transition-colors">Privacy Notice</Link></li>
            <li><Link to="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Legal Bar */}
      <div className="border-t border-zinc-800 py-4 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Mutahir Hardware Store. All rights reserved.
          </div>
          <div>
            Multan, Punjab, Pakistan • Professional Hardware & Workshop Supplies
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
