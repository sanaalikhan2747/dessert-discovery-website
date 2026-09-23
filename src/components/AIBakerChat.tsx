import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { DessertItem } from '../data/bakeryCatalog';
import {
  X,
  Send,
  ChefHat,
} from 'lucide-react';

interface AIBakerChatProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: DessertItem) => void;
}

export const AIBakerChat: React.FC<AIBakerChatProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'baker',
      text: "Warm greetings! I'm your Treats & Temptations boutique concierge. What kind of celebration, flavor mood, or budget are we baking for today? Tell me anything—e.g. 'I need something for 8 people. Not too sweet, with rose or berry notes. Budget PKR 2,000.'",
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (!response.ok) throw new Error('Chat failed');
      const data = await response.json();

      const bakerMessage: ChatMessage = {
        id: `baker-${Date.now()}`,
        sender: 'baker',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedItems: data.recommendedItems || [],
        combinationSummary: data.combinationSummary,
        servingTip: data.servingTip,
      };

      setMessages((prev) => [...prev, bakerMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `baker-${Date.now()}`,
        sender: 'baker',
        text: "I'd love to help curate that sweet moment! Our signature Vintage Lambeth Cake paired with Ruby Chocolate Pistachio cookies makes an unforgettable table centerpiece that fits your budget.",
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAddChatRecommended = (item: DessertItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== item.id));
    }, 2000);
  };

  if (!isOpen) return null;

  const quickPrompts = [
    'Recommend an artisan loaf for 4 to 5 people.',
    'Tell me about your brownie, banoffee & fruit trifles.',
    'I want warm cinnamon rolls with cream cheese frosting.',
    'Strawberry cheesecake or chocolate custard cake for a party?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col border-l border-pink-200 animate-slideLeft">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-pink-100 bg-pink-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 text-white flex items-center justify-center relative shadow-xs">
              <ChefHat className="w-5 h-5" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif-bakery text-base font-bold text-gray-900">
                  Treats &amp; Temptations
                </h3>
                <span className="text-[10px] uppercase font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full border border-pink-200">
                  Concierge
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Bespoke flavor matching &amp; portion calculations
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

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-pink-50/20">
          {messages.map((msg) => {
            const isBaker = msg.sender === 'baker';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isBaker ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isBaker
                      ? 'bg-white text-gray-900 border border-pink-100 rounded-tl-xs shadow-xs'
                      : 'bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-tr-xs shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Combination Summary Pill */}
                  {msg.combinationSummary && (
                    <div className="mt-3 p-2.5 bg-pink-50 rounded-xl border border-pink-200 text-xs font-bold text-pink-800">
                      ✨ <strong>Baker's Spread:</strong> {msg.combinationSummary}
                    </div>
                  )}

                  {/* Serving Tip */}
                  {msg.servingTip && (
                    <div className="mt-2 text-[11px] text-pink-700 italic">
                      💡 <strong>Serving Tip:</strong> {msg.servingTip}
                    </div>
                  )}

                  {/* Embedded Recommended Items Card */}
                  {msg.recommendedItems && msg.recommendedItems.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-pink-100 space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-pink-600 block">
                        Recommended For This Combo:
                      </span>
                      {msg.recommendedItems.map((item) => {
                        const isAdded = addedItemIds.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            className="p-2.5 bg-white rounded-xl border border-pink-200 flex items-center justify-between gap-3 shadow-2xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                referrerPolicy="no-referrer"
                                className="w-11 h-11 object-cover rounded-lg"
                              />
                              <div>
                                <h5 className="font-bold text-xs text-gray-900">
                                  {item.name}
                                </h5>
                                <span className="text-[11px] text-pink-600 font-bold">
                                  PKR {item.price} • {item.serves}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleAddChatRecommended(item)}
                              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-pink-600 hover:bg-pink-700 text-white'
                              }`}
                            >
                              {isAdded ? '✓ Added' : '+ Add'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-pink-700 italic bg-pink-100/70 px-4 py-2.5 rounded-2xl w-fit border border-pink-200">
              <ChefHat className="w-3.5 h-3.5 text-pink-600 animate-bounce" />
              <span>Treats &amp; Temptations is reviewing recipes &amp; calculating portions...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-3 bg-pink-50/60 border-t border-pink-100 overflow-x-auto whitespace-nowrap flex gap-1.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] bg-white hover:bg-pink-100 text-gray-700 px-3 py-1.5 rounded-full border border-pink-200 transition-colors shrink-0 cursor-pointer font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-pink-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Treats &amp; Temptations (e.g. 8 people, not too sweet, PKR 2,000)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full border border-pink-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40 bg-pink-50/30"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
