import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginPage: React.FC = () => {
  const { login, currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user) {
        if (['super_admin', 'admin', 'editor', 'reporter'].includes(user.role)) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err: any) {
      setError(err.message || 'লগইন ব্যর্থ হয়েছে। ইমেইল ও পাসওয়ার্ড সঠিক দিন।');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Login helper
  const handleQuickLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('admin123');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-6 sm:p-8 border border-stone-200 rounded-lg shadow-sm">
        <div className="text-center">
          <div className="inline-flex p-3 bg-red-600 text-white rounded-full mb-3 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-serif-bengali text-stone-900">
            রামপাল নিউজ অ্যাকাউন্ট লগইন
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            সংবাদ ব্যবস্থাপনা ও নাগরিক সাংবাদিকতার পোর্টাল
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              ইমেইল ঠিকানা
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-stone-700">
                পাসওয়ার্ড
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-red-600 hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm py-2.5 rounded transition shadow-xs flex items-center justify-center gap-2"
          >
            <span>{loading ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="border-t border-stone-200 pt-4">
          <p className="text-[11px] font-bold text-stone-600 uppercase tracking-wider text-center mb-2">
            এক ক্লিকে টেস্ট লগইন (ডেমো মোড)
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickLogin('superadmin@rampalnews.com')}
              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded border border-stone-200 font-medium text-left truncate"
            >
              👑 সুপার অ্যাডমিন
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('editor@rampalnews.com')}
              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded border border-stone-200 font-medium text-left truncate"
            >
              ✍️ বার্তা সম্পাদক
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('reporter@rampalnews.com')}
              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded border border-stone-200 font-medium text-left truncate"
            >
              📷 রামপাল প্রতিনিধি
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('citizen@rampalnews.com')}
              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded border border-stone-200 font-medium text-left truncate"
            >
              👤 নাগরিক পাঠক
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          নতুন অ্যাকাউন্ট তৈরি করতে চান?{' '}
          <Link to="/register" className="text-red-600 font-bold hover:underline">
            নিবন্ধন করুন
          </Link>
        </div>
      </div>
    </div>
  );
};
