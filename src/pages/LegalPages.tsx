import React from 'react';
import { useApp } from '../context/AppContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold font-serif-bengali text-stone-900 mb-2">
        গোপনীয়তা নীতি (Privacy Policy)
      </h1>
      <p className="text-xs text-stone-500 mb-6">সর্বশেষ হালনাগাদ: মার্চ ২০২৬</p>

      <div className="prose prose-stone max-w-none text-stone-800 space-y-4 text-sm sm:text-base leading-relaxed">
        <p>
          <strong>{settings.websiteNameBn}</strong> (Rampal News) পাঠকদের ব্যক্তিগত তথ্যের গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেয়। এই গোপনীয়তা নীতিতে ব্যাখ্যা করা হয়েছে যে আপনি যখন আমাদের পোর্টাল ব্যবহার করেন, তখন আমরা কীভাবে তথ্য সংগ্রহ, ব্যবহার ও সংরক্ষণ করি।
        </p>

        <h3 className="text-lg font-bold font-serif-bengali text-stone-900 pt-3">
          ১. আমরা কী তথ্য সংগ্রহ করি
        </h3>
        <p>
          - ব্যবহারকারীর নাম এবং ইমেইল (যখন মন্তব্য পোস্ট বা অ্যাকাউন্ট নিবন্ধন করা হয়)
          <br />
          - নাগরিক সাংবাদিক হিসেবে পোস্টের সাথে জমাকৃত ছবি, বিবরণ ও যোগাযোগের ফোন নম্বর
          <br />
          - ওয়েবসাইট ভিজিটের সাধারণ লগ ও ব্রাউজিং তথ্য (কুকি ও অ্যানালিটিক্স দ্বারা সংগৃহীত)
        </p>

        <h3 className="text-lg font-bold font-serif-bengali text-stone-900 pt-3">
          ২. তথ্যের ব্যবহার ও নিরাপত্তা
        </h3>
        <p>
          আপনার সংগৃহীত ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রয় বা হস্তান্তর করা হয় না। তথ্যের সুরক্ষা নিশ্চিত করতে আধুনিক এনক্রিপশন ও সিকিউর প্রোটোকল ব্যবহার করা হয়।
        </p>

        <h3 className="text-lg font-bold font-serif-bengali text-stone-900 pt-3">
          ৩. কুকি ও বিজ্ঞাপন
        </h3>
        <p>
          আমাদের পোর্টালে ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে কুকি সংরক্ষিত হতে পারে। এছাড়াও Adsterra বা Google AdSense এর মতো অনুমোদিত বিজ্ঞাপন অংশীদারদের বিজ্ঞাপন প্রদর্শিত হতে পারে যা তাদের নিজস্ব গোপনীয়তা নীতি অনুযায়ী পরিচালিত হয়।
        </p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold font-serif-bengali text-stone-900 mb-2">
        ব্যবহারের শর্তাবলী (Terms & Conditions)
      </h1>
      <p className="text-xs text-stone-500 mb-6">সর্বশেষ হালনাগাদ: মার্চ ২০২৬</p>

      <div className="prose prose-stone max-w-none text-stone-800 space-y-4 text-sm sm:text-base leading-relaxed">
        <p>
          <strong>{settings.websiteNameBn}</strong> এ স্বাগতম। এই ওয়েবসাইটটি ব্যবহারের মাধ্যমে আপনি নিচের শর্তাবলী মেনে নিতে সম্মতি জ্ঞাপন করছেন:
        </p>

        <h3 className="text-lg font-bold font-serif-bengali text-stone-900 pt-3">
          ১. কনটেন্টের কপিরাইট
        </h3>
        <p>
          রামপাল নিউজে প্রকাশিত সকল সংবাদ প্রতিবেদন, বিশেষ ফিচার, ছবি, অডিও এবং ভিডিও সামগ্রী কপিরাইট আইন দ্বারা সুরক্ষিত। পূর্বানুমতি ব্যতিরেকে কোনো উপাদান হুবহু নকল বা ব্যবসায়িক উদ্দেশ্যে ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।
        </p>

        <h3 className="text-lg font-bold font-serif-bengali text-stone-900 pt-3">
          ২. নাগরিক সংবাদ ও মন্তব্য নীতিমালা
        </h3>
        <p>
          - ব্যবহারকারী কোনো ভুয়া খবর, মানহানিকর বক্তব্য বা উস্কানিমূলক তথ্য প্রকাশ করতে পারবেন না।
          <br />
          - সম্পাদকীয় দল যে কোনো অসঙ্গতিপূর্ণ মন্তব্য বা ব্যবহারকারীর পোস্ট বাতিল করার অধিকার সংরক্ষণ করে।
        </p>

        <h3 className="text-lg font-bold font-serif-bengali text-stone-900 pt-3">
          ৩. বহিরাগত লিংক
        </h3>
        <p>
          জনপ্রিয় জাতীয় দৈনিকগুলোর যে লিংকগুলো আমাদের সাইটে দেওয়া হয়েছে, সেগুলো পাঠকদের সুবিধার জন্য সরাসরি তাদের নিজস্ব পোর্টালে রিডাইরেক্ট করে। সংশ্লিষ্ট পত্রিকার কনটেন্টের দায়ভার সম্পূর্ণ তাদের।
        </p>
      </div>
    </div>
  );
};
