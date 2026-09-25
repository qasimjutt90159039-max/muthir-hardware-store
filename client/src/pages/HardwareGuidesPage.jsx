import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { PageLoader } from '../components/common/LoadingSkeleton';

const HardwareGuidesPage = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/guides');
        setGuides(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load hardware guides:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading) {
    return <PageLoader text="Loading Educational Guides..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="bg-[#111111] text-white p-8 rounded border-b-4 border-orange-500 mb-10 shadow-industrial">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-orange-400 font-bold uppercase">Educational Resources</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-white mb-2">
          HARDWARE & WORKSHOP <span className="text-orange-500">GUIDES</span>
        </h1>
        <p className="text-xs md:text-sm text-zinc-300 font-sans max-w-2xl leading-relaxed">
          Technical specifications, screw sizing charts, plumbing fitting standards, and critical workshop safety procedures prepared by hardware professionals.
        </p>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(guides || []).map((g) => (
          <Link
            key={g._id}
            to={`/hardware-guides/${g.slug}`}
            className="group bg-white border border-brand-border rounded overflow-hidden flex flex-col justify-between hover:shadow-industrial hover:border-orange-500/60 transition-all duration-300"
          >
            <div>
              <div className="aspect-video w-full overflow-hidden bg-zinc-100">
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                  <span className="text-orange-600 font-bold uppercase">{g.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{g.readTime}</span>
                  </div>
                </div>

                <h2 className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                  {g.title}
                </h2>

                <p className="text-xs text-zinc-600 mt-2 line-clamp-3 leading-relaxed font-sans">
                  {g.summary}
                </p>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-[#f8f8f7] border-t border-brand-border flex items-center justify-between text-xs font-mono font-bold text-orange-600">
              <span>Read Full Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HardwareGuidesPage;
