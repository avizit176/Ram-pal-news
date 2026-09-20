import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategorySection } from '../components/CategorySection';
import { CitizenNewsComposer } from '../components/CitizenNewsComposer';
import { CitizenNewsFeed } from '../components/CitizenNewsFeed';
import { PopularNewspapers } from '../components/PopularNewspapers';
import { AdBanner } from '../components/AdBanner';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Flame, MessageCircle, Newspaper, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';
import { formatTimeAgoBengali, toBengaliNumber } from '../utils/bengaliDate';

export const HomePage: React.FC = () => {
  const { categories, getArticlesByCategory, articles } = useApp();

  // Pick top categories for the homepage blocks
  const rampalCategory = categories.find((c) => c.slug === 'rampal') || categories[0];
  const nationalCategory = categories.find((c) => c.slug === 'national') || categories[1];
  const politicsCategory = categories.find((c) => c.slug === 'politics') || categories[2];
  const economyCategory = categories.find((c) => c.slug === 'economy') || categories[3];
  const internationalCategory = categories.find((c) => c.slug === 'international') || categories[4];

  // Trending / most read articles
  const popularArticles = articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* 1. Top Leaderboard Ad */}
      <AdBanner placement="homepage_top" />

      {/* 2. Hero News Section */}
      <HeroSection />

      {/* 3. Middle Ad Slot */}
      <AdBanner placement="between_news" />

      {/* 4. Rampal & Southern Region Focus Section */}
      {rampalCategory && (
        <CategorySection
          category={rampalCategory}
          articles={getArticlesByCategory(rampalCategory.id)}
          layout="split"
        />
      )}

      {/* 5. Two-Column Layout: National/Politics News (Left 8) + Sidebar (Right 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
        <div className="lg:col-span-8 space-y-10">
          {/* National News */}
          {nationalCategory && (
            <CategorySection
              category={nationalCategory}
              articles={getArticlesByCategory(nationalCategory.id)}
              layout="split"
            />
          )}

          {/* Politics News */}
          {politicsCategory && (
            <CategorySection
              category={politicsCategory}
              articles={getArticlesByCategory(politicsCategory.id)}
              layout="split"
            />
          )}

          {/* Economy News */}
          {economyCategory && (
            <CategorySection
              category={economyCategory}
              articles={getArticlesByCategory(economyCategory.id)}
              layout="split"
            />
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Most Read / Trending Block */}
          <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-2xs">
            <div className="bg-stone-900 text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-bold font-serif-bengali text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span>সর্বাধিক পঠিত খবর</span>
              </h3>
              <span className="text-[11px] text-stone-400">এই সপ্তাহের</span>
            </div>

            <div className="divide-y divide-stone-100">
              {popularArticles.map((pop, idx) => (
                <Link
                  key={pop.id}
                  to={`/news/${pop.slug}`}
                  className="p-3.5 hover:bg-stone-50 transition flex items-start gap-3 group"
                >
                  <span className="text-2xl font-black text-stone-300 font-serif-bengali w-6 group-hover:text-red-600 transition flex-shrink-0">
                    {toBengaliNumber(idx + 1)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 font-serif-bengali line-clamp-2 group-hover:text-red-700 transition leading-snug mb-1">
                      {pop.titleBn}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-stone-400">
                      <span>{pop.location}</span>
                      <span>•</span>
                      <span>{formatTimeAgoBengali(pop.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar Advertisement */}
          <AdBanner placement="sidebar" />

          {/* Citizen Reporter Card */}
          <div className="bg-stone-900 text-white p-5 rounded-lg border-t-4 border-red-600">
            <h4 className="text-lg font-bold font-serif-bengali mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>নাগরিক সাংবাদিক হন</span>
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">
              আপনার এলাকার রাস্তাঘাট, নদীভাঙন, অনিয়ম বা ইতিবাচক কোনো খবর সরাসরি রামপাল নিউজের মাধ্যমে বিশ্বদরবারে তুলে ধরুন।
            </p>
            <Link
              to="/user-posts"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-2 px-3 rounded flex items-center justify-center gap-1.5 transition"
            >
              <span>খবর ও ছবি পাঠান</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>
      </div>

      {/* 6. Citizen News Community Spotlight */}
      <section className="my-10 bg-stone-50 border border-stone-200 rounded-lg p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-200 pb-3 mb-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-bengali flex items-center gap-2">
              <span className="w-3 h-5 bg-red-600"></span>
              <span>রামপাল নাগরিক সংবাদ ফোরাম</span>
            </h3>
            <p className="text-xs text-stone-500">
              নাগরিকদের পাঠানো সরাসরি প্রতিবেদন ও সত্যতা যাচাইকৃত আপডেট
            </p>
          </div>
          <Link
            to="/user-posts"
            className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <span>সকল নাগরিক সংবাদ</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6">
            <CitizenNewsComposer />
          </div>
          <div className="lg:col-span-6">
            <CitizenNewsFeed />
          </div>
        </div>
      </section>

      {/* 7. Popular Newspaper Links ("জনপ্রিয় দৈনিক") */}
      <PopularNewspapers />
    </div>
  );
};
