import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTimeAgoBengali } from '../utils/bengaliDate';
import { AdBanner } from '../components/AdBanner';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { categories, getArticlesByCategory, articles } = useApp();

  const category = categories.find((c) => c.slug === slug || c.id === slug);
  const categoryArticles = category ? getArticlesByCategory(category.id) : [];

  const popularArticles = articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-stone-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold font-serif-bengali text-stone-900 mb-2">
          ক্যাটাগরিটি খুঁজে পাওয়া যায়নি
        </h2>
        <Link to="/" className="text-red-600 hover:underline text-sm font-medium">
          প্রচ্ছদে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Category Header */}
      <div className="bg-stone-900 text-white p-6 rounded-lg mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <nav className="flex items-center gap-2 text-xs text-stone-400 mb-2">
            <Link to="/" className="hover:text-white">
              প্রচ্ছদ
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-red-400">{category.nameBn}</span>
          </nav>
          <h1 className="text-3xl font-extrabold font-serif-bengali text-white mb-2">
            {category.nameBn}
          </h1>
          {category.description && (
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main News List (8 cols) */}
        <div className="lg:col-span-8">
          {categoryArticles.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-lg p-10 text-center text-stone-500">
              <p className="font-serif-bengali text-base mb-2 font-semibold">
                এই বিভাগে বর্তমানে কোনো নতুন সংবাদ নেই।
              </p>
              <p className="text-xs text-stone-400">
                শীঘ্রই নতুন সংবাদ হালনাগাদ করা হবে।
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {categoryArticles.map((art) => (
                <article
                  key={art.id}
                  className="bg-white border border-stone-200 rounded-lg p-4 sm:p-5 hover:shadow-xs transition group flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to={`/news/${art.slug}`}
                    className="sm:w-56 aspect-[16/10] overflow-hidden rounded bg-stone-100 flex-shrink-0"
                  >
                    <img
                      src={art.featuredImage}
                      alt={art.titleBn}
                      className="w-full h-full object-cover group-hover:scale-104 transition duration-300"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5">
                        <span className="text-red-700 font-medium">{art.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgoBengali(art.publishedAt)}</span>
                        </span>
                      </div>

                      <Link to={`/news/${art.slug}`}>
                        <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif-bengali group-hover:text-red-700 transition leading-snug mb-2">
                          {art.titleBn}
                        </h2>
                      </Link>

                      <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {art.summary || art.content.replace(/<[^>]*>?/gm, '').slice(0, 140) + '...'}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-400">প্রতিবেদক: {art.author.name}</span>
                      <Link
                        to={`/news/${art.slug}`}
                        className="text-red-600 font-bold hover:underline"
                      >
                        বিস্তারিত পড়ুন →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <AdBanner placement="sidebar" />

          {/* Popular news */}
          <div className="bg-white border border-stone-200 rounded-lg overflow-hidden">
            <div className="bg-stone-900 text-white px-4 py-3">
              <h4 className="font-bold font-serif-bengali text-sm">
                অন্যান্য বিভাগের জনপ্রিয় খবর
              </h4>
            </div>
            <div className="divide-y divide-stone-100">
              {popularArticles.map((pop) => (
                <Link
                  key={pop.id}
                  to={`/news/${pop.slug}`}
                  className="p-3 hover:bg-stone-50 transition flex items-start gap-3 group"
                >
                  <img
                    src={pop.featuredImage}
                    alt={pop.titleBn}
                    className="w-16 h-12 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-stone-900 font-serif-bengali line-clamp-2 group-hover:text-red-700 transition">
                      {pop.titleBn}
                    </h5>
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      {formatTimeAgoBengali(pop.publishedAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
