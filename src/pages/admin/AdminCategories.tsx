import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Check, ArrowUpDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Category } from '../../types';
import { toBengaliNumber } from '../../utils/bengaliDate';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [order, setOrder] = useState(1);
  const [description, setDescription] = useState('');

  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setNameBn(cat.nameBn);
    setNameEn(cat.nameEn);
    setSlug(cat.slug);
    setOrder(cat.order);
    setDescription(cat.description || '');
    setShowAddForm(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    updateCategory(editingId, {
      nameBn,
      nameEn,
      slug,
      order: Number(order),
      description,
    });

    setEditingId(null);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameBn || !slug) return;

    addCategory({
      nameBn,
      nameEn: nameEn || nameBn,
      slug,
      order: Number(order) || categories.length + 1,
      description,
      active: true,
    });

    setNameBn('');
    setNameEn('');
    setSlug('');
    setDescription('');
    setShowAddForm(false);
  };

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif-bengali text-stone-900 flex items-center gap-2">
            <Tag className="w-6 h-6 text-red-600" />
            <span>সংবাদ বিভাগ ও ক্যাটাগরি ব্যবস্থাপনা</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            মোট বিভাগ: {toBengaliNumber(categories.length)} টি
          </p>
        </div>

        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingId(null);
          }}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন বিভাগ যোগ করুন</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAddCategory} className="bg-white border border-stone-200 p-5 rounded-lg shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-stone-900 border-b pb-2">নতুন ক্যাটাগরি তৈরি</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">বাংলা নাম *</label>
              <input
                type="text"
                value={nameBn}
                onChange={(e) => {
                  setNameBn(e.target.value);
                  if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/gi, '-'));
                }}
                required
                placeholder="যেমন: রামপাল"
                className="w-full text-xs border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">ইংরেজি নাম</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Rampal"
                className="w-full text-xs border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">স্লাগ (URL) *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                placeholder="rampal"
                className="w-full text-xs border rounded p-2 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="বাগেরহাটের রামপাল এলাকার সকল সংবাদ ও তথ্যচিত্র"
              className="w-full text-xs border rounded p-2"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 border rounded text-xs"
            >
              বাতিল
            </button>
            <button type="submit" className="bg-red-600 text-white px-4 py-1.5 rounded text-xs font-bold">
              সংরক্ষণ করুন
            </button>
          </div>
        </form>
      )}

      {/* Categories Table */}
      <div className="bg-white border border-stone-200 rounded-lg shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs text-stone-700">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold">
            <tr>
              <th className="px-4 py-3">ক্রম</th>
              <th className="px-4 py-3">বাংলা নাম</th>
              <th className="px-4 py-3">ইংরেজি নাম</th>
              <th className="px-4 py-3">স্লাগ</th>
              <th className="px-4 py-3 text-right">কার্যক্রম</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {sortedCategories.map((cat) => (
              <tr key={cat.id} className="hover:bg-stone-50/80">
                <td className="px-4 py-3 font-mono font-bold text-stone-400">
                  {toBengaliNumber(cat.order)}
                </td>
                <td className="px-4 py-3 font-bold font-serif-bengali text-sm text-stone-900">
                  {cat.nameBn}
                </td>
                <td className="px-4 py-3 text-stone-500 font-mono">{cat.nameEn}</td>
                <td className="px-4 py-3 text-stone-500 font-mono">/category/{cat.slug}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(cat)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`ক্যাটাগরি "${cat.nameBn}" মুছে ফেলতে চান?`)) {
                          deleteCategory(cat.id);
                        }
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
    </div>
  );
};
