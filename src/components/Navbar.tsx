import React from 'react';
import { Sparkles, ShoppingBag, MessageCircleHeart, Dices, Gift, BookOpen, Instagram } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenChat: () => void;
  onOpenSurprise: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenChat,
  onOpenSurprise,
  activeSection,
  onNavigate,
}) => {
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Tagline */}
          <div 
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 text-white flex items-center justify-center font-serif-bakery text-xl shadow-sm group-hover:scale-105 transition-transform">
              TT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-bakery text-xl sm:text-2xl tracking-tight font-bold text-gray-900">
                  Treats &amp; Temptations
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full border border-pink-200">
                  By SK
                </span>
              </div>
              <p className="text-xs text-pink-700/80 font-medium tracking-tight flex items-center gap-1.5">
                <span>Tell us the occasion. We'll find your dessert.</span>
                <span className="hidden lg:inline text-gray-300">·</span>
                <span className="hidden lg:inline text-pink-600 font-semibold">@treats&amp;temptationsbysk</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <button
              onClick={() => onNavigate('matchmaker')}
              className={`px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'matchmaker'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Dessert Matchmaker
            </button>

            <button
              onClick={() => onNavigate('box-builder')}
              className={`px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'box-builder'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              Build Your Box
            </button>

            <button
              onClick={() => onNavigate('instagram-feed')}
              className={`px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'instagram-feed'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              Instagram Feed
            </button>

            <button
              onClick={() => onNavigate('pantry')}
              className={`px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'pantry'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Stories &amp; Menu
            </button>

            <button
              onClick={onOpenSurprise}
              className="px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Dices className="w-3.5 h-3.5 text-pink-600 animate-spin-slow" />
              Surprise Me 🎲
            </button>
          </nav>

          {/* Action buttons (AI Chat + Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenChat}
              className="px-3 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-800 text-xs sm:text-sm font-medium flex items-center gap-1.5 border border-pink-200 transition-all cursor-pointer"
              title="Chat with Treats&Temptations"
            >
              <MessageCircleHeart className="w-4 h-4 text-pink-600" />
              <span className="hidden sm:inline">AI Baker</span>
              <span className="inline sm:hidden">Chat</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative px-3.5 py-2 rounded-full bg-gray-900 hover:bg-black text-white text-xs sm:text-sm font-medium flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-pink-300" />
              <span className="hidden sm:inline">Cart</span>
              {totalItemsCount > 0 && (
                <span className="bg-pink-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center -mr-1">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
