import React, { useState } from 'react';
import { MessageSquare, Send, ThumbsUp, AlertTriangle, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTimeAgoBengali, toBengaliNumber } from '../utils/bengaliDate';

interface CommentsSectionProps {
  articleId: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ articleId }) => {
  const { getCommentsByArticleId, addComment, currentUser } = useApp();
  const [authorName, setAuthorName] = useState(currentUser?.name || '');
  const [authorEmail, setAuthorEmail] = useState(currentUser?.email || '');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const comments = getCommentsByArticleId(articleId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim()) return;

    addComment({
      articleId,
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim() || 'reader@rampalnews.com',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
      content: content.trim(),
    });

    setContent('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="comment-section mt-10 pt-6 border-t border-stone-200">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-red-600" />
        <h3 className="text-xl font-bold font-serif-bengali text-stone-900">
          পাঠকের মন্তব্য ({toBengaliNumber(comments.length)})
        </h3>
      </div>

      {/* Comment Form */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-5 mb-8">
        <h4 className="text-sm font-bold text-stone-800 mb-2">
          আপনার সুচিন্তিত মতামত জানান
        </h4>
        <p className="text-xs text-stone-500 mb-3">
          অশালীন বা উদ্দেশ্যপ্রণোদিত বক্তব্য পরিহার করুন। গঠনমূলক মতামত প্রকাশের জন্য আমরা উৎসাহিত করি।
        </p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ধন্যবাদ! আপনার মন্তব্যটি সফলভাবে প্রকাশিত হয়েছে।</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="আপনার নাম *"
                  required
                  className="w-full text-xs border border-stone-300 rounded px-3 py-2 bg-white text-stone-800 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="ইমেইল (ঐচ্ছিক)"
                  className="w-full text-xs border border-stone-300 rounded px-3 py-2 bg-white text-stone-800 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                placeholder="আপনার মন্তব্য এখানে লিখুন..."
                required
                className="w-full text-xs border border-stone-300 rounded px-3 py-2 bg-white text-stone-800 focus:outline-none focus:border-red-500 resize-y"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 transition"
            >
              <Send className="w-3 h-3" />
              <span>মন্তব্য পোস্ট করুন</span>
            </button>
          </form>
        )}
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.map((com) => (
          <div
            key={com.id}
            className="bg-white border border-stone-100 rounded-lg p-3.5 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 text-xs font-bold">
                  {com.authorName.charAt(0)}
                </div>
                <span className="font-bold text-xs text-stone-900">{com.authorName}</span>
              </div>
              <span className="text-[11px] text-stone-400">
                {formatTimeAgoBengali(com.createdAt)}
              </span>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed pl-9">
              {com.content}
            </p>

            <div className="pl-9 pt-2 flex items-center gap-4 text-[11px] text-stone-400">
              <button
                onClick={() => alert('মতামতটি সমর্থন করার জন্য ধন্যবাদ!')}
                className="hover:text-red-600 flex items-center gap-1"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>পছন্দ ({toBengaliNumber(com.likes || 0)})</span>
              </button>
              <button
                onClick={() => alert('মন্তব্যটি পর্যালোচনার জন্য রিপোর্টেড হয়েছে।')}
                className="hover:text-red-600 flex items-center gap-1"
              >
                <AlertTriangle className="w-3 h-3" />
                <span>রিপোর্ট</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
