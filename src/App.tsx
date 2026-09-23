/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DessertMatchmaker } from './components/DessertMatchmaker';
import { BuildYourBox } from './components/BuildYourBox';
import { InstagramFeed } from './components/InstagramFeed';
import { StoryPantry } from './components/StoryPantry';
import { SurpriseMeModal } from './components/SurpriseMeModal';
import { AIBakerChat } from './components/AIBakerChat';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';
import { CartItem, OrderReceipt } from './types';
import { DessertItem } from './data/bakeryCatalog';
import { MessageCircleHeart, ShoppingBag, Check } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [matchmakerOccasion, setMatchmakerOccasion] = useState<string>('teaparty');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add individual dessert item to cart
  const handleAddToCart = (item: DessertItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (ci) => ci.type === 'single' && ci.item?.id === item.id
      );
      if (existing) {
        return prev.map((ci) =>
          ci.id === existing.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [
        ...prev,
        {
          id: `single-${item.id}-${Date.now()}`,
          type: 'single',
          item,
          quantity,
        },
      ];
    });
    showToast(`Added ${item.name} to your bag! 🍰`);
  };

  // Add custom 6-piece box to cart
  const handleAddBoxToCart = (boxCartItem: CartItem) => {
    setCart((prev) => [...prev, boxCartItem]);
    showToast('Your Custom 6-Piece Box is packed and added to your bag! 🎁');
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleOrderSuccess = (newReceipt: OrderReceipt) => {
    setReceipt(newReceipt);
    setCart([]);
    setIsCartOpen(false);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectOccasionFromHero = (occId: string) => {
    setMatchmakerOccasion(occId);
    handleNavigate('matchmaker');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fff9fa] text-[#2a1520] relative selection:bg-pink-200 selection:text-pink-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-2.5 rounded-full shadow-xl text-xs sm:text-sm font-medium flex items-center gap-2 border border-pink-200/30 animate-fadeIn">
          <div className="w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px]">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenSurprise={() => setIsSurpriseOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onStartMatchmaker={() => handleNavigate('matchmaker')}
          onOpenBoxBuilder={() => handleNavigate('box-builder')}
          onOpenSurprise={() => setIsSurpriseOpen(true)}
          onSelectOccasionDirectly={handleSelectOccasionFromHero}
        />

        {/* Feature 1: Dessert Matchmaker */}
        <DessertMatchmaker
          onAddToCart={handleAddToCart}
          initialOccasion={matchmakerOccasion}
        />

        {/* Feature 2: Build Your Box */}
        <BuildYourBox onAddBoxToCart={handleAddBoxToCart} />

        {/* Feature 3: Instagram Feed & Gallery extracted from treats&temptationsbysk */}
        <InstagramFeed
          onAddToCart={handleAddToCart}
          onExploreMatch={() => handleNavigate('matchmaker')}
        />

        {/* Feature 4: Story Behind The Bake & Full Pantry */}
        <StoryPantry onAddToCart={handleAddToCart} />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSurprise={() => setIsSurpriseOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Surprise Me Modal 🎲 */}
      <SurpriseMeModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* AI Baker Concierge Chat ("Treats & Temptations") */}
      <AIBakerChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmation Receipt & Live Tracker */}
      <OrderConfirmationModal
        receipt={receipt}
        onClose={() => setReceipt(null)}
      />

      {/* Floating Bottom Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="md:hidden w-12 h-12 rounded-full bg-pink-600 text-white flex items-center justify-center shadow-lg relative cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-white text-pink-700 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-pink-200">
              {totalCartCount}
            </span>
          </button>
        )}

        <button
          onClick={() => setIsChatOpen(true)}
          className="px-4 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
        >
          <MessageCircleHeart className="w-4 h-4 text-pink-200" />
          <span>Ask Treats &amp; Temptations</span>
        </button>
      </div>
    </div>
  );
}
