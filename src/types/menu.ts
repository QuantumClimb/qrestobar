export type MenuCategoryType = 
  | 'signatures'
  | 'small-plates' 
  | 'grill' 
  | 'seafood' 
  | 'vegetarian' 
  | 'desserts' 
  | 'cocktails' 
  | 'mocktails' 
  | 'wine-beer';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryType;
  price: number; // in MYR / RM
  description: string;
  imageUrl: string;
  spicyLevel: 0 | 1 | 2 | 3;
  isVegetarian: boolean;
  isChefsPick: boolean;
  isAvailable: boolean; // false = Sold Out
  allergens?: string[];
  pairingRecommendation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MenuCategoryMeta {
  id: MenuCategoryType;
  label: string;
  description: string;
}

export const MENU_CATEGORIES: MenuCategoryMeta[] = [
  { id: 'signatures', label: 'Malaysian Signatures', description: 'Reimagined heritage classics crafted with contemporary precision' },
  { id: 'small-plates', label: 'Small Plates', description: 'Artisanal bites designed for sharing, discovery, and aperitifs' },
  { id: 'grill', label: 'From the Grill', description: 'Charred skewers, prime cuts, and smoky wok-kissed delicacies' },
  { id: 'seafood', label: 'Seafood', description: 'Fresh ocean catches infused with aromatic herbs, laksa broths, and citrus' },
  { id: 'vegetarian', label: 'Vegetarian', description: 'Plant-forward creations brimming with bold Southeast Asian spices' },
  { id: 'desserts', label: 'Desserts', description: 'Indulgent treats celebrating pandan, palm sugar, coconut, and tropical fruit' },
  { id: 'cocktails', label: 'Signature Cocktails', description: 'Artfully crafted mixology celebrating local botanicals and spirits' },
  { id: 'mocktails', label: 'Botanical Mocktails', description: 'Zero-proof craft infusions with refreshing tropical notes' },
  { id: 'wine-beer', label: 'Wine & Beer', description: 'Curated international wines and crisp craft beers to complement bold flavours' },
];
