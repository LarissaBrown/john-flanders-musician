'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-48 sm:pt-56 md:pt-64 lg:pt-72"
    >
      {/* Warm Dark Spots Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/sunset-red-rocks.webp"
          alt="Warm ambient background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Content - Centered and balanced, pushed down with less bottom padding */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center py-8 sm:py-10 md:py-12 lg:py-16 mt-32 sm:mt-36 md:mt-40 lg:mt-48">

      {/* Saxophone Illustration - Fixed position to overlap navbar */}
      <div className="fixed top-24 sm:top-28 md:top-32 lg:top-36 left-1/2 transform -translate-x-1/2 z-[60] w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-84 lg:w-72 lg:h-96" style={{rotate: '15deg', opacity: '0.7'}}>
        <Image
          src="/images/saxophone.png"
          alt="Saxophone illustration"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
          unoptimized
        />
      </div>
          {/* Warm backdrop for text readability */}
          <div className="relative mx-auto max-w-5xl z-20">
            <div className="absolute inset-0 bg-gradient-to-b from-[#8B2E3E]/40 via-[#5B4260]/30 to-[#8B2E3E]/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl"></div>
            
            <div className="relative z-40 px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-16 lg:py-20">
              {/* Brand Name - Responsive sizing */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-[#FFD700] mb-6 sm:mb-8 md:mb-10 whitespace-nowrap overflow-visible" style={{
                letterSpacing: '0.02em',
                textShadow: '0 4px 12px rgba(0,0,0,0.4), 0 0 30px rgba(255, 215, 0, 0.5)'
              }}>
                JOHN FLANDERS
              </h1>

              {/* Tagline - Responsive sizing */}
              <div className="space-y-5 sm:space-y-6 md:space-y-7 mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFE4B5] uppercase tracking-wide leading-tight" style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)'
                }}>
                  Live music from the heart of Utah.
                </h2>
                
                <p className="text-lg sm:text-xl md:text-2xl text-[#FFFAF0] font-light leading-relaxed" style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }}>
                  Multi-instrumentalist. Performer. Available for all occasions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available for bookings - Responsive positioning */}
      <Link 
        href="#contact"
        className="absolute z-30 text-[#F5DEB3] text-xs sm:text-sm uppercase tracking-widest hover:text-[#E9756D] transition-colors cursor-pointer bg-[#2D241E]/80 px-3 sm:px-4 py-2 sm:py-3 rounded-lg backdrop-blur-md bottom-8 sm:bottom-10 md:bottom-12 right-4 sm:right-6 md:right-8"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        <span className="hidden sm:inline">Available for bookings →</span>
        <span className="sm:hidden">Book now →</span>
      </Link>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 md:w-7 md:h-12 border-2 border-[#F19456] rounded-full flex items-start justify-center p-2" style={{
          boxShadow: '0 0 15px rgba(241, 148, 86, 0.6)'
        }}>
          <div className="w-1 h-3 md:w-1.5 md:h-4 bg-[#F19456] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
