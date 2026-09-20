import React from 'react';
import { PopularNewspapers } from '../components/PopularNewspapers';
import { ExternalLink, ShieldCheck, Newspaper } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PopularNewspapersPage: React.FC = () => {
  const { newspapers } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="bg-stone-900 text-white rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-red-600 rounded">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif-bengali">
              জনপ্রিয় জাতীয় ও আন্তর্জাতিক দৈনিক পত্রিকা
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              এক ক্লিকেই পৌঁছে যান আপনার পছন্দের শীর্ষ দৈনিকগুলোর অফিশিয়াল ওয়েব সংস্করণে
            </p>
          </div>
        </div>

        <div className="bg-stone-800/80 border border-stone-700 rounded p-3 text-xs text-stone-300 flex items-start gap-2 mt-4">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>আইনি ও কপিরাইট নির্দেশনা:</strong> রামপাল নিউজ কোনো সংবাদপত্রের কপিরাইটযুক্ত নিবন্ধ বা কনটেন্ট কপি বা অনুলিপি করে না। পাঠকদের সুবিধার্থে এখানে কেবল তাদের অফিসিয়াল পোর্টালের সরাসরি বহিরাগত লিংক দেওয়া হয়েছে।
          </p>
        </div>
      </div>

      <PopularNewspapers />

      {/* Grid of full cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {newspapers.map((paper) => (
          <div
            key={paper.id}
            className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {paper.shortLabel || 'শীর্ষ দৈনিক'}
                </span>
                <span className="text-[11px] text-stone-400">বহিরাগত লিংক</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                {paper.logoUrl ? (
                  <img
                    src={paper.logoUrl}
                    alt={paper.nameBn}
                    className="w-12 h-12 rounded object-cover border border-stone-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded bg-stone-100 flex items-center justify-center font-bold text-stone-600 text-lg">
                    {paper.nameBn.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-stone-900 font-serif-bengali text-lg">
                    {paper.nameBn}
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">{paper.nameEn}</p>
                </div>
              </div>

              <p className="text-xs text-stone-600 line-clamp-2">
                দেশের শীর্ষ জনপ্রিয় বাংলা সংবাদপত্র। সরাসরি পত্রিকার অফিশিয়াল পোর্টালে ভিজিট করুন।
              </p>
            </div>

            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full bg-stone-900 hover:bg-red-700 text-white font-medium text-xs py-2 rounded text-center flex items-center justify-center gap-1.5 transition"
            >
              <span>ওয়েবসাইটে প্রবেশ করুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
