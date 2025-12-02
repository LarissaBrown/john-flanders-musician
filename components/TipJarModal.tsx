'use client';

import { X, Heart, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';

interface TipJarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TipJarModal({ isOpen, onClose }: TipJarModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tipOptions = [
    {
      name: 'Venmo',
      username: '@JohnFlanders', // Update with actual Venmo username
      icon: '💳',
      color: 'from-[#008CFF] to-[#0070CC]',
      url: 'https://venmo.com/JohnFlanders', // Update with actual Venmo link
      description: 'Quick & easy mobile payment',
    },
    {
      name: 'PayPal',
      username: 'john@johnflanders.com', // Update with actual PayPal
      icon: '🅿️',
      color: 'from-[#003087] to-[#001F5C]',
      url: 'https://paypal.me/JohnFlanders', // Update with actual PayPal.me link
      description: 'Secure online payment',
    },
    {
      name: 'Ko-fi',
      username: 'johnflanders', // Update with actual Ko-fi username
      icon: '☕',
      color: 'from-[#FF5E5B] to-[#E54542]',
      url: 'https://ko-fi.com/johnflanders', // Update with actual Ko-fi link
      description: 'Buy me a coffee!',
    },
  ];

  const presetAmounts = [5, 10, 20, 50];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-[#2D241E] to-[#1C1612] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-[#F6B800]/20">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#F6B800] to-[#E9756D] p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#1C1612] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Heart className="w-8 h-8 text-[#1C1612]" fill="currentColor" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1C1612]">Support the Music</h2>
              <p className="text-[#1C1612]/80 text-sm">Your tips help keep the music alive!</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Message */}
          <p className="text-[#F5F0E8] text-center leading-relaxed">
            Thank you for supporting independent music! Every tip helps with new recordings, equipment, and keeping live performances going.
          </p>

          {/* Suggested Amounts */}
          <div className="text-center">
            <p className="text-[#B8AFA3] text-sm mb-3">Suggested amounts:</p>
            <div className="flex justify-center gap-3">
              {presetAmounts.map((amount) => (
                <span
                  key={amount}
                  className="bg-[#F6B800]/20 text-[#F6B800] px-4 py-2 rounded-full text-sm font-bold"
                >
                  ${amount}
                </span>
              ))}
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-3">
            <p className="text-[#B8AFA3] text-sm text-center">Choose your preferred method:</p>
            
            {tipOptions.map((option) => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-gradient-to-r ${option.color} rounded-xl p-4 hover:scale-[1.02] transition-transform shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{option.icon}</span>
                    <div>
                      <h3 className="text-white font-bold text-lg">{option.name}</h3>
                      <p className="text-white/70 text-sm">{option.description}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/70" />
                </div>
              </a>
            ))}
          </div>

          {/* QR Code Section */}
          <div className="bg-[#F5F0E8] rounded-xl p-6 text-center">
            <p className="text-[#1C1612] font-semibold mb-3">Scan to tip via Venmo</p>
            <div className="bg-white p-4 rounded-lg inline-block shadow-inner">
              {/* Placeholder for QR code - replace with actual QR code image */}
              <div className="w-32 h-32 bg-gradient-to-br from-[#1C1612] to-[#2D241E] rounded flex items-center justify-center">
                <span className="text-[#F6B800] text-xs text-center px-2">
                  Add Venmo QR code image here
                </span>
              </div>
            </div>
            <p className="text-[#1C1612]/60 text-xs mt-3">
              @JohnFlanders on Venmo
            </p>
          </div>

          {/* Thank You */}
          <div className="text-center pt-4 border-t border-[#F6B800]/20">
            <p className="text-[#F6B800] font-semibold flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" fill="currentColor" />
              Thank you for your support!
              <Heart className="w-4 h-4" fill="currentColor" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

