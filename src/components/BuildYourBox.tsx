import React, { useState, useMemo } from 'react';
import { BAKERY_CATALOG, DessertItem } from '../data/bakeryCatalog';
import { CartItem } from '../types';
import {
  Gift,
  Plus,
  Trash2,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react';

interface BuildYourBoxProps {
  onAddBoxToCart: (cartBoxItem: CartItem) => void;
}

export const BuildYourBox: React.FC<BuildYourBoxProps> = ({ onAddBoxToCart }) => {
  // Box slots state
  const [selectedLoaf, setSelectedLoaf] = useState<DessertItem | null>(
    BAKERY_CATALOG.find((i) => i.id === 'apple-cinnamon-loaf') ||
    BAKERY_CATALOG.find((i) => i.category === 'loaf') || null
  );
  const [selectedCookies, setSelectedCookies] = useState<DessertItem[]>(
    BAKERY_CATALOG.filter((i) => i.category === 'cookie').slice(0, 1)
  );
  const [selectedBrownies, setSelectedBrownies] = useState<DessertItem[]>(
    BAKERY_CATALOG.filter((i) => i.category === 'brownie').slice(0, 1)
  );
  const [selectedRoll, setSelectedRoll] = useState<DessertItem | null>(
    BAKERY_CATALOG.find((i) => i.id === 'cinnamon-rolls-cream-cheese') || null
  );

  // Customization
  const [ribbonColor, setRibbonColor] = useState<string>('Rose Pink Satin');
  const [customNote, setCustomNote] = useState<string>('Handcrafted with love from Treats & Temptations by SK.');
  const [activeTab, setActiveTab] = useState<'loaf' | 'cookie' | 'brownie' | 'roll'>('loaf');
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  // Available pools by category
  const loaves = useMemo(() => BAKERY_CATALOG.filter((i) => i.category === 'loaf'), []);
  const cookies = useMemo(() => BAKERY_CATALOG.filter((i) => i.category === 'cookie'), []);
  const brownies = useMemo(() => BAKERY_CATALOG.filter((i) => i.category === 'brownie'), []);
  const rolls = useMemo(() => BAKERY_CATALOG.filter((i) => i.category === 'roll'), []);

  // Slot calculations
  const totalItemsCount =
    (selectedLoaf ? 1 : 0) +
    selectedCookies.length +
    selectedBrownies.length +
    (selectedRoll ? 1 : 0);

  const isBoxComplete =
    Boolean(selectedLoaf) &&
    selectedCookies.length === 2 &&
    selectedBrownies.length === 2 &&
    Boolean(selectedRoll);

  // Dynamic Price Math
  const individualSum = useMemo(() => {
    let sum = 0;
    if (selectedLoaf) sum += selectedLoaf.price;
    selectedCookies.forEach((c) => (sum += c.price));
    selectedBrownies.forEach((b) => (sum += b.price));
    if (selectedRoll) sum += selectedRoll.price;
    return sum;
  }, [selectedLoaf, selectedCookies, selectedBrownies, selectedRoll]);

  const boxDiscount = isBoxComplete ? 200 : 0; // PKR 200 bundle discount when complete!
  const finalBoxPrice = Math.max(0, individualSum - boxDiscount);

  // Helper actions
  const handleAddCookie = (cookie: DessertItem) => {
    if (selectedCookies.length < 2) {
      setSelectedCookies((prev) => [...prev, cookie]);
    }
  };

  const handleRemoveCookie = (cookieId: string) => {
    const existingIndex = selectedCookies.findIndex((c) => c.id === cookieId);
    if (existingIndex > -1) {
      setSelectedCookies((prev) => prev.filter((_, idx) => idx !== existingIndex));
    }
  };

  const handleAddBrownie = (brownie: DessertItem) => {
    if (selectedBrownies.length < 2) {
      setSelectedBrownies((prev) => [...prev, brownie]);
    }
  };

  const handleRemoveBrownie = (brownieId: string) => {
    const existingIndex = selectedBrownies.findIndex((b) => b.id === brownieId);
    if (existingIndex > -1) {
      setSelectedBrownies((prev) => prev.filter((_, idx) => idx !== existingIndex));
    }
  };

  // Presets
  const applyPreset = (presetName: string) => {
    const cookieItem = BAKERY_CATALOG.find((i) => i.id === 'chocolate-chip-cookie') || BAKERY_CATALOG[2];
    const brownieItem = BAKERY_CATALOG.find((i) => i.id === 'classic-fudge-brownies') || BAKERY_CATALOG[1];
    const rollItem = BAKERY_CATALOG.find((i) => i.id === 'cinnamon-rolls-cream-cheese') || null;

    if (presetName === 'pink-temptation') {
      setSelectedLoaf(BAKERY_CATALOG.find((i) => i.id === 'apple-cinnamon-loaf') || null);
      setSelectedCookies([cookieItem, cookieItem]);
      setSelectedBrownies([brownieItem, brownieItem]);
      setSelectedRoll(rollItem);
      setRibbonColor('Rose Pink Satin');
    } else if (presetName === 'cocoa') {
      setSelectedLoaf(BAKERY_CATALOG.find((i) => i.id === 'double-chocolate-loaf') || null);
      setSelectedCookies([cookieItem, cookieItem]);
      setSelectedBrownies([brownieItem, brownieItem]);
      setSelectedRoll(rollItem);
      setRibbonColor('Champagne Gold');
    } else if (presetName === 'comfort') {
      setSelectedLoaf(BAKERY_CATALOG.find((i) => i.id === 'lemon-loaf') || null);
      setSelectedCookies([cookieItem, cookieItem]);
      setSelectedBrownies([brownieItem, brownieItem]);
      setSelectedRoll(rollItem);
      setRibbonColor('Pastel Blush Velvet');
    }
  };

  const handleAddBox = () => {
    if (!isBoxComplete) return;

    const cartBox: CartItem = {
      id: `box-${Date.now()}`,
      type: 'custom-box',
      quantity: 1,
      boxDetails: {
        loaf: selectedLoaf,
        cookies: selectedCookies,
        brownies: selectedBrownies,
        roll: selectedRoll,
        ribbonColor,
        customNote,
        boxPrice: finalBoxPrice,
      },
    };

    onAddBoxToCart(cartBox);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 3000);
  };

  const ribbons = [
    { name: 'Rose Pink Satin', bg: 'bg-pink-500' },
    { name: 'Pastel Blush Velvet', bg: 'bg-pink-300' },
    { name: 'Champagne Gold', bg: 'bg-amber-400' },
    { name: 'Ivory White Silk', bg: 'bg-white border border-gray-300' },
  ];

  return (
    <section id="box-builder" className="py-12 md:py-20 bg-pink-50/40 border-y border-pink-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-semibold mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Interactive Pink Bakery Parcel</span>
          </div>
          <h2 className="font-serif-bakery text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Build Your Box
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Hand-curate your ultimate homemade 6-piece parcel. Choose 1 loaf, 2 cookies, 2 brownies, and 1 brioche roll. We wrap it in parchment, seal it in our signature pink box with satin ribbon, and save you PKR 200.
          </p>

          {/* Quick presets */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-pink-800 font-bold">Quick Curations:</span>
            <button
              onClick={() => applyPreset('pink-temptation')}
              className="px-3 py-1 rounded-full bg-pink-100 hover:bg-pink-200 text-xs font-bold text-pink-700 border border-pink-200 transition-all cursor-pointer shadow-2xs"
            >
              🌸 Signature Pink &amp; Rose Box
            </button>
            <button
              onClick={() => applyPreset('comfort')}
              className="px-3 py-1 rounded-full bg-white hover:bg-pink-50 text-xs font-semibold text-gray-700 border border-pink-200 transition-all cursor-pointer shadow-2xs"
            >
              🍎 Sunday Comfort Box
            </button>
            <button
              onClick={() => applyPreset('cocoa')}
              className="px-3 py-1 rounded-full bg-white hover:bg-pink-50 text-xs font-semibold text-gray-700 border border-pink-200 transition-all cursor-pointer shadow-2xs"
            >
              🍫 Midnight Cocoa Lovers
            </button>
          </div>
        </div>

        {/* 2-Column Builder: Visual Box Preview on Left, Selection Tray on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: VISUAL BAKERY BOX PREVIEW & PRICING */}
          <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white border-2 border-pink-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {/* Box Top Label */}
              <div className="flex items-center justify-between pb-4 border-b border-pink-100">
                <div>
                  <h3 className="font-serif-bakery text-xl font-bold text-gray-900">
                    Artisan 6-Piece Pink Box Preview
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {totalItemsCount}/6 slots chosen ({isBoxComplete ? 'Box Complete! 🎉' : `${6 - totalItemsCount} slot(s) remaining`})
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-pink-700 bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
                    {ribbonColor}
                  </span>
                </div>
              </div>

              {/* VISUAL COMPARTMENT GRID */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                
                {/* SLOT 1: LOAF (Wide card spanning 2 columns) */}
                <div className="col-span-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-pink-800 mb-1 flex items-center justify-between">
                    <span>1. Artisanal Loaf (Serves 6–8)</span>
                    {selectedLoaf && (
                      <span className="text-pink-600 font-bold">PKR {selectedLoaf.price}</span>
                    )}
                  </div>
                  {selectedLoaf ? (
                    <div className="p-3 bg-white rounded-xl border border-pink-200 flex items-center justify-between gap-3 shadow-2xs group">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedLoaf.imageUrl}
                          alt={selectedLoaf.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                            {selectedLoaf.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 line-clamp-1">
                            {selectedLoaf.sensoryNotes.aroma}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedLoaf(null)}
                        className="text-pink-600 hover:text-red-700 p-1.5 rounded-md hover:bg-pink-50 transition-colors cursor-pointer"
                        title="Remove loaf"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveTab('loaf')}
                      className="w-full py-4 px-3 border-2 border-dashed border-pink-200 rounded-xl text-center hover:bg-white transition-colors flex items-center justify-center gap-2 text-xs font-semibold text-pink-700 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-pink-600" />
                      <span>Select 1 Loaf (Click to choose)</span>
                    </button>
                  )}
                </div>

                {/* SLOT 2 & 3: COOKIES */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-pink-800 mb-1">
                    2. Cookie #1
                  </div>
                  {selectedCookies[0] ? (
                    <div className="p-2.5 bg-white rounded-xl border border-pink-200 shadow-2xs flex flex-col justify-between h-28">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-pink-600">
                          PKR {selectedCookies[0].price}
                        </span>
                        <button
                          onClick={() => handleRemoveCookie(selectedCookies[0].id)}
                          className="text-pink-600 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-gray-900 line-clamp-2">
                        {selectedCookies[0].name}
                      </p>
                      <span className="text-[10px] text-gray-400">Handcrafted</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveTab('cookie')}
                      className="w-full h-28 border-2 border-dashed border-pink-200 rounded-xl text-center hover:bg-white transition-colors flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-pink-700 cursor-pointer p-2"
                    >
                      <Plus className="w-4 h-4 text-pink-600" />
                      <span>Pick Cookie 1</span>
                    </button>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-pink-800 mb-1">
                    3. Cookie #2
                  </div>
                  {selectedCookies[1] ? (
                    <div className="p-2.5 bg-white rounded-xl border border-pink-200 shadow-2xs flex flex-col justify-between h-28">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-pink-600">
                          PKR {selectedCookies[1].price}
                        </span>
                        <button
                          onClick={() => handleRemoveCookie(selectedCookies[1].id)}
                          className="text-pink-600 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-gray-900 line-clamp-2">
                        {selectedCookies[1].name}
                      </p>
                      <span className="text-[10px] text-gray-400">Handcrafted</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveTab('cookie')}
                      className="w-full h-28 border-2 border-dashed border-pink-200 rounded-xl text-center hover:bg-white transition-colors flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-pink-700 cursor-pointer p-2"
                    >
                      <Plus className="w-4 h-4 text-pink-600" />
                      <span>Pick Cookie 2</span>
                    </button>
                  )}
                </div>

                {/* SLOT 4 & 5: BROWNIES */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-pink-800 mb-1">
                    4. Brownie #1
                  </div>
                  {selectedBrownies[0] ? (
                    <div className="p-2.5 bg-white rounded-xl border border-pink-200 shadow-2xs flex flex-col justify-between h-28">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-pink-600">
                          PKR {selectedBrownies[0].price}
                        </span>
                        <button
                          onClick={() => handleRemoveBrownie(selectedBrownies[0].id)}
                          className="text-pink-600 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-gray-900 line-clamp-2">
                        {selectedBrownies[0].name}
                      </p>
                      <span className="text-[10px] text-gray-400">Fudge Truffle</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveTab('brownie')}
                      className="w-full h-28 border-2 border-dashed border-pink-200 rounded-xl text-center hover:bg-white transition-colors flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-pink-700 cursor-pointer p-2"
                    >
                      <Plus className="w-4 h-4 text-pink-600" />
                      <span>Pick Brownie 1</span>
                    </button>
                  )}
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-pink-800 mb-1">
                    5. Brownie #2
                  </div>
                  {selectedBrownies[1] ? (
                    <div className="p-2.5 bg-white rounded-xl border border-pink-200 shadow-2xs flex flex-col justify-between h-28">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-pink-600">
                          PKR {selectedBrownies[1].price}
                        </span>
                        <button
                          onClick={() => handleRemoveBrownie(selectedBrownies[1].id)}
                          className="text-pink-600 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-gray-900 line-clamp-2">
                        {selectedBrownies[1].name}
                      </p>
                      <span className="text-[10px] text-gray-400">Fudge Truffle</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveTab('brownie')}
                      className="w-full h-28 border-2 border-dashed border-pink-200 rounded-xl text-center hover:bg-white transition-colors flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-pink-700 cursor-pointer p-2"
                    >
                      <Plus className="w-4 h-4 text-pink-600" />
                      <span>Pick Brownie 2</span>
                    </button>
                  )}
                </div>

                {/* SLOT 6: CINNAMON ROLL (Wide card spanning 2 columns) */}
                <div className="col-span-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-pink-800 mb-1 flex items-center justify-between">
                    <span>6. Brioche Cinnamon Roll / Knot</span>
                    {selectedRoll && (
                      <span className="text-pink-600 font-bold">PKR {selectedRoll.price}</span>
                    )}
                  </div>
                  {selectedRoll ? (
                    <div className="p-3 bg-white rounded-xl border border-pink-200 flex items-center justify-between gap-3 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedRoll.imageUrl}
                          alt={selectedRoll.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                            {selectedRoll.name}
                          </h4>
                          <p className="text-[11px] text-gray-500">
                            {selectedRoll.sensoryNotes.aroma}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedRoll(null)}
                        className="text-pink-600 hover:text-red-700 p-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveTab('roll')}
                      className="w-full py-3.5 px-3 border-2 border-dashed border-pink-200 rounded-xl text-center hover:bg-white transition-colors flex items-center justify-center gap-2 text-xs font-semibold text-pink-700 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-pink-600" />
                      <span>Select 1 Cinnamon Roll (Click to choose)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* RIBBON COLOR PICKER */}
              <div className="mt-5 pt-4 border-t border-pink-100">
                <label className="block text-xs font-bold text-pink-800 mb-2 uppercase tracking-wider">
                  Select Gift Satin Ribbon:
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {ribbons.map((ribbon) => (
                    <button
                      key={ribbon.name}
                      onClick={() => setRibbonColor(ribbon.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        ribbonColor === ribbon.name
                          ? 'border-pink-500 bg-pink-50 text-pink-800 font-bold shadow-2xs'
                          : 'border-pink-200 bg-white text-gray-700 hover:bg-pink-50/50'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${ribbon.bg}`} />
                      <span>{ribbon.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* DYNAMIC PRICE BREAKDOWN */}
              <div className="mt-5 pt-4 border-t border-pink-100 space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-gray-900">PKR {individualSum}</span>
                </div>
                {isBoxComplete && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Curated Box Special Discount:</span>
                    <span>-PKR {boxDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Bakery Gift Box &amp; Parchment Wrapping:</span>
                  <span className="text-emerald-600 font-semibold">FREE (Valued at PKR 150)</span>
                </div>
                <div className="pt-2 border-t border-pink-100 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-gray-900">Calculated Box Price:</span>
                    {!isBoxComplete && (
                      <p className="text-[11px] text-pink-600 font-medium">
                        Fill all 6 slots to unlock PKR 200 bundle savings!
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-serif-bakery text-2xl font-bold text-pink-700">
                      PKR {finalBoxPrice}
                    </span>
                    {isBoxComplete && (
                      <span className="block text-[11px] line-through text-gray-400">
                        PKR {individualSum}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ADD BOX TO CART BUTTON */}
              <div className="mt-6">
                <button
                  disabled={!isBoxComplete}
                  onClick={handleAddBox}
                  className={`w-full py-4 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isAddedSuccess
                      ? 'bg-emerald-600 text-white'
                      : isBoxComplete
                      ? 'bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white shadow-pink-200'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isAddedSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Custom Box Added to Bag!</span>
                    </>
                  ) : isBoxComplete ? (
                    <>
                      <ShoppingBag className="w-5 h-5 text-pink-200" />
                      <span>Add Complete Box to Bag (PKR {finalBoxPrice})</span>
                    </>
                  ) : (
                    <span>Choose {6 - totalItemsCount} More Treat(s) To Finish Box</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: SELECTION TRAY TABS */}
          <div className="lg:col-span-6 space-y-5">
            {/* Category Switcher Tabs */}
            <div className="bg-white p-1.5 rounded-2xl flex items-center gap-1 border border-pink-200 shadow-2xs">
              <button
                onClick={() => setActiveTab('loaf')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'loaf'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <span>🍞 1 Loaf</span>
                <span className={`text-[10px] px-1.5 rounded-full ${activeTab === 'loaf' ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-700'}`}>
                  {selectedLoaf ? '1/1' : '0/1'}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('cookie')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'cookie'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <span>🍪 2 Cookies</span>
                <span className={`text-[10px] px-1.5 rounded-full ${activeTab === 'cookie' ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-700'}`}>
                  {selectedCookies.length}/2
                </span>
              </button>

              <button
                onClick={() => setActiveTab('brownie')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'brownie'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <span>🍫 2 Brownies</span>
                <span className={`text-[10px] px-1.5 rounded-full ${activeTab === 'brownie' ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-700'}`}>
                  {selectedBrownies.length}/2
                </span>
              </button>

              <button
                onClick={() => setActiveTab('roll')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'roll'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <span>🥐 1 Roll</span>
                <span className={`text-[10px] px-1.5 rounded-full ${activeTab === 'roll' ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-700'}`}>
                  {selectedRoll ? '1/1' : '0/1'}
                </span>
              </button>
            </div>

            {/* TAB CONTENT LIST */}
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {activeTab === 'loaf' && (
                <>
                  <div className="text-xs text-pink-800 font-medium pb-1 flex items-center gap-1.5">
                    <span>✨ Select 1 artisan loaf (all loaves serve 4 to 5 people):</span>
                  </div>
                  {loaves.map((loaf) => {
                    const isSelected = selectedLoaf?.id === loaf.id;
                    return (
                      <div
                        key={loaf.id}
                        className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                          isSelected
                            ? 'bg-pink-50/80 border-pink-500 ring-2 ring-pink-500/20 shadow-xs'
                            : 'bg-white border-pink-100 hover:border-pink-200'
                        }`}
                      >
                        <img
                          src={loaf.imageUrl}
                          alt={loaf.name}
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 object-cover rounded-xl shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900">
                              {loaf.name}
                            </h4>
                            <span className="font-bold text-sm text-pink-600">
                              PKR {loaf.price}
                            </span>
                          </div>
                          <p className="text-xs font-serif-bakery italic text-gray-600 mt-1 line-clamp-2">
                            "{loaf.story}"
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[11px] text-gray-400">
                              {loaf.serves}
                            </span>
                            <button
                              onClick={() => setSelectedLoaf(loaf)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-pink-600 text-white'
                                  : 'bg-pink-50 hover:bg-pink-100 text-pink-700'
                              }`}
                            >
                              {isSelected ? '✓ Chosen' : 'Select Loaf'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {activeTab === 'cookie' && (
                <>
                  <div className="text-xs text-gray-500 pb-1">
                    Select up to 2 gourmet artisan cookies ({selectedCookies.length}/2 chosen):
                  </div>
                  {cookies.map((cookie) => {
                    const count = selectedCookies.filter((c) => c.id === cookie.id).length;
                    const canAddMore = selectedCookies.length < 2;
                    return (
                      <div
                        key={cookie.id}
                        className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                          count > 0
                            ? 'bg-pink-50/80 border-pink-500 ring-2 ring-pink-500/20 shadow-xs'
                            : 'bg-white border-pink-100 hover:border-pink-200'
                        }`}
                      >
                        <img
                          src={cookie.imageUrl}
                          alt={cookie.name}
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 object-cover rounded-xl shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900">
                              {cookie.name}
                            </h4>
                            <span className="font-bold text-sm text-pink-600">
                              PKR {cookie.price}
                            </span>
                          </div>
                          <p className="text-xs font-serif-bakery italic text-gray-600 mt-1 line-clamp-2">
                            "{cookie.story}"
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[11px] text-gray-400">
                              {cookie.badge || 'Handmade'}
                            </span>
                            <div className="flex items-center gap-2">
                              {count > 0 && (
                                <button
                                  onClick={() => handleRemoveCookie(cookie.id)}
                                  className="w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 font-bold text-sm flex items-center justify-center cursor-pointer transition-colors"
                                  title="Remove one"
                                >
                                  -
                                </button>
                              )}
                              {count > 0 && (
                                <span className="text-xs font-bold text-pink-700 px-2 py-0.5 bg-white border border-pink-200 rounded-full">
                                  {count} in box
                                </span>
                              )}
                              <button
                                onClick={() => handleAddCookie(cookie)}
                                disabled={!canAddMore}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                  canAddMore
                                    ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-xs'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                {count > 0 ? '+ Add Another' : '+ Add to Box'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {activeTab === 'brownie' && (
                <>
                  <div className="text-xs text-gray-500 pb-1">
                    Select up to 2 French Valrhona fudge brownies ({selectedBrownies.length}/2 chosen):
                  </div>
                  {brownies.map((brownie) => {
                    const count = selectedBrownies.filter((b) => b.id === brownie.id).length;
                    const canAddMore = selectedBrownies.length < 2;
                    return (
                      <div
                        key={brownie.id}
                        className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                          count > 0
                            ? 'bg-pink-50/80 border-pink-500 ring-2 ring-pink-500/20 shadow-xs'
                            : 'bg-white border-pink-100 hover:border-pink-200'
                        }`}
                      >
                        <img
                          src={brownie.imageUrl}
                          alt={brownie.name}
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 object-cover rounded-xl shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900">
                              {brownie.name}
                            </h4>
                            <span className="font-bold text-sm text-pink-600">
                              PKR {brownie.price}
                            </span>
                          </div>
                          <p className="text-xs font-serif-bakery italic text-gray-600 mt-1 line-clamp-2">
                            "{brownie.story}"
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[11px] text-gray-400">
                              {brownie.badge || 'Silk Truffle'}
                            </span>
                            <div className="flex items-center gap-2">
                              {count > 0 && (
                                <button
                                  onClick={() => handleRemoveBrownie(brownie.id)}
                                  className="w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 font-bold text-sm flex items-center justify-center cursor-pointer transition-colors"
                                  title="Remove one"
                                >
                                  -
                                </button>
                              )}
                              {count > 0 && (
                                <span className="text-xs font-bold text-pink-700 px-2 py-0.5 bg-white border border-pink-200 rounded-full">
                                  {count} in box
                                </span>
                              )}
                              <button
                                onClick={() => handleAddBrownie(brownie)}
                                disabled={!canAddMore}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                  canAddMore
                                    ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-xs'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                {count > 0 ? '+ Add Another' : '+ Add to Box'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {activeTab === 'roll' && (
                <>
                  <div className="text-xs text-gray-500 pb-1">
                    Select 1 hot brioche cinnamon roll or knot:
                  </div>
                  {rolls.map((roll) => {
                    const isSelected = selectedRoll?.id === roll.id;
                    return (
                      <div
                        key={roll.id}
                        className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                          isSelected
                            ? 'bg-pink-50/80 border-pink-500 ring-2 ring-pink-500/20 shadow-xs'
                            : 'bg-white border-pink-100 hover:border-pink-200'
                        }`}
                      >
                        <img
                          src={roll.imageUrl}
                          alt={roll.name}
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 object-cover rounded-xl shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900">
                              {roll.name}
                            </h4>
                            <span className="font-bold text-sm text-pink-600">
                              PKR {roll.price}
                            </span>
                          </div>
                          <p className="text-xs font-serif-bakery italic text-gray-600 mt-1 line-clamp-2">
                            "{roll.story}"
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[11px] text-gray-400">
                              {roll.badge || 'Fresh Brioche'}
                            </span>
                            <button
                              onClick={() => setSelectedRoll(roll)}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-pink-600 text-white'
                                  : 'bg-pink-50 hover:bg-pink-100 text-pink-700'
                              }`}
                            >
                              {isSelected ? '✓ Chosen' : 'Select Roll'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
