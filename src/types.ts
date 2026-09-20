export type UserRole = 
  | 'visitor' 
  | 'registered' 
  | 'user'
  | 'reporter' 
  | 'editor' 
  | 'admin' 
  | 'superadmin'
  | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  nameEn: string;
  order: number;
  active: boolean;
  description?: string;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  slug: string;
  nameBn: string;
  nameEn: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  titleBn: string;
  titleEn?: string;
  subtitle?: string;
  content: string; // rich text or formatted paragraphs
  summary?: string;
  featuredImage: string;
  images?: string[];
  imageCaption?: string;
  categoryId: string;
  subcategoryId?: string;
  author: {
    id: string;
    name: string;
    role?: string;
    avatar?: string;
  };
  location: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  isBreaking?: boolean;
  isFeatured?: boolean; // Main hero article
  isPopular?: boolean;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  scheduledAt?: string;
  views: number;
  readTimeMinutes?: number;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface BreakingNews {
  id: string;
  titleBn: string;
  linkUrl?: string;
  priority: number;
  active: boolean;
  createdAt: string;
  durationMinutes?: number;
}

export interface UserPost {
  id: string;
  userId: string;
  authorName: string;
  authorAvatar?: string;
  authorPhone?: string;
  title: string;
  content: string;
  location: string;
  categoryId: string;
  images: string[];
  videoUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'published';
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  likesCount?: number;
}

export type AdType = 
  | 'adsterra_popunder' 
  | 'adsterra_banner' 
  | 'adsterra_socialbar' 
  | 'custom_banner' 
  | 'custom_html';

export type AdPlacement = 
  | 'header' 
  | 'homepage_top'
  | 'homepage_hero_below' 
  | 'between_news' 
  | 'sidebar' 
  | 'article_top' 
  | 'article_bottom' 
  | 'footer' 
  | 'mobile_sticky' 
  | 'desktop_sticky';

export interface Advertisement {
  id: string;
  name: string;
  type: AdType;
  code: string;
  placement: AdPlacement;
  status: 'active' | 'inactive';
  active?: boolean;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  targetUrl?: string;
}

export interface NewspaperLink {
  id: string;
  nameBn: string;
  nameEn: string;
  url: string;
  logoUrl?: string;
  shortLabel: string;
  order: number;
  active: boolean;
}

export type PopularNewspaper = NewspaperLink;

export interface ArticleComment {
  id: string;
  articleId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'hidden' | 'reported';
  likes?: number;
  replies?: {
    id: string;
    authorName: string;
    content: string;
    createdAt: string;
  }[];
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  sizeKb: number;
  type: string;
  altText?: string;
  caption?: string;
  uploadedAt: string;
}

export interface SiteSettings {
  websiteNameBn: string;
  websiteNameEn: string;
  sloganBn: string;
  sloganEn: string;
  logoUrl?: string;
  faviconUrl?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  social: {
    facebook: string;
    youtube: string;
    twitter: string;
    whatsapp: string;
    telegram?: string;
  };
  defaultSeo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  googleAnalyticsId?: string;
  googleSearchConsole?: string;
  prayerTimeCity: string;
  homepageOrder: string[];
}

export interface AdminLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  target: string;
  details?: string;
}

export interface AdminNotification {
  id: string;
  type: 'user_post' | 'comment' | 'registration' | 'report';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}
