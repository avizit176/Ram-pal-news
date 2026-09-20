import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  User,
  Shield,
  Clock,
  MapPin,
  ExternalLink,
  ChevronDown,
  Sun,
  Share2,
  Bookmark,
  Bell,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getBengaliCurrentDate } from '../utils/bengaliDate';

export const Header: React.FC = () => {
  const { categories, currentUser, logout, settings, searchQuery, setSearchQuery } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentDateInfo, setCurrentDateInfo] = useState(getBengaliCurrentDate());
  const navigate = useNavigate();

  // Refresh clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateInfo(getBengaliCurrentDate());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchModal(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Top navigation primary categories (first 10)
  const mainNavCategories = categories.filter((c) => c.active).slice(0, 12);
  const moreCategories = categories.filter((c) => c.active).slice(12);

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
      {/* 1. Topmost Utility Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Date & Location */}
          <div className="flex items-center space-x-3 divide-x divide-stone-700">
            <span className="flex items-center gap-1 text-stone-200">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>{currentDateInfo.englishDateInBengali}</span>
              <span className="hidden sm:inline text-stone-400">| {currentDateInfo.banglaDate}</span>
            </span>
            <span className="pl-3 hidden md:flex items-center gap-1 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{settings.prayerTimeCity}</span>
              <span className="text-stone-400">• ২৮° সে.</span>
            </span>
          </div>

          {/* Right utility links */}
          <div className="flex items-center space-x-3 text-xs">
            <Link
              to="/user-posts"
              className="hidden sm:inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2.5 py-0.5 rounded font-medium transition"
            >
              <span>নাগরিক খবর পাঠান</span>
            </Link>

            <Link
              to="/popular-newspapers"
              className="text-stone-300 hover:text-white transition hidden lg:inline"
            >
              জনপ্রিয় দৈনিক
            </Link>

            {/* Auth / Admin Link */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 text-stone-200 hover:text-white bg-stone-800 px-2.5 py-1 rounded transition"
                >
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="max-w-[120px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-1 w-48 bg-white text-stone-900 shadow-xl rounded border border-stone-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-stone-100 bg-stone-50">
                      <p className="font-semibold text-sm truncate">{currentUser.name}</p>
                      <p className="text-xs text-stone-500 capitalize">{currentUser.role}</p>
                    </div>

                    {['admin', 'superadmin', 'editor'].includes(currentUser.role) && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                      >
                        <Shield className="w-4 h-4" />
                        <span>অ্যাডমিন প্যানেল</span>
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                    >
                      <User className="w-4 h-4" />
                      <span>আমার প্রোফাইল ও পোস্ট</span>
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 border-t border-stone-100"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>লগআউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="hover:text-white transition flex items-center gap-1 text-stone-300"
                >
                  <User className="w-3 h-3" />
                  <span>লগইন</span>
                </Link>
                <span className="text-stone-600">/</span>
                <Link
                  to="/register"
                  className="hover:text-white transition text-stone-300"
                >
                  নিবন্ধন
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Branding & Logo Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-baseline gap-2.5 group">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-7 bg-red-600 rounded-xs"></span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-serif-bengali group-hover:text-red-700 transition">
                  {settings.websiteNameBn}
                </h1>
              </div>
              <span className="text-[11px] tracking-widest uppercase font-semibold text-stone-500 pl-5 font-sans">
                {settings.websiteNameEn} • সত্য ও সাহসের সাথে
              </span>
            </div>
          </Link>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-100"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 rounded-md hover:bg-stone-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Header Ad Slot (728x90 Banner) */}
        <div className="hidden md:flex flex-col items-end">
          <div className="w-[500px] lg:w-[620px] h-[75px] bg-stone-100 border border-dashed border-stone-300 rounded flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 absolute top-1 right-2">
              বিজ্ঞাপন
            </span>
            <div className="flex items-center gap-3 text-stone-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-xs font-medium">
                রামপাল নিউজ শীর্ষ ব্যানার স্থান (Adsterra / স্পন্সর) • বিজ্ঞাপন দিন
              </p>
              <span className="text-xs text-red-600 underline font-semibold">যোগাযোগ করুন</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <nav className="bg-red-700 text-white shadow-inner hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center flex-wrap gap-x-1 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="px-3 py-2.5 inline-block hover:bg-red-800 transition font-semibold"
              >
                প্রচ্ছদ
              </Link>
            </li>
            {mainNavCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="px-3 py-2.5 inline-block hover:bg-red-800 transition whitespace-nowrap"
                >
                  {cat.nameBn}
                </Link>
              </li>
            ))}

            {moreCategories.length > 0 && (
              <li className="relative group">
                <button className="px-3 py-2.5 flex items-center gap-1 hover:bg-red-800 transition cursor-pointer">
                  <span>অন্যান্য</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-full left-0 hidden group-hover:block bg-white text-stone-800 shadow-xl border border-stone-200 rounded-b py-2 w-48 z-50">
                  {moreCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-sm hover:bg-stone-100 hover:text-red-700"
                    >
                      {cat.nameBn}
                    </Link>
                  ))}
                </div>
              </li>
            )}

            <li>
              <Link
                to="/user-posts"
                className="px-3 py-2.5 inline-flex items-center gap-1 bg-red-800 hover:bg-red-900 transition font-medium"
              >
                <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></span>
                <span>নাগরিক খবর</span>
              </Link>
            </li>
          </ul>

          {/* Search Trigger Button */}
          <div className="flex items-center">
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-red-800 text-stone-100 rounded transition flex items-center gap-1 text-xs"
              title="খবর অনুসন্ধান করুন"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">অনুসন্ধান</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-900 text-white border-t border-stone-800 px-4 py-4 space-y-4 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সংবাদ অনুসন্ধান করুন..."
              className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-2.5 text-stone-400 hover:text-white"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded hover:bg-stone-800 text-stone-200 font-semibold"
            >
              প্রচ্ছদ
            </Link>
            <Link
              to="/user-posts"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded bg-red-800 hover:bg-red-700 text-white font-medium"
            >
              নাগরিক খবর পাঠান
            </Link>
            {categories.filter((c) => c.active).map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 rounded hover:bg-stone-800 text-stone-300"
              >
                {cat.nameBn}
              </Link>
            ))}
            <Link
              to="/popular-newspapers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded hover:bg-stone-800 text-yellow-400 font-medium col-span-2"
            >
              জনপ্রিয় জাতীয় দৈনিক লিংক সমূহ
            </Link>
          </div>

          <div className="border-t border-stone-800 pt-3 flex items-center justify-between text-xs text-stone-400">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <span>লগইন আছেন: <strong className="text-white">{currentUser.name}</strong></span>
                <button
                  onClick={logout}
                  className="text-red-400 hover:underline"
                >
                  লগআউট
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-white underline">
                  লগইন
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-white underline">
                  নিবন্ধন
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl p-5 border border-stone-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                <Search className="w-5 h-5 text-red-600" />
                <span>সংবাদ অনুসন্ধান</span>
              </h3>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="শিরোনাম, বিষয়, রামপাল বা যে কোনো শব্দ লিখুন..."
                  autoFocus
                  className="flex-1 border border-stone-300 rounded px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-red-500 text-base"
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded transition"
                >
                  খুঁজুন
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-2 text-xs text-stone-600">
              <span className="text-stone-400 font-medium">জনপ্রিয় ট্যাগ:</span>
              {['রামপাল', 'বাগেরহাট', 'সুন্দরবন', 'কৃষি', 'মোংলা বন্দর', 'শিক্ষা', 'ক্রিকেট'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    setShowSearchModal(false);
                    navigate(`/search?q=${encodeURIComponent(tag)}`);
                  }}
                  className="bg-stone-100 hover:bg-red-50 hover:text-red-700 px-2.5 py-1 rounded transition"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
