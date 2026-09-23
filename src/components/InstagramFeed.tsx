import React, { useState } from 'react';
import { INSTAGRAM_FEED, InstagramPost, BAKERY_CATALOG, DessertItem } from '../data/bakeryCatalog';
import { Heart, MessageCircle, Instagram, Sparkles, ExternalLink, X, ShoppingBag } from 'lucide-react';

interface InstagramFeedProps {
  onAddToCart: (item: DessertItem) => void;
  onExploreMatch: () => void;
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({
  onAddToCart,
  onExploreMatch,
}) => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  const findAssociatedDessert = (postId: string): DessertItem => {
    switch (postId) {
      case 'ig-1':
        return BAKERY_CATALOG.find((i) => i.id === 'cinnamon-rolls-cream-cheese') || BAKERY_CATALOG[0];
      case 'ig-2':
        return BAKERY_CATALOG.find((i) => i.id === 'strawberry-cheesecake') || BAKERY_CATALOG[0];
      case 'ig-3':
        return BAKERY_CATALOG.find((i) => i.id === 'classic-fudge-brownies') || BAKERY_CATALOG[0];
      case 'ig-4':
        return BAKERY_CATALOG.find((i) => i.id === 'chocolate-chip-cookie') || BAKERY_CATALOG[0];
      case 'ig-5':
        return BAKERY_CATALOG.find((i) => i.id === 'chocolate-custard-cake') || BAKERY_CATALOG[0];
      case 'ig-6':
        return BAKERY_CATALOG.find((i) => i.id === 'banoffee-trifle') || BAKERY_CATALOG[0];
      default:
        return BAKERY_CATALOG[0];
    }
  };

  return (
    <section id="instagram-feed" className="py-16 md:py-24 bg-white border-y border-pink-100 relative">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-pink-50/60 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Instagram Profile Header */}
        <div className="bg-gradient-to-r from-pink-50 via-white to-rose-50/70 border border-pink-100 rounded-3xl p-6 sm:p-8 shadow-xs mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Avatar & Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 shadow-md">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-serif-bakery text-2xl font-bold text-pink-600">
                    SK
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-pink-600 text-white rounded-full p-1 border-2 border-white shadow-xs">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-serif-bakery text-2xl font-bold text-gray-900">
                    Treats &amp; Temptations by SK
                  </h3>
                  <span className="text-xs bg-pink-100 text-pink-700 font-semibold px-2.5 py-0.5 rounded-full">
                    Boutique Home Bakery
                  </span>
                </div>
                <p className="text-sm font-semibold text-pink-600 mt-0.5">
                  @treats&amp;temptationsbysk
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl leading-relaxed">
                  Bespoke vintage cakes, slow-fermented brioche, and handcrafted pink treats. Freshly baked in our small-batch kitchen with pure cultured butter and love.
                </p>

                {/* Follower Stats */}
                <div className="flex items-center justify-center sm:justify-start gap-6 mt-3 text-xs text-gray-700">
                  <span><strong>120+</strong> fresh bakes</span>
                  <span><strong>14.8k</strong> pastry lovers</span>
                  <span><strong>100%</strong> homemade</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                onClick={onExploreMatch}
                className="px-4 py-2.5 rounded-full border border-pink-200 bg-white hover:bg-pink-50 text-pink-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Match Your Craving
              </button>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>As Featured On Our Instagram</span>
          </div>
          <h2 className="font-serif-bakery text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900">
            Fresh From The Oven Feed
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Click any picture from <span className="text-pink-600 font-semibold">@treats&amp;temptationsbysk</span> to read its story and order it fresh for your celebration.
          </p>
        </div>

        {/* Instagram Grid (6 Posts) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTAGRAM_FEED.map((post) => {
            const dessert = findAssociatedDessert(post.id);
            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group relative rounded-3xl overflow-hidden border border-pink-100 bg-white shadow-xs hover:shadow-xl transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-pink-50">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <p className="text-xs line-clamp-3 leading-relaxed font-medium">
                      {post.caption}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20 text-xs font-semibold">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </span>
                      </div>
                      <span className="text-pink-300 flex items-center gap-1">
                        <span>Tap to order</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>

                  {/* Top Price Badge */}
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-xs text-pink-700 font-bold text-xs px-3 py-1 rounded-full shadow-xs border border-pink-100">
                    PKR {dessert.price}
                  </div>
                </div>

                {/* Card Caption Footer */}
                <div className="p-4 bg-white flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-serif-bakery text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">
                      {dessert.name}
                    </h4>
                    <span className="text-[11px] text-gray-500">
                      {dessert.serves}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(dessert);
                    }}
                    className="px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Post Detail & Ordering Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-pink-100 max-h-[90vh] flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center transition-colors cursor-pointer shadow-md"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="md:w-1/2 bg-pink-50 flex items-center justify-center">
              <img
                src={selectedPost.imageUrl}
                alt="Instagram bake"
                referrerPolicy="no-referrer"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Account row */}
                <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center font-serif-bakery text-sm">
                    SK
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">
                      treats&amp;temptationsbysk
                    </h5>
                    <span className="text-[10px] text-pink-600 font-medium">
                      BakeMatch Boutique Oven
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="py-4 space-y-3">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {selectedPost.caption}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {selectedPost.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] text-pink-600 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="bg-pink-50/80 p-3 rounded-2xl border border-pink-100 text-xs">
                    <span className="text-[10px] uppercase font-bold text-pink-700 tracking-wider block mb-1">
                      Featured Dessert Details:
                    </span>
                    <h4 className="font-serif-bakery text-base font-bold text-gray-900">
                      {findAssociatedDessert(selectedPost.id).name}
                    </h4>
                    <p className="text-gray-600 text-xs mt-1">
                      {findAssociatedDessert(selectedPost.id).story}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-gray-500 block">Bakery Price</span>
                  <span className="font-serif-bakery text-xl font-bold text-pink-700">
                    PKR {findAssociatedDessert(selectedPost.id).price}
                  </span>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(findAssociatedDessert(selectedPost.id));
                    setSelectedPost(null);
                  }}
                  className="px-5 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order From Instagram</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
