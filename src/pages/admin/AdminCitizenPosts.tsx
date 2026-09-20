import React, { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Trash2,
  Share2,
  FileCheck,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ThumbsUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTimeAgoBengali, toBengaliNumber } from '../../utils/bengaliDate';

export const AdminCitizenPosts: React.FC = () => {
  const { userPosts, updateUserPostStatus, deleteUserPost, convertUserPostToNews, categories } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [successMessage, setSuccessMessage] = useState('');

  const filteredPosts = userPosts.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const handleApprove = (id: string) => {
    updateUserPostStatus(id, 'approved');
    setSuccessMessage('পোস্টটি অনুমোদিত হয়েছে এবং পাবলিক ফিডে দৃশ্যমান!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleReject = (id: string) => {
    updateUserPostStatus(id, 'rejected');
    setSuccessMessage('পোস্টটি বাতিল করা হয়েছে।');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে পোস্টটি মুছে ফেলতে চান?')) {
      deleteUserPost(id);
    }
  };

  const handleConvertToNews = (post: any) => {
    convertUserPostToNews(post.id);
    setSuccessMessage('অভিনন্দন! নাগরিক সংবাদটি মূল সংবাদ পোর্টালে প্রকাশিত সংবাদের রূপ নিয়েছে!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif-bengali text-stone-900">
            নাগরিক সংবাদ ও মতামত মডারেশন
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            পাঠকদের পাঠানো তথ্য যাচাই, অনুমোদন ও মূল সংবাদে রূপান্তর করুন
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-md text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded font-medium transition ${
              filter === 'all' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-600'
            }`}
          >
            সব ({toBengaliNumber(userPosts.length)})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded font-medium transition ${
              filter === 'pending' ? 'bg-amber-500 text-white shadow-2xs font-bold' : 'text-stone-600'
            }`}
          >
            অপেক্ষমাণ ({toBengaliNumber(userPosts.filter((p) => p.status === 'pending').length)})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded font-medium transition ${
              filter === 'approved' ? 'bg-emerald-600 text-white shadow-2xs font-bold' : 'text-stone-600'
            }`}
          >
            অনুমোদিত
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1.5 rounded font-medium transition ${
              filter === 'rejected' ? 'bg-red-600 text-white shadow-2xs font-bold' : 'text-stone-600'
            }`}
          >
            বাতিল
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-lg p-12 text-center text-stone-400">
            এই ফিল্টারে কোনো নাগরিক সংবাদ নেই।
          </div>
        ) : (
          filteredPosts.map((post) => {
            const cat = categories.find((c) => c.id === post.categoryId);
            return (
              <div
                key={post.id}
                className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs space-y-3 hover:shadow-xs transition"
              >
                {/* Author & Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-stone-900 text-sm">{post.authorName}</h4>
                        {post.authorPhone && (
                          <span className="text-stone-500 text-xs flex items-center gap-1 font-mono">
                            <Phone className="w-3 h-3" />
                            <span>{post.authorPhone}</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                        <span className="flex items-center gap-0.5 text-red-600 font-medium">
                          <MapPin className="w-3 h-3" />
                          <span>{post.location}</span>
                        </span>
                        <span>•</span>
                        <span>{formatTimeAgoBengali(post.createdAt)}</span>
                        <span>•</span>
                        <span className="font-medium text-stone-600">{cat?.nameBn || post.categoryId}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`text-xs px-2.5 py-1 rounded font-semibold ${
                      post.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : post.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {post.status === 'approved'
                      ? '✓ অনুমোদিত'
                      : post.status === 'pending'
                      ? '⏳ পর্যালোচনায়'
                      : '✕ বাতিল'}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-base font-serif-bengali text-stone-900 mb-1.5">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Image if present */}
                {post.images && post.images.length > 0 && post.images[0] && (
                  <div className="rounded overflow-hidden max-h-64 max-w-md bg-stone-100 border border-stone-200">
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Video URL if present */}
                {post.videoUrl && (
                  <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                    ভিডিও লিংক: <a href={post.videoUrl} target="_blank" rel="noopener noreferrer" className="underline">{post.videoUrl}</a>
                  </div>
                )}

                {/* Actions Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{toBengaliNumber(post.likesCount || 0)} সমর্থন</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Approve button */}
                    {post.status !== 'approved' && (
                      <button
                        onClick={() => handleApprove(post.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded flex items-center gap-1 transition"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>অনুমোদন করুন</span>
                      </button>
                    )}

                    {/* Reject button */}
                    {post.status !== 'rejected' && (
                      <button
                        onClick={() => handleReject(post.id)}
                        className="bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold px-3 py-1.5 rounded flex items-center gap-1 transition"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>বাতিল</span>
                      </button>
                    )}

                    {/* Convert to full news article */}
                    <button
                      onClick={() => handleConvertToNews(post)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded flex items-center gap-1 transition"
                      title="এই নাগরিক বার্তাটি নিয়ে মূল সংবাদ পোর্টালে ফুল আর্টিকেল প্রকাশ করুন"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>মূল সংবাদে রূপান্তর</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
