import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Youtube, Twitter, Send, ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { settings, categories } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-6 border-t-4 border-red-700 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Col 1: About Rampal News */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-6 bg-red-600 rounded-xs"></span>
              <h2 className="text-2xl font-bold font-serif-bengali text-white">
                {settings.websiteNameBn}
              </h2>
            </div>
            <p className="text-xs text-stone-400 font-sans tracking-widest uppercase">
              {settings.websiteNameEn} • {settings.sloganBn}
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              বাগেরহাটের রামপাল ও দক্ষিণাঞ্চল সহ সমগ্র বাংলাদেশের সত্য, নির্ভরযোগ্য ও নিরপেক্ষ সংবাদ পরিবেশনে অঙ্গীকারবদ্ধ ডিজিটাল সংবাদ মাধ্যম।
            </p>

            <div className="text-xs text-stone-300 space-y-1 pt-2">
              <p><strong>সম্পাদক ও প্রকাশক:</strong> মুহাম্মদ মুজাহিদ</p>
              <p><strong>নির্বাহী সম্পাদক:</strong> শেখ সালাহউদ্দিন</p>
            </div>
          </div>

          {/* Col 2: Category Quick Links */}
          <div>
            <h4 className="text-white font-bold font-serif-bengali text-base mb-4 border-b border-stone-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>সংবাদ বিভাগ</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.slice(0, 10).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="text-stone-400 hover:text-white transition py-0.5 hover:underline"
                >
                  {cat.nameBn}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Institutional & Legal Links */}
          <div>
            <h4 className="text-white font-bold font-serif-bengali text-base mb-4 border-b border-stone-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>গুরুত্বপূর্ণ লিংক</span>
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  আমাদের সম্পর্কে (About Us)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  যোগাযোগ ও বিজ্ঞাপন দর
                </Link>
              </li>
              <li>
                <Link to="/user-posts" className="hover:text-white transition text-red-400">
                  নাগরিক সাংবাদিকতা পোর্টাল
                </Link>
              </li>
              <li>
                <Link to="/popular-newspapers" className="hover:text-white transition">
                  জনপ্রিয় দৈনিক পত্রিকা সমূহ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition">
                  গোপনীয়তা নীতি (Privacy Policy)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition">
                  ব্যবহারের শর্তাবলী (Terms & Conditions)
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  সাইটম্যাপ (Sitemap)
                </a>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-white transition text-stone-500">
                  অ্যাডমিন লগইন
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-white font-bold font-serif-bengali text-base mb-4 border-b border-stone-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>কার্যালয় ও যোগাযোগ</span>
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{settings.contactPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>{settings.contactEmail}</span>
              </p>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-xs text-stone-400 mb-2 font-medium">সামাজিক যোগাযোগ মাধ্যমে আমরা:</p>
              <div className="flex items-center gap-2">
                <a
                  href={settings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={settings.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={settings.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition border border-stone-700"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={settings.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition"
                  aria-label="WhatsApp"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© ২০২৬ {settings.websiteNameBn}. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="text-[11px] text-stone-600">
            এই পোর্টালের কোনো সংবাদ, ছবি বা ভিডিও অনুমতি ছাড়া প্রকাশ বা পুনঃব্যবহার সম্পূর্ণ আইনত দণ্ডনীয়।
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-stone-400 hover:text-white transition p-1"
          >
            <span>উপরে যান</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
