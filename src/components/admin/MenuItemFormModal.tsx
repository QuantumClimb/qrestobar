import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MenuItem, MenuCategoryType, MENU_CATEGORIES } from '../../types/menu';
import { Modal } from '../common/Modal';
import { ImageUploadField } from './ImageUploadField';

const menuItemSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.enum([
    'signatures',
    'small-plates',
    'grill',
    'seafood',
    'vegetarian',
    'desserts',
    'cocktails',
    'mocktails',
    'wine-beer'
  ] as const),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  description: z.string().min(5, 'Description is required'),
  imageUrl: z.string().min(1, 'Please select or upload an image'),
  spicyLevel: z.coerce.number().min(0).max(3),
  isVegetarian: z.boolean(),
  isChefsPick: z.boolean(),
  isAvailable: z.boolean(),
  allergensInput: z.string().optional(),
  pairingRecommendation: z.string().optional()
});

type FormData = z.infer<typeof menuItemSchema>;

interface MenuItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (itemData: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialItem?: MenuItem | null;
}

export const MenuItemFormModal: React.FC<MenuItemFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialItem
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: '',
      category: 'signatures',
      price: 35,
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      spicyLevel: 0,
      isVegetarian: false,
      isChefsPick: false,
      isAvailable: true,
      allergensInput: '',
      pairingRecommendation: ''
    }
  });

  useEffect(() => {
    if (initialItem) {
      reset({
        name: initialItem.name,
        category: initialItem.category,
        price: initialItem.price,
        description: initialItem.description,
        imageUrl: initialItem.imageUrl,
        spicyLevel: initialItem.spicyLevel,
        isVegetarian: initialItem.isVegetarian,
        isChefsPick: initialItem.isChefsPick,
        isAvailable: initialItem.isAvailable,
        allergensInput: initialItem.allergens ? initialItem.allergens.join(', ') : '',
        pairingRecommendation: initialItem.pairingRecommendation || ''
      });
    } else {
      reset({
        name: '',
        category: 'signatures',
        price: 38,
        description: '',
        imageUrl: '/images/Lethu_steak.jpg',
        spicyLevel: 1,
        isVegetarian: false,
        isChefsPick: false,
        isAvailable: true,
        allergensInput: '',
        pairingRecommendation: ''
      });
    }
  }, [initialItem, reset, isOpen]);

  const onFormSubmit = (data: FormData) => {
    const allergens = data.allergensInput
      ? data.allergensInput.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    onSubmit({
      name: data.name,
      category: data.category as MenuCategoryType,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl,
      spicyLevel: data.spicyLevel as 0 | 1 | 2 | 3,
      isVegetarian: data.isVegetarian,
      isChefsPick: data.isChefsPick,
      isAvailable: data.isAvailable,
      allergens,
      pairingRecommendation: data.pairingRecommendation
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialItem ? 'Edit Menu Item' : 'Add New Menu Item'}
      subtitle="Q-RESTOBAR CMS Menu Editor"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 text-xs">
        {/* Row 1: Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-qc-body uppercase font-medium mb-1">
              Item / Dish Name *
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="e.g. Crispy Soft-Shell Crab Laksa"
              className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
            />
            {errors.name && <p className="text-red-400 mt-0.5">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-qc-body uppercase font-medium mb-1">
              Category *
            </label>
            <select
              {...register('category')}
              className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
            >
              {MENU_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Price & Spicy Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-qc-body uppercase font-medium mb-1">
              Price in Malaysian Ringgit (RM) *
            </label>
            <input
              type="number"
              step="1"
              {...register('price')}
              className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
            />
            {errors.price && <p className="text-red-400 mt-0.5">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-qc-body uppercase font-medium mb-1">
              Spiciness Level (0 to 3)
            </label>
            <select
              {...register('spicyLevel')}
              className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
            >
              <option value={0}>0 - Not Spicy / Mild</option>
              <option value={1}>1 - Mild Spiciness</option>
              <option value={2}>2 - Moderately Spicy</option>
              <option value={3}>3 - Extra Hot Sambal</option>
            </select>
          </div>
        </div>

        {/* Row 3: Image Upload / Gallery Picker */}
        <Controller
          control={control}
          name="imageUrl"
          render={({ field }) => (
            <ImageUploadField
              value={field.value}
              onChange={field.onChange}
              label="Dish / Beverage Image"
              helperText="Upload a high-res photo from your device, pick from restaurant gallery, or paste a URL."
            />
          )}
        />
        {errors.imageUrl && <p className="text-red-400 mt-0.5">{errors.imageUrl.message}</p>}


        {/* Row 4: Description */}
        <div>
          <label className="block text-qc-body uppercase font-medium mb-1">
            Description &amp; Ingredients *
          </label>
          <textarea
            rows={3}
            {...register('description')}
            placeholder="Highlight ingredients, cooking style, and culinary notes..."
            className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
          />
          {errors.description && <p className="text-red-400 mt-0.5">{errors.description.message}</p>}
        </div>

        {/* Row 5: Allergens & Drink Pairing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-qc-body uppercase font-medium mb-1">
              Allergens (comma separated)
            </label>
            <input
              type="text"
              {...register('allergensInput')}
              placeholder="e.g. Peanuts, Crustaceans, Dairy"
              className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-qc-body uppercase font-medium mb-1">
              Drink Pairing Suggestion
            </label>
            <input
              type="text"
              {...register('pairingRecommendation')}
              placeholder="e.g. Pandan Colada or Pinot Noir"
              className="w-full bg-qc-base border border-border-strong px-3 py-2 text-qc-primary rounded-sm focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Row 6: Checkboxes (Vegetarian, Chef's Pick, Available) */}
        <div className="p-3 bg-qc-base border border-border-base rounded-sm flex items-center justify-between flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-qc-primary">
            <input
              type="checkbox"
              {...register('isVegetarian')}
              className="h-4 w-4 rounded border-border-strong text-purple-500 bg-qc-surface"
            />
            <span>Vegetarian Dish</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-qc-primary">
            <input
              type="checkbox"
              {...register('isChefsPick')}
              className="h-4 w-4 rounded border-border-strong text-purple-500 bg-qc-surface"
            />
            <span>Chef's Pick Highlight</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-qc-primary">
            <input
              type="checkbox"
              {...register('isAvailable')}
              className="h-4 w-4 rounded border-border-strong text-purple-500 bg-qc-surface"
            />
            <span>In Stock (Available Now)</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="pt-3 border-t border-border-base flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost-ivory text-xs px-4 py-2 border border-border-strong"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-gold text-xs px-6 py-2 uppercase tracking-wider"
          >
            {initialItem ? 'Save Changes' : 'Create Item'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
