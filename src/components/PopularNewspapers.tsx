import React from 'react';
import { ExternalLink, Globe, Newspaper } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PopularNewspapers: React.FC = () => {
  const { newspapers } = useApp();
  const activeNewspapers = newspapers
    .filter((n) => n.active)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="my-8 bg-stone-100 border border-stone-200 rounded-lg p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-300 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-red-600 text-white rounded">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 font-serif-bengali">
              জনপ্রিয় জাতীয় দৈনিক
            </h3>
            <p className="text-xs text-stone-500">
              সরাসরি মূল সংবাদপত্রগুলোর অফিশিয়াল ওয়েবসাইটে ভিজিট করুন
            </p>
          </div>
        </div>

        <span className="text-[11px] text-stone-500 italic">
          *কপিরাইট আইন অনুযায়ী সংশ্লিষ্ট পত্রিকার মূল ওয়েবসাইট প্রদর্শিত হবে
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
        {activeNewspapers.map((paper) => (
          <a
            key={paper.id}
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-stone-200 hover:border-red-500 hover:shadow-sm rounded-md p-3 flex flex-col justify-between transition group"
          >
            <div className="flex items-start justify-between gap-1 mb-2">
              <span className="text-[10px] font-semibold text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded">
                {paper.shortLabel || 'দৈনিক পত্রিকা'}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-red-600 transition" />
            </div>

            <div className="flex items-center gap-2">
              {paper.logoUrl ? (
                <img
                  src={paper.logoUrl}
                  alt={paper.nameBn}
                  className="w-7 h-7 rounded-full object-cover border border-stone-200"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-red-50 text-red-700 flex items-center justify-center text-xs font-bold">
                  {paper.nameBn.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <h5 className="font-bold text-stone-900 font-serif-bengali text-sm group-hover:text-red-700 transition truncate">
                  {paper.nameBn}
                </h5>
                <p className="text-[10px] text-stone-400 truncate">{paper.nameEn}</p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-red-600 font-semibold group-hover:underline">
              <span>অনলাইন পড়ুন</span>
              <span>→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
