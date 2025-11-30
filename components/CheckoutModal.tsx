'use client';

import { X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'venmo'>('paypal');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // TODO: Implement actual payment processing
    setTimeout(() => {
      alert('Thank you for your purchase! This is a demo - payment integration coming soon.');
      clearCart();
      setIsProcessing(false);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
        <div className="bg-[#1C1612] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#F6B800]/20">
          {/* Header */}
          <div className="sticky top-0 bg-[#1C1612] border-b border-[#F6B800]/20 px-8 py-6 flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#F6B800] uppercase tracking-wide">
              Checkout
            </h2>
            <button
              onClick={onClose}
              className="text-[#F5F0E8] hover:text-[#F6B800] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-8 py-6">
            {/* Order Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#F5F0E8] mb-4 uppercase tracking-wide">
                Order Summary
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-[#B8AFA3]"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-[#F5F0E8] font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#F6B800]/20 pt-3 mt-3 flex justify-between items-center">
                  <span className="text-[#F5F0E8] font-bold text-lg uppercase tracking-wide">
                    Total
                  </span>
                  <span className="text-[#F6B800] font-black text-2xl">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#F5F0E8] mb-4 uppercase tracking-wide">
                Payment Method
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-6 rounded-xl border-2 transition-all font-bold text-lg ${
                    paymentMethod === 'paypal'
                      ? 'border-[#F6B800] bg-[#F6B800]/10 text-[#F6B800]'
                      : 'border-[#3A2F28] text-[#B8AFA3] hover:border-[#F6B800]/50'
                  }`}
                >
                  PayPal
                </button>
                <button
                  onClick={() => setPaymentMethod('venmo')}
                  className={`p-6 rounded-xl border-2 transition-all font-bold text-lg ${
                    paymentMethod === 'venmo'
                      ? 'border-[#F6B800] bg-[#F6B800]/10 text-[#F6B800]'
                      : 'border-[#3A2F28] text-[#B8AFA3] hover:border-[#F6B800]/50'
                  }`}
                >
                  Venmo
                </button>
              </div>
            </div>

            {/* Payment Notice */}
            <div className="bg-[#2D241E] rounded-xl p-6 mb-8 border border-[#F6B800]/10">
              <p className="text-[#B8AFA3] text-sm leading-relaxed">
                You will be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Venmo'} to
                complete your secure payment. Your order will be processed immediately
                after payment confirmation.
              </p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-[#F6B800] hover:bg-[#FFCA28] text-[#1C1612] py-5 rounded-xl font-black text-base uppercase tracking-wide transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
            >
              {isProcessing ? 'Processing...' : `Pay with ${paymentMethod === 'paypal' ? 'PayPal' : 'Venmo'}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
