import React, { useState } from 'react';
import { CartItem, OrderReceipt } from '../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Gift,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onOrderSuccess: (receipt: OrderReceipt) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOrderSuccess,
}) => {
  const [deliveryDate, setDeliveryDate] = useState<string>('Tomorrow');
  const [deliverySlot, setDeliverySlot] = useState<string>(
    'Afternoon Tea Batch (2:00 PM - 5:00 PM)'
  );
  const [giftNote, setGiftNote] = useState<string>(
    'Baked with love for a wonderful celebration.'
  );
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  // Math
  const subtotal = cart.reduce((sum, cartItem) => {
    if (cartItem.type === 'custom-box' && cartItem.boxDetails) {
      return sum + cartItem.boxDetails.boxPrice * cartItem.quantity;
    }
    if (cartItem.item) {
      return sum + cartItem.item.price * cartItem.quantity;
    }
    return sum;
  }, 0);

  const deliveryFee = subtotal >= 1000 || subtotal === 0 ? 0 : 80;
  const total = subtotal + deliveryFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          deliveryDate,
          deliverySlot,
          giftNote,
          customerInfo: { customerName, phone, address },
        }),
      });

      const data = await response.json();

      const receipt: OrderReceipt = {
        orderNumber: data.orderNumber || `TT-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName,
        phone,
        address,
        deliveryDate,
        deliverySlot,
        giftNote,
        items: cart,
        subtotal,
        discount: 0,
        deliveryFee,
        total,
        estimatedBakeTime: 'Tomorrow morning, fresh from the Treats & Temptations boutique oven',
        orderTimestamp: new Date().toLocaleString(),
      };

      onOrderSuccess(receipt);
    } catch (err) {
      console.error('Order error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col border-l border-pink-200 animate-slideLeft">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-pink-100 bg-pink-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif-bakery text-lg font-bold text-gray-900">
                Your Boutique Bag
              </h3>
              <p className="text-xs text-pink-700 font-medium">
                {cart.reduce((s, i) => s + i.quantity, 0)} item(s) selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-pink-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer border border-pink-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-3xl">
                🧁
              </div>
              <p className="font-serif-bakery text-xl font-bold text-gray-900">
                Your boutique bag is empty
              </p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Use our Dessert Matchmaker or Build Your Box to discover artisanal treats baked fresh for your special moments.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((cartItem) => {
                if (cartItem.type === 'custom-box' && cartItem.boxDetails) {
                  const b = cartItem.boxDetails;
                  return (
                    <div
                      key={cartItem.id}
                      className="p-4 rounded-2xl bg-pink-50/50 border border-pink-200 space-y-2.5 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                            <Gift className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-gray-900">
                              Custom 6-Piece Artisan Box
                            </h4>
                            <span className="text-[11px] text-pink-700 font-semibold">
                              {b.ribbonColor} • PKR 200 Bundle Savings Applied
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          className="text-pink-600 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Items inside box */}
                      <div className="text-[11px] text-gray-600 bg-white p-2.5 rounded-xl border border-pink-100 space-y-1">
                        <div>🍞 {b.loaf?.name}</div>
                        <div>🍪 {b.cookies.map((c) => c.name).join(' & ')}</div>
                        <div>🍫 {b.brownies.map((br) => br.name).join(' & ')}</div>
                        <div>🥐 {b.roll?.name}</div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              onUpdateQuantity(cartItem.id, Math.max(1, cartItem.quantity - 1))
                            }
                            className="w-6 h-6 rounded-md bg-white border border-pink-200 flex items-center justify-center text-gray-700 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-gray-900">{cartItem.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-white border border-pink-200 flex items-center justify-center text-gray-700 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-serif-bakery text-base font-bold text-pink-700">
                          PKR {b.boxPrice * cartItem.quantity}
                        </span>
                      </div>
                    </div>
                  );
                }

                if (cartItem.item) {
                  const itm = cartItem.item;
                  return (
                    <div
                      key={cartItem.id}
                      className="p-3.5 rounded-2xl bg-white border border-pink-100 flex items-center justify-between gap-3 shadow-2xs hover:border-pink-200"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={itm.imageUrl}
                          alt={itm.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 object-cover rounded-xl shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-1">
                            {itm.name}
                          </h4>
                          <span className="text-[11px] text-gray-500 block">
                            {itm.serves}
                          </span>
                          <span className="text-xs font-bold text-pink-600">
                            PKR {itm.price} each
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          className="text-gray-400 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() =>
                              onUpdateQuantity(cartItem.id, Math.max(1, cartItem.quantity - 1))
                            }
                            className="w-6 h-6 rounded-md bg-pink-50 border border-pink-200 flex items-center justify-center text-gray-700 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-gray-900">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-pink-50 border border-pink-200 flex items-center justify-center text-gray-700 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              })}

              {/* Delivery Batch Picker */}
              <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-pink-800 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-pink-600" />
                  <span>Choose Your Fresh Oven Batch</span>
                </div>

                <div className="space-y-1.5">
                  {[
                    'Dawn Hearth Batch (Arrives 9:00 AM - 12:00 PM)',
                    'Afternoon Tea Batch (Arrives 2:00 PM - 5:00 PM)',
                    'Evening Hearth Batch (Arrives 6:30 PM - 9:00 PM)',
                  ].map((slot) => (
                    <label
                      key={slot}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-xs cursor-pointer border transition-colors ${
                        deliverySlot === slot
                          ? 'bg-pink-100/70 border-pink-500 font-bold text-pink-900'
                          : 'bg-white border-pink-100 text-gray-700 hover:bg-pink-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliverySlot"
                        checked={deliverySlot === slot}
                        onChange={() => setDeliverySlot(slot)}
                        className="accent-pink-600"
                      />
                      <span>{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gift Card Message */}
              <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-pink-600" />
                    <span>Complimentary Handwritten Card</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">FREE</span>
                </div>
                <textarea
                  rows={2}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Enter custom message for the recipient..."
                  className="w-full p-2.5 bg-white rounded-xl border border-pink-200 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </div>

              {/* Delivery Details Form */}
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3 pt-2">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
                  Delivery Destination
                </span>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
                <input
                  type="tel"
                  required
                  placeholder="Contact Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="Complete Delivery Address & Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                />
              </form>
            </div>
          )}
        </div>

        {/* Footer Summary & Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-pink-100 bg-pink-50/70 space-y-3">
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-900">PKR {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Specialized Insulated Delivery:</span>
                <span className={deliveryFee === 0 ? 'text-emerald-600 font-bold' : 'text-gray-900'}>
                  {deliveryFee === 0 ? 'FREE (Orders over PKR 1,000)' : `PKR ${deliveryFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-pink-200 flex justify-between items-baseline">
                <span className="font-bold text-sm text-gray-900">Total Amount:</span>
                <span className="font-serif-bakery text-2xl font-bold text-pink-700">
                  PKR {total}
                </span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4 text-pink-200" />
              <span>
                {isSubmitting ? 'Scheduling Fresh Bake...' : `Place Boutique Order • PKR ${total}`}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
