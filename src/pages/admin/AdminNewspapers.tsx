import React, { useState } from 'react';
import { Plus, Newspaper, ExternalLink, Power, Trash2, Edit } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PopularNewspaper } from '../../types';

export const AdminNewspapers: React.FC = () => {
  const { newspapers, addNewspaper, updateNewspaper, deleteNewspaper } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [url, setUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [shortLabel, setShortLabel] = useState('দৈনিক');
  const [order, setOrder] = useState(1);

  const handleOpenAdd = () => {
    setEditingId(null);
    setNameBn('');
    setNameEn('');
    setUrl('');
    setLogoUrl('');
    setShortLabel('দৈনিক');
    setOrder(newspapers.length + 1);
    setShowModal(true);
  };

  const handleOpenEdit = (paper: PopularNewspaper) => {
    setEditingId(paper.id);
    setNameBn(paper.nameBn);
    setNameEn(paper.nameEn);
    setUrl(paper.url);
    setLogoUrl(paper.logoUrl || '');
    setShortLabel(paper.shortLabel || 'দৈনিক');
    setOrder(paper.order);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameBn || !url) return;

    const paperData = {
      nameBn: nameBn.trim(),
      nameEn: nameEn.trim() || nameBn.trim(),
      url: url.trim(),
      logoUrl: logoUrl.trim() || undefined,
      shortLabel: shortLabel.trim() || 'দৈনিক',
      order: Number(order) || 1,
      active: true,
    };

    if (editingId) {
      updateNewspaper(editingId, paperData);
    } else {
      addNewspaper(paperData);
    }

    setShowModal(false);
  };

  const toggleActive = (id: string, current: boolean) => {
    updateNewspaper(id, { active: !current });
  };

  const sortedPapers = [...newspapers].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif-bengali text-stone-900 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-red-600" />
            <span>জনপ্রিয় দৈনিক পত্রিকা লিংক ব্যবস্থাপনা</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            হোমপেজ ও সাইডবারে প্রদর্শিত জাতীয় ও আন্তর্জাতিক সংবাদপত্রের অফিশিয়াল ইউআরএল নিয়ন্ত্রণ
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন পত্রিকা যোগ করুন</span>
        </button>
      </div>

      {/* Newspapers Table */}
      <div className="bg-white border border-stone-200 rounded-lg shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs text-stone-700">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold">
            <tr>
              <th className="px-4 py-3">ক্রম</th>
              <th className="px-4 py-3">পত্রিকার নাম</th>
              <th className="px-4 py-3">অফিশিয়াল ওয়েবসাইট URL</th>
              <th className="px-4 py-3">স্ট্যাটাস</th>
              <th className="px-4 py-3 text-right">কার্যক্রম</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {sortedPapers.map((paper) => (
              <tr key={paper.id} className="hover:bg-stone-50/80">
                <td className="px-4 py-3 font-mono font-bold text-stone-400">
                  {paper.order}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    {paper.logoUrl ? (
                      <img
                        src={paper.logoUrl}
                        alt={paper.nameBn}
                        className="w-7 h-7 rounded-full object-cover border border-stone-200"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold">
                        {paper.nameBn.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-bold font-serif-bengali text-stone-900 text-sm">{paper.nameBn}</p>
                      <p className="text-[10px] text-stone-400">{paper.nameEn}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>{paper.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(paper.id, paper.active)}
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      paper.active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {paper.active ? 'চালু' : 'বন্ধ'}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(paper)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`"${paper.nameBn}" মুছে ফেলতে চান?`)) deleteNewspaper(paper.id);
                      }}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-base text-stone-900 border-b pb-2">
              {editingId ? 'দৈনিক পত্রিকা তথ্য সম্পাদনা' : 'নতুন পত্রিকা যোগ করুন'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">বাংলা নাম *</label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  required
                  placeholder="যেমন: দৈনিক প্রথম আলো"
                  className="w-full text-xs border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">ইংরেজি নাম</label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Prothom Alo"
                  className="w-full text-xs border rounded p-2"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">ওয়েবসাইট URL *</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  placeholder="https://www.prothomalo.com"
                  className="w-full text-xs font-mono border rounded p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">লোগো / আইকন URL</label>
                  <input
                    type="url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full text-xs border rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">প্রদর্শন ক্রম</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full text-xs border rounded p-2"
                  />
                </div>
              </div>

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
