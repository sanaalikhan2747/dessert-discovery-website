import React, { useState, useMemo } from 'react';
import { BAKERY_CATALOG, DessertItem, MOODS } from '../data/bakeryCatalog';
import {
  BookOpen,
  Search,
  ShoppingBag,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';

interface StoryPantryProps {
  onAddToCart: (item: DessertItem) => void;
}

export const StoryPantry: React.FC<StoryPantryProps> = ({ onAddToCart }) => {
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [storyModalItem, setStoryModalItem] = useState<DessertItem | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return BAKERY_CATALOG.filter((item) => {
      // Mood filter
      if (selectedMood !== 'all' && !item.moods.includes(selectedMood as any)) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (selectedDiet !== 'all' && !item.dietary.includes(selectedDiet as any)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesStory = item.story.toLowerCase().includes(query);
        const matchesIngredient = item.ingredientsHighlight.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesStory && !matchesIngredient) {
          return false;
        }
      }
      return true;
    });
  }, [selectedMood, selectedCategory, selectedDiet, searchQuery]);

  const handleAdd = (item: DessertItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 2500);
  };

  return (
    <section id="pantry" className="py-16 md:py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The Treats &amp; Temptations Pantry</span>
          </div>
          <h2 className="font-serif-bakery text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Stories Behind The Bake
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            We believe you can taste the heartfelt intention behind every dessert. Here, every celebration cake, tea loaf, cookie, and roll carries the artisan inspiration that sparked its creation.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-pink-50/50 border border-pink-200 rounded-3xl p-4 sm:p-5 shadow-xs mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-pink-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search flavors, rosewater, ruby cocoa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-pink-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40 bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {[
                { id: 'all', label: 'All Menu (15)' },
                { id: 'loaf', label: '🍞 Loaves (Serves 4–5)' },
                { id: 'trifle', label: '🍧 Trifles' },
                { id: 'cake', label: '🍰 Cakes' },
                { id: 'roll', label: '🥐 Cinnamon Rolls' },
                { id: 'brownie', label: '🍫 Brownies' },
                { id: 'cookie', label: '🍪 Cookies' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-pink-600 text-white shadow-2xs'
                      : 'bg-white hover:bg-pink-100 text-gray-700 border border-pink-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loaf Serving Clarification Notice */}
          <div className="bg-pink-50/70 border border-pink-200/80 rounded-2xl px-4 py-2 text-xs text-pink-900 flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-pink-600 shrink-0" />
              <span><strong>Artisan Loaves Note:</strong> All loaf cakes are freshly baked in generous loaf pans and portioned for <strong>4 to 5 people</strong>.</span>
            </span>
            <span className="text-[11px] font-bold text-pink-700 uppercase tracking-wider hidden sm:inline">
              Treats &amp; Temptations by SK
            </span>
          </div>

          {/* Flavor Mood & Dietary Filters */}
          <div className="pt-3 border-t border-pink-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-pink-800 font-bold mr-1">Mood:</span>
              <button
                onClick={() => setSelectedMood('all')}
                className={`px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                  selectedMood === 'all'
                    ? 'bg-pink-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-pink-100 border border-pink-100'
                }`}
              >
                All Moods
              </button>
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  className={`px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                    selectedMood === m.id
                      ? 'bg-pink-600 text-white font-bold'
                      : 'bg-white text-gray-700 hover:bg-pink-100 border border-pink-100'
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            {/* Diet toggle */}
            <div className="flex items-center gap-1.5">
              <span className="text-pink-800 font-bold">Diet:</span>
              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="px-2.5 py-1 rounded-lg border border-pink-200 bg-white text-xs font-semibold text-gray-900 focus:outline-none cursor-pointer"
              >
                <option value="all">All Dietary</option>
                <option value="eggless">Eggless / Veg</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="refined-sugar-free">No Refined Sugar</option>
                <option value="nut-free">Nut-Free</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESULTS GRID */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-pink-50/40 border border-pink-200 rounded-3xl">
            <p className="font-serif-bakery text-xl text-gray-900">No bakes found matching this flavor search</p>
            <p className="text-xs text-gray-500 mt-1">Try clearing your filters or search keywords.</p>
            <button
              onClick={() => {
                setSelectedMood('all');
                setSelectedCategory('all');
                setSelectedDiet('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-pink-600 text-white text-xs font-bold shadow-xs hover:bg-pink-700 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAdded = justAddedId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-pink-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col group hover:border-pink-200"
                >
                  {/* Image with sensory overlay */}
                  <div className="relative h-60 overflow-hidden bg-pink-50">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-gray-900/85 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                      PKR {item.price}
                    </div>
                    {item.badge && (
                      <div className="absolute top-3 right-3 bg-pink-600 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
                        {item.badge}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs text-gray-900 text-[11px] px-3 py-1.5 rounded-xl shadow-xs flex items-center justify-between border border-pink-100">
                      <span className="font-semibold">{item.serves}</span>
                      <span className="text-pink-600 font-bold">⭐ {item.rating}</span>
                    </div>
                  </div>

                  {/* Content & Story */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-serif-bakery text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-pink-600 transition-colors">
                        {item.name}
                      </h3>

                      {/* THE CORE STORY QUOTE */}
                      <div className="mt-2.5 bg-pink-50/70 border-l-3 border-pink-500 p-3 rounded-r-xl">
                        <p className="font-serif-bakery italic text-xs sm:text-sm text-gray-800 leading-relaxed">
                          "{item.story}"
                        </p>
                      </div>

                      {/* Sensory Tags */}
                      <div className="mt-3 text-[11px] text-gray-600 space-y-1">
                        <div>
                          <strong>👃 Aroma:</strong> {item.sensoryNotes.aroma}
                        </div>
                        <div>
                          <strong>☕ Pairing:</strong> {item.sensoryNotes.pairing}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-pink-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setStoryModalItem(item)}
                        className="text-xs font-bold text-pink-700 hover:text-pink-800 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Baker's Story</span>
                        <span>→</span>
                      </button>

                      <button
                        onClick={() => handleAdd(item)}
                        className={`px-4 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-pink-200" />
                            <span>Order (PKR {item.price})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FULL STORY MODAL */}
      {storyModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-pink-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setStoryModalItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-pink-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Baker's Craft Chronicle</span>
            </div>

            <h3 className="font-serif-bakery text-2xl sm:text-3xl font-bold text-gray-900">
              {storyModalItem.name}
            </h3>

            <div className="mt-4 rounded-2xl overflow-hidden aspect-video relative">
              <img
                src={storyModalItem.imageUrl}
                alt={storyModalItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-gray-900/85 text-white text-xs font-bold px-3 py-1 rounded-full">
                PKR {storyModalItem.price}
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm text-gray-700 leading-relaxed">
              <div className="bg-pink-50/70 p-4 rounded-2xl border-l-4 border-pink-500">
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-800 block mb-1">
                  Baker's Confession:
                </span>
                <p className="font-serif-bakery italic text-base text-gray-900">
                  "{storyModalItem.bakerQuote}"
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-1">
                  Sensory Anatomy:
                </h4>
                <ul className="text-xs space-y-1 bg-white p-3 rounded-xl border border-pink-100">
                  <li><strong>Aroma:</strong> {storyModalItem.sensoryNotes.aroma}</li>
                  <li><strong>Texture:</strong> {storyModalItem.sensoryNotes.texture}</li>
                  <li><strong>Ideal Pairing:</strong> {storyModalItem.sensoryNotes.pairing}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2">
                  Featured Ingredients:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {storyModalItem.ingredientsHighlight.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Single Batch Price</span>
                <span className="font-serif-bakery text-xl font-bold text-pink-700">
                  PKR {storyModalItem.price}
                </span>
              </div>

              <button
                onClick={() => {
                  handleAdd(storyModalItem);
                  setStoryModalItem(null);
                }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-pink-200" />
                <span>Add to My Order</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
