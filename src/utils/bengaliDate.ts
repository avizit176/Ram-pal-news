// Bengali numerals and date formatting utilities

export const toBengaliNumber = (num: number | string): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
};

export const getBengaliCurrentDate = (): {
  dayName: string;
  banglaDate: string;
  englishDateInBengali: string;
  timeString: string;
} => {
  const now = new Date();
  
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const dayName = days[now.getDay()];

  const bengaliMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const dateNum = toBengaliNumber(now.getDate());
  const monthName = bengaliMonths[now.getMonth()];
  const yearNum = toBengaliNumber(now.getFullYear());

  const englishDateInBengali = `${dayName}, ${dateNum} ${monthName} ${yearNum}`;

  // Bengali Season / San estimation
  // E.g. আশ্বিন ১৪৩৩ বঙ্গাব্দ
  const banglaDate = `৫ আশ্বিন ১৪৩৩ বঙ্গাব্দ`;

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
  hours = hours % 12 || 12;
  const timeString = `${toBengaliNumber(hours)}:${toBengaliNumber(minutes < 10 ? '0' + minutes : minutes)} ${ampm}`;

  return {
    dayName,
    banglaDate,
    englishDateInBengali,
    timeString,
  };
};

export const formatTimeAgoBengali = (dateString: string): string => {
  try {
    const diff = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    if (diff < 60) return 'এইমাত্র';
    if (diff < 3600) return `${toBengaliNumber(Math.floor(diff / 60))} মিনিট আগে`;
    if (diff < 86400) return `${toBengaliNumber(Math.floor(diff / 3600))} ঘন্টা আগে`;
    if (diff < 604800) return `${toBengaliNumber(Math.floor(diff / 86400))} দিন আগে`;
    return new Date(dateString).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateString;
  }
};
