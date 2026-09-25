import React from 'react';

export const ProductCardSkeleton = () => (
  <div className="bg-white border border-brand-border rounded p-4 flex flex-col justify-between animate-pulse">
    <div className="aspect-square bg-zinc-200 rounded mb-4 w-full"></div>
    <div className="space-y-2">
      <div className="h-3 bg-zinc-200 rounded w-1/3"></div>
      <div className="h-4 bg-zinc-200 rounded w-5/6"></div>
      <div className="h-3 bg-zinc-200 rounded w-1/2"></div>
    </div>
    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
      <div className="h-5 bg-zinc-200 rounded w-1/3"></div>
      <div className="h-8 bg-zinc-200 rounded w-1/3"></div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const TableRowSkeleton = ({ cols = 5 }) => (
  <tr className="animate-pulse border-b border-zinc-100">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="py-4 px-4">
        <div className="h-4 bg-zinc-200 rounded w-3/4"></div>
      </td>
    ))}
  </tr>
);

export const PageLoader = ({ text = 'Loading Hardware Workshop...' }) => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">{text}</span>
  </div>
);
