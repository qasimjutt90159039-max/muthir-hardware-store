import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Wrench, ArrowLeft, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center font-mono">
      <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="text-4xl md:text-6xl font-heading font-black text-brand-black mb-2">
        404 <span className="text-orange-500">•</span> ERROR
      </div>

      <h1 className="text-lg md:text-xl font-heading font-bold text-zinc-800 uppercase mb-3">
        HARDWARE PART OR PAGE NOT FOUND
      </h1>

      <p className="text-xs md:text-sm text-zinc-500 font-sans max-w-md leading-relaxed mb-8">
        The tool, category URL, or catalog specification you were looking for does not exist or may have been relocated in our inventory reorganization.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold uppercase text-xs rounded flex items-center gap-2 transition-colors shadow"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/shop"
          className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold uppercase text-xs rounded flex items-center gap-2 transition-colors"
        >
          <Wrench className="w-4 h-4" />
          <span>Browse Catalog</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
