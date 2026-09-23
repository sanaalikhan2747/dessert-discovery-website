import React from 'react';
import { Sparkles, Instagram, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenSurprise: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSurprise,
  onOpenChat,
}) => {
  return (
    <footer className="bg-[#200d18] text-[#fce7f3] border-t border-pink-900/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-pink-950">
          {/* Brand Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 text-white flex items-center justify-center font-serif-bakery text-xl shadow-xs">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-serif-bakery text-xl sm:text-2xl font-bold text-white tracking-wide">
                  TREATS &amp; TEMPTATIONS
                </span>
                <span className="text-[10px] tracking-widest uppercase text-pink-400 font-bold -mt-0.5">
                  BY SK • ARTISANAL PATISSERIE
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-pink-200/70 leading-relaxed max-w-sm">
              Crafted in delicate pink and pure white. Every vintage Lambeth cake, stuffed cookie, and signature tea loaf is baked fresh to order with bespoke artisanal love.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-pink-400 font-medium">
              <Sparkles className="w-4 h-4 text-pink-300" />
              <span>Tell us the occasion. We'll find your perfect dessert.</span>
            </div>
            <div className="pt-2">
              <a
                href="#instagram"
                onClick={() => onNavigate('instagram')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-950/60 hover:bg-pink-900/60 text-pink-300 border border-pink-800/50 text-xs transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>@treats&amp;temptationsbysk</span>
              </a>
            </div>
          </div>

          {/* Bakery Experiences */}
          <div className="space-y-3">
            <h4 className="font-serif-bakery text-base font-bold text-white tracking-wide">
              Experiences
            </h4>
            <ul className="space-y-2 text-xs text-pink-200/70">
              <li>
                <button
                  onClick={() => onNavigate('matchmaker')}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Dessert Matchmaker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('box-builder')}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Build Your Pink Box
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('instagram')}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Instagram Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSurprise}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Surprise Me 🎲
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pantry')}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Stories Behind The Bake
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenChat}
                  className="hover:text-pink-300 transition-colors cursor-pointer"
                >
                  Treats &amp; Temptations Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Oven Schedule */}
          <div className="space-y-3">
            <h4 className="font-serif-bakery text-base font-bold text-white tracking-wide">
              Boutique Batches
            </h4>
            <ul className="space-y-2 text-xs text-pink-200/70">
              <li>
                <strong className="text-white block">Morning Dawn Batch:</strong>
                Fired at 6:00 AM • Delivered 9 AM – 12 PM
              </li>
              <li>
                <strong className="text-white block">Afternoon Tea Batch:</strong>
                Fired at 11:00 AM • Delivered 2 PM – 5 PM
              </li>
              <li>
                <strong className="text-white block">Celebration Specials:</strong>
                Vintage piping &amp; personalized satin ribbons
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-pink-300/50 gap-4">
          <p>© {new Date().getFullYear()} Treats &amp; Temptations by SK. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>All prices in Pakistani Rupees (PKR)</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Baked with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> by SK
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
