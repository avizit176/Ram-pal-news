import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Eye,
  Users,
  AlertCircle,
  Megaphone,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTimeAgoBengali, toBengaliNumber } from '../../utils/bengaliDate';

export const AdminDashboard: React.FC = () => {
  const { articles, userPosts, breakingNews, ads, categories } = useApp();

  const totalViews = articles.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const pendingPosts = userPosts.filter((p) => p.status === 'pending');
  const activeBreaking = breakingNews.filter((b) => b.active);
  const activeAds = ads.filter((a: any) => a.active || a.status === 'active');

  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-stone-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold font-serif-bengali text-stone-900">
            রামপাল নিউজ কন্ট্রোল ড্যাশবোর্ড
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            সংবাদ পোর্টাল পর্যবেক্ষণ, পাঠক সম্পৃক্ততা ও সম্পাদকীয় ব্যবস্থাপনা
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/news/new"
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন সংবাদ প্রকাশ</span>
          </Link>
          <Link
            to="/admin/breaking"
            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-3 py-2 rounded flex items-center gap-1.5 transition"
          >
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span>ব্রেকিং অ্যালার্ট</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total News */}
        <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">মোট প্রকাশিত সংবাদ</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-serif-bengali text-stone-900">
            {toBengaliNumber(articles.length)} টি
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <span>সক্রিয় ক্যাটাগরি: {toBengaliNumber(categories.length)}</span>
          </p>
        </div>

        {/* Card 2: Total Views */}
        <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">সর্বমোট পাঠক ভিউ</span>
            <Eye className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-serif-bengali text-stone-900">
            {toBengaliNumber(totalViews)}
          </div>
          <p className="text-[11px] text-stone-400 mt-2">
            বাগেরহাট ও সারা দেশ
          </p>
        </div>

        {/* Card 3: Pending Citizen Posts */}
        <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">অপেক্ষমাণ নাগরিক সংবাদ</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-serif-bengali text-amber-600">
            {toBengaliNumber(pendingPosts.length)} টি
          </div>
          <Link
            to="/admin/citizen-posts"
            className="text-[11px] text-stone-500 hover:text-red-600 font-medium mt-2 flex items-center justify-between"
          >
            <span>পর্যালোচনা করুন</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 4: Active Ads */}
        <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold">বিজ্ঞাপন ও ব্যানার</span>
            <Megaphone className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold font-serif-bengali text-stone-900">
            {toBengaliNumber(activeAds.length)} টি স্লট
          </div>
          <Link
            to="/admin/ads"
            className="text-[11px] text-stone-500 hover:text-red-600 font-medium mt-2 flex items-center justify-between"
          >
            <span>Adsterra ও ব্যানার</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Articles Table (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-stone-200 rounded-lg shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <h3 className="font-bold font-serif-bengali text-base text-stone-900">
              সর্বশেষ প্রকাশিত সংবাদসমূহ
            </h3>
            <Link to="/admin/news" className="text-xs text-red-600 hover:underline font-semibold">
              সকল সংবাদ দেখুন →
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {recentArticles.map((art) => (
              <div key={art.id} className="p-4 hover:bg-stone-50 transition flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={art.featuredImage}
                    alt={art.titleBn}
                    className="w-16 h-12 rounded object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.2 rounded">
                        {categories.find((c) => c.id === art.categoryId)?.nameBn}
                      </span>
                      {art.isBreaking && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5" />
                          ব্রেকিং
                        </span>
                      )}
                      <span className="text-[11px] text-stone-400">
                        {formatTimeAgoBengali(art.publishedAt)}
                      </span>
                    </div>

                    <Link
                      to={`/news/${art.slug}`}
                      target="_blank"
                      className="text-xs sm:text-sm font-bold text-stone-900 hover:text-red-600 truncate block font-serif-bengali"
                    >
                      {art.titleBn}
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    to={`/admin/news/edit/${art.id}`}
                    className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-2.5 py-1 rounded"
                  >
                    সম্পাদনা
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Pending Citizen Submissions & Breaking Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pending Submissions */}
          <div className="bg-white border border-stone-200 rounded-lg shadow-2xs overflow-hidden">
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
              <h4 className="font-bold text-sm font-serif-bengali flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>অপেক্ষমাণ নাগরিক সংবাদ</span>
              </h4>
              <span className="text-xs text-stone-400">
                {toBengaliNumber(pendingPosts.length)} টি
              </span>
            </div>

            <div className="p-4">
              {pendingPosts.length === 0 ? (
                <p className="text-xs text-stone-400 text-center py-4">
                  বর্তমানে কোনো অনিষ্পন্ন নাগরিক সংবাদ নেই।
                </p>
              ) : (
                <div className="space-y-3">
                  {pendingPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="border border-stone-100 p-2.5 rounded bg-stone-50">
                      <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                        <span className="font-bold text-stone-800">{post.authorName}</span>
                        <span>{post.location}</span>
                      </div>
                      <p className="text-xs font-semibold text-stone-900 font-serif-bengali line-clamp-1 mb-2">
                        {post.title}
                      </p>
                      <Link
                        to="/admin/citizen-posts"
                        className="text-[11px] text-red-600 hover:underline font-bold"
                      >
                        যাচাই ও অনুমোদন করুন →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Breaking News Ticker Status */}
          <div className="bg-white border border-stone-200 rounded-lg shadow-2xs p-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-3">
              <h4 className="font-bold text-sm font-serif-bengali flex items-center gap-1.5 text-stone-900">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>সক্রিয় ব্রেকিং নিউজ</span>
              </h4>
              <Link to="/admin/breaking" className="text-xs text-red-600 hover:underline font-bold">
                ম্যানেজ
              </Link>
            </div>

            {activeBreaking.length === 0 ? (
              <p className="text-xs text-stone-400">বর্তমানে কোনো ব্রেকিং নিউজ চালু নেই।</p>
            ) : (
              <ul className="space-y-2 text-xs">
                {activeBreaking.map((item) => (
                  <li key={item.id} className="flex items-start gap-1.5 text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></span>
                    <span className="line-clamp-2">{item.titleBn}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
