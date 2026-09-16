import { supabase } from './supabaseClient';

/**
 * Uploads an image file to Supabase Storage bucket 'menu-images' or falls back to Base64 data URL.
 */
export async function uploadImageFile(file: File): Promise<string> {
  // If Supabase is available and not in pure offline mode, try Supabase Storage
  if (supabase) {
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `uploads/${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from('menu-images')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl;
        }
      }
    } catch (err) {
      console.warn('Supabase storage upload fallback to local Data URL:', err);
    }
  }

  // Fallback: Convert to Base64 Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image as data URL'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Curated list of existing restaurant image assets for quick selection
 */
export const PRESET_IMAGE_GALLERY = [
  { label: 'Wagyu Ribeye Steak', url: '/images/Lethu_steak.jpg' },
  { label: 'Creamy Truffle Pasta', url: '/images/creamy pasta2.jpg' },
  { label: 'Italian Seafood Pasta', url: '/images/italian pasta1.jpg' },
  { label: 'Smoked Duck Breast Sarawak Pepper', url: '/images/Smoked Duck Breast Sarawak Pepper.jpg' },
  { label: 'Lychee Rose Martini', url: '/images/Lychee Rose Martini.jpg' },
  { label: 'Tiger Crystal Draught Pint', url: '/images/Tiger Crystal Draught (Pint).jpg' },
  { label: 'Premium Spirits Selection', url: '/images/spirits1.jpg' },
  { label: 'Retro Night Live Cocktail', url: '/images/retronight.jpg' },
  { label: 'Live Music Night Event', url: '/images/QRESTOBARLIVEMUSIC.png' },
  { label: 'DJ Neon Live Music', url: '/images/DJLivemusic.png' },
  { label: 'Restaurant Interior Luxury', url: '/images/aboutus.png' }
];
