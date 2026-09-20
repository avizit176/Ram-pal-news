import React, { useState } from 'react';
import { Plus, Megaphone, Power, Trash2, Edit, CheckCircle, ExternalLink, Code } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdPlacement, Advertisement } from '../../types';

export const AdminAds: React.FC = () => {
  const { ads, addAd, updateAd, deleteAd } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [placement, setPlacement] = useState<AdPlacement>('header');
  const [type, setType] = useState<'banner' | 'adsterra_code'>('banner');
  const [imageUrl, setImageUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [code, setCode] = useState('');

  const placementLabels: Record<AdPlacement, string> = {
    header: 'হেডার ব্যানার (Header)',
    homepage_top: 'হোমপেজ শীর্ষ (Homepage Top)',
    homepage_hero_below: 'মূল সংবাদের নিচে (Below Hero)',
    between_news: 'সংবাদের মাঝে (Between News)',
    sidebar: 'সাইডবার ব্যানার (Sidebar)',
    article_top: 'আর্টিকেল শীর্ষ (Article Top)',
    article_bottom: 'আর্টিকেল নিচে (Article Bottom)',
    footer: 'ফুটার ব্যানার (Footer)',
    mobile_sticky: 'মোবাইল স্টিকি (Mobile Sticky)',
    desktop_sticky: 'ডেস্কটপ স্টিকি (Desktop Sticky)',
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setPlacement('header');
    setType('banner');
    setImageUrl('');
    setTargetUrl('');
    setCode('');
    setShowModal(true);
  };

  const handleOpenEdit = (ad: Advertisement) => {
    setEditingId(ad.id);
    setName(ad.name);
    setPlacement(ad.placement);
    setType(ad.type as any || 'banner');
    setImageUrl(ad.imageUrl || '');
    setTargetUrl(ad.targetUrl || '');
    setCode(ad.code || '');
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const adData = {
      name: name.trim(),
      placement,
      type,
      imageUrl: type === 'banner' ? imageUrl.trim() : undefined,
      targetUrl: type === 'banner' ? targetUrl.trim() : undefined,
      code: type === 'adsterra_code' ? code.trim() : undefined,
      active: true,
    };

    if (editingId) {
      updateAd(editingId, adData);
    } else {
      addAd(adData);
    }

    setShowModal(false);
  };

  const toggleActive = (id: string, current: boolean) => {
    updateAd(id, { active: !current });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif-bengali text-stone-900 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-red-600" />
            <span>বিজ্ঞাপন ও Adsterra কোড ব্যবস্থাপনা</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            হেডার, সাইডবার, ও সংবাদ পাতায় ব্যানার বা Adsterra স্ক্রিপ্ট স্থাপন করুন
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন বিজ্ঞাপন স্লট যোগ</span>
        </button>
      </div>

      {/* Info notice about Adsterra */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 flex items-start gap-3">
        <Code className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Adsterra সাপোর্ট:</strong> আপনি চাইলে স্পন্সরড ইমেজ ব্যানার অথবা Adsterra এর অফিসিয়াল ব্যানার/সোশ্যাল বার এইচটিএমএল কোড সরাসরি পেস্ট করে যেকোনো স্লটে চালু করতে পারেন।
        </p>
      </div>

      {/* Ad Slots List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className={`bg-white border rounded-lg p-4 shadow-2xs flex flex-col justify-between transition ${
              ad.active ? 'border-stone-200' : 'border-stone-200 bg-stone-50/70 opacity-75'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                  {placementLabels[ad.placement] || ad.placement}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    ad.active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {ad.active ? 'সক্রিয়' : 'বন্ধ'}
                </span>
              </div>

              <h3 className="font-bold text-stone-900 text-sm mb-2">{ad.name}</h3>

              {ad.imageUrl && (
                <div className="rounded overflow-hidden border border-stone-200 mb-3 max-h-32 bg-stone-100">
                  <img src={ad.imageUrl} alt={ad.name} className="w-full h-full object-cover" />
                </div>
              )}

              {ad.code && (
                <div className="bg-stone-900 text-stone-300 font-mono text-[10px] p-2 rounded max-h-20 overflow-hidden mb-3">
                  {ad.code}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                onClick={() => toggleActive(ad.id, Boolean(ad.active))}
                className={`flex items-center gap-1 font-semibold px-2 py-1 rounded transition ${
                  ad.active ? 'text-emerald-700 hover:bg-emerald-50' : 'text-stone-500 hover:bg-stone-200'
                }`}
              >
                <Power className="w-3.5 h-3.5" />
                <span>{ad.active ? 'চালু আছে' : 'বন্ধ করুন'}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(ad)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('মুছে ফেলতে চান?')) deleteAd(ad.id);
                  }}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add / Edit Ad */}
      {showModal && (
        <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-base text-stone-900 border-b pb-2">
              {editingId ? 'বিজ্ঞাপন স্লট সম্পাদনা' : 'নতুন বিজ্ঞাপন তৈরি'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  বিজ্ঞাপনের নাম বা টাইটেল *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="যেমন: রামপাল এগ্রো স্পন্সর ব্যানার"
                  className="w-full text-xs border rounded p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    প্রদর্শনের স্থান (Placement)
                  </label>
                  <select
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value as any)}
                    className="w-full text-xs border rounded p-2"
                  >
                    {Object.entries(placementLabels).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    বিজ্ঞাপনের ধরন
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full text-xs border rounded p-2"
                  >
                    <option value="banner">ইমেজ ব্যানার (Banner)</option>
                    <option value="adsterra_code">Adsterra স্ক্রিপ্ট কোড</option>
                  </select>
                </div>
              </div>

              {type === 'banner' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ব্যানার ছবির লিংক (Image URL)
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full text-xs border rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      টার্গেট ওয়েবসাইটের লিংক (Target URL)
                    </label>
                    <input
                      type="url"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full text-xs border rounded p-2"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Adsterra বা HTML স্ক্রিপ্ট কোড
                  </label>
                  <textarea
                    rows={4}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="<script>...</script>"
                    className="w-full text-xs font-mono border rounded p-2"
                  ></textarea>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded text-xs font-bold"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
