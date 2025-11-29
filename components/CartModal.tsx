'use client';

import { useState } from 'react';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import CheckoutModal from './CheckoutModal';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  if (showCheckout) {
    return <CheckoutModal isOpen={true} onClose={() => { setShowCheckout(false); onClose(); }} />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F4E4C1]">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-6 h-6 text-[#C1440E]" />
            <h2 className="text-2xl font-bold text-[#2C1810]">
              Shopping Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#9B4819] hover:text-[#C1440E] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-[#C1440E] mx-auto mb-4 opacity-50" />
              <p className="text-lg text-[#9B4819]">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-[#C1440E] hover:text-[#E67E22] font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-[#FFF8F0] rounded-lg p-4 border-2 border-[#F4E4C1]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#2C1810]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#9B4819] capitalize">
                        {item.type}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="bg-white border-2 border-[#F4E4C1] rounded-full p-1 hover:border-[#C1440E] transition-colors"
                      >
                        <Minus className="w-4 h-4 text-[#9B4819]" />
                      </button>
                      <span className="font-semibold text-[#2C1810] w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="bg-white border-2 border-[#F4E4C1] rounded-full p-1 hover:border-[#C1440E] transition-colors"
                      >
                        <Plus className="w-4 h-4 text-[#9B4819]" />
                      </button>
                    </div>

                    <p className="text-lg font-bold text-[#C1440E]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-[#F4E4C1] p-6 bg-[#FFF8F0]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-[#2C1810]">Total:</span>
              <span className="text-3xl font-bold text-[#C1440E]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-[#C1440E] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#E67E22] transition-all shadow-lg hover:shadow-xl"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={onClose}
              className="w-full mt-3 text-[#9B4819] hover:text-[#C1440E] font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

