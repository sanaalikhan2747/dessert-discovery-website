export interface DessertItem {
  id: string;
  name: string;
  category: 'loaf' | 'cookie' | 'brownie' | 'roll' | 'cake' | 'trifle';
  price: number; // in PKR
  serves: string;
  moods: Array<'chocolate' | 'citrus' | 'warm' | 'coffee' | 'different'>;
  occasions: Array<'birthday' | 'teaparty' | 'gift' | 'anniversary' | 'family' | 'craving'>;
  dietary: Array<'eggless' | 'gluten-free' | 'refined-sugar-free' | 'nut-free' | 'classic'>;
  badge?: string;
  story: string;
  sensoryNotes: {
    aroma: string;
    texture: string;
    pairing: string;
  };
  bakerQuote: string;
  ingredientsHighlight: string[];
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

export const BAKERY_CATALOG: DessertItem[] = [
  // --- CINNAMON ROLLS ---
  {
    id: 'cinnamon-rolls-cream-cheese',
    name: 'Cinnamon Rolls with Cream Cheese Frosting 🥐',
    category: 'roll',
    price: 650,
    serves: '1–2 people',
    moods: ['warm', 'different'],
    occasions: ['craving', 'teaparty', 'gift', 'family'],
    dietary: ['classic', 'eggless'],
    badge: 'Warm Fresh Bake',
    story: 'Pillowy brioche dough swirled with aromatic Ceylon cinnamon and brown sugar, smothered in thick, velvety cream cheese frosting that melts into every spiral.',
    sensoryNotes: {
      aroma: 'Ceylon cinnamon, browned butter, sweet vanilla cream cheese',
      texture: 'Featherlight pull-apart spiral with a molten gooey center',
      pairing: 'Freshly brewed latte or warm cardamom tea'
    },
    bakerQuote: 'We slather the cream cheese frosting while the buns are still steaming hot so it sinks into every fold.',
    ingredientsHighlight: ['Real Cream Cheese', 'Pure Butter', 'Ceylon Cinnamon', 'Brown Sugar Glaze'],
    imageUrl: '/images/cinnamon_rolls.jpg',
    rating: 5.0,
    reviewCount: 460
  },

  // --- BROWNIES ---
  {
    id: 'classic-fudge-brownies',
    name: 'Artisan Fudge Brownies 🍫',
    category: 'brownie',
    price: 350,
    serves: '1 person',
    moods: ['chocolate', 'warm'],
    occasions: ['craving', 'gift', 'birthday', 'family'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Rich Truffle Core',
    story: 'Ultra-rich chocolate fudge brownies with a paper-thin crackly crust and an intensely molten cocoa truffle center made with premium dark chocolate and real creamery butter.',
    sensoryNotes: {
      aroma: 'Dark roasted cacao, warm vanilla, caramelized butter',
      texture: 'Gossamer thin wafer crust yielding to a dense, chewy chocolate truffle center',
      pairing: 'Cold milk or double shot espresso'
    },
    bakerQuote: 'We melt slabs of premium dark chocolate straight into browned butter for an unmatched fudgy depth.',
    ingredientsHighlight: ['Premium Dark Chocolate', 'Creamery Butter', 'Madagascar Vanilla Pods', 'Pure Cane Sugar'],
    imageUrl: '/images/fudge_brownies.jpg',
    rating: 5.0,
    reviewCount: 512
  },

  // --- COOKIES ---
  {
    id: 'chocolate-chip-cookie',
    name: 'Artisan Chocolate Chip Cookie 🍪',
    category: 'cookie',
    price: 220,
    serves: '1 person',
    moods: ['chocolate', 'warm'],
    occasions: ['craving', 'gift', 'teaparty'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Golden & Molten',
    story: 'Thick, soft-baked artisan cookie packed with pools of molten dark chocolate chips, golden caramelized edges, and finished with a delicate pinch of flaky sea salt.',
    sensoryNotes: {
      aroma: 'Toasted butter, brown sugar toffee, melting dark chocolate',
      texture: 'Crispy caramelized edge with a gooey, doughy chocolate center',
      pairing: 'Glass of cold milk or hot cappuccino'
    },
    bakerQuote: 'We age our dough for 24 hours to develop rich toffee notes before baking to golden perfection.',
    ingredientsHighlight: ['Dark Chocolate Chunks', 'Brown Butter', 'Sea Salt Flakes', 'Vanilla Extract'],
    imageUrl: '/images/choc_chip_cookies.jpg',
    rating: 4.9,
    reviewCount: 380
  },

  // --- ARTISANAL LOAVES (SERVING 4 TO 5 PEOPLE) ---
  {
    id: 'lemon-loaf',
    name: 'Zesty Glazed Lemon Loaf 🍋',
    category: 'loaf',
    price: 1150,
    serves: '4 to 5 people',
    moods: ['citrus', 'different'],
    occasions: ['teaparty', 'family', 'gift', 'craving'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Serves 4 to 5',
    story: 'Bright and tender loaf infused with fresh lemon juice and fragrant zest, soaked in a tart citrus syrup and crowned with a crisp white glaze. Serves 4 to 5 people.',
    sensoryNotes: {
      aroma: 'Fresh lemon blossoms, sweet citrus zest, warm vanilla',
      texture: 'Ultra-moist, tender crumb that melts on the tongue with citrus sparkle',
      pairing: 'Earl Grey tea or iced pink lemonade'
    },
    bakerQuote: 'We rub fresh lemon zest directly into the sugar to extract all the aromatic essential oils.',
    ingredientsHighlight: ['Fresh Lemon Zest & Juice', 'Cultured Butter', 'Pure Vanilla', 'Crisp Lemon Glaze'],
    imageUrl: '/images/artisan_dessert_loaf.jpg',
    rating: 4.9,
    reviewCount: 290
  },
  {
    id: 'choc-chip-banana-bread',
    name: 'Chocolate Chip Banana Bread 🍌',
    category: 'loaf',
    price: 1250,
    serves: '4 to 5 people',
    moods: ['warm', 'chocolate'],
    occasions: ['family', 'teaparty', 'craving', 'gift'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Serves 4 to 5',
    story: 'Naturally sweetened ripe bananas caramelized and folded into a spiced batter studded with generous dark chocolate chips. Serves 4 to 5 people.',
    sensoryNotes: {
      aroma: 'Caramelized bananas, warm nutmeg, melting dark chocolate',
      texture: 'Custardy, ultra-tender loaf crumb loaded with melted chocolate pockets',
      pairing: 'Hot chai or freshly brewed filter coffee'
    },
    bakerQuote: 'Overripe heirloom bananas provide natural sweetness and an intensely moist texture.',
    ingredientsHighlight: ['Ripe Bananas', 'Dark Chocolate Chips', 'Brown Butter', 'Cinnamon & Nutmeg'],
    imageUrl: '/images/artisan_dessert_loaf.jpg',
    rating: 5.0,
    reviewCount: 340
  },
  {
    id: 'apple-cinnamon-loaf',
    name: 'Apple Cinnamon Streusel Loaf 🍎',
    category: 'loaf',
    price: 1200,
    serves: '4 to 5 people',
    moods: ['warm', 'different'],
    occasions: ['teaparty', 'family', 'craving', 'gift'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Serves 4 to 5',
    story: 'Loaded with tender spiced apples and warm Ceylon cinnamon, baked until golden and topped with an irresistible crunchy butter-cinnamon streusel. Serves 4 to 5 people.',
    sensoryNotes: {
      aroma: 'Baked spiced apples, Ceylon cinnamon, buttery golden streusel',
      texture: 'Tender spiced sponge with soft apple chunks and crunchy sugar crumble',
      pairing: 'Warm spiced cider or English breakfast tea'
    },
    bakerQuote: 'Every slice contains chunks of freshly peeled apples slow-simmered in cinnamon sugar.',
    ingredientsHighlight: ['Fresh Tart Apples', 'Ceylon Cinnamon', 'Buttery Streusel Crumb', 'Vanilla Bean'],
    imageUrl: '/images/artisan_dessert_loaf.jpg',
    rating: 4.9,
    reviewCount: 310
  },
  {
    id: 'coffee-bread-walnut-crumble',
    name: 'Coffee Bread with Walnut Crumble ☕',
    category: 'loaf',
    price: 1300,
    serves: '4 to 5 people',
    moods: ['coffee', 'warm'],
    occasions: ['teaparty', 'family', 'craving', 'gift'],
    dietary: ['classic', 'eggless'],
    badge: 'Serves 4 to 5',
    story: 'Espresso-infused moist loaf swirled with coffee caramel and crowned with a roasted buttery walnut crumble that shatters pleasingly with each bite. Serves 4 to 5 people.',
    sensoryNotes: {
      aroma: 'Roasted espresso beans, caramelized sugar, toasted walnuts',
      texture: 'Soft, coffee-soaked crumb with a rich nutty crumble top',
      pairing: 'Café au lait or iced vanilla latte'
    },
    bakerQuote: 'The combination of dark roast coffee and toasted walnut crumble is pure morning comfort.',
    ingredientsHighlight: ['Dark Roast Espresso', 'Toasted Walnuts', 'Brown Sugar Crumble', 'Sweet Butter'],
    imageUrl: '/images/artisan_dessert_loaf.jpg',
    rating: 4.9,
    reviewCount: 220
  },
  {
    id: 'coconut-loaf',
    name: 'Tender Coconut Loaf 🥥',
    category: 'loaf',
    price: 1150,
    serves: '4 to 5 people',
    moods: ['different', 'warm'],
    occasions: ['teaparty', 'family', 'gift'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Serves 4 to 5',
    story: 'Moist bakery loaf infused with rich coconut milk and pure vanilla, topped with sweet toasted shredded coconut ribbons. Serves 4 to 5 people.',
    sensoryNotes: {
      aroma: 'Toasted coconut flakes, warm vanilla, sweet milk',
      texture: 'Fluffy yet moist crumb with delicate toasted coconut texture',
      pairing: 'Jasmine green tea or chilled milk'
    },
    bakerQuote: 'We toast the coconut shreds right on top as the loaf bakes to create an intoxicating aroma.',
    ingredientsHighlight: ['Pure Coconut Milk', 'Toasted Shredded Coconut', 'Sweet Cream Butter', 'Pure Vanilla'],
    imageUrl: '/images/artisan_dessert_loaf.jpg',
    rating: 4.8,
    reviewCount: 180
  },
  {
    id: 'double-chocolate-loaf',
    name: 'Double Chocolate Loaf 🍫',
    category: 'loaf',
    price: 1350,
    serves: '4 to 5 people',
    moods: ['chocolate', 'warm'],
    occasions: ['birthday', 'anniversary', 'family', 'gift'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Serves 4 to 5',
    story: 'Deep Dutch cocoa batter folded with molten Belgian dark chocolate chunks, finished with a luscious chocolate ganache drizzle. Serves 4 to 5 people.',
    sensoryNotes: {
      aroma: 'Intense Dutch cocoa, dark chocolate truffle, sweet vanilla',
      texture: 'Decadently dense and rich cake-like crumb packed with molten chocolate chips',
      pairing: 'Black Americano or iced whole milk'
    },
    bakerQuote: 'A chocolate lover’s dream loaf—tender, fudgy, and packed with double chocolate in every bite.',
    ingredientsHighlight: ['Dutch Processed Cocoa', 'Belgian Chocolate Chunks', 'Chocolate Ganache', 'Pure Butter'],
    imageUrl: '/images/artisan_dessert_loaf.jpg',
    rating: 5.0,
    reviewCount: 395
  },
  {
    id: 'sugar-free-dates-walnuts-loaf',
    name: 'Sugar Free Dates & Walnuts Loaf 🌴',
    category: 'loaf',
    price: 1450,
    serves: '4 to 5 people',
    moods: ['warm', 'different'],
    occasions: ['family', 'teaparty', 'gift'],
    dietary: ['refined-sugar-free', 'classic'],
    badge: 'Zero Refined Sugar • Serves 4-5',
    story: 'Naturally sweetened exclusively with plump Medjool dates, enriched with crunchy toasted California walnuts and fragrant cardamom. Zero refined sugar. Serves 4 to 5 people.',
    sensoryNotes: {
      aroma: 'Caramelized Medjool dates, toasted walnuts, gentle cardamom',
      texture: 'Naturally dense, moist, and chewy with crunchy walnut pieces',
      pairing: 'Green tea or black tea with cardamom'
    },
    bakerQuote: 'No refined sugar needed when nature provides the rich, toffee-like sweetness of sun-ripened dates.',
    ingredientsHighlight: ['Medjool Dates', 'Toasted California Walnuts', 'Whole Wheat Flour', 'Ground Cardamom'],
    imageUrl: '/images/artisan_dessert_loaf.jpg',
    rating: 4.9,
    reviewCount: 260
  },

  // --- TRIFLES ---
  {
    id: 'brownie-trifle',
    name: 'Gourmet Brownie Trifle 🍫',
    category: 'trifle',
    price: 950,
    serves: '2–3 people',
    moods: ['chocolate', 'warm'],
    occasions: ['anniversary', 'birthday', 'craving', 'gift'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Layered Decadence',
    story: 'Individual boutique glass dessert layered with generous chunks of fudgy chocolate brownies, silky chocolate mousse, velvety custard, and whipped cream.',
    sensoryNotes: {
      aroma: 'Rich chocolate brownie, sweet vanilla custard, whipped dairy cream',
      texture: 'Contrasting layers of chewy fudge brownie and cloud-like silky creams',
      pairing: 'Espresso or chilled dessert wine'
    },
    bakerQuote: 'Every spoonful delivers a spoonful of dense fudge brownie cushioned in creamy custard.',
    ingredientsHighlight: ['Artisan Fudge Brownies', 'Silky Chocolate Custard', 'Fresh Whipped Cream', 'Dark Chocolate Shavings'],
    imageUrl: '/images/dessert_trifle.jpg',
    rating: 5.0,
    reviewCount: 375
  },
  {
    id: 'banoffee-trifle',
    name: 'Artisan Banoffee Trifle 🍌',
    category: 'trifle',
    price: 950,
    serves: '2–3 people',
    moods: ['warm', 'different'],
    occasions: ['family', 'craving', 'gift', 'birthday'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Golden Toffee',
    story: 'A British classic reinvented in boutique layers: buttery crushed biscuit, slow-cooked golden dulce de leche toffee, fresh sliced bananas, and airy vanilla cream.',
    sensoryNotes: {
      aroma: 'Buttery caramel toffee, fresh sweet bananas, vanilla cream',
      texture: 'Crunchy buttery biscuit crumb meeting luscious caramel and tender banana slices',
      pairing: 'Hot cappuccino or iced caramel latte'
    },
    bakerQuote: 'We simmer our dulce de leche caramel for 4 hours until it reaches a deep amber butterscotch note.',
    ingredientsHighlight: ['Dulce de Leche Caramel', 'Fresh Bananas', 'Buttery Biscuit Crumb', 'Chantilly Cream'],
    imageUrl: '/images/dessert_trifle.jpg',
    rating: 5.0,
    reviewCount: 410
  },
  {
    id: 'fruit-trifle',
    name: 'Seasonal Fresh Fruit Trifle 🍓',
    category: 'trifle',
    price: 900,
    serves: '2–3 people',
    moods: ['citrus', 'different'],
    occasions: ['teaparty', 'family', 'gift', 'anniversary'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Fresh Berry Harvest',
    story: 'Light, refreshing layers of tender vanilla sponge cake soaked in fruit nectar, velvety homemade custard, vibrant fresh seasonal strawberries, and whipped cream.',
    sensoryNotes: {
      aroma: 'Fresh sweet strawberries, vanilla custard, light sponge cake',
      texture: 'Airy sponge melting with creamy smooth custard and juicy fresh fruit bursts',
      pairing: 'Earl Grey tea or iced peach tea'
    },
    bakerQuote: 'Our fruit trifle is vibrant, light, and celebrates fresh fruit sweetness in every single bite.',
    ingredientsHighlight: ['Fresh Strawberries', 'Homemade Vanilla Custard', 'Sponge Cake', 'Whipped Cream'],
    imageUrl: '/images/dessert_trifle.jpg',
    rating: 4.9,
    reviewCount: 295
  },

  // --- SIGNATURE CAKES ---
  {
    id: 'strawberry-cheesecake',
    name: 'Cheesecake with Strawberry Topping 🍓',
    category: 'cake',
    price: 1950,
    serves: '6–8 people',
    moods: ['citrus', 'different', 'warm'],
    occasions: ['birthday', 'anniversary', 'gift', 'family'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Boutique Signature Cake',
    story: 'Velvety smooth New York style baked cheesecake over a buttery golden graham cracker crust, generously topped with a lavish cascade of glazed fresh strawberries and coulis.',
    sensoryNotes: {
      aroma: 'Fresh glazed strawberries, cultured cream cheese, toasted butter crust',
      texture: 'Silky, dense cream cheese melt balanced by crisp buttery base and juicy berries',
      pairing: 'Pink sparkling tea, iced strawberry matcha, or fresh espresso'
    },
    bakerQuote: 'We slow-bake our cheesecake in a gentle water bath to achieve that signature satin-smooth texture.',
    ingredientsHighlight: ['Cultured Philadelphia Cream Cheese', 'Glazed Fresh Strawberries', 'Golden Graham Crust', 'Pure Vanilla'],
    imageUrl: '/images/strawberry_cheesecake.jpg',
    rating: 5.0,
    reviewCount: 480
  },
  {
    id: 'chocolate-custard-cake',
    name: 'Decadent Chocolate Custard Cake 🍫',
    category: 'cake',
    price: 1850,
    serves: '6–8 people',
    moods: ['chocolate', 'warm'],
    occasions: ['birthday', 'anniversary', 'family', 'gift'],
    dietary: ['classic', 'eggless', 'nut-free'],
    badge: 'Custard Infused',
    story: 'Tender, moist dark chocolate sponge layered and frosted with silky homemade chocolate custard cream, garnished with delicate chocolate curls. Pure celebration indulgence.',
    sensoryNotes: {
      aroma: 'Dutch chocolate fudge, rich custard, delicate chocolate curls',
      texture: 'Featherlight chocolate cake layers cushioned by glossy, velvety chocolate custard',
      pairing: 'Black pour-over coffee or royal spiced tea'
    },
    bakerQuote: 'The homemade chocolate custard cream keeps the sponge ultra-moist for days without feeling heavy.',
    ingredientsHighlight: ['Dutch Processed Cocoa', 'Homemade Chocolate Custard', 'Dark Chocolate Shavings', 'Fresh Cream'],
    imageUrl: '/images/choc_custard_cake.jpg',
    rating: 5.0,
    reviewCount: 430
  }
];

export const MOODS = [
  { id: 'chocolate', label: 'Rich Chocolate', emoji: '🍫', icon: '🍫', desc: 'Indulgent, fudgy & comforting', description: 'Indulgent, fudgy & comforting' },
  { id: 'citrus', label: 'Zesty Citrus & Berries', emoji: '🍋', icon: '🍋', desc: 'Bright, refreshing & uplifting', description: 'Bright, refreshing & uplifting' },
  { id: 'warm', label: 'Warm Cinnamon & Caramel', emoji: '🥐', icon: '🥐', desc: 'Comforting, spiced & cozy', description: 'Comforting, spiced & cozy' },
  { id: 'coffee', label: 'Espresso & Crumble', emoji: '☕', icon: '☕', desc: 'Aromatic, rich & toasty', description: 'Aromatic, rich & toasty' },
  { id: 'different', label: 'Something Unique', emoji: '✨', icon: '✨', desc: 'Artisan pairings & novel textures', description: 'Artisan pairings & novel textures' }
];

export const OCCASIONS = [
  { id: 'craving', label: 'Personal Craving', emoji: '🛋️', icon: '🛋️', hint: 'Solo indulgence or cozy night in', description: 'Solo indulgence or cozy night in' },
  { id: 'teaparty', label: 'Afternoon Tea', emoji: '🫖', icon: '🫖', hint: 'Delicate slices & light pairings', description: 'Delicate slices & light pairings' },
  { id: 'birthday', label: 'Birthday Celebration', emoji: '🎂', icon: '🎂', hint: 'Showstopper cakes & celebratory boxes', description: 'Showstopper cakes & celebratory boxes' },
  { id: 'family', label: 'Family Gathering', emoji: '🏡', icon: '🏡', hint: 'Generous sharing loaves & trifles', description: 'Generous sharing loaves & trifles' },
  { id: 'anniversary', label: 'Milestone / Romantic', emoji: '🥂', icon: '🥂', hint: 'Elegant artisanal presentations', description: 'Elegant artisanal presentations' },
  { id: 'gift', label: 'Thoughtful Gift', emoji: '🎁', icon: '🎁', hint: 'Beautifully packaged in pink box', description: 'Beautifully packaged in pink box' }
];

export const DIETARY_OPTIONS = [
  { id: 'classic', label: 'Classic Bakehouse', icon: '🌾' },
  { id: 'eggless', label: 'Eggless Available', icon: '🌱' },
  { id: 'refined-sugar-free', label: 'Sugar-Free (Dates/Honey)', icon: '🍯' },
  { id: 'nut-free', label: 'Nut-Free', icon: '🥜' }
];

export const GROUP_SIZES = [
  { id: 'solo', label: 'Personal Indulgence / Duo', people: '1–2 people', desc: 'Brownies, warm cookies & cozy portions' },
  { id: 'loaf-size', label: 'Artisan Loaf Gathering', people: '4–5 people', desc: 'Our handcrafted loaves generously serve 4 to 5 people' },
  { id: 'tea-group', label: 'Boutique Tea Party', people: '6–8 people', desc: 'Loaves + cinnamon rolls + trifle pairings' },
  { id: 'celebration', label: 'Celebration Feast', people: '10–12+ people', desc: 'Cheesecake, chocolate custard cake & bakery spreads' }
];

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  tags: string[];
}

export const INSTAGRAM_FEED: InstagramPost[] = [
  {
    id: 'ig-1',
    imageUrl: '/images/cinnamon_rolls.jpg',
    caption: 'Fresh out of the boutique oven! Warm cinnamon rolls smothered in melting cream cheese frosting 🥐✨ Pure comfort in every bite. #treatsandtemptationsbysk',
    likes: 1340,
    comments: 88,
    tags: ['#cinnamonrolls', '#creamcheesefrosting', '#treatsandtemptationsbysk']
  },
  {
    id: 'ig-2',
    imageUrl: '/images/strawberry_cheesecake.jpg',
    caption: 'Our signature Cheesecake with fresh glazed strawberry topping 🍓 Velvety, creamy, and made for unforgettable celebrations! #treatsandtemptationsbysk',
    likes: 1680,
    comments: 112,
    tags: ['#cheesecake', '#strawberrytopping', '#treatsandtemptationsbysk']
  },
  {
    id: 'ig-3',
    imageUrl: '/images/fudge_brownies.jpg',
    caption: 'That crinkly paper-thin top and fudgy molten core 🤤 Stack of artisan dark chocolate fudge brownies. Freshly baked today! #treatsandtemptationsbysk',
    likes: 1520,
    comments: 94,
    tags: ['#brownies', '#fudgebrownies', '#treatsandtemptationsbysk']
  },
  {
    id: 'ig-4',
    imageUrl: '/images/choc_chip_cookies.jpg',
    caption: 'Golden-brown edges, gooey chocolate pools, and a touch of sea salt. Our handmade Chocolate Chip Cookies are pure nostalgic bliss 🍪✨ #treatsandtemptationsbysk',
    likes: 1290,
    comments: 76,
    tags: ['#chocolatechipcookie', '#freshbaked', '#treatsandtemptationsbysk']
  },
  {
    id: 'ig-5',
    imageUrl: '/images/choc_custard_cake.jpg',
    caption: 'Decadent Chocolate Custard Cake with silky chocolate custard cream and delicate curls 🍫🎂 The centerpiece of your special day. #treatsandtemptationsbysk',
    likes: 1840,
    comments: 130,
    tags: ['#chocolatecustardcake', '#birthdaycake', '#treatsandtemptationsbysk']
  },
  {
    id: 'ig-6',
    imageUrl: '/images/dessert_trifle.jpg',
    caption: 'Boutique trifles in individual glass cups! Choose between our Brownie Trifle, Banoffee Trifle, and Fresh Fruit Trifle 🍧 Layered perfection. #treatsandtemptationsbysk',
    likes: 1950,
    comments: 142,
    tags: ['#banoffeetriffle', '#brownietrifle', '#fruittrifle', '#treatsandtemptationsbysk']
  }
];
