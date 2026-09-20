import React from 'react';
import { CitizenNewsComposer } from '../components/CitizenNewsComposer';
import { CitizenNewsFeed } from '../components/CitizenNewsFeed';
import { Users, Shield, CheckCircle2, Award } from 'lucide-react';

export const CitizenPostsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page Hero */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-lg p-6 mb-8 border-b-4 border-red-600 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-600 text-white rounded">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-bengali">
              রামপাল নাগরিক সাংবাদিকতা মঞ্চ
            </h1>
            <p className="text-xs text-stone-300">
              আপনার চারপাশের সত্য ঘটনা ও উন্নয়নবার্তা তুলে ধরুন সবার আগে
            </p>
          </div>
        </div>

        {/* Guidelines bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-stone-700 text-xs text-stone-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>সরাসরি প্রত্যক্ষদর্শী তথ্য ও স্পষ্ট ছবি আপলোড করুন।</span>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <span>কোনো প্রকার গুজব বা বিভ্রান্তিকর তথ্য ছড়ানো সম্পূর্ণ নিষিদ্ধ।</span>
          </div>
          <div className="flex items-start gap-2">
            <Award className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <span>সম্পাদকীয় দলের যাচাইয়ের পর অনুমোদন দেওয়া হবে।</span>
          </div>
        </div>
      </div>

      {/* Composer */}
      <CitizenNewsComposer />

      {/* Verified Feed */}
      <div className="mt-8">
        <h3 className="text-xl font-bold font-serif-bengali text-stone-900 mb-4 flex items-center gap-2">
          <span className="w-2.5 h-5 bg-red-600"></span>
          <span>অনুমোদিত নাগরিক সংবাদসমূহ</span>
        </h3>
        <CitizenNewsFeed />
      </div>
    </div>
  );
};
