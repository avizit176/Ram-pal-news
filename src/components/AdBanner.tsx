import React from 'react';
import { useApp } from '../context/AppContext';
import { AdPlacement } from '../types';

interface AdBannerProps {
  placement: AdPlacement;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  const { getAdsByPlacement } = useApp();
  const ads = getAdsByPlacement(placement);

  if (ads.length === 0) {
    return null;
  }

  // Use first active ad in this placement slot
  const ad = ads[0];

  return (
    <div className={`ad-slot my-4 text-center ${className}`}>
      <div className="relative inline-block max-w-full overflow-hidden bg-stone-100 border border-stone-200 rounded p-1 shadow-xs">
        <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block pb-1">
          বিজ্ঞাপন ({ad.name})
        </span>

        {ad.imageUrl ? (
          <a
            href={ad.targetUrl || '#'}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block overflow-hidden rounded group"
          >
            <img
              src={ad.imageUrl}
              alt={ad.name}
              className="max-h-36 sm:max-h-48 md:max-h-60 mx-auto object-cover rounded group-hover:opacity-95 transition"
            />
          </a>
        ) : ad.code ? (
          <div
            className="adsterra-code-container text-xs text-stone-600 overflow-hidden"
            dangerouslySetInnerHTML={{ __html: ad.code }}
          />
        ) : (
          <div className="p-4 text-xs text-stone-500 font-medium">
            বিজ্ঞাপন স্থান খালি রয়েছে
          </div>
        )}
      </div>
    </div>
  );
};
