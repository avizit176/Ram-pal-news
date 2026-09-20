import React, { useState } from 'react';
import { Image, MapPin, Send, Video, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CitizenNewsComposer: React.FC<{ onPostCreated?: () => void }> = ({ onPostCreated }) => {
  const { currentUser, addUserPost, categories } = useApp();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('রামপাল, বাগেরহাট');
  const [categoryId, setCategoryId] = useState('cat-rampal');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addUserPost({
      userId: currentUser?.id || 'guest-' + Date.now(),
      authorName: currentUser?.name || 'নাগরিক সাংবাদিক',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      authorPhone: currentUser?.phone || '',
      title: title.trim(),
      content: content.trim(),
      location: location.trim() || 'রামপাল',
      categoryId,
      images: imageUrl.trim() ? [imageUrl.trim()] : [],
      videoUrl: videoUrl.trim() || undefined,
    });

    setTitle('');
    setContent('');
    setImageUrl('');
    setVideoUrl('');
    setShowImageInput(false);
    setShowVideoInput(false);
    setSubmittedMessage(true);

    if (onPostCreated) onPostCreated();

    setTimeout(() => {
      setSubmittedMessage(false);
    }, 6000);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-lg shadow-sm p-4 sm:p-5 mb-6">
      <div className="flex items-center gap-3 pb-3 border-b border-stone-100 mb-3">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
          {currentUser ? currentUser.name.charAt(0) : 'ন'}
        </div>
        <div>
          <h4 className="font-bold text-stone-900 text-base">
            আপনার এলাকার খবর রামপাল নিউজকে জানান
          </h4>
          <p className="text-xs text-stone-500">
            নাগরিক সাংবাদিকতা • তথ্য যাচাইয়ের পর সম্পাদকীয় পর্ষদ অনুমোদন দিলে মূল পাতায় প্রকাশিত হবে
          </p>
        </div>
      </div>

      {submittedMessage ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md p-4 flex items-start gap-3 my-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold">ধন্যবাদ! আপনার সংবাদটি সফলভাবে জমা হয়েছে।</p>
            <p className="text-xs text-emerald-700 mt-1">
              আমাদের মডারেশন ও সত্যতা যাচাই দল সংবাদটি পর্যালোচনা করে অনুমোদন দিলে তা সকলের জন্য প্রকাশিত হবে।
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Headline Input */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="সংবাদের একটি স্পষ্ট শিরোনাম লিখুন (উদা: রামপালে ভাঙা ব্রিজের সংস্কার দাবি)..."
              required
              className="w-full font-serif-bengali text-base font-semibold border border-stone-200 rounded px-3 py-2 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Body content */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              placeholder="ঘটনাটির বিস্তারিত বিবরণ লিখুন: কী ঘটেছে, কখন ঘটেছে এবং কার কী ক্ষতি বা প্রতিক্রিয়া..."
              required
              className="w-full text-sm border border-stone-200 rounded px-3 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-red-500 resize-y"
            ></textarea>
          </div>

          {/* Location & Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-1.5 border border-stone-200 rounded px-2.5 py-1.5 bg-stone-50">
              <MapPin className="w-4 h-4 text-red-600" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="ঘটনাস্থল (যেমন: রামপাল বাজার)"
                className="w-full bg-transparent text-xs text-stone-800 focus:outline-none"
              />
            </div>

            <div className="border border-stone-200 rounded px-2.5 py-1.5 bg-stone-50">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-transparent text-xs text-stone-800 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameBn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Image URL field */}
          {showImageInput && (
            <div className="bg-stone-50 p-2.5 rounded border border-stone-200 space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="ছবির লিংক (Image URL) দিন অথবা নিচের স্যাম্পল ফটো ব্যবহার করুন..."
                  className="w-full text-xs border border-stone-300 rounded px-2.5 py-1.5 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setImageUrl('https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=600&auto=format&fit=crop')}
                  className="text-[11px] text-blue-600 hover:underline bg-white border border-stone-200 px-2 py-0.5 rounded"
                >
                  স্যাম্পল রাস্তা/ব্রিজ ছবি
                </button>
                <button
                  type="button"
                  onClick={() => setImageUrl('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600&auto=format&fit=crop')}
                  className="text-[11px] text-blue-600 hover:underline bg-white border border-stone-200 px-2 py-0.5 rounded"
                >
                  স্যাম্পল কৃষি/গ্রাম ছবি
                </button>
              </div>
            </div>
          )}

          {/* Optional Video URL field */}
          {showVideoInput && (
            <div className="bg-stone-50 p-2.5 rounded border border-stone-200">
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="ভিডিও লিংক (যেমন: YouTube / Facebook ভিডিও URL)..."
                className="w-full text-xs border border-stone-300 rounded px-2.5 py-1.5 focus:outline-none"
              />
            </div>
          )}

          {/* Footer bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowImageInput(!showImageInput)}
                className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded border transition ${
                  showImageInput ? 'bg-red-50 border-red-300 text-red-700' : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Image className="w-3.5 h-3.5 text-emerald-600" />
                <span>ছবি যুক্ত করুন</span>
              </button>

              <button
                type="button"
                onClick={() => setShowVideoInput(!showVideoInput)}
                className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded border transition ${
                  showVideoInput ? 'bg-red-50 border-red-300 text-red-700' : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-blue-600" />
                <span>ভিডিও লিংক</span>
              </button>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded flex items-center gap-1.5 transition shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>খবর জমা দিন</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
