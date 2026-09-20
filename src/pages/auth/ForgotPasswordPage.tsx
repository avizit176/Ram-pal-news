import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-6 sm:p-8 border border-stone-200 rounded-lg shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-serif-bengali text-stone-900">
            পাসওয়ার্ড পুনরুদ্ধার
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            আপনার অ্যাকাউন্টের ইমেইল ঠিকানা দিলে আমরা পাসওয়ার্ড রিসেট লিংক পাঠাব
          </p>
        </div>

        {sent ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>ইমেইল পাঠানো হয়েছে!</span>
            </div>
            <p>
              আমরা <strong>{email}</strong> ঠিকানায় পাসওয়ার্ড রিসেটের নির্দেশনা পাঠিয়েছি। আপনার ইনবক্স বা স্প্যাম ফোল্ডার চেক করুন।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ইমেইল ঠিকানা *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@rampalnews.com"
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2.5 rounded transition shadow-xs"
            >
              রিসেট লিংক পাঠান
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link
            to="/login"
            className="text-xs text-stone-600 hover:text-red-600 inline-flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>লগইন পাতায় ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
