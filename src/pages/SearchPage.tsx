import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Clock, MapPin, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTimeAgoBengali, toBengaliNumber } from '../utils/bengaliDate';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { articles, categories } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'views'>('latest');

  const filteredArticles = articles.filter((art) => {
    if (art.status !== 'published') return false;

    // Category filter
    if (filterCategory !== 'all' && art.categoryId !== filterCategory) {
      return false;
    }

    // Query filter
    if (!query.trim()) return true;
    const lowerQ = query.toLowerCase();
    const matchTitle = art.titleBn.toLowerCase().includes(lowerQ);
    const matchContent = art.content.toLowerCase().includes(lowerQ);
    const matchLocation = art.location.toLowerCase().includes(lowerQ);
    const matchAuthor = art.author.name.toLowerCase().includes(lowerQ);
    const matchTags = art.tags?.some((t) => t.toLowerCase().includes(lowerQ));

    return matchTitle || matchContent || matchLocation || matchAuthor || matchTags;
  });

  // Sort
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'views') {
      return b.views - a.views;
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('q') as HTMLInputElement;
    if (input) {
      setSearchParams({ q: input.value });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header Form */}
      <div className="bg-white border border-stone-200 rounded-lg p-6 mb-8 shadow-xs">
        <h1 className="text-2xl font-bold font-serif-bengali text-stone-900 mb-4 flex items-center gap-2">
          <Search className="w-6 h-6 text-red-600" />
          <span>সংবাদ ও প্রতিবেদন অনুসন্ধান</span>
        </h1>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="শিরোনাম, স্থান, রামপাল, কৃষি, বা যে কোনো বিষয় লিখুন..."
              className="w-full border border-stone-300 rounded px-4 py-2.5 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded text-sm transition"
          >
            অনুসন্ধান করুন
          </button>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-stone-100 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <span className="font-semibold flex items-center gap-1 text-stone-800">
              <Filter className="w-3.5 h-3.5" />
              <span>বিভাগ অনুযায়ী ফিল্টার:</span>
            </span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-stone-300 rounded px-2.5 py-1 text-xs bg-stone-50"
            >
              <option value="all">সকল বিভাগ</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameBn}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">সাজানো:</span>
            <button
              onClick={() => setSortBy('latest')}
              className={`px-2.5 py-1 rounded transition ${
                sortBy === 'latest' ? 'bg-red-600 text-white font-bold' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              সর্বশেষ খবর
            </button>
            <button
              onClick={() => setSortBy('views')}
              className={`px-2.5 py-1 rounded transition ${
                sortBy === 'views' ? 'bg-red-600 text-white font-bold' : 'bg-stone-100 hover:bg-stone-200'
              }`}
            >
              সর্বাধিক পঠিত
            </button>
          </div>
        </div>
      </div>

      {/* Results stats */}
      <div className="mb-6 flex items-center justify-between text-sm text-stone-600">
        <p>
          {query ? (
            <>
              "<strong className="text-stone-900">{query}</strong>" সম্পর্কিত{' '}
              <span className="font-bold text-red-600">{toBengaliNumber(sortedArticles.length)}</span> টি সংবাদ পাওয়া গেছে
            </>
          ) : (
            <>
              সর্বমোট <span className="font-bold text-red-600">{toBengaliNumber(sortedArticles.length)}</span> টি সংবাদ
            </>
          )}
        </p>
      </div>

      {/* Articles Grid */}
      {sortedArticles.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center text-stone-500">
          <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg font-serif-bengali text-stone-800 mb-1">
            কোনো সংবাদ খুঁজে পাওয়া যায়নি
          </h3>
          <p className="text-xs text-stone-500">
            দয়া করে বানান পরীক্ষা করুন অথবা ভিন্ন কোনো কীওয়ার্ড দিয়ে অনুসন্ধান করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-2xs hover:shadow-sm transition flex flex-col justify-between group"
            >
              <div>
                <Link to={`/news/${art.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={art.featuredImage}
                    alt={art.titleBn}
                    className="w-full h-full object-cover group-hover:scale-104 transition duration-300"
                  />
                  <span className="absolute bottom-2 left-2 bg-stone-900/80 text-white text-[10px] px-2 py-0.5 rounded">
                    {art.location}
                  </span>
                </Link>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgoBengali(art.publishedAt)}</span>
                  </div>

                  <Link to={`/news/${art.slug}`}>
                    <h3 className="font-bold text-base font-serif-bengali text-stone-900 group-hover:text-red-700 transition leading-snug line-clamp-2 mb-2">
                      {art.titleBn}
                    </h3>
                  </Link>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {art.summary || art.content.replace(/<[^>]*>?/gm, '').slice(0, 100) + '...'}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">
                  {categories.find((c) => c.id === art.categoryId)?.nameBn}
                </span>
                <Link to={`/news/${art.slug}`} className="text-red-600 font-bold hover:underline">
                  পড়ুন →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
