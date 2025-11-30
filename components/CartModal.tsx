'use client';

import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1C1612] shadow-2xl z-50 overflow-y-auto border-l border-[#F6B800]/20">
        {/* Header */}
        <div className="sticky top-0 bg-[#1C1612] border-b border-[#F6B800]/20 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#F6B800] uppercase tracking-wide">
              Shopping Cart
            </h2>
            <p className="text-sm text-[#B8AFA3] mt-1">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="px-8 py-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#B8AFA3] text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#2D241E] rounded-xl p-6 border border-[#F6B800]/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#F5F0E8] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-[#F6B800] font-bold text-lg">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#B8AFA3] hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-[#1C1612] rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors p-1"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-[#F5F0E8] font-bold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors p-1"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[#F5F0E8] font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="sticky bottom-0 bg-[#1C1612] border-t border-[#F6B800]/20 px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[#F5F0E8] font-bold text-lg uppercase tracking-wide">
                Total
              </span>
              <span className="text-[#F6B800] font-black text-3xl">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-[#F6B800] hover:bg-[#FFCA28] text-[#1C1612] py-5 rounded-xl font-black text-base uppercase tracking-wide transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
