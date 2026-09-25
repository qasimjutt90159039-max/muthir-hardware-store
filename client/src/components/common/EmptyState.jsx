import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Repeat, Search, AlertCircle, Wrench } from 'lucide-react';

const EmptyState = ({
  icon: Icon = Wrench,
  title = 'No Items Found',
  description = 'There are currently no items matching your criteria in the hardware catalog.',
  actionText = 'Browse Shop',
  actionLink = '/shop',
}) => {
  return (
    <div className="bg-white border border-brand-border rounded p-8 md:p-12 text-center max-w-lg mx-auto shadow-sm my-8">
      <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 mx-auto flex items-center justify-center mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-heading font-bold text-zinc-900 mb-2">{title}</h3>
      <p className="text-xs text-zinc-500 leading-relaxed mb-6 font-sans">
        {description}
      </p>
      {actionLink && actionText && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-zinc-900 hover:bg-orange-500 text-white hover:text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow"
        >
          <span>{actionText}</span>
          <span>&rarr;</span>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
