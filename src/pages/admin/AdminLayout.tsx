import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Users,
  AlertCircle,
  Tag,
  Megaphone,
  Newspaper,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  Shield,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLayout: React.FC = () => {
  const { currentUser, logout, userPosts, breakingNews } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingUserPostsCount = userPosts.filter((p) => p.status === 'pending').length;
  const activeBreakingCount = breakingNews.filter((b) => b.active).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'ড্যাশবোর্ড', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'সংবাদ তালিকা', path: '/admin/news', icon: FileText },
    { name: 'নতুন সংবাদ প্রকাশ', path: '/admin/news/new', icon: PlusCircle },
    {
      name: 'নাগরিক সংবাদ',
      path: '/admin/citizen-posts',
      icon: Users,
      badge: pendingUserPostsCount > 0 ? pendingUserPostsCount : undefined,
    },
    {
      name: 'ব্রেকিং নিউজ',
      path: '/admin/breaking',
      icon: AlertCircle,
      badge: activeBreakingCount > 0 ? `${activeBreakingCount} সক্রিয়` : undefined,
      badgeColor: 'bg-red-600 text-white',
    },
    { name: 'বিভাগসমূহ', path: '/admin/categories', icon: Tag },
    { name: 'বিজ্ঞাপন ব্যবস্থাপনা', path: '/admin/ads', icon: Megaphone },
    { name: 'জনপ্রিয় দৈনিক লিংক', path: '/admin/newspapers', icon: Newspaper },
    { name: 'সাইট সেটিংস', path: '/admin/settings', icon: Settings },
  ];

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'সুপার অ্যাডমিন';
      case 'admin':
        return 'অ্যাডমিন';
      case 'editor':
        return 'বার্তা সম্পাদক';
      case 'reporter':
        return 'প্রতিবেদক';
      default:
        return 'ব্যবহারকারী';
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-bengali">
      {/* Admin Top Navbar */}
      <header className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-40">
        <div className="px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded text-stone-300 hover:text-white hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/admin" className="flex items-center gap-2">
              <span className="w-3 h-5 bg-red-600 rounded-xs"></span>
              <span className="font-bold text-lg font-serif-bengali">রামপাল নিউজ অ্যাডমিন</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* View live site */}
            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs px-3 py-1.5 rounded transition border border-stone-700"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>লাইভ সাইট দেখুন</span>
            </Link>

            {/* Current user */}
            <div className="flex items-center gap-2 pl-2 border-l border-stone-800">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover border border-stone-700"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-white leading-tight">{currentUser?.name}</p>
                <span className="text-[10px] text-red-400 font-medium">
                  {getRoleLabel(currentUser?.role || 'user')}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-stone-400 hover:text-red-400 transition"
              title="লগআউট"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar for Desktop */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-stone-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:h-[calc(100vh-53px)] ${
            mobileMenuOpen ? 'translate-x-0 pt-14' : '-translate-x-full'
          } flex flex-col justify-between`}
        >
          <div className="py-4 px-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition ${
                    isActive
                      ? 'bg-red-50 text-red-700 font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-red-600' : 'text-stone-400'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        item.badgeColor || 'bg-amber-100 text-amber-900 font-bold'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-stone-200 bg-stone-50">
            <div className="text-[11px] text-stone-500 space-y-1">
              <p className="font-semibold text-stone-700">রামপাল নিউজ CMS v2.4</p>
              <p>দক্ষিণাঞ্চলের শীর্ষ ডিজিটাল নিউজ প্ল্যাটফর্ম</p>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-stone-900/50 z-20 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
