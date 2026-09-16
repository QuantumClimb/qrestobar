import { Promotion } from '../types/promotion';
import { storageService } from './storageService';
import { supabase, isDemoMode } from './supabaseClient';

const mapDbToPromotion = (row: any): Promotion => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  tagline: row.tagline,
  description: row.description,
  schedule: row.schedule,
  timeframe: row.timeframe,
  imageUrl: row.image_url,
  imagePosition: row.image_position || 'center',
  badge: row.badge,
  terms: row.terms || [],
  pricingHighlights: row.pricing_highlights,
  ctaText: row.cta_text || 'Reserve Now',
  isActive: Boolean(row.is_active),
  priority: row.priority || 0,
});

export const promotionService = {
  async getAll(): Promise<Promotion[]> {
    if (!isDemoMode() && supabase) {
      try {
        const { data, error } = await supabase
          .from('promotions')
          .select('*')
          .order('priority', { ascending: true });

        if (!error && data && data.length > 0) {
          return data.map(mapDbToPromotion);
        }
      } catch (err) {
        console.warn('Supabase fetch promotions failed, falling back to local storage:', err);
      }
    }
    return storageService.getPromotions();
  },

  async getActive(): Promise<Promotion[]> {
    if (!isDemoMode() && supabase) {
      try {
        const { data, error } = await supabase
          .from('promotions')
          .select('*')
          .eq('is_active', true)
          .order('priority', { ascending: true });

        if (!error && data && data.length > 0) {
          return data.map(mapDbToPromotion);
        }
      } catch (err) {
        console.warn('Supabase fetch active promotions failed, falling back to local storage:', err);
      }
    }
    const list = storageService.getPromotions();
    return list.filter(p => p.isActive).sort((a, b) => a.priority - b.priority);
  },

  async getById(id: string): Promise<Promotion | undefined> {
    if (!isDemoMode() && supabase) {
      try {
        const { data, error } = await supabase
          .from('promotions')
          .select('*')
          .or(`id.eq.${id},slug.eq.${id}`)
          .single();

        if (!error && data) {
          return mapDbToPromotion(data);
        }
      } catch (err) {
        console.warn('Supabase get promotion failed, falling back to local storage:', err);
      }
    }
    const list = storageService.getPromotions();
    return list.find(p => p.id === id || p.slug === id);
  },

  async update(id: string, updates: Partial<Promotion>): Promise<Promotion | null> {
    if (!isDemoMode() && supabase) {
      try {
        const payload: Record<string, any> = {};
        if (updates.title !== undefined) payload.title = updates.title;
        if (updates.tagline !== undefined) payload.tagline = updates.tagline;
        if (updates.description !== undefined) payload.description = updates.description;
        if (updates.schedule !== undefined) payload.schedule = updates.schedule;
        if (updates.imageUrl !== undefined) payload.image_url = updates.imageUrl;
        if (updates.imagePosition !== undefined) payload.image_position = updates.imagePosition;
        if (updates.badge !== undefined) payload.badge = updates.badge;
        if (updates.terms !== undefined) payload.terms = updates.terms;
        if (updates.pricingHighlights !== undefined) payload.pricing_highlights = updates.pricingHighlights;
        if (updates.ctaText !== undefined) payload.cta_text = updates.ctaText;
        if (updates.isActive !== undefined) payload.is_active = updates.isActive;

        const { data, error } = await supabase
          .from('promotions')
          .update(payload)
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          return mapDbToPromotion(data);
        }
      } catch (err) {
        console.warn('Supabase update promotion failed, falling back to local storage:', err);
      }
    }

    const list = storageService.getPromotions();
    const index = list.findIndex(p => p.id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ...updates
    };
    storageService.savePromotions(list);
    return list[index];
  },

  async toggleActive(id: string): Promise<Promotion | null> {
    const promo = await this.getById(id);
    if (!promo) return null;
    return this.update(id, { isActive: !promo.isActive });
  }
};
