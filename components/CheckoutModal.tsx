'use client';

import { useState } from 'react';
import { X, CreditCard, Mail, User, Check } from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '@/lib/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'venmo' | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = async (paymentId: string, method: 'paypal' | 'venmo') => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          products: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          paymentMethod: method,
          paymentId: paymentId,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setOrderNumber(data.data.orderNumber);
        setOrderComplete(true);
        clearCart();
      } else {
        alert('Error processing order. Please contact support.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error processing order. Please try again.');
    }
  };

  if (orderComplete) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-[#2C2419] mb-4">
            Order Complete!
          </h2>
          
          <p className="text-[#5A4A3A] mb-6">
            Thank you for your purchase! Your order number is:
          </p>
          
          <div className="bg-[#E6B8A5] rounded-lg p-4 mb-6">
            <p className="text-2xl font-bold text-[#C67B5C]">{orderNumber}</p>
          </div>
          
          <p className="text-[#5A4A3A] mb-8">
            Download links have been sent to <strong>{customerInfo.email}</strong>
          </p>
          
          <button
            onClick={onClose}
            className="w-full bg-[#C67B5C] text-white py-3 rounded-full font-semibold hover:bg-[#D97D54] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-[#E6B8A5] p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#2C2419]">Checkout</h2>
            <button
              onClick={onClose}
              className="text-[#5A4A3A] hover:text-[#C67B5C] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            {/* Order Summary */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#2C2419] mb-4">Order Summary</h3>
              <div className="bg-[#FAF8F5] rounded-lg p-4 space-y-3">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-[#5A4A3A]">
                      {item.title} x{item.quantity}
                    </span>
                    <span className="font-semibold text-[#2C2419]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#E6B8A5] pt-3 flex justify-between">
                  <span className="font-bold text-[#2C2419]">Total:</span>
                  <span className="font-bold text-[#C67B5C] text-xl">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#2C2419] mb-4">Your Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#2C2419] font-semibold mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5A4A3A]" />
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, name: e.target.value })
                      }
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#E6B8A5] rounded-lg focus:border-[#D97D54] focus:outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2C2419] font-semibold mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5A4A3A]" />
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, email: e.target.value })
                      }
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#E6B8A5] rounded-lg focus:border-[#D97D54] focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <p className="text-sm text-[#5A4A3A] mt-1">
                    Download links will be sent to this email
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#2C2419] mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-[#D97D54] bg-[#FAF8F5]'
                      : 'border-[#E6B8A5] hover:border-[#D97D54]'
                  }`}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#0070BA]" />
                  <p className="font-semibold text-[#2C2419]">PayPal</p>
                </button>

                <button
                  onClick={() => setPaymentMethod('venmo')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'venmo'
                      ? 'border-[#D97D54] bg-[#FAF8F5]'
                      : 'border-[#E6B8A5] hover:border-[#D97D54]'
                  }`}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#008CFF]" />
                  <p className="font-semibold text-[#2C2419]">Venmo</p>
                </button>
              </div>
            </div>

            {/* PayPal Button */}
            {paymentMethod === 'paypal' && customerInfo.name && customerInfo.email && (
              <div className="mb-4">
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
                    currency: 'USD',
                  }}
                >
                  <PayPalButtons
                    style={{ layout: 'vertical' }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                          {
                            amount: {
                              currency_code: 'USD',
                              value: totalPrice.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      if (actions.order) {
                        const details = await actions.order.capture();
                        await handleSubmitOrder(details.id, 'paypal');
                      }
                    }}
                    onError={(err) => {
                      console.error('PayPal error:', err);
                      alert('Payment failed. Please try again.');
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}

            {/* Venmo Instructions */}
            {paymentMethod === 'venmo' && customerInfo.name && customerInfo.email && (
              <div className="bg-[#FAF8F5] border-2 border-[#D97D54] rounded-lg p-6">
                <h4 className="font-bold text-[#2C2419] mb-3">
                  Complete Payment via Venmo
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-[#5A4A3A] mb-4">
                  <li>Send ${totalPrice.toFixed(2)} to <strong>@JohnFlanders-Music</strong></li>
                  <li>Include your order email in the note</li>
                  <li>Click the button below after payment</li>
                </ol>
                <button
                  onClick={() => handleSubmitOrder('venmo-pending', 'venmo')}
                  className="w-full bg-[#008CFF] text-white py-3 rounded-full font-semibold hover:bg-[#0070D9] transition-colors"
                >
                  I've Sent Payment via Venmo
                </button>
                <p className="text-xs text-[#5A4A3A] mt-3 text-center">
                  Your download links will be sent after payment verification (usually within 1 hour)
                </p>
              </div>
            )}

            {!customerInfo.name || !customerInfo.email ? (
              <p className="text-center text-[#5A4A3A] italic">
                Please fill in your information to continue
              </p>
            ) : !paymentMethod ? (
              <p className="text-center text-[#5A4A3A] italic">
                Please select a payment method
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

