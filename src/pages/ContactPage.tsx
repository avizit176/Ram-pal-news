import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Megaphone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { settings } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="border-b border-stone-200 pb-6 mb-8">
        <h1 className="text-3xl font-extrabold font-serif-bengali text-stone-900 mb-2">
          যোগাযোগ ও বিজ্ঞাপন (Contact & Advertisement)
        </h1>
        <p className="text-sm text-stone-500">
          রামপাল নিউজ কার্যালয়ের সাথে যেকোনো তথ্য, সংবাদ পরামর্শ বা বিজ্ঞাপনের জন্য যোগাযোগ করুন
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs space-y-4">
            <h3 className="font-bold text-lg font-serif-bengali text-stone-900 border-b border-stone-100 pb-2">
              প্রধান কার্যালয়
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-stone-900">ঠিকানা</p>
                  <p className="text-stone-600 leading-relaxed">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-stone-900">মুঠোফোন / হোয়াটসঅ্যাপ</p>
                  <p className="text-stone-600">{settings.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-stone-900">ইমেইল</p>
                  <p className="text-stone-600">{settings.contactEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Advertisement Info */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <div className="flex items-center gap-2 text-red-700 font-bold mb-2">
              <Megaphone className="w-5 h-5" />
              <span>বিজ্ঞাপন প্রচার</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed mb-3">
              রামপাল নিউজ পোর্টালে হেডার ব্যানার, সাইডবার, ইন-আর্টিকেল এবং সোশ্যাল বারে আপনার ব্যবসা বা প্রতিষ্ঠানের বিজ্ঞাপন সাশ্রয়ী মূল্যে প্রচার করতে আমাদের বিজ্ঞাপন বিভাগে ইমেইল করুন:
            </p>
            <p className="text-xs font-mono font-bold text-red-800 bg-white p-2 rounded border border-red-200">
              ads@rampalnews.com
            </p>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="md:col-span-7 bg-white border border-stone-200 rounded-lg p-6 shadow-2xs">
          <h3 className="font-bold text-lg font-serif-bengali text-stone-900 mb-2">
            আমাদের বার্তা পাঠান
          </h3>
          <p className="text-xs text-stone-500 mb-6">
            নিচের ফরমটি পূরণ করে আপনার বার্তা পাঠালে আমাদের প্রতিনিধি দ্রুত যোগাযোগ করবেন।
          </p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-md text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="font-bold">আপনার বার্তাটি সফলভাবে পৌঁছানো হয়েছে!</p>
                <p className="text-xs text-emerald-700 mt-0.5">আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  আপনার পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="যেমন: মো. কামরুল হাসান"
                  className="w-full text-xs sm:text-sm border border-stone-300 rounded px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ইমেইল ঠিকানা
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs sm:text-sm border border-stone-300 rounded px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    বিষয়
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="বিজ্ঞাপন / সংবাদ পরামর্শ / সাধারণ"
                    className="w-full text-xs sm:text-sm border border-stone-300 rounded px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  আপনার বার্তা বা বিবরণ *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                  className="w-full text-xs sm:text-sm border border-stone-300 rounded px-3 py-2 text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded flex items-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>বার্তা পাঠান</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
