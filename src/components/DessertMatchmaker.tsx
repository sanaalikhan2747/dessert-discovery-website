import React, { useState } from 'react';
import {
  OCCASIONS,
  MOODS,
  GROUP_SIZES,
  DIETARY_OPTIONS,
  DessertItem,
} from '../data/bakeryCatalog';
import { MatchResult } from '../types';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
  CheckCircle2,
  ChefHat,
  Plus,
} from 'lucide-react';

interface DessertMatchmakerProps {
  onAddToCart: (item: DessertItem, quantity?: number) => void;
  initialOccasion?: string;
}

export const DessertMatchmaker: React.FC<DessertMatchmakerProps> = ({
  onAddToCart,
  initialOccasion,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [occasion, setOccasion] = useState<string>(initialOccasion || 'teaparty');
  const [mood, setMood] = useState<string>('warm');
  const [people, setPeople] = useState<string>('6–8 people');
  const [budget, setBudget] = useState<number>(1200);
  const [dietary, setDietary] = useState<string>('all');
  const [note, setNote] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [addedDirectly, setAddedDirectly] = useState<boolean>(false);
  const [addedAddOn, setAddedAddOn] = useState<boolean>(false);

  // Sync if initialOccasion changes externally
  React.useEffect(() => {
    if (initialOccasion) {
      setOccasion(initialOccasion);
    }
  }, [initialOccasion]);

  const handleFindMatch = async () => {
    setIsLoading(true);
    setMatchResult(null);
    setAddedDirectly(false);
    setAddedAddOn(false);

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          mood,
          people,
          budget,
          dietary,
          note,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch match');
      }

      const data = await response.json();
      setMatchResult(data);
    } catch (err) {
      console.error('Match error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetMatchmaker = () => {
    setMatchResult(null);
    setCurrentStep(1);
    setAddedDirectly(false);
    setAddedAddOn(false);
  };

  return (
    <section id="matchmaker" className="py-12 md:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>AI Flavor &amp; Occasion Concierge</span>
          </div>
          <h2 className="font-serif-bakery text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Dessert Matchmaker
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Forget scrolling generic menus. Tell Treats&amp;Temptations what you’re celebrating, your sweet mood, and your budget. We'll curate your soulful homemade match.
          </p>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="bg-white border-2 border-dashed border-pink-200 rounded-3xl p-10 md:p-16 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 mx-auto rounded-full bg-pink-50 flex items-center justify-center mb-6 relative">
              <ChefHat className="w-10 h-10 text-pink-600 animate-gentle" />
              <span className="absolute -top-1 -right-1 text-2xl animate-bounce">🍓</span>
            </div>
            <h3 className="font-serif-bakery text-2xl font-bold text-gray-900">
              Treats&amp;Temptations is consulting the oven...
            </h3>
            <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Balancing your {mood} flavor cravings with a bake that generously serves {people} within your PKR {budget} budget.
            </p>
            <div className="mt-6 w-48 h-2 bg-pink-100 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}

        {/* RESULT CARD */}
        {!isLoading && matchResult && (
          <div className="bg-white border border-pink-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl max-w-3xl mx-auto relative overflow-hidden">
            {/* Corner Decorative Glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-pink-200/50 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider">
                  Verified Baker Match
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {matchResult.budgetFit}
                </span>
              </div>
              <button
                onClick={resetMatchmaker}
                className="text-xs text-gray-500 hover:text-pink-600 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Another Craving</span>
              </button>
            </div>

            {/* Main Presentation */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 relative group overflow-hidden rounded-2xl shadow-md border border-pink-100">
                <img
                  src={matchResult.matchedItem?.imageUrl || '/images/strawberry_cheesecake.jpg'}
                  alt={matchResult.matchTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-gray-900/85 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                  PKR {matchResult.matchedItem?.price || budget}
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs text-gray-900 text-xs p-2.5 rounded-xl border border-pink-100 shadow-xs flex items-center justify-between">
                  <span className="font-semibold">{matchResult.matchedItem?.serves || matchResult.servingFit}</span>
                  <span className="text-pink-600 font-bold">⭐ {matchResult.matchedItem?.rating || 5.0}</span>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div>
                  <h3 className="font-serif-bakery text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                    {matchResult.matchTitle}
                  </h3>
                  <p className="text-sm font-semibold text-pink-600 mt-1">
                    {matchResult.matchSubtitle}
                  </p>
                </div>

                {/* Evocative Story Quote */}
                <div className="bg-pink-50/70 border-l-4 border-pink-500 p-4 rounded-r-2xl">
                  <p className="text-[10px] uppercase tracking-wider text-pink-800 font-bold mb-1">
                    Story Behind The Bake
                  </p>
                  <p className="font-serif-bakery italic text-sm text-gray-800 leading-relaxed">
                    "{matchResult.bakerStory}"
                  </p>
                </div>

                {/* Why this bake fits */}
                <div className="text-xs text-gray-600 leading-relaxed">
                  <span className="font-bold text-gray-900">Why it matches your moment: </span>
                  {matchResult.whyThisBake}
                </div>

                {/* Sensory Notes */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-pink-50/50 p-2.5 rounded-xl border border-pink-100">
                    <span className="font-bold text-gray-900 block mb-0.5">👃 Aroma</span>
                    <span className="text-gray-600">{matchResult.sensoryNotes?.aroma || 'Warm Madagascar vanilla & rose petals'}</span>
                  </div>
                  <div className="bg-pink-50/50 p-2.5 rounded-xl border border-pink-100">
                    <span className="font-bold text-gray-900 block mb-0.5">☕ Best Paired With</span>
                    <span className="text-gray-600">{matchResult.sensoryNotes?.pairing || 'Rose Petal Chai or Chilled Matcha'}</span>
                  </div>
                </div>

                {/* Main Order CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => {
                      if (matchResult.matchedItem) {
                        onAddToCart(matchResult.matchedItem, 1);
                        setAddedDirectly(true);
                      }
                    }}
                    className={`flex-1 py-3 px-5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      addedDirectly
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white'
                    }`}
                  >
                    {addedDirectly ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Added to Cart (PKR {matchResult.matchedItem?.price})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-pink-200" />
                        <span>Order This Match (PKR {matchResult.matchedItem?.price})</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetMatchmaker}
                    className="py-3 px-4 rounded-full border border-pink-200 text-xs font-semibold text-pink-800 hover:bg-pink-50 transition-colors cursor-pointer"
                  >
                    Change Preferences
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Complementary Add-on */}
            {matchResult.suggestedAddOn && (
              <div className="mt-8 pt-6 border-t border-pink-100 bg-pink-50/40 -mx-6 sm:-mx-8 md:-mx-10 -mb-6 sm:-mb-8 md:-mb-10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={matchResult.suggestedAddOn.imageUrl}
                    alt={matchResult.suggestedAddOn.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-2xl border border-pink-200"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-pink-700 tracking-wider">
                      Treats&amp;Temptations Complimentary Pairing
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">
                      {matchResult.suggestedAddOn.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      Add for the complete boutique spread (+PKR {matchResult.suggestedAddOn.price})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (matchResult.suggestedAddOn) {
                      onAddToCart(matchResult.suggestedAddOn, 1);
                      setAddedAddOn(true);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    addedAddOn
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-pink-50 text-pink-700 border border-pink-200 shadow-2xs'
                  }`}
                >
                  {addedAddOn ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Pair Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Pairing (+PKR {matchResult.suggestedAddOn.price})</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP-BY-STEP QUESTIONNAIRE */}
        {!isLoading && !matchResult && (
          <div className="bg-white border border-pink-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg max-w-3xl mx-auto">
            {/* Step Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                <span>Step {currentStep} of 5</span>
                <span className="text-pink-600 font-bold">
                  {currentStep === 1 && 'Who are you buying for?'}
                  {currentStep === 2 && "What's your flavor mood?"}
                  {currentStep === 3 && 'How many people?'}
                  {currentStep === 4 && "What's your budget?"}
                  {currentStep === 5 && 'Dietary & final touch'}
                </span>
              </div>
              <div className="w-full bg-pink-100 h-2 rounded-full overflow-hidden flex">
                {[1, 2, 3, 4, 5].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`h-full flex-1 transition-all duration-300 ${
                      stepNum <= currentStep ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: OCCASION */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-left mb-6">
                  <h3 className="font-serif-bakery text-2xl font-bold text-gray-900">
                    Who are you buying for?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Every gathering has a distinct soul and baking tempo.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {OCCASIONS.map((occ) => {
                    const isSelected = occasion === occ.id;
                    return (
                      <button
                        key={occ.id}
                        type="button"
                        onClick={() => setOccasion(occ.id)}
                        className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative ${
                          isSelected
                            ? 'bg-pink-50/80 border-pink-500 ring-2 ring-pink-500/20 shadow-xs'
                            : 'bg-white hover:bg-pink-50/40 border-pink-100'
                        }`}
                      >
                        <div className="text-2xl mb-2">{occ.icon}</div>
                        <div className="font-bold text-sm text-gray-900">
                          {occ.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 leading-snug">
                          {occ.description}
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-pink-600 text-white flex items-center justify-center text-[10px]">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>Next: What's Your Mood?</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: MOOD */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-left mb-6">
                  <h3 className="font-serif-bakery text-2xl font-bold text-gray-900">
                    What's your flavor mood?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Tell us what flavor notes your soul is yearning for right now.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {MOODS.map((m) => {
                    const isSelected = mood === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMood(m.id)}
                        className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative ${
                          isSelected
                            ? 'bg-pink-50/80 border-pink-500 ring-2 ring-pink-500/20 shadow-xs'
                            : 'bg-white hover:bg-pink-50/40 border-pink-100'
                        }`}
                      >
                        <div className="text-2xl mb-2">{m.icon}</div>
                        <div className="font-bold text-sm text-gray-900">
                          {m.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 leading-snug">
                          {m.description}
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-pink-600 text-white flex items-center justify-center text-[10px]">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-gray-500 hover:text-gray-900 font-semibold cursor-pointer"
                  >
                    ← Back to Occasion
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>Next: How Many People?</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: HOW MANY PEOPLE? */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-left mb-6">
                  <h3 className="font-serif-bakery text-2xl font-bold text-gray-900">
                    How many people are gathering?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    We tailor slice yields so nobody leaves with an unsatisfied craving.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GROUP_SIZES.map((size) => {
                    const isSelected = people === size.people;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setPeople(size.people)}
                        className={`p-5 rounded-2xl text-left transition-all border cursor-pointer relative ${
                          isSelected
                            ? 'bg-pink-50/80 border-pink-500 ring-2 ring-pink-500/20 shadow-xs'
                            : 'bg-white hover:bg-pink-50/40 border-pink-100'
                        }`}
                      >
                        <div className="font-bold text-base text-gray-900">
                          {size.label}
                        </div>
                        <div className="text-xs font-semibold text-pink-600 mt-1">
                          Serves: {size.people}
                        </div>
                        {isSelected && (
                          <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-pink-600 text-white flex items-center justify-center text-[10px]">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-gray-500 hover:text-gray-900 font-semibold cursor-pointer"
                  >
                    ← Back to Mood
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>Next: Set Budget</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: BUDGET */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-left mb-4">
                  <h3 className="font-serif-bakery text-2xl font-bold text-gray-900">
                    What is your comfortable budget?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    We will find the most delicious homemade match within this price.
                  </p>
                </div>

                {/* Display Current Budget in Big Numerals */}
                <div className="bg-pink-50/70 p-6 rounded-2xl text-center border border-pink-100">
                  <span className="text-xs uppercase font-bold text-pink-700 tracking-wider block mb-1">
                    Selected Budget
                  </span>
                  <div className="font-serif-bakery text-4xl sm:text-5xl font-bold text-pink-700">
                    PKR {budget.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {budget <= 1000
                      ? 'Comfortable for artisan tea cakes, loaves, or fresh brioche rolls.'
                      : budget <= 2000
                      ? 'Ideal for grand signature loaves, tiered celebration cakes, or luxury cookie boxes.'
                      : 'Unrestricted artisan celebration feasts.'}
                  </p>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="600"
                    max="3500"
                    step="50"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value, 10))}
                    className="w-full accent-pink-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>PKR 600</span>
                    <span>PKR 1,200</span>
                    <span>PKR 2,000</span>
                    <span>PKR 3,500</span>
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {[800, 1000, 1200, 1500, 2000, 2500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setBudget(preset)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                        budget === preset
                          ? 'bg-pink-600 text-white border-pink-600 shadow-2xs'
                          : 'bg-white hover:bg-pink-50 border-pink-200 text-pink-800'
                      }`}
                    >
                      PKR {preset.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-xs text-gray-500 hover:text-gray-900 font-semibold cursor-pointer"
                  >
                    ← Back to People
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>Next: Dietary Preferences</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: DIETARY PREFERENCES & VIBE NOTE */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-left mb-4">
                  <h3 className="font-serif-bakery text-2xl font-bold text-gray-900">
                    Any dietary preferences or special wishes?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Every diet is baked with equal craft—no compromises on crumb or butter.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DIETARY_OPTIONS.map((d) => {
                    const isSelected = dietary === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDietary(d.id)}
                        className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-pink-50/80 border-pink-500 ring-2 ring-pink-500/20 font-bold text-pink-800'
                            : 'bg-white hover:bg-pink-50/40 border-pink-100 text-gray-700'
                        }`}
                      >
                        <span className="text-xl">{d.icon}</span>
                        <span className="text-xs sm:text-sm">{d.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Personal Vibe / Note */}
                <div className="text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-pink-800 mb-1.5">
                    Any note for our baker? (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. It's a sweet 16 party, or mom prefers delicate strawberry notes"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/30 bg-pink-50/30"
                  />
                </div>

                {/* Summary Pill */}
                <div className="p-3 bg-pink-50/60 rounded-xl text-xs text-gray-600 flex items-center justify-between border border-pink-100">
                  <span>
                    Summary: <strong className="text-gray-900">{occasion}</strong> • <strong className="text-gray-900">{mood}</strong> • <strong className="text-gray-900">{people}</strong> • <strong className="text-pink-600">PKR {budget}</strong>
                  </span>
                  <span className="text-[10px] text-pink-600 font-bold uppercase">Ready</span>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="text-xs text-gray-500 hover:text-gray-900 font-semibold cursor-pointer"
                  >
                    ← Back to Budget
                  </button>
                  <button
                    onClick={handleFindMatch}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4 text-pink-200" />
                    <span>Find My Perfect Match</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
