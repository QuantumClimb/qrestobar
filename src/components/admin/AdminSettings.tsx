import React, { useState } from 'react';
import { Save, RefreshCw, Sparkles, Building, Phone, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { RestaurantSettings } from '../../types/settings';
import { Modal } from '../common/Modal';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetDemoData } = useData();
  const [formData, setFormData] = useState<RestaurantSettings>({ ...settings });
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
  };

  const handleConfirmReset = () => {
    resetDemoData();
    setResetModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Title */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-500">
          Restaurant Profile &amp; Contact Configuration
        </h3>
        <p className="text-xs text-qc-body font-light mt-0.5">
          Changes made here instantly reflect on the public website header, footer, quick info bar, and contact page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Section 1: Brand & Headings */}
        <div className="bg-qc-surface border border-border-base p-5 rounded-sm space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-qc-primary border-b border-border-base pb-2 flex items-center gap-2">
            <Building className="w-4 h-4 text-purple-500" />
            <span>Brand Identity &amp; Taglines</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Primary Brand Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Secondary Brand Name
              </label>
              <input
                type="text"
                value={formData.secondaryName}
                onChange={(e) => setFormData({ ...formData, secondaryName: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Main Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Location Area
              </label>
              <input
                type="text"
                value={formData.locationArea}
                onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="bg-qc-surface border border-border-base p-5 rounded-sm space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-qc-primary border-b border-border-base pb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-purple-500" />
            <span>Contact Channels &amp; Address</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Telephone (Calls)
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Inquiry Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-qc-body uppercase font-medium mb-1">
                Street Address (Line 1)
              </label>
              <input
                type="text"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                City &amp; Postcode
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Operating Hours & Dress Code */}
        <div className="bg-qc-surface border border-border-base p-5 rounded-sm space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-qc-primary border-b border-border-base pb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>Operating Hours &amp; Dress Code</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Opening Hours (Summary Display)
              </label>
              <input
                type="text"
                value={formData.openingHoursDisplay}
                onChange={(e) => setFormData({ ...formData, openingHoursDisplay: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Dress Code Policy
              </label>
              <input
                type="text"
                value={formData.dressCode}
                onChange={(e) => setFormData({ ...formData, dressCode: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Weekday Hours Detail
              </label>
              <input
                type="text"
                value={formData.openingHoursWeekday}
                onChange={(e) => setFormData({ ...formData, openingHoursWeekday: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-qc-body uppercase font-medium mb-1">
                Weekend Hours Detail
              </label>
              <input
                type="text"
                value={formData.openingHoursWeekend}
                onChange={(e) => setFormData({ ...formData, openingHoursWeekend: e.target.value })}
                className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Announcement Bar */}
        <div className="bg-qc-surface border border-border-base p-5 rounded-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border-base pb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-qc-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Top Website Announcement Banner</span>
            </h4>
            <label className="flex items-center gap-2 cursor-pointer text-qc-primary">
              <input
                type="checkbox"
                checked={formData.announcementBarActive}
                onChange={(e) => setFormData({ ...formData, announcementBarActive: e.target.checked })}
                className="h-4 w-4 rounded border-border-strong text-purple-500 bg-qc-base"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div>
            <label className="block text-qc-body uppercase font-medium mb-1">
              Banner Message Text
            </label>
            <input
              type="text"
              value={formData.announcementBarText}
              onChange={(e) => setFormData({ ...formData, announcementBarText: e.target.value })}
              className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex items-center justify-between pt-4 border-t border-border-base">
          <button
            type="button"
            onClick={() => setResetModalOpen(true)}
            className="text-xs text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Factory Defaults</span>
          </button>

          <button
            type="submit"
            className="btn-gold text-xs px-8 py-3 flex items-center gap-2 uppercase tracking-wider font-bold"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      {resetModalOpen && (
        <Modal
          isOpen={resetModalOpen}
          onClose={() => setResetModalOpen(false)}
          title="Reset All Application Demo Data"
          subtitle="Warning: Reversible only with manual edits"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-qc-primary">
              Are you sure you want to reset all menu items, promotional posters, reservations, and settings back to their initial factory demonstration states?
            </p>
            <p className="text-red-400">Any custom menu items or reservations you added will be replaced with initial demo records.</p>

            <div className="pt-4 border-t border-border-base flex items-center justify-end gap-3">
              <button
                onClick={() => setResetModalOpen(false)}
                className="btn-ghost-ivory text-xs px-4 py-2 border border-border-strong"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-red-800 hover:bg-red-700 text-qc-primary text-xs font-bold uppercase rounded-sm transition-colors"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
