import React, { useState } from 'react';
import { Plus, Trash2, Check, AlertCircle, Link as LinkIcon, Power, ArrowUp, ArrowDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toBengaliNumber } from '../../utils/bengaliDate';

export const AdminBreakingNews: React.FC = () => {
  const { breakingNews, addBreakingNews, updateBreakingNews, deleteBreakingNews } = useApp();
  const [titleBn, setTitleBn] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [priority, setPriority] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn.trim()) return;

    addBreakingNews({
      titleBn: titleBn.trim(),
      linkUrl: linkUrl.trim() || undefined,
      priority: Number(priority) || 1,
      active: true,
    });

    setTitleBn('');
    setLinkUrl('');
    setPriority(1);
    setShowForm(false);
  };

  const toggleActive = (id: string, current: boolean) => {
    updateBreakingNews(id, { active: !current });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif-bengali text-stone-900 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <span>ব্রেকিং নিউজ টিকার ব্যবস্থাপনা</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            ওয়েবসাইটের শীর্ষে চলমান ব্রেকিং নিউজ যোগ ও নিয়ন্ত্রণ করুন
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ব্রেকিং নিউজ লিখুন</span>
        </button>
      </div>

      {/* Creation Modal / Inline Form */}
      {showForm && (
        <div className="bg-white border border-red-200 rounded-lg p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">
            নতুন ব্রেকিং নিউজ সংযোজন
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ব্রেকিং নিউজের শিরোনাম (বাংলা) *
              </label>
              <input
                type="text"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                required
                placeholder="যেমন: রামপালে গ্যাস সিলিন্ডার বিস্ফোরণ, হতাহতের শঙ্কা..."
                className="w-full text-sm font-serif-bengali border border-stone-300 rounded px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  বিস্তারিত সংবাদের লিংক (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="/news/article-slug অথবা পূর্ণ URL"
                  className="w-full text-xs font-mono border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  অগ্রাধিকার ক্রম (১ হলো সর্বোচ্চ)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                  className="w-full text-xs border border-stone-300 rounded px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xs font-semibold"
              >
                টিকারে যুক্ত করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Breaking News List */}
      <div className="bg-white border border-stone-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="divide-y divide-stone-200">
          {breakingNews.length === 0 ? (
            <div className="p-8 text-center text-stone-400 text-xs">
              কোনো ব্রেকিং নিউজ আইটেম নেই।
            </div>
          ) : (
            breakingNews.map((item) => (
              <div
                key={item.id}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                  item.active ? 'bg-white' : 'bg-stone-50 opacity-70'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-bold font-mono ${
                      item.active ? 'bg-red-600 text-white' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    ক্রম: {toBengaliNumber(item.priority)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-stone-900 font-serif-bengali text-sm leading-snug">
                      {item.titleBn}
                    </p>
                    {item.linkUrl && (
                      <p className="text-[11px] text-stone-400 font-mono flex items-center gap-1 mt-0.5 truncate">
                        <LinkIcon className="w-3 h-3" />
                        <span>{item.linkUrl}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => toggleActive(item.id, item.active)}
                    className={`text-xs px-3 py-1.5 rounded font-semibold flex items-center gap-1 transition ${
                      item.active
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                    }`}
                  >
                    <Power className="w-3 h-3" />
                    <span>{item.active ? 'সক্রিয় আছে' : 'নিষ্ক্রিয়'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('মুছে ফেলতে চান?')) deleteBreakingNews(item.id);
                    }}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
