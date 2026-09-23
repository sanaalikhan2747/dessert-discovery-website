import React from 'react';
import { Sparkles, Gift, Dices, ArrowDown, Heart, Clock, Award, Instagram } from 'lucide-react';

interface HeroProps {
  onStartMatchmaker: () => void;
  onOpenBoxBuilder: () => void;
  onOpenSurprise: () => void;
  onSelectOccasionDirectly: (occasionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartMatchmaker,
  onOpenBoxBuilder,
  onOpenSurprise,
  onSelectOccasionDirectly,
}) => {
  const occasionPills = [
    { id: 'teaparty', label: '☕ Small Tea Party', quote: 'Warm & Comforting' },
    { id: 'birthday', label: '🎂 Birthday Milestone', quote: 'Showstopper Centers' },
    { id: 'gift', label: '🎁 Heartfelt Gift', quote: 'Ribboned & Personal' },
    { id: 'anniversary', label: '❤️ Quiet Anniversary', quote: 'Dark Cocoa Romance' },
    { id: 'craving', label: '🥳 Just Craving Something', quote: 'Molten & Irresistible' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Pink ambient glow behind */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-pink-200/40 via-rose-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Baker's note pill with Instagram tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-200 text-pink-700 text-xs sm:text-sm font-medium mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-pink-600 animate-ping" />
          <span className="font-bold">Treats &amp; Temptations by SK</span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-600">Fresh Small-Batch Oven Batches</span>
          <span className="text-gray-300">·</span>
          <span className="text-pink-600 font-semibold flex items-center gap-1">
            <Instagram className="w-3 h-3" />
            @treats&amp;temptationsbysk
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif-bakery text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.12] max-w-4xl mx-auto">
          Don't just buy a cake. <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">
            Find the homemade temptation
          </span>{' '}
          your heart was waiting for.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
          We don't do mass-produced display cases. Tell us who you’re gathering, your sweet mood, and your budget—our AI Baker matches the exact aroma, crumb, and warmth your moment deserves.
        </p>

        {/* Occasion Quick-Jump Chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-700 mr-1">
            Pick Your Occasion:
          </span>
          {occasionPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => onSelectOccasionDirectly(pill.id)}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-pink-50 text-xs sm:text-sm font-semibold text-gray-700 border border-pink-100 hover:border-pink-300 hover:text-pink-700 transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>{pill.label}</span>
            </button>
          ))}
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={onStartMatchmaker}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
            <span>Launch Dessert Matchmaker</span>
            <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
              AI Tailored
            </span>
          </button>

          <button
            onClick={onOpenBoxBuilder}
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-pink-50 text-pink-800 font-bold text-base border border-pink-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Gift className="w-5 h-5 text-pink-600" />
            <span>Build Your 6-Piece Box</span>
          </button>

          <button
            onClick={onOpenSurprise}
            className="w-full sm:w-auto px-5 py-4 rounded-full bg-white hover:bg-pink-50 text-pink-700 font-bold text-base border border-pink-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group"
          >
            <Dices className="w-5 h-5 text-pink-600 group-hover:rotate-45 transition-transform" />
            <span>Surprise Me 🎲</span>
          </button>
        </div>

        {/* Sensory Baker Credibility Bar */}
        <div className="mt-14 pt-8 border-t border-pink-100 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="flex items-start gap-2.5">
            <Clock className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-900">Baked To Order</p>
              <p className="text-[11px] text-gray-500">Never pre-frozen; prepared fresh for your event</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Award className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-900">Gourmet Ingredients</p>
              <p className="text-[11px] text-gray-500">Pure butter, Valrhona cocoa & organic vanilla</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Heart className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-900">Bespoke Pink Box</p>
              <p className="text-[11px] text-gray-500">Signature satin ribbons & handwritten cards</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-gray-900">Within Your Budget</p>
              <p className="text-[11px] text-gray-500">Clear PKR pricing with zero surprise charges</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button 
            onClick={onStartMatchmaker}
            className="text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Scroll down to discover your match</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
