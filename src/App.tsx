import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Public Components
import { Header } from './components/Header';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { Footer } from './components/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { CitizenPostsPage } from './pages/CitizenPostsPage';
import { PopularNewspapersPage } from './pages/PopularNewspapersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminNewsList } from './pages/admin/AdminNewsList';
import { AdminNewsEditor } from './pages/admin/AdminNewsEditor';
import { AdminCitizenPosts } from './pages/admin/AdminCitizenPosts';
import { AdminBreakingNews } from './pages/admin/AdminBreakingNews';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminAds } from './pages/admin/AdminAds';
import { AdminNewspapers } from './pages/admin/AdminNewspapers';
import { AdminSettings } from './pages/admin/AdminSettings';

/**
 * Layout for Public Portal
 */
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-bengali text-stone-900">
      <Header />
      <BreakingNewsTicker />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

/**
 * Protected Route wrapper for Admin Panel
 */
const ProtectedAdminRoute: React.FC = () => {
  const { currentUser, isInitialized } = useApp();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 font-bengali">
        <div className="text-center p-6">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-semibold text-stone-700">রামপাল নিউজ লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If ordinary citizen user tries to access admin CMS, show unauthorized with option to login as editor/admin
  if (currentUser.role === 'user') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 font-bengali p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg border border-stone-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
            !
          </div>
          <h2 className="text-xl font-bold font-serif-bengali text-stone-900 mb-2">
            অ্যাডমিন প্যানেলে প্রবেশের অনুমতি নেই
          </h2>
          <p className="text-xs text-stone-600 mb-4 leading-relaxed">
            আপনি বর্তমানে সাধারণ পাঠক/নাগরিক হিসেবে লগইন আছেন (<strong>{currentUser.email}</strong>)। অ্যাডমিন প্যানেলে প্রবেশ করতে বার্তা সম্পাদক বা অ্যাডমিন অ্যাকাউন্ট দিয়ে লগইন করুন।
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="/login"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded transition"
            >
              ভিন্ন অ্যাকাউন্টে লগইন
            </a>
            <a
              href="/"
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold px-4 py-2 rounded transition"
            >
              মূল প্রচ্ছদে ফিরে যান
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <AdminLayout />;
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/news/:slug" element={<ArticlePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/user-posts" element={<CitizenPostsPage />} />
            <Route path="/popular-newspapers" element={<PopularNewspapersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="news" element={<AdminNewsList />} />
            <Route path="news/new" element={<AdminNewsEditor />} />
            <Route path="news/edit/:id" element={<AdminNewsEditor />} />
            <Route path="citizen-posts" element={<AdminCitizenPosts />} />
            <Route path="breaking" element={<AdminBreakingNews />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="ads" element={<AdminAds />} />
            <Route path="newspapers" element={<AdminNewspapers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
