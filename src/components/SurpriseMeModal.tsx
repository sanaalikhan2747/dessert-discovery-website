import React, { useState, useEffect } from 'react';
import { DessertItem } from '../data/bakeryCatalog';
import {
  X,
  Dices,
  ShoppingBag,
  CheckCircle2,
  RotateCw,
} from 'lucide-react';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: DessertItem) => void;
}

export const SurpriseMeModal: React.FC<SurpriseMeModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [surpriseData, setSurpriseData] = useState<{
    item: DessertItem;
    surpriseHeadline: string;
    surpriseReason: string;
    story: string;
    bakerPairing: string;
  } | null>(null);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [selectedVibe, setSelectedVibe] = useState<string>('spontaneous');

  const rollSurprise = async (vibe?: string) => {
    setIsRolling(true);
    setIsAdded(false);

    try {
      const response = await fetch('/api/surprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moodHint: vibe || selectedVibe,
        }),
      });

      if (!response.ok) throw new Error('Surprise failed');
      const data = await response.json();

      // Small dramatic pause for dice roll feel
      setTimeout(() => {
        setSurpriseData(data);
        setIsRolling(false);
      }, 700);
    } catch (err) {
      console.error('Surprise error:', err);
      setIsRolling(false);
    }
  };

  useEffect(() => {
    if (isOpen && !surpriseData) {
      rollSurprise();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-pink-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-2">
            <Dices className="w-3.5 h-3.5" />
            <span>Spontaneous Baker Serendipity</span>
          </div>
          <h3 className="font-serif-bakery text-2xl sm:text-3xl font-bold text-gray-900">
            Can't Decide? Let Treats&amp;Temptations Choose!
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Sometimes the sweetest moments happen when you surrender the decision to the bakers.
          </p>
        </div>

        {/* ROLLING ANIMATION STATE */}
        {isRolling && (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 flex items-center justify-center animate-spin">
              <Dices className="w-8 h-8 text-pink-600" />
            </div>
            <p className="font-serif-bakery text-lg font-semibold text-gray-900">
              Treats&amp;Temptations is inspecting the oven trays...
            </p>
            <p className="text-xs text-gray-500">
              Selecting today's most irresistible homemade craving
            </p>
          </div>
        )}

        {/* REVEALED RESULT */}
        {!isRolling && surpriseData && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-pink-100">
              <img
                src={surpriseData.item.imageUrl}
                alt={surpriseData.item.name}
                referrerPolicy="no-referrer"
                className="w-full h-52 object-cover"
              />
              <div className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                PKR {surpriseData.item.price}
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs text-gray-900 text-xs p-2 rounded-xl shadow-xs flex items-center justify-between">
                <span className="font-semibold">{surpriseData.item.serves}</span>
                <span className="text-pink-600 font-bold">⭐ {surpriseData.item.rating}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600">
                {surpriseData.surpriseHeadline}
              </span>
              <h4 className="font-serif-bakery text-2xl font-bold text-gray-900">
                {surpriseData.item.name}
              </h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {surpriseData.surpriseReason}
              </p>
            </div>

            <div className="bg-pink-50/70 p-3.5 rounded-2xl border-l-4 border-pink-500 text-xs text-gray-700 italic">
              "{surpriseData.story}"
            </div>

            {/* Quick Vibe Shift */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-bold text-gray-400">Craving something else?</span>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'chocolate', label: '🍫 Choc' },
                  { id: 'warm', label: '🍎 Cozy' },
                  { id: 'citrus', label: '🍋 Citrus' },
                ].map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVibe(v.id);
                      rollSurprise(v.id);
                    }}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors cursor-pointer"
                  >
                    {v.label}
                  </button>
                ))}
                <button
                  onClick={() => rollSurprise()}
                  className="p-1.5 rounded-full hover:bg-pink-100 text-pink-600 transition-colors cursor-pointer"
                  title="Re-roll surprise"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal CTA */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  onAddToCart(surpriseData.item);
                  setIsAdded(true);
                  setTimeout(() => {
                    onClose();
                  }, 1200);
                }}
                className={`flex-1 py-3 px-5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-pink-200" />
                    <span>Claim Surprise (PKR {surpriseData.item.price})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
