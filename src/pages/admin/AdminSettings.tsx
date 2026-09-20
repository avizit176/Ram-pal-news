import React, { useState } from 'react';
import { Settings, Save, CheckCircle, RefreshCw, Globe, Phone, Mail, MapPin, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetToDefault } = useApp();

  const [websiteNameBn, setWebsiteNameBn] = useState(settings.websiteNameBn);
  const [websiteNameEn, setWebsiteNameEn] = useState(settings.websiteNameEn);
  const [sloganBn, setSloganBn] = useState(settings.sloganBn);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [address, setAddress] = useState(settings.address);

  const [facebook, setFacebook] = useState(settings.social.facebook);
  const [youtube, setYoutube] = useState(settings.social.youtube);
  const [twitter, setTwitter] = useState(settings.social.twitter);
  const [whatsapp, setWhatsapp] = useState(settings.social.whatsapp);

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      websiteNameBn,
      websiteNameEn,
      sloganBn,
      contactEmail,
      contactPhone,
      address,
      social: {
        facebook,
        youtube,
        twitter,
        whatsapp,
      },
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('সতর্কতা: এটি পোর্টালের সমস্ত ডেটা প্রাথমিক ডেমো অবস্থায় ফিরিয়ে নেবে। আপনি কি নিশ্চিত?')) {
      resetToDefault();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-serif-bengali text-stone-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-red-600" />
            <span>পোর্টাল সাধারণ সেটিংস</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            ওয়েবসাইটের নাম, স্লোগান, যোগাযোগের তথ্য ও সামাজিক যোগাযোগ মাধ্যম
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="text-xs text-stone-500 hover:text-red-700 font-medium flex items-center gap-1 border border-stone-200 px-3 py-1.5 rounded hover:bg-stone-50 transition self-start sm:self-auto"
          title="সকল ডেটা ফ্যাক্টরি রিসেট করুন"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>ডিফল্ট ডেটা রিসেট</span>
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>সেটিংস সফলভাবে সংরক্ষিত হয়েছে!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand info */}
        <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-stone-900 border-b pb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>ব্র্যান্ড ও ওয়েবসাইট পরিচিতি</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ওয়েবসাইটের নাম (বাংলা) *
              </label>
              <input
                type="text"
                value={websiteNameBn}
                onChange={(e) => setWebsiteNameBn(e.target.value)}
                required
                className="w-full text-xs sm:text-sm border rounded p-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ওয়েবসাইটের নাম (ইংরেজি) *
              </label>
              <input
                type="text"
                value={websiteNameEn}
                onChange={(e) => setWebsiteNameEn(e.target.value)}
                required
                className="w-full text-xs sm:text-sm border rounded p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              স্লোগান / ট্যাগলাইন *
            </label>
            <input
              type="text"
              value={sloganBn}
              onChange={(e) => setSloganBn(e.target.value)}
              required
              className="w-full text-xs sm:text-sm border rounded p-2"
            />
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-stone-900 border-b pb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span>কার্যালয় ও যোগাযোগের তথ্য</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                যোগাযোগ ইমেইল *
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-full text-xs sm:text-sm border rounded p-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                মুঠোফোন / হেল্পলাইন *
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                className="w-full text-xs sm:text-sm border rounded p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              প্রধান কার্যালয়ের ঠিকানা *
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full text-xs sm:text-sm border rounded p-2"
            ></textarea>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-stone-900 border-b pb-2 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-purple-600" />
            <span>সামাজিক যোগাযোগ মাধ্যমের লিংক</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ফেসবুক পেজ লিংক
              </label>
              <input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full text-xs border rounded p-2 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ইউটিউব চ্যানেল লিংক
              </label>
              <input
                type="url"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="w-full text-xs border rounded p-2 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                এক্স (Twitter) লিংক
              </label>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full text-xs border rounded p-2 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                হোয়াটসঅ্যাপ চ্যানেল বা নম্বর
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full text-xs border rounded p-2 font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded flex items-center gap-2 transition shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>সেটিংস সংরক্ষণ করুন</span>
        </button>
      </form>
    </div>
  );
};
