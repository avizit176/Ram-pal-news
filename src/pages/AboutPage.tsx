import React from 'react';
import { Shield, Target, Award, Users, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="border-b border-stone-200 pb-6 mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-bengali text-stone-900 mb-2">
          আমাদের সম্পর্কে (About Us)
        </h1>
        <p className="text-sm text-stone-500 font-sans tracking-wide uppercase">
          {settings.websiteNameEn} • {settings.sloganBn}
        </p>
      </div>

      <div className="prose prose-stone max-w-none text-stone-800 space-y-6 text-sm sm:text-base leading-relaxed">
        <p>
          <strong>{settings.websiteNameBn} (Rampal News)</strong> বাগেরহাটের রামপাল উপজেলা, মোংলা সমুদ্রবন্দর ও সুন্দরবন উপকূলীয় অঞ্চলসহ গোটা বাংলাদেশের উন্নয়ন, রাজনীতি, সমাজ, সংস্কৃতি ও মানুষের জীবনের গল্প নিরপেক্ষভাবে তুলে ধরার প্রত্যয় নিয়ে যাত্রা শুরু করেছে।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 not-prose">
          <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs">
            <div className="p-2 bg-red-100 text-red-600 rounded w-max mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="font-bold font-serif-bengali text-base mb-1">আমাদের লক্ষ্য</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              উপকূলের প্রত্যন্ত জনপদের মানুষের সুখ-দুঃখ, সম্ভাবনা ও সমস্যার কথা জাতীয় ও আন্তর্জাতিক স্তরে যথাযথ মর্যাদায় তুলে ধরা।
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded w-max mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold font-serif-bengali text-base mb-1">সম্পাদকীয় সততা</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              কোনো দলীয় পক্ষপাতিত্ব বা গুজবের স্থান এখানে নেই। প্রতিটি সংবাদ যাচাই করে প্রকাশ করা হয়।
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold font-serif-bengali text-stone-900 pt-4">
          সম্পাদকীয় ও ব্যবস্থাপনা পর্ষদ
        </h3>
        <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-sm space-y-2">
          <p><strong>সম্পাদক ও প্রকাশক:</strong> মুহাম্মদ মুজাহিদ</p>
          <p><strong>নির্বাহী সম্পাদক:</strong> শেখ সালাহউদ্দিন</p>
          <p><strong>প্রধান বার্তা সম্পাদক:</strong> আনিসুর রহমান</p>
          <p><strong>আইনি উপদেষ্টা:</strong> অ্যাডভোকেট কে. এম. রফিকুল ইসলাম</p>
          <p><strong>প্রধান কার্যালয়:</strong> {settings.address}</p>
        </div>

        <h3 className="text-xl font-bold font-serif-bengali text-stone-900 pt-4">
          নাগরিক সাংবাদিকতার ভূমিকা
        </h3>
        <p>
          রামপাল নিউজ বিশ্বাস করে সংবাদমাধ্যম শুধু একমুখী সম্প্রচার নয়। এজন্য আমাদের পোর্টালে যুক্ত করা হয়েছে বিশেষ নাগরিক সাংবাদিকতা মঞ্চ, যেখানে স্থানীয় জনসাধারণ সরাসরি তাদের এলাকার খবর, ছবি ও সমস্যা পাঠাতে পারেন।
        </p>
      </div>
    </div>
  );
};
