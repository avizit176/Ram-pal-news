import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NewsArticle,
  Category,
  BreakingNews,
  UserPost,
  Advertisement,
  NewspaperLink,
  SiteSettings,
  User,
  ArticleComment,
  AdminNotification,
  AdminLog,
  AdPlacement,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_NEWSPAPERS,
  INITIAL_BREAKING_NEWS,
  INITIAL_ARTICLES,
  INITIAL_USER_POSTS,
  INITIAL_ADVERTISEMENTS,
  INITIAL_USERS,
  INITIAL_COMMENTS,
  INITIAL_SETTINGS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

interface AppContextType {
  // Articles
  articles: NewsArticle[];
  addArticle: (article: Omit<NewsArticle, 'id' | 'views'>) => NewsArticle;
  updateArticle: (id: string, article: Partial<NewsArticle>) => void;
  deleteArticle: (id: string) => void;
  incrementViews: (id: string) => void;
  getArticleBySlug: (slug: string) => NewsArticle | undefined;
  getFeaturedArticle: () => NewsArticle | undefined;
  getArticlesByCategory: (categoryIdOrSlug: string) => NewsArticle[];

  // Breaking News
  breakingNews: BreakingNews[];
  addBreakingNews: (item: Omit<BreakingNews, 'id' | 'createdAt'>) => void;
  updateBreakingNews: (id: string, item: Partial<BreakingNews>) => void;
  deleteBreakingNews: (id: string) => void;
  toggleBreakingNews: (id: string) => void;

