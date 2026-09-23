import React from 'react';
import { OrderReceipt } from '../types';
import {
  CheckCircle,
  X,
} from 'lucide-react';

interface OrderConfirmationModalProps {
  receipt: OrderReceipt | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  receipt,
  onClose,
}) => {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-pink-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer border border-pink-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Icon & Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shadow-xs">
            <CheckCircle className="w-9 h-9" />
          </div>
          <span className="text-[11px] uppercase font-bold tracking-widest bg-pink-50 text-pink-700 px-3 py-0.5 rounded-full border border-pink-200">
            Order Confirmed • #{receipt.orderNumber}
          </span>
          <h3 className="font-serif-bakery text-2xl sm:text-3xl font-bold text-gray-900">
            Your Bake Has Been Scheduled!
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
            Thank you, {receipt.customerName}. Treats &amp; Temptations by SK is now reserving oven space and preparing your handcrafted artisanal treats.
          </p>
        </div>

        {/* LIVE 4-STAGE BAKERY PROGRESS TRACKER */}
        <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-200 mb-6 space-y-3">
          <div className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center justify-between">
            <span>Kitchen &amp; Oven Tracker</span>
            <span className="text-[10px] text-pink-600 font-bold animate-pulse">● Active in Studio</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-full bg-pink-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                1
              </div>
              <p className="text-[10px] font-bold text-pink-700 leading-tight">Batch Prep</p>
              <p className="text-[9px] text-gray-500">Fresh batter</p>
            </div>

            <div className="space-y-1.5 opacity-60">
              <div className="w-8 h-8 mx-auto rounded-full bg-pink-200 text-pink-800 flex items-center justify-center text-xs font-bold">
                2
              </div>
              <p className="text-[10px] font-bold text-gray-800 leading-tight">Boutique Bake</p>
              <p className="text-[9px] text-gray-500">Cedar &amp; pans</p>
            </div>

            <div className="space-y-1.5 opacity-60">
              <div className="w-8 h-8 mx-auto rounded-full bg-pink-200 text-pink-800 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <p className="text-[10px] font-bold text-gray-800 leading-tight">Piping &amp; Ribbon</p>
              <p className="text-[9px] text-gray-500">Pink box wrap</p>
            </div>

            <div className="space-y-1.5 opacity-60">
              <div className="w-8 h-8 mx-auto rounded-full bg-pink-200 text-pink-800 flex items-center justify-center text-xs font-bold">
                4
              </div>
              <p className="text-[10px] font-bold text-gray-800 leading-tight">Delivery</p>
              <p className="text-[9px] text-gray-500">Hand-delivered</p>
            </div>
          </div>
        </div>

        {/* ORDER DETAILS SUMMARY */}
        <div className="bg-white p-4 rounded-2xl border border-pink-100 space-y-3 mb-6 text-xs text-gray-700">
          <div className="flex items-center justify-between pb-2 border-b border-pink-100">
            <span className="font-bold text-gray-900">Delivery Slot:</span>
            <span className="font-semibold text-pink-600">{receipt.deliverySlot}</span>
          </div>

          <div className="flex items-start justify-between pb-2 border-b border-pink-100">
            <span className="font-bold text-gray-900">Destination:</span>
            <span className="text-right max-w-xs">{receipt.address}</span>
          </div>

          {receipt.giftNote && (
            <div className="pb-2 border-b border-pink-100">
              <span className="font-bold text-gray-900 block mb-0.5">Card Note:</span>
              <p className="font-serif-bakery italic text-gray-800">"{receipt.giftNote}"</p>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-1">
            <span className="font-bold text-sm text-gray-900">Total Paid:</span>
            <span className="font-serif-bakery text-xl font-bold text-pink-700">
              PKR {receipt.total}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
        >
          Explore More Treats &amp; Temptations
        </button>
      </div>
    </div>
  );
};
