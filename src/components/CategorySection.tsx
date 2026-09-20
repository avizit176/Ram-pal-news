import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, MapPin } from 'lucide-react';
import { NewsArticle, Category } from '../types';
import { formatTimeAgoBengali } from '../utils/bengaliDate';

interface CategorySectionProps {
  category: Category;
  articles: NewsArticle[];
  layout?: 'grid' | 'split' | 'compact';
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  articles,
  layout = 'split',
}) => {
  if (articles.length === 0) return null;

  const leadArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <section className="my-8">
      {/* Category Section Header */}
      <div className="flex items-center justify-between border-b-2 border-stone-800 pb-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-5 bg-red-600 inline-block"></span>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-bengali">
            {category.nameBn}
          </h3>
        </div>
        <Link
          to={`/category/${category.slug}`}
          className="text-xs font-bold text-red-700 hover:text-red-900 flex items-center gap-1 transition"
        >
          <span>সব খবর</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Layout: Split (Lead card on left, 3-4 cards on right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Lead card */}
        {leadArticle && (
          <div className="md:col-span-6 lg:col-span-7 bg-white border border-stone-200 rounded-lg overflow-hidden group shadow-2xs hover:shadow-sm transition">
            <Link to={`/news/${leadArticle.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-stone-100">
              <img
                src={leadArticle.featuredImage}
                alt={leadArticle.titleBn}
                className="w-full h-full object-cover group-hover:scale-104 transition duration-300"
              />
              <span className="absolute bottom-2 left-2 bg-stone-900/80 text-white text-[11px] px-2 py-0.5 rounded">
                {leadArticle.location}
              </span>
            </Link>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimeAgoBengali(leadArticle.publishedAt)}</span>
              </div>
              <Link to={`/news/${leadArticle.slug}`}>
                <h4 className="text-lg sm:text-xl font-bold text-stone-900 font-serif-bengali leading-snug group-hover:text-red-700 transition mb-2">
                  {leadArticle.titleBn}
                </h4>
              </Link>
              <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
                {leadArticle.summary || leadArticle.content.replace(/<[^>]*>?/gm, '').slice(0, 120) + '...'}
              </p>
            </div>
          </div>
        )}

        {/* Side mini cards */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-3.5">
          {sideArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-stone-200 rounded-lg p-3 hover:bg-stone-50 transition group shadow-2xs"
            >
              <Link to={`/news/${art.slug}`} className="flex gap-3 items-start">
                <div className="w-24 h-18 sm:w-28 sm:h-20 flex-shrink-0 overflow-hidden rounded bg-stone-100">
                  <img
                    src={art.featuredImage}
                    alt={art.titleBn}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-bold text-stone-900 font-serif-bengali leading-snug line-clamp-2 group-hover:text-red-700 transition mb-1">
                    {art.titleBn}
                  </h5>
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <span className="truncate">{art.location}</span>
                    <span>•</span>
                    <span>{formatTimeAgoBengali(art.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
