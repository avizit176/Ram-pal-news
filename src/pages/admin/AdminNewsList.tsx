import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Star,
  Flame,
  Eye,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTimeAgoBengali, toBengaliNumber } from '../../utils/bengaliDate';

export const AdminNewsList: React.FC = () => {
  const { articles, categories, deleteArticle, updateArticle } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredArticles = articles.filter((art) => {
    if (selectedCategory !== 'all' && art.categoryId !== selectedCategory) return false;
    if (selectedStatus !== 'all' && art.status !== selectedStatus) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        art.titleBn.toLowerCase().includes(q) ||
        art.location.toLowerCase().includes(q) ||
        art.author.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`আপনি কি নিশ্চিত যে "${title}" সংবাদটি মুছে ফেলতে চান?`)) {
      deleteArticle(id);
    }
  };

  const toggleFeatured = (art: any) => {
    updateArticle(art.id, { isFeatured: !art.isFeatured });
  };

  const toggleBreaking = (art: any) => {
    updateArticle(art.id, { isBreaking: !art.isBreaking });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif-bengali text-stone-900">
            সংবাদ ও প্রতিবেদন তালিকা
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            মোট সংবাদ: {toBengaliNumber(articles.length)} টি
          </p>
        </div>

        <Link
          to="/admin/news/new"
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 transition shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন সংবাদ লিখুন</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-stone-200 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="শিরোনাম, রিপোর্টার বা স্থান দিয়ে খুঁজুন..."
            className="w-full text-xs pl-9 pr-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs border border-stone-300 rounded px-2.5 py-2 bg-stone-50 text-stone-700"
          >
            <option value="all">সকল বিভাগ</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameBn}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs border border-stone-300 rounded px-2.5 py-2 bg-stone-50 text-stone-700"
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="published">প্রকাশিত</option>
            <option value="draft">খসড়া (Draft)</option>
            <option value="archived">সংরক্ষিত (Archived)</option>
          </select>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white border border-stone-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">সংবাদ ও ছবি</th>
                <th className="px-4 py-3">বিভাগ ও স্থান</th>
                <th className="px-4 py-3 text-center">হিরো / ব্রেকিং</th>
                <th className="px-4 py-3">স্ট্যাটাস</th>
                <th className="px-4 py-3">ভিউ</th>
                <th className="px-4 py-3 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-stone-400">
                    কোনো সংবাদ পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredArticles.map((art) => {
                  const cat = categories.find((c) => c.id === art.categoryId);
                  return (
                    <tr key={art.id} className="hover:bg-stone-50/80 transition">
                      {/* Image + Title */}
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-3 max-w-md">
                          <img
                            src={art.featuredImage}
                            alt={art.titleBn}
                            className="w-16 h-12 rounded object-cover flex-shrink-0 border border-stone-200"
                          />
                          <div className="min-w-0">
                            <Link
                              to={`/news/${art.slug}`}
                              target="_blank"
                              className="font-bold text-stone-900 hover:text-red-600 line-clamp-2 font-serif-bengali text-sm"
                            >
                              {art.titleBn}
                            </Link>
                            <p className="text-[10px] text-stone-400 mt-0.5">
                              প্রতিবেদক: {art.author.name} • {formatTimeAgoBengali(art.publishedAt)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category & Location */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-semibold text-stone-900 block">
                          {cat?.nameBn || art.categoryId}
                        </span>
                        <span className="text-[11px] text-stone-500">{art.location}</span>
                      </td>

                      {/* Toggles */}
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => toggleFeatured(art)}
                            title={art.isFeatured ? 'হিরো স্টোরি হতে বাদ দিন' : 'হিরো স্টোরি করুন'}
                            className={`p-1 rounded transition ${
                              art.isFeatured
                                ? 'bg-amber-100 text-amber-700'
                                : 'text-stone-300 hover:text-amber-500'
                            }`}
                          >
                            <Star className={`w-4 h-4 ${art.isFeatured ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => toggleBreaking(art)}
                            title={art.isBreaking ? 'ব্রেকিং স্ট্যাটাস সরান' : 'ব্রেকিং নিউজ চিহ্নিত করুন'}
                            className={`p-1 rounded transition ${
                              art.isBreaking
                                ? 'bg-red-100 text-red-600'
                                : 'text-stone-300 hover:text-red-500'
                            }`}
                          >
                            <Flame className={`w-4 h-4 ${art.isBreaking ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                            art.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : art.status === 'draft'
                              ? 'bg-stone-200 text-stone-700'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {art.status === 'published' ? 'প্রকাশিত' : art.status === 'draft' ? 'খসড়া' : 'আর্কাইভ'}
                        </span>
                      </td>

                      {/* Views */}
                      <td className="px-4 py-3 whitespace-nowrap text-stone-600 font-mono">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-stone-400" />
                          <span>{toBengaliNumber(art.views || 0)}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            to={`/news/${art.slug}`}
                            target="_blank"
                            className="p-1.5 text-stone-400 hover:text-stone-700 rounded hover:bg-stone-100"
                            title="লাইভ দেখুন"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to={`/admin/news/edit/${art.id}`}
                            className="p-1.5 text-blue-600 hover:text-blue-800 rounded hover:bg-blue-50"
                            title="সম্পাদনা করুন"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(art.id, art.titleBn)}
                            className="p-1.5 text-red-600 hover:text-red-800 rounded hover:bg-red-50"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
