import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Image,
  Globe,
  Flame,
  Star,
  CheckCircle,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NewsArticle } from '../../types';

export const AdminNewsEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { articles, categories, addArticle, updateArticle, currentUser } = useApp();

  const existingArticle = isEdit ? articles.find((a) => a.id === id) : null;

  // Form states
  const [titleBn, setTitleBn] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [location, setLocation] = useState('রামপাল, বাগেরহাট');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [isBreaking, setIsBreaking] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<'published' | 'draft' | 'archived' | 'scheduled'>('published');
  const [tagsInput, setTagsInput] = useState('রামপাল, সংবাদ, দক্ষিণাঞ্চল');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  const [showSeo, setShowSeo] = useState(false);
  const [message, setMessage] = useState('');

  // Load existing article data if editing
  useEffect(() => {
    if (existingArticle) {
      setTitleBn(existingArticle.titleBn);
      setTitleEn(existingArticle.titleEn || '');
      setSlug(existingArticle.slug);
      setSubtitle(existingArticle.subtitle || '');
      setCategoryId(existingArticle.categoryId);
      setLocation(existingArticle.location);
      setSummary(existingArticle.summary || '');
      setContent(existingArticle.content);
      setFeaturedImage(existingArticle.featuredImage);
      setImageCaption(existingArticle.imageCaption || '');
      setIsBreaking(existingArticle.isBreaking || false);
      setIsFeatured(existingArticle.isFeatured || false);
      setStatus(existingArticle.status);
      setTagsInput(existingArticle.tags ? existingArticle.tags.join(', ') : '');
      setSeoTitle(existingArticle.seo?.title || '');
      setSeoDescription(existingArticle.seo?.description || '');
      setSeoKeywords(existingArticle.seo?.keywords?.join(', ') || '');
    } else if (categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
      setFeaturedImage('https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=800&auto=format&fit=crop');
    }
  }, [existingArticle, categories]);

  // Auto-generate slug from English title or Bengali transliteration
  const handleAutoSlug = () => {
    if (titleEn) {
      setSlug(
        titleEn
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      );
    } else {
      setSlug(`news-${Date.now()}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titleBn.trim()) {
      alert('অনুগ্রহ করে সংবাদের বাংলা শিরোনাম প্রদান করুন।');
      return;
    }

    const generatedSlug = slug.trim() || `news-${Date.now()}`;
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    const articleData = {
      titleBn: titleBn.trim(),
      titleEn: titleEn.trim() || undefined,
      slug: generatedSlug,
      subtitle: subtitle.trim() || undefined,
      categoryId,
      location: location.trim(),
      summary: summary.trim(),
      content: content.trim() || `<p>${summary}</p>`,
      featuredImage: featuredImage.trim() || 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=800&auto=format&fit=crop',
      imageCaption: imageCaption.trim() || undefined,
      isBreaking,
      isFeatured,
      status,
      tags,
      publishedAt: existingArticle?.publishedAt || new Date().toISOString(),
      author: existingArticle?.author || {
        id: currentUser?.id || 'admin-1',
        name: currentUser?.name || 'মুহাম্মদ মুজাহিদ',
        role: currentUser?.role || 'বার্তা সম্পাদক',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
      },
      seo: {
        title: seoTitle.trim() || titleBn.trim(),
        description: seoDescription.trim() || summary.trim() || titleBn.trim(),
        keywords: seoKeywords ? seoKeywords.split(',').map((k) => k.trim()) : tags,
        ogImage: featuredImage.trim(),
      },
    };

    if (isEdit && id) {
      updateArticle(id, articleData);
      setMessage('সংবাদটি সফলভাবে হালনাগাদ করা হয়েছে!');
    } else {
      addArticle(articleData);
      setMessage('সংবাদটি সফলভাবে প্রকাশিত হয়েছে!');
    }

    setTimeout(() => {
      navigate('/admin/news');
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-stone-200 sticky top-16 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/news"
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded hover:bg-stone-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold font-serif-bengali text-stone-900">
              {isEdit ? 'সংবাদ সম্পাদনা' : 'নতুন সংবাদ প্রকাশ করুন'}
            </h1>
            <p className="text-xs text-stone-500">
              রামপাল নিউজ কনটেন্ট ম্যানেজমেন্ট সিস্টেম
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/news')}
            className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-700 hover:bg-stone-100 transition"
          >
            বাতিল
          </button>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-xs font-semibold flex items-center gap-2 transition shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>{isEdit ? 'সংরক্ষণ করুন' : 'সংবাদ প্রকাশ করুন'}</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Main Article Data */}
        <div className="lg:col-span-8 space-y-5">
          {/* Main Content Box */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 space-y-4 shadow-2xs">
            {/* Bengali Headline */}
            <div>
              <label className="block text-xs font-bold text-stone-900 mb-1">
                সংবাদের শিরোনাম (বাংলা) *
              </label>
              <input
                type="text"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                required
                placeholder="যেমন: রামপালে চিংড়ি ঘেরে আকস্মিক জোয়ারে ব্যাপক ক্ষতি..."
                className="w-full text-base font-serif-bengali font-bold border border-stone-300 rounded px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                উপ-শিরোনাম / শোল্ডার (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="শিরোনামের আগে বা নিচে সংক্ষিপ্ত দৃষ্টি আকর্ষণকারী বাক্য..."
                className="w-full text-xs border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* English Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ইংরেজি শিরোনাম (URL তৈরি করতে সাহায্য করে)
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  onBlur={handleAutoSlug}
                  placeholder="e.g. Rampal Shrimp Farmers Face Severe Flood Loss"
                  className="w-full text-xs border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  সংবাদ স্লাগ (URL Slug) *
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  placeholder="rampal-flood-loss-2026"
                  className="w-full text-xs font-mono border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Summary / Excerpt */}
            <div>
              <label className="block text-xs font-bold text-stone-900 mb-1">
                সংবাদ সারসংক্ষেপ (Summary / Excerpt)
              </label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="প্রথম ২-৩ বাক্যে সংবাদের মূল সারমর্ম লিখুন..."
                className="w-full text-xs border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-500"
              ></textarea>
            </div>

            {/* Full Body HTML/Text */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-stone-900">
                  সংবাদের বিস্তারিত বিবরণ (HTML সাপোর্টেড) *
                </label>
                <span className="text-[10px] text-stone-400">অনুচ্ছেদ ও হেডিং যোগ করতে পারেন</span>
              </div>
              <textarea
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="<p>এখানে সংবাদের মূল বিবরণ শুরু করুন...</p>"
                className="w-full text-xs sm:text-sm font-bengali border border-stone-300 rounded p-3 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-500 leading-relaxed font-mono"
              ></textarea>
            </div>
          </div>

          {/* SEO & OpenGraph Box */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-stone-900 font-serif-bengali">
                  সার্চ ইঞ্জিন ও ফেসবুক ওপেনগ্রাফ (SEO / OpenGraph) মেটাট্যাগ
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSeo(!showSeo)}
                className="text-xs text-red-600 hover:underline"
              >
                {showSeo ? 'লুকান' : 'প্রদর্শন করুন'}
              </button>
            </div>

            {showSeo && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    মেটা টাইটেল (SEO Title)
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder={titleBn}
                    className="w-full text-xs border border-stone-300 rounded px-3 py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    মেটা বিবরণ (Facebook/Google Description)
                  </label>
                  <textarea
                    rows={2}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder={summary || 'সংবাদের বিবরণ...'}
                    className="w-full text-xs border border-stone-300 rounded px-3 py-2 focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    কীওয়ার্ডস (কমা দিয়ে আলাদা করুন)
                  </label>
                  <input
                    type="text"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    placeholder="রামপাল, সংবাদ, খুলনা, জাতীয়"
                    className="w-full text-xs border border-stone-300 rounded px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Meta Settings */}
        <div className="lg:col-span-4 space-y-5">
          {/* Publishing Controls */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs space-y-4">
            <h3 className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">
              প্রকাশনা নিয়ন্ত্রণ
            </h3>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                সংবাদ অবস্থা (Status)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full text-xs border border-stone-300 rounded px-3 py-2 bg-stone-50 text-stone-800"
              >
                <option value="published">প্রকাশিত (Published)</option>
                <option value="draft">খসড়া (Draft)</option>
                <option value="archived">আর্কাইভ (Archived)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                সংবাদ বিভাগ (Category) *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full text-xs border border-stone-300 rounded px-3 py-2 bg-stone-50 text-stone-800"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameBn}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ঘটনাস্থল / লোকেশন ট্যাগ
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="রামপাল, বাগেরহাট"
                className="w-full text-xs border border-stone-300 rounded px-3 py-2 text-stone-800"
              />
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span>মূল প্রচ্ছদের হিরো সংবাদ (Featured Story)</span>
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBreaking}
                  onChange={(e) => setIsBreaking(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-600 fill-current" />
                  <span>ব্রেকিং নিউজ টিকার অ্যালার্টে যোগ করুন</span>
                </span>
              </label>
            </div>
          </div>

          {/* Featured Image Box */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-1.5">
              <Image className="w-4 h-4 text-stone-500" />
              <span>মূল ফিচার ছবি (Featured Image)</span>
            </h3>

            {featuredImage && (
              <div className="rounded overflow-hidden border border-stone-200 aspect-[16/10] bg-stone-100">
                <img
                  src={featuredImage}
                  alt="Featured preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ছবির URL
              </label>
              <input
                type="url"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs border border-stone-300 rounded px-2.5 py-1.5 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ছবির ক্যাপশন (Caption)
              </label>
              <input
                type="text"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="ছবি: রামপাল প্রতিনিধি"
                className="w-full text-xs border border-stone-300 rounded px-2.5 py-1.5 focus:outline-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs">
            <label className="block text-xs font-bold text-stone-900 mb-1">
              ট্যাগ সমূহ (কমা দিয়ে আলাদা করুন)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="রামপাল, বাগেরহাট, উপকূল"
              className="w-full text-xs border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
