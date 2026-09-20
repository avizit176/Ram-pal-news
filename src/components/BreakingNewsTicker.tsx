import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BreakingNewsTicker: React.FC = () => {
  const { breakingNews } = useApp();
  const [isPaused, setIsPaused] = useState(false);

  // Filter only active breaking items sorted by priority
  const activeItems = breakingNews
    .filter((item) => item.active)
    .sort((a, b) => a.priority - b.priority);

  if (activeItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-stone-900 border-b border-red-800 text-white overflow-hidden py-1.5 px-3 sm:px-4 flex items-center shadow-xs">
      <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
        {/* Badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse">
          <AlertCircle className="w-4 h-4" />
          <span className="whitespace-nowrap font-serif-bengali">ব্রেকিং নিউজ</span>
        </div>

        {/* Scrolling or cycling content */}
        <div
          className="flex-1 overflow-hidden relative cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex items-center gap-8 text-sm ${
              isPaused ? '' : 'animate-ticker'
            }`}
          >
            {/* Repeat items to ensure seamless loop */}
            {[...activeItems, ...activeItems].map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                to={item.linkUrl || '#'}
                className="inline-flex items-center gap-2 hover:text-red-400 transition whitespace-nowrap group"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 group-hover:scale-125 transition"></span>
                <span className="font-medium text-stone-100 group-hover:underline">
                  {item.titleBn}
                </span>
                <span className="text-stone-500 text-xs px-2">•</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Pause/Play Toggle Button */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="text-stone-400 hover:text-white p-1 rounded transition text-xs flex-shrink-0 hidden sm:block"
          title={isPaused ? 'চালু করুন' : 'থামান'}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
