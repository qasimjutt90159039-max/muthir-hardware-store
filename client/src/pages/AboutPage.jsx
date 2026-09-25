import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Phone, MapPin, CheckCircle, ShieldCheck, Truck, ChevronRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-zinc-900">About Mutahir Hardware Store</span>
      </div>

      <div className="bg-white border border-brand-border rounded shadow-sm overflow-hidden p-6 md:p-10 space-y-8">
        {/* Main Business Presentation */}
        <div className="border-b border-zinc-200 pb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-500/20 text-orange-600 font-mono text-xs font-bold uppercase">
            LOCAL MULTAN BUSINESS
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-brand-black">
            MUTAHIR <span className="text-orange-600">HARDWARE STORE</span>
          </h1>
          <p className="text-xs font-mono text-zinc-500">
            Publicly Listed Category: Hardware Store / Tool Store / Building & Home Improvement Supplies
          </p>
        </div>

        {/* Narrative & Practical Mission */}
        <div className="space-y-4 text-xs md:text-sm text-zinc-700 font-sans leading-relaxed">
          <p>
            <strong>Mutahir Hardware Store</strong> operates an established, active local hardware establishment located in the bustling commercial trade hub of Haqbaho Market, Vehari Chowk, Peoples Colony, Multan.
          </p>
          <p>
            Our core catalog encompasses professional power tools, high-durability hand tools, fasteners, precision brass valves, electrical copper cables, safety protective gear, and plumbing accessories. We cater directly to master craftsmen, fabrication technicians, civil contractors, electricians, plumbers, and local residents seeking dependable equipment for structural repairs and domestic maintenance.
          </p>
        </div>

        {/* Verified Business Parameters Table */}
        <div className="bg-[#111111] text-white p-6 rounded border-l-4 border-orange-500 space-y-4 font-mono text-xs">
          <h2 className="text-sm font-heading font-bold uppercase text-orange-400">
            Official Business Listing Information
          </h2>

          <div className="divide-y divide-zinc-800">
            <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-zinc-400">Business Name:</span>
              <span className="font-bold text-white">Mutahir Hardware Store</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-zinc-400">Category:</span>
              <span className="font-bold text-white">Hardware Store / Tool Store</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-zinc-400">Primary Contact Phone:</span>
              <a href="tel:+923086236092" className="font-bold text-orange-400 hover:underline">
                +92 308 6236092
              </a>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-zinc-400">Store Physical Address:</span>
              <span className="font-bold text-white sm:text-right">
                Haqbaho Market, Vehari Chowk, Peoples Colony, Multan, Punjab, Pakistan
              </span>
            </div>
          </div>
        </div>

        {/* Operating Principles */}
        <div className="space-y-4">
          <h2 className="text-lg font-heading font-bold uppercase text-zinc-900">
            Our Hardware Store Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded border border-zinc-200 bg-zinc-50">
              <div className="font-bold text-zinc-900 mb-1 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                <span>Accurate Specifications</span>
              </div>
              <p className="text-zinc-600 font-sans text-xs">
                We clearly state tool wattage, torque, chuck capacities, and raw materials so you select the exact tool required for your workload.
              </p>
            </div>

            <div className="p-4 rounded border border-zinc-200 bg-zinc-50">
              <div className="font-bold text-zinc-900 mb-1 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                <span>Cash on Delivery</span>
              </div>
              <p className="text-zinc-600 font-sans text-xs">
                Customers retain complete peace of mind with Cash on Delivery and in-person collection at our Multan counter.
              </p>
            </div>
          </div>
        </div>

        {/* Direct Call to Action */}
        <div className="pt-6 border-t border-zinc-200 flex flex-wrap gap-4">
          <Link
            to="/shop"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
          >
            Explore Full Catalog
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors"
          >
            Store Map & Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
