import { DessertItem } from '../data/bakeryCatalog';

export interface CartItem {
  id: string; // unique cart entry id
  type: 'single' | 'custom-box';
  item?: DessertItem;
  quantity: number;
  boxDetails?: {
    loaf: DessertItem | null;
    cookies: DessertItem[];
    brownies: DessertItem[];
    roll: DessertItem | null;
    ribbonColor: string;
    customNote: string;
    boxPrice: number;
  };
}

export interface MatchResult {
  matchedItemId: string;
  matchedItem: DessertItem;
  matchTitle: string;
  matchSubtitle: string;
  servingFit: string;
  budgetFit: string;
  bakerStory: string;
  whyThisBake: string;
  sensoryNotes: {
    aroma: string;
    texture: string;
    pairing: string;
  };
  suggestedAddOn?: DessertItem | null;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'baker';
  text: string;
  timestamp: string;
  recommendedItems?: DessertItem[];
  combinationSummary?: string;
  servingTip?: string;
}

export interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryDate: string;
  deliverySlot: string;
  giftNote?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  estimatedBakeTime: string;
  orderTimestamp: string;
}
