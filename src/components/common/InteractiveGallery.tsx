import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  category: 'Atmosphere' | 'Events' | 'Food' | 'Drinks' | 'Interior';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: '/images/7c8ae1ad-de1e-4176-ab36-b029628d76f1.png',
    alt: 'Q-RESTOBAR Grand Dining Room & Lounge in Bukit Bintang',
    title: 'Main Dining Room & Bar',
    category: 'Interior'
  },
  {
    src: '/images/Lethu_steak.jpg',
    alt: 'Charcoal Grilled Black Angus Ribeye Steak',
    title: 'Grilled Black Angus Ribeye & Sides',
    category: 'Food'
  },
  {
    src: '/images/3f403e4e-3e7d-4d84-91df-1d87668967b9.jpg',
    alt: 'Craft Cocktail Evenings & Mixology',
    title: 'Sunday Cocktail Evenings & Mixology',
    category: 'Drinks'
  },
  {
    src: '/images/baratteneder1_qrestobar.jpg',
    alt: 'Flaming Mixology & Flair Bartending',
    title: 'Flaming Mixology & Flair Showcase',
    category: 'Drinks'
  },
  {
    src: '/images/italian pasta1.jpg',
    alt: 'Artisanal Italian Pasta with Fresh Basil & Tomatoes',
    title: 'Artisanal Handcrafted Italian Pasta',
    category: 'Food'
  },
  {
    src: '/images/creamy pasta2.jpg',
    alt: 'Creamy Fettuccine with Aged Parmesan & White Wine',
    title: 'Creamy Fettuccine & White Wine Pairing',
    category: 'Food'
  },
  {
    src: '/images/baratteneder3_qrestobar.jpg',
    alt: 'Artisan Craft Cocktail Pouring',
    title: 'Artisan Cocktail Pouring & Garnish',
    category: 'Drinks'
  },
  {
    src: '/images/DJLivemusic.png',
    alt: 'Q-RESTOBAR Live Music DJ Sessions',
    title: 'Saturday Live Music & DJ Sessions',
    category: 'Events'
  },
  {
    src: '/images/QRESTOBARLIVEMUSIC.png',
    alt: 'Q-RestoBar Live Band Saturday Nights',
    title: 'Saturday Live Band Night (8 PM)',
    category: 'Events'
  },
  {
    src: '/images/a98ac4fdaec420709f19610c23f36765.jpg',
    alt: 'Evening Dining & Cocktail Celebrations',
    title: 'Evening Lounge & Dining Vibes',
    category: 'Atmosphere'
  },
  {
    src: '/images/retronight.jpg',
    alt: 'Retro Party Live Music & Cocktail Nights',
    title: 'Retro Party & Live DJ Nights',
    category: 'Events'
  },
  {
    src: '/images/spirits1.jpg',
    alt: 'Curated Spirits, Premium Liquors & Cocktails',
    title: 'Curated Spirits & Botanical Cocktails',
    category: 'Drinks'
  }
];

export const InteractiveGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Atmosphere', 'Food', 'Drinks', 'Events', 'Interior'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (indexInFiltered: number) => {
    setLightboxIndex(indexInFiltered);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    const len = filteredItems.length;
    const newIdx = direction === 'prev' ? (lightboxIndex - 1 + len) % len : (lightboxIndex + 1) % len;
    setLightboxIndex(newIdx);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white font-bold shadow-sm'
                : 'bg-qc-surface text-qc-body border border-border-strong/60 hover:text-qc-primary hover:bg-qc-card'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.src}
            onClick={() => openLightbox(index)}
            className="group relative h-64 sm:h-72 rounded-sm overflow-hidden border border-border-base cursor-pointer shadow-lg"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              loading="lazy"
            />
            
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-gradient-to-t from-qc-base via-qc-base/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
              <div className="flex justify-end">
                <span className="p-2 rounded-full bg-qc-surface/80 text-purple-500 border border-purple-600/40 shadow-md">
                  <Eye className="w-4 h-4" />
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500">
                  {item.category}
                </span>
                <p className="text-sm font-display font-bold text-qc-primary mt-0.5">
                  {item.title}
                </p>
                <p className="text-xs text-qc-body/90 font-light line-clamp-1 mt-0.5">
                  {item.alt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-qc-base/95 backdrop-blur-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-qc-surface text-qc-primary hover:text-purple-500 border border-border-strong transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Navigation Arrow */}
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-qc-surface/80 text-qc-primary hover:text-purple-500 border border-border-strong transition-colors"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-qc-surface/80 text-qc-primary hover:text-purple-500 border border-border-strong transition-colors"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div className="max-w-4xl w-full flex flex-col items-center space-y-4">
            <div className="max-h-[75vh] overflow-hidden rounded-sm border border-border-strong shadow-2xl">
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].alt}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-purple-500">
                {filteredItems[lightboxIndex].category} • {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <h3 className="text-lg font-display font-bold text-qc-primary">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-qc-body font-light max-w-lg mx-auto">
                {filteredItems[lightboxIndex].alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
