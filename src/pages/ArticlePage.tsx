import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  MapPin,
  User,
  Eye,
  ChevronRight,
  Bookmark,
  Share2,
  Printer,
  Minus,
  Plus,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTimeAgoBengali, toBengaliNumber } from '../utils/bengaliDate';
import { SocialShareBar } from '../components/SocialShareBar';
import { CommentsSection } from '../components/CommentsSection';
import { AdBanner } from '../components/AdBanner';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getArticleBySlug, articles, categories, incrementViews, settings } = useApp();
  const [fontSizeClass, setFontSizeClass] = useState<'text-base' | 'text-lg' | 'text-xl'>('text-base');
  const navigate = useNavigate();

  const article = slug ? getArticleBySlug(slug) : undefined;

  // Track article views on load
  useEffect(() => {
    if (article) {
      incrementViews(article.id);
      // Dynamically update document title and meta description
      document.title = `${article.titleBn} | ${settings.websiteNameBn}`;

      // Update meta tags for client-side browsers and crawlers
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', article.seo.description || article.summary || article.titleBn);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', article.titleBn);
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', article.seo.ogImage || article.featuredImage);
      }
    }
    window.scrollTo(0, 0);
  }, [slug, article?.id]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold font-serif-bengali text-stone-900 mb-2">
          দুঃখিত, সংবাদটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-stone-600 mb-6">
          সম্ভবত সংবাদটির লিংক পরিবর্তিত হয়েছে অথবা এটি সরিয়ে নেওয়া হয়েছে।
        </p>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded text-sm transition"
        >
          প্রচ্ছদে ফিরে যান
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === article.categoryId || c.slug === article.categoryId);

  // Related articles in same category
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.categoryId === article.categoryId && a.status === 'published')
    .slice(0, 4);

  // Popular articles for sidebar
  const popularArticles = articles
    .filter((a) => a.id !== article.id && a.status === 'published')
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <article className="max-w-7xl mx-auto px-4 py-6">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-4 no-print">
        <Link to="/" className="hover:text-red-700">
          প্রচ্ছদ
        </Link>
        <ChevronRight className="w-3 h-3 text-stone-400" />
        {category && (
          <>
            <Link to={`/category/${category.slug}`} className="hover:text-red-700">
              {category.nameBn}
            </Link>
            <ChevronRight className="w-3 h-3 text-stone-400" />
          </>
        )}
        <span className="text-stone-800 truncate max-w-xs sm:max-w-md">
          {article.titleBn}
        </span>
      </nav>

      {/* Top Banner Ad Slot */}
      <div className="no-print">
        <AdBanner placement="article_top" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Article Content (8 cols) */}
        <div className="lg:col-span-8">
          {/* Category Tag & Breaking Badge */}
          <div className="flex items-center gap-2 mb-3">
            {category && (
              <Link
                to={`/category/${category.slug}`}
                className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded"
              >
                {category.nameBn}
              </Link>
            )}
            {article.isBreaking && (
              <span className="bg-amber-500 text-stone-900 text-xs font-bold px-2 py-0.5 rounded">
                ব্রেকিং
              </span>
            )}
            <span className="text-xs text-stone-500 flex items-center gap-1 ml-auto">
              <Eye className="w-3.5 h-3.5" />
              <span>{toBengaliNumber(article.views)} বার পঠিত</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif-bengali text-stone-900 leading-tight mb-3">
            {article.titleBn}
          </h1>

          {/* Subtitle if available */}
          {article.subtitle && (
            <p className="text-base sm:text-lg text-stone-600 font-medium italic mb-4 border-l-4 border-red-600 pl-3">
              {article.subtitle}
            </p>
          )}

          {/* Author & Timestamp Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-stone-200 text-xs text-stone-600 mb-6">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
                alt={article.author.name}
                className="w-9 h-9 rounded-full object-cover border border-stone-200"
              />
              <div>
                <p className="font-bold text-stone-900 text-sm">{article.author.name}</p>
                <div className="flex items-center gap-2 text-stone-500">
                  <span>{article.author.role || 'প্রতিবেদক'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-red-600 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>{article.location}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-stone-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>প্রকাশ: {new Date(article.publishedAt).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </span>

              {/* Text zoom control */}
              <div className="flex items-center border border-stone-200 rounded px-1.5 py-0.5 no-print">
                <button
                  onClick={() => setFontSizeClass('text-base')}
                  className={`px-1 font-bold ${fontSizeClass === 'text-base' ? 'text-red-600' : 'text-stone-400'}`}
                  title="স্বাভাবিক ফন্ট"
                >
                  ক
                </button>
                <button
                  onClick={() => setFontSizeClass('text-lg')}
                  className={`px-1 font-bold text-sm ${fontSizeClass === 'text-lg' ? 'text-red-600' : 'text-stone-400'}`}
                  title="মাঝারি ফন্ট"
                >
                  ক+
                </button>
                <button
                  onClick={() => setFontSizeClass('text-xl')}
                  className={`px-1 font-bold text-base ${fontSizeClass === 'text-xl' ? 'text-red-600' : 'text-stone-400'}`}
                  title="বড় ফন্ট"
                >
                  ক++
                </button>
              </div>
            </div>
          </div>

          {/* Social Share Bar */}
          <SocialShareBar article={article} />

          {/* Featured Image */}
          <div className="mb-6 rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
            <img
              src={article.featuredImage}
              alt={article.titleBn}
              className="w-full h-auto object-cover max-h-[500px]"
            />
            {article.imageCaption && (
              <p className="text-xs text-stone-500 p-2.5 bg-stone-50 border-t border-stone-200 italic">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* Article Body */}
          <div
            className={`article-body text-stone-800 leading-relaxed font-bengali space-y-4 ${fontSizeClass}`}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* In-Article Advertisement */}
          <div className="no-print my-6">
            <AdBanner placement="between_news" />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-4 border-t border-stone-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-600">সম্পর্কিত বিষয়:</span>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-700 text-xs px-2.5 py-1 rounded transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Bottom Share Bar */}
          <SocialShareBar article={article} />

          {/* Bottom Banner Ad */}
          <div className="no-print">
            <AdBanner placement="article_bottom" />
          </div>

          {/* Comments Section */}
          <CommentsSection articleId={article.id} />

          {/* Related Articles in Same Category */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-6 border-t-2 border-stone-800 no-print">
              <h3 className="text-xl font-bold font-serif-bengali text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-5 bg-red-600"></span>
                <span>আরও পড়ুন ({category?.nameBn || 'সম্পর্কিত'})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/news/${rel.slug}`}
                    className="bg-white border border-stone-200 rounded-lg p-3 hover:bg-stone-50 transition group flex gap-3"
                  >
                    <img
                      src={rel.featuredImage}
                      alt={rel.titleBn}
                      className="w-24 h-20 object-cover rounded flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-stone-900 font-serif-bengali line-clamp-2 group-hover:text-red-700 transition">
                        {rel.titleBn}
                      </h4>
                      <span className="text-[11px] text-stone-400 mt-1 block">
                        {formatTimeAgoBengali(rel.publishedAt)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6 no-print">
          {/* Sidebar Ad Placement */}
          <AdBanner placement="sidebar" />

          {/* Most Read / Popular News */}
          <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-2xs">
            <div className="bg-stone-900 text-white px-4 py-3 flex items-center justify-between">
              <h4 className="font-bold font-serif-bengali text-base flex items-center gap-2">
                <span className="w-2 h-4 bg-red-600 rounded-xs"></span>
                <span>সর্বাধিক পঠিত খবর</span>
              </h4>
              <span className="text-[11px] text-stone-400">ট্রেন্ডিং</span>
            </div>

            <div className="divide-y divide-stone-100">
              {popularArticles.map((pop, idx) => (
                <Link
                  key={pop.id}
                  to={`/news/${pop.slug}`}
                  className="p-3 hover:bg-stone-50 transition flex items-start gap-3 group"
                >
                  <span className="text-2xl font-black text-stone-300 font-serif-bengali w-6 group-hover:text-red-600 transition">
                    {toBengaliNumber(idx + 1)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-stone-900 font-serif-bengali line-clamp-2 group-hover:text-red-700 transition leading-snug">
                      {pop.titleBn}
                    </h5>
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      {pop.location} • {formatTimeAgoBengali(pop.publishedAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Citizen Reporter CTA Box */}
          <div className="bg-gradient-to-br from-red-800 to-red-950 text-white rounded-lg p-5 shadow-sm">
            <h4 className="text-lg font-bold font-serif-bengali mb-2">
              আপনিও হোন নাগরিক সাংবাদিক!
            </h4>
            <p className="text-xs text-red-100 leading-relaxed mb-4">
              আপনার চারপাশের অন্যায়, সমস্যা, সাফল্য বা যেকোনো জনগুরুত্বপূর্ণ খবর ছবিসহ পাঠিয়ে দিন রামপাল নিউজে।
            </p>
            <Link
              to="/user-posts"
              className="inline-block bg-white text-red-800 hover:bg-red-50 text-xs font-bold px-4 py-2 rounded transition shadow-xs"
            >
              খবর পাঠাতে ক্লিক করুন →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