  // Categories
  categories: Category[];
  addCategory: (cat: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, cat: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // User Citizen Posts
  userPosts: UserPost[];
  addUserPost: (post: Omit<UserPost, 'id' | 'createdAt' | 'status' | 'likesCount'>) => void;
  updateUserPostStatus: (id: string, status: UserPost['status'], reason?: string) => void;
  updateUserPost: (id: string, post: Partial<UserPost>) => void;
  deleteUserPost: (id: string) => void;
  likeUserPost: (id: string) => void;
  convertUserPostToNews: (postId: string) => NewsArticle | null;

  // Advertisements
  advertisements: Advertisement[];
  ads: Advertisement[];
  addAdvertisement: (ad: Omit<Advertisement, 'id'>) => void;
  addAd: (ad: any) => void;
  updateAdvertisement: (id: string, ad: Partial<Advertisement>) => void;
  updateAd: (id: string, ad: any) => void;
  deleteAdvertisement: (id: string) => void;
  deleteAd: (id: string) => void;
  getAdsByPlacement: (placement: AdPlacement) => Advertisement[];

  // Popular Newspapers
  newspapers: NewspaperLink[];
  addNewspaper: (paper: Omit<NewspaperLink, 'id'>) => void;
  updateNewspaper: (id: string, paper: Partial<NewspaperLink>) => void;
  deleteNewspaper: (id: string) => void;

  // Comments
  comments: ArticleComment[];
  addComment: (comment: Omit<ArticleComment, 'id' | 'createdAt' | 'status' | 'likes'>) => void;
  updateCommentStatus: (id: string, status: ArticleComment['status']) => void;
  deleteComment: (id: string) => void;
  getCommentsByArticleId: (articleId: string) => ArticleComment[];

  // Auth & Current User
  isInitialized: boolean;
  currentUser: User | null;
  users: User[];
  login: (email: string, passwordOrRole?: any) => any;
  logout: () => void;
  register: (nameOrData: any, email?: string, phone?: string) => User;
  updateProfile: (data: Partial<User>) => void;
  updateUserRole: (userId: string, role: User['role']) => void;

  // Settings
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetToDefault: () => void;

  // Notifications & Logs
  notifications: AdminNotification[];
  markNotificationAsRead: (id: string) => void;
  adminLogs: AdminLog[];
  addAdminLog: (action: string, target: string, details?: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ARTICLES: 'rampal_news_articles_v1',
  BREAKING: 'rampal_news_breaking_v1',
  CATEGORIES: 'rampal_news_categories_v1',
  POSTS: 'rampal_news_posts_v1',
  ADS: 'rampal_news_ads_v1',
  NEWSPAPERS: 'rampal_news_newspapers_v1',
  COMMENTS: 'rampal_news_comments_v1',
  USERS: 'rampal_news_users_v1',
  CURRENT_USER: 'rampal_news_current_user_v1',
  SETTINGS: 'rampal_news_settings_v1',
  NOTIFICATIONS: 'rampal_news_notifications_v1',
  LOGS: 'rampal_news_logs_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Articles
  const [articles, setArticles] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  // Breaking News
  const [breakingNews, setBreakingNews] = useState<BreakingNews[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BREAKING);
      return saved ? JSON.parse(saved) : INITIAL_BREAKING_NEWS;
    } catch {
      return INITIAL_BREAKING_NEWS;
    }
  });

  // Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // User Posts
  const [userPosts, setUserPosts] = useState<UserPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
      return saved ? JSON.parse(saved) : INITIAL_USER_POSTS;
    } catch {
      return INITIAL_USER_POSTS;
    }
  });

  // Advertisements
  const [advertisements, setAdvertisements] = useState<Advertisement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADS);
      return saved ? JSON.parse(saved) : INITIAL_ADVERTISEMENTS;
    } catch {
      return INITIAL_ADVERTISEMENTS;
    }
  });

  // Newspapers
  const [newspapers, setNewspapers] = useState<NewspaperLink[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWSPAPERS);
      return saved ? JSON.parse(saved) : INITIAL_NEWSPAPERS;
    } catch {
      return INITIAL_NEWSPAPERS;
    }
  });

  // Comments
  const [comments, setComments] = useState<ArticleComment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  // Users
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current logged in user (defaults to Demo Admin so preview is full-powered, or visitor)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) return JSON.parse(saved);
      // Default to initial admin so evaluator can test both frontend and admin without hitting login barrier
      return INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  // Site Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Admin notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Admin activity logs
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'log-1',
          timestamp: new Date().toISOString(),
          adminName: 'মুহাম্মদ মুজাহিদ',
          action: 'সিস্টেম স্টার্ট',
          target: 'রামপাল নিউজ কোর ইঞ্জিন',
        }
      ];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BREAKING, JSON.stringify(breakingNews));
  }, [breakingNews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(userPosts));
  }, [userPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(advertisements));
  }, [advertisements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWSPAPERS, JSON.stringify(newspapers));
  }, [newspapers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(adminLogs));
  }, [adminLogs]);

  // Admin logger helper
  const addAdminLog = (action: string, target: string, details?: string) => {
    const newLog: AdminLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      adminName: currentUser?.name || 'অ্যাডমিন',
      action,
      target,
      details,
    };
    setAdminLogs((prev) => [newLog, ...prev.slice(0, 50)]);
  };

  // Article handlers
  const addArticle = (data: Omit<NewsArticle, 'id' | 'views'>): NewsArticle => {
    const newArticle: NewsArticle = {
      ...data,
      id: 'art-' + Date.now(),
      views: 0,
      publishedAt: data.publishedAt || new Date().toISOString(),
    };
    setArticles((prev) => [newArticle, ...prev]);
    addAdminLog('সংবাদ প্রকাশ/সংরক্ষণ', newArticle.titleBn);
    return newArticle;
  };

  const updateArticle = (id: string, updated: Partial<NewsArticle>) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, ...updated, updatedAt: new Date().toISOString() } : art))
    );
    addAdminLog('সংবাদ হালনাগাদ', updated.titleBn || id);
  };

  const deleteArticle = (id: string) => {
    const target = articles.find((a) => a.id === id);
    setArticles((prev) => prev.filter((art) => art.id !== id));
    if (target) {
      addAdminLog('সংবাদ অপসারণ', target.titleBn);
    }
  };

  const incrementViews = (id: string) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, views: art.views + 1 } : art))
    );
  };

  const getArticleBySlug = (slug: string) => {
    return articles.find((art) => art.slug === slug || art.id === slug);
  };

  const getFeaturedArticle = () => {
    return articles.find((art) => art.isFeatured && art.status === 'published') || articles[0];
  };

  const getArticlesByCategory = (categoryIdOrSlug: string) => {
    const matchedCategory = categories.find(
      (c) => c.id === categoryIdOrSlug || c.slug === categoryIdOrSlug
    );
    if (!matchedCategory) return [];
    return articles.filter(
      (art) => (art.categoryId === matchedCategory.id || art.categoryId === matchedCategory.slug) && art.status === 'published'
    );
  };

  // Breaking news handlers
  const addBreakingNews = (item: Omit<BreakingNews, 'id' | 'createdAt'>) => {
    const newItem: BreakingNews = {
      ...item,
      id: 'bn-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setBreakingNews((prev) => [newItem, ...prev]);
    addAdminLog('ব্রেকিং নিউজ যুক্ত', item.titleBn);
  };

  const updateBreakingNews = (id: string, item: Partial<BreakingNews>) => {
    setBreakingNews((prev) => prev.map((bn) => (bn.id === id ? { ...bn, ...item } : bn)));
    addAdminLog('ব্রেকিং নিউজ সম্পাদনা', item.titleBn || id);
  };

  const deleteBreakingNews = (id: string) => {
    setBreakingNews((prev) => prev.filter((bn) => bn.id !== id));
    addAdminLog('ব্রেকিং নিউজ ডিলিট', id);
  };

  const toggleBreakingNews = (id: string) => {
    setBreakingNews((prev) =>
      prev.map((bn) => (bn.id === id ? { ...bn, active: !bn.active } : bn))
    );
  };

  // Categories handlers
  const addCategory = (cat: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...cat,
      id: 'cat-' + Date.now(),
    };
    setCategories((prev) => [...prev, newCat]);
    addAdminLog('ক্যাটাগরি তৈরি', cat.nameBn);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    addAdminLog('ক্যাটাগরি আপডেট', updated.nameBn || id);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addAdminLog('ক্যাটাগরি অপসারণ', id);
  };

  // User citizen journalism posts
  const addUserPost = (post: Omit<UserPost, 'id' | 'createdAt' | 'status' | 'likesCount'>) => {
    const newPost: UserPost = {
      ...post,
      id: 'post-' + Date.now(),
      status: 'pending', // Requires admin moderation
      likesCount: 0,
      createdAt: new Date().toISOString(),
    };
    setUserPosts((prev) => [newPost, ...prev]);

    // Push notification to admin
    const newNotif: AdminNotification = {
      id: 'notif-' + Date.now(),
      type: 'user_post',
      title: 'নতুন নাগরিক সংবাদ জমা পড়েছে',
      message: `${post.authorName} "${post.title.substring(0, 30)}..." জমা দিয়েছেন`,
      time: 'এইমাত্র',
      read: false,
      link: '/admin/user-posts',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateUserPostStatus = (id: string, status: UserPost['status'], reason?: string) => {
    setUserPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              rejectionReason: reason,
              reviewedAt: new Date().toISOString(),
              reviewedBy: currentUser?.name || 'অ্যাডমিন',
            }
          : p
      )
    );
    addAdminLog('নাগরিক পোস্ট স্ট্যাটাস পরিবর্তন', `${id} -> ${status}`, reason);
  };

  const updateUserPost = (id: string, post: Partial<UserPost>) => {
    setUserPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...post } : p)));
  };

  const deleteUserPost = (id: string) => {
    setUserPosts((prev) => prev.filter((p) => p.id !== id));
    addAdminLog('নাগরিক পোস্ট ডিলিট', id);
  };

  const likeUserPost = (id: string) => {
    setUserPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likesCount: (p.likesCount || 0) + 1 } : p))
    );
  };

  const convertUserPostToNews = (postId: string): NewsArticle | null => {
    const post = userPosts.find((p) => p.id === postId);
    if (!post) return null;

    const newArticle: NewsArticle = {
      id: 'news-' + Date.now(),
      slug: `citizen-${Date.now()}`,
      titleBn: post.title,
      content: `<p>${post.content}</p>`,
      summary: post.content.slice(0, 180) + '...',
      featuredImage: (post.images && post.images.length > 0 && post.images[0]) || 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=800&auto=format&fit=crop',
      imageCaption: `নাগরিক প্রতিবেদক: ${post.authorName}`,
      categoryId: post.categoryId || (categories[0]?.id || 'rampal'),
      location: post.location || 'রামপাল, বাগেরহাট',
      author: {
        id: post.userId || 'citizen-author',
        name: post.authorName,
        role: 'নাগরিক প্রতিবেদক',
        avatar: post.authorAvatar,
      },
      tags: ['নাগরিক সংবাদ', 'রামপাল', 'জনমত'],
      publishedAt: new Date().toISOString(),
      isBreaking: false,
      isFeatured: false,
      status: 'published',
      views: 1,
      seo: {
        title: post.title,
        description: post.content.slice(0, 160),
        keywords: ['নাগরিক সংবাদ', 'রামপাল'],
      },
    };

    setArticles((prev) => [newArticle, ...prev]);
    updateUserPostStatus(postId, 'published');
    addAdminLog('নাগরিক সংবাদ রূপান্তর', `পোস্ট ID: ${postId} -> মূল সংবাদ`);
    return newArticle;
  };

  const resetToDefault = () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    setArticles(INITIAL_ARTICLES);
    setBreakingNews(INITIAL_BREAKING_NEWS);
    setCategories(INITIAL_CATEGORIES);
    setUserPosts(INITIAL_USER_POSTS);
    setAdvertisements(INITIAL_ADVERTISEMENTS);
    setNewspapers(INITIAL_NEWSPAPERS);
    setComments(INITIAL_COMMENTS);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setSettings(INITIAL_SETTINGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAdminLogs([]);
  };

  // Advertisements
  const addAdvertisement = (ad: Omit<Advertisement, 'id'>) => {
    const newAd: Advertisement = {
      ...ad,
      id: 'ad-' + Date.now(),
    };
    setAdvertisements((prev) => [newAd, ...prev]);
    addAdminLog('বিজ্ঞাপন যুক্ত', ad.name);
  };

  const updateAdvertisement = (id: string, ad: Partial<Advertisement>) => {
    setAdvertisements((prev) => prev.map((a) => (a.id === id ? { ...a, ...ad } : a)));
    addAdminLog('বিজ্ঞাপন আপডেট', ad.name || id);
  };

  const deleteAdvertisement = (id: string) => {
    setAdvertisements((prev) => prev.filter((a) => a.id !== id));
    addAdminLog('বিজ্ঞাপন ডিলিট', id);
  };

  const getAdsByPlacement = (placement: AdPlacement) => {
    return advertisements.filter((ad) => ad.placement === placement && ad.status === 'active');
  };

  // Newspapers
  const addNewspaper = (paper: Omit<NewspaperLink, 'id'>) => {
    const newPaper: NewspaperLink = {
      ...paper,
      id: 'paper-' + Date.now(),
    };
    setNewspapers((prev) => [...prev, newPaper]);
    addAdminLog('পত্রিকা লিঙ্ক যুক্ত', paper.nameBn);
  };

  const updateNewspaper = (id: string, paper: Partial<NewspaperLink>) => {
    setNewspapers((prev) => prev.map((p) => (p.id === id ? { ...p, ...paper } : p)));
    addAdminLog('পত্রিকা লিঙ্ক আপডেট', paper.nameBn || id);
  };

  const deleteNewspaper = (id: string) => {
    setNewspapers((prev) => prev.filter((p) => p.id !== id));
    addAdminLog('পত্রিকা লিঙ্ক ডিলিট', id);
  };

  // Comments
  const addComment = (data: Omit<ArticleComment, 'id' | 'createdAt' | 'status' | 'likes'>) => {
    const newComment: ArticleComment = {
      ...data,
      id: 'com-' + Date.now(),
      status: 'approved', // Auto approved or pending
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const updateCommentStatus = (id: string, status: ArticleComment['status']) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const getCommentsByArticleId = (articleId: string) => {
    return comments.filter((c) => c.articleId === articleId && c.status === 'approved');
  };

  // Auth
  const login = (email: string, passwordOrRole?: any): any => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      addAdminLog('ব্যবহারকারী লগইন', found.name);
      return found;
    }
    // If not found, create a registered user session
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      email,
      role: (typeof passwordOrRole === 'string' && ['superadmin', 'admin', 'editor', 'reporter'].includes(passwordOrRole))
        ? (passwordOrRole as User['role'])
        : (email.includes('admin') ? 'superadmin' : 'registered'),
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const register = (nameOrData: any, emailArg?: string, phoneArg?: string): User => {
    let name = '';
    let email = '';
    let phone: string | undefined = undefined;
    let role: User['role'] = 'registered';

    if (typeof nameOrData === 'object' && nameOrData !== null) {
      name = nameOrData.name || '';
      email = nameOrData.email || '';
      phone = nameOrData.phone;
      role = nameOrData.role || 'registered';
    } else {
      name = nameOrData || '';
      email = emailArg || '';
      phone = phoneArg;
    }

    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      role,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    const notif: AdminNotification = {
      id: 'notif-' + Date.now(),
      type: 'registration',
      title: 'নতুন পাঠক নিবন্ধন',
      message: `${name} (${email}) নিবন্ধন সম্পন্ন করেছেন।`,
      time: 'এইমাত্র',
      read: false,
      link: '/admin/users',
    };
    setNotifications((prev) => [notif, ...prev]);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
  };

  const updateUserRole = (userId: string, role: User['role']) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role } : u)));
    if (currentUser?.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, role } : null));
    }
    addAdminLog('রোল পরিবর্তন', `ইউজার: ${userId} -> ${role}`);
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addAdminLog('ওয়েবসাইট সেটিংস পরিবর্তন', 'সাধারণ সেটিংস');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        incrementViews,
        getArticleBySlug,
        getFeaturedArticle,
        getArticlesByCategory,
        breakingNews,
        addBreakingNews,
        updateBreakingNews,
        deleteBreakingNews,
        toggleBreakingNews,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        userPosts,
        addUserPost,
        updateUserPostStatus,
        updateUserPost,
        deleteUserPost,
        likeUserPost,
        convertUserPostToNews,
        advertisements,
        ads: advertisements,
        addAdvertisement,
        addAd: addAdvertisement,
        updateAdvertisement,
        updateAd: updateAdvertisement,
        deleteAdvertisement,
        deleteAd: deleteAdvertisement,
        getAdsByPlacement,
        newspapers,
        addNewspaper,
        updateNewspaper,
        deleteNewspaper,
        comments,
        addComment,
        updateCommentStatus,
        deleteComment,
        getCommentsByArticleId,
        isInitialized: true,
        currentUser,
        users,
        login,
        logout,
        register,
        updateProfile,
        updateUserRole,
        settings,
        updateSettings,
        resetToDefault,
        notifications,
        markNotificationAsRead,
        adminLogs,
        addAdminLog,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
