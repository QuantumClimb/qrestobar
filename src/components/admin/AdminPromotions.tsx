import React, { useState } from 'react';
import { Edit2, Eye, EyeOff } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Promotion } from '../../types/promotion';
import { Modal } from '../common/Modal';

export const AdminPromotions: React.FC = () => {
  const { promotions, updatePromotion, togglePromotionActive } = useData();
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);

  const [formData, setFormData] = useState<Partial<Promotion>>({});

  const handleEditClick = (promo: Promotion) => {
    setEditingPromo(promo);
    setFormData({
      title: promo.title,
      tagline: promo.tagline,
      description: promo.description,
      schedule: promo.schedule,
      badge: promo.badge,
      pricingHighlights: promo.pricingHighlights || '',
      ctaText: promo.ctaText,
      imagePosition: promo.imagePosition || 'center'
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPromo && formData.title) {
      await updatePromotion(editingPromo.id, formData);
      setEditingPromo(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-500">
            Active Marketing Campaigns &amp; Posters
          </h3>
          <p className="text-xs text-qc-body font-light mt-0.5">
            Control promotional posters shown on the Homepage and Offers page.
          </p>
        </div>
      </div>

      {/* Promotions List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`luxury-card p-5 flex flex-col justify-between space-y-4 border ${
              promo.isActive ? 'border-border-strong hover:border-purple-600/40' : 'border-border-base opacity-60 bg-qc-base'
            }`}
          >
            {/* Header / Thumbnail */}
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded overflow-hidden bg-qc-base border border-border-strong shrink-0">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: promo.imagePosition || 'center' }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500 block mb-0.5">
                  {promo.badge}
                </span>
                <h4 className="text-sm font-display font-bold text-qc-primary truncate">
                  {promo.title}
                </h4>
                <p className="text-[11px] text-qc-body line-clamp-1 mt-0.5">
                  {promo.schedule}
                </p>
              </div>
            </div>

            <p className="text-xs text-qc-body font-light leading-relaxed line-clamp-2">
              {promo.tagline}
            </p>

            {/* Status & Actions */}
            <div className="pt-3 border-t border-border-base flex items-center justify-between gap-2">
              <button
                onClick={() => togglePromotionActive(promo.id)}
                className={`px-3 py-1 text-xs font-semibold uppercase rounded-sm flex items-center gap-1.5 transition-all ${
                  promo.isActive
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                    : 'bg-qc-elevated text-qc-body border border-border-strong'
                }`}
              >
                {promo.isActive ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-qc-body" />
                    <span>Hidden</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleEditClick(promo)}
                className="btn-gold-outline text-xs px-3 py-1 flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Offer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Promotion Modal */}
      {editingPromo && (
        <Modal
          isOpen={Boolean(editingPromo)}
          onClose={() => setEditingPromo(null)}
          title={`Edit Campaign: ${editingPromo.title}`}
          subtitle="Q-RESTOBAR Promotion CMS"
          maxWidth="lg"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Campaign Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Tagline / Short Hook
              </label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-qc-body uppercase font-medium mb-1">
                  Schedule / Timing
                </label>
                <input
                  type="text"
                  value={formData.schedule || ''}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-qc-body uppercase font-medium mb-1">
                  Pricing Highlight
                </label>
                <input
                  type="text"
                  value={formData.pricingHighlights || ''}
                  onChange={(e) => setFormData({ ...formData, pricingHighlights: e.target.value })}
                  placeholder="e.g. From RM128++ per person"
                  className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Full Description
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-border-base flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingPromo(null)}
                className="btn-ghost-ivory text-xs px-4 py-2 border border-border-strong"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-gold text-xs px-6 py-2 uppercase tracking-wider"
              >
                Save Promotion
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
