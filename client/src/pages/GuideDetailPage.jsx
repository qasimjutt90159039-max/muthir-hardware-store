import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowLeft, ShieldAlert, CheckCircle, Wrench } from 'lucide-react';
import api from '../services/api';
import { PageLoader } from '../components/common/LoadingSkeleton';

const GuideDetailPage = () => {
  const { slug } = useParams();
  const [guide, setGuide] = useState(null);
  const [recentGuides, setRecentGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/guides/${slug}`);
        setGuide(data.guide);
        setRecentGuides(data.recentGuides || []);
      } catch (err) {
        console.error('Failed to load guide details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGuide();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) {
    return <PageLoader text="Loading Guide Details..." />;
  }

  if (!guide) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-heading font-black mb-3">Guide Not Found</h2>
        <Link to="/hardware-guides" className="text-xs font-mono font-bold text-orange-600 underline">
          &larr; Back to Guides List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        to="/hardware-guides"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-orange-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Guides</span>
      </Link>

      <article className="bg-white border border-brand-border rounded shadow-sm overflow-hidden p-6 md:p-10 space-y-6">
        {/* Header */}
        <div className="space-y-3 border-b border-zinc-200 pb-6">
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
            <span className="bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded uppercase">
              {guide.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{guide.readTime}</span>
            </span>
            <span>• Verified Safety Protocol</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-heading font-black text-brand-black leading-tight">
            {guide.title}
          </h1>

          <p className="text-sm text-zinc-600 font-sans leading-relaxed">
            {guide.summary}
          </p>
        </div>

        {/* Feature Image */}
        <div className="relative aspect-video rounded overflow-hidden bg-zinc-900 border border-zinc-200">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Takeaways Callout Box */}
        {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
          <div className="bg-[#161616] text-white p-6 rounded border-l-4 border-orange-500 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-orange-500" />
              <span>Critical Takeaways & Safety Guidelines</span>
            </h3>
            <ul className="space-y-2 text-xs font-mono text-zinc-300">
              {guide.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Guide Markdown Body */}
        <div className="prose max-w-none text-xs md:text-sm text-zinc-800 font-sans leading-relaxed whitespace-pre-line border-t border-zinc-100 pt-4">
          {guide.content}
        </div>

        {/* Related Catalog Tools */}
        {guide.relatedTools && guide.relatedTools.length > 0 && (
          <div className="pt-6 border-t border-zinc-200">
            <h4 className="text-xs font-mono font-bold uppercase text-zinc-800 mb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-orange-500" />
              <span>Recommended Tool Categories for This Guide:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {guide.relatedTools.map((tool, idx) => (
                <Link
                  key={idx}
                  to={`/shop?search=${encodeURIComponent(tool)}`}
                  className="px-3 py-1.5 rounded bg-zinc-100 hover:bg-orange-500 hover:text-zinc-950 font-mono text-xs text-zinc-800 transition-colors"
                >
                  Browse {tool} &rarr;
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default GuideDetailPage;
