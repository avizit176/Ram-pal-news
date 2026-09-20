import React from 'react';
import { ThumbsUp, MapPin, CheckCircle, Clock, Share2, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTimeAgoBengali, toBengaliNumber } from '../utils/bengaliDate';

export const CitizenNewsFeed: React.FC = () => {
  const { userPosts, likeUserPost, categories } = useApp();

  // Only approved or published posts are shown to public visitors
  const approvedPosts = userPosts.filter(
    (p) => p.status === 'approved' || p.status === 'published'
  );

  const getCategoryName = (catId: string) => {
    return categories.find((c) => c.id === catId || c.slug === catId)?.nameBn || 'নাগরিক বার্তা';
  };

  if (approvedPosts.length === 0) {
    return (
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 text-center text-stone-500 text-sm">
        বর্তমানে কোনো অনুমোদিত নাগরিক সংবাদ নেই। আপনার এলাকার খবর সবার আগে পাঠাতে উপরের ফরমটি পূরণ করুন।
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {approvedPosts.map((post) => (
        <article
          key={post.id}
          className="bg-white border border-stone-200 rounded-lg shadow-2xs hover:shadow-xs transition p-4 sm:p-5"
        >
          {/* Post Author Header */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'}
                alt={post.authorName}
                className="w-10 h-10 rounded-full object-cover border border-stone-200"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h5 className="font-bold text-stone-900 text-sm">{post.authorName}</h5>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5" title="রামপাল নিউজ দ্বারা যাচাইকৃত নাগরিক বার্তা">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>যাচাইকৃত</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <span className="flex items-center gap-0.5 text-red-600 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>{post.location}</span>
                  </span>
                  <span>•</span>
                  <span>{formatTimeAgoBengali(post.createdAt)}</span>
                </div>
              </div>
            </div>

            <span className="text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded">
              {getCategoryName(post.categoryId)}
            </span>
          </div>

          {/* Title & Body */}
          <h4 className="font-serif-bengali font-bold text-lg text-stone-900 mb-2 leading-snug">
            {post.title}
          </h4>
          <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line mb-3">
            {post.content}
          </p>

          {/* Attached image if present */}
          {post.images && post.images.length > 0 && post.images[0] && (
            <div className="mb-3 rounded-lg overflow-hidden max-h-96 bg-stone-100 border border-stone-200">
              <img
                src={post.images[0]}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs text-stone-600">
            <button
              onClick={() => likeUserPost(post.id)}
              className="flex items-center gap-1.5 hover:text-red-600 transition font-medium px-2 py-1 rounded hover:bg-stone-50"
            >
              <ThumbsUp className="w-4 h-4 text-stone-500" />
              <span>সমর্থন ({toBengaliNumber(post.likesCount || 0)})</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: post.title, text: post.content, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(`${post.title}\n${window.location.href}`);
                    alert('লিংক কপি করা হয়েছে!');
                  }
                }}
                className="flex items-center gap-1 text-stone-500 hover:text-stone-800 transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>শেয়ার</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
