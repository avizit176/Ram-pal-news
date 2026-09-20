import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ChevronRight, Flame, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTimeAgoBengali } from '../utils/bengaliDate';

export const HeroSection: React.FC = () => {
  const { articles, categories, getFeaturedArticle } = useApp();

  const featured = getFeaturedArticle();
  const publishedArticles = articles.filter(
    (a) => a.status === 'published' && a.id !== featured?.id
  );

  // Take next 4 stories for the side hero grid
  const sideArticles = publishedArticles.slice(0, 4);

  const getCategoryName = (catId: string) => {
    return categories.find((c) => c.id === catId || c.slug === catId)?.nameBn || 'সংবাদ';
  };

  if (!featured) return null;

  return (
    <section className="my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Large Featured Story (Left 7 or 8 cols) */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between group">
          <div>
            <div className="relative overflow-hidden aspect-[16/9] sm:aspect-[21/10] bg-stone-100">
              <Link to={`/news/${featured.slug}`}>
                <img
                  src={featured.featuredImage}
                  alt={featured.titleBn}
                  className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                  loading="eager"
                />
              </Link>
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-md uppercase tracking-wider">
                  {getCategoryName(featured.categoryId)}
                </span>
                {featured.isBreaking && (
                  <span className="bg-amber-500 text-stone-900 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>বিশেষ সংবাদ</span>
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-2">
                <span className="flex items-center gap-1 font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded">
                  <MapPin className="w-3 h-3" />
                  <span>{featured.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{formatTimeAgoBengali(featured.publishedAt)}</span>
                </span>
                {featured.author?.name && (
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>{featured.author.name}</span>
                  </span>
                )}
              </div>

              <Link to={`/news/${featured.slug}`}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 font-serif-bengali leading-tight group-hover:text-red-700 transition mb-3">
                  {featured.titleBn}
                </h2>
              </Link>

              {featured.subtitle && (
                <p className="text-base text-stone-700 font-medium mb-3 border-l-3 border-red-500 pl-3 italic">
                  {featured.subtitle}
                </p>
              )}

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                {featured.summary || featured.content.replace(/<[^>]*>?/gm, '').slice(0, 180) + '...'}
              </p>
            </div>
          </div>

          <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-stone-100 flex items-center justify-between">
            <div className="flex gap-2">
              {featured.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
            <Link
              to={`/news/${featured.slug}`}
              className="inline-flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-800 transition"
            >
              <span>বিস্তারিত পড়ুন</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Side Stories Grid (Right 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-stone-900 text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between">
            <h3 className="font-bold font-serif-bengali text-base flex items-center gap-2">
              <span className="w-2 h-4 bg-red-600 rounded-xs"></span>
              <span>শীর্ষ তাজা খবর</span>
            </h3>
            <span className="text-xs text-stone-400">রামপাল ও দেশ</span>
          </div>

          <div className="bg-white border border-stone-200 rounded-b-lg divide-y divide-stone-100 shadow-xs">
            {sideArticles.map((art) => (
              <article key={art.id} className="p-3.5 hover:bg-stone-50 transition group">
                <Link to={`/news/${art.slug}`} className="flex gap-3 items-start">
                  <div className="w-24 h-18 sm:w-28 sm:h-20 flex-shrink-0 overflow-hidden rounded bg-stone-100 relative">
                    <img
                      src={art.featuredImage}
                      alt={art.titleBn}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider block mb-1">
                      {getCategoryName(art.categoryId)}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 font-serif-bengali leading-snug line-clamp-2 group-hover:text-red-700 transition mb-1.5">
                      {art.titleBn}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-stone-400">
                      <span>{formatTimeAgoBengali(art.publishedAt)}</span>
                      <span>•</span>
                      <span>{art.location}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Quick Notice / E-Paper Widget */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-red-800">রামপাল নিউজ অ্যাপ ও ই-পেপার</p>
              <p className="text-[11px] text-stone-600">ডিজিটাল সংস্করণে সত্য খবর সবার আগে</p>
            </div>
            <Link
              to="/about"
              className="bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-red-800 transition"
            >
              পরিচিতি
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
