'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[28rem] sm:pt-[30rem] md:pt-[32rem] lg:pt-[34rem]"
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

      {/* Content - Centered and balanced */}
      <div className="relative z-20 w-full max-w-7xl mx-auto text-center py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 mt-32 sm:mt-36 md:mt-40 lg:mt-48">

        {/* Saxophone Illustration - Positioned above the warm backdrop */}
        <div className="flex justify-center mb-6 -mt-10">
          <div className="relative w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-52 lg:w-48 lg:h-60 z-30 rotate-[15deg] opacity-75 scale-150">
            <Image
              src="/images/saxophone.png"
              alt="Saxophone illustration"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
              unoptimized
            />
          </div>
        </div>

        <div className="animate-fade-in-up space-y-8 sm:space-y-10 md:space-y-12 flex justify-center">
          {/* Warm backdrop for text readability */}
          <div className="relative w-full max-w-5xl mx-auto z-20">
            <div className="absolute inset-0 bg-gradient-to-b from-[#8B2E3E]/40 via-[#5B4260]/30 to-[#8B2E3E]/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl"></div>
            
            <div className="relative z-40 py-10 sm:py-12 md:py-16 lg:py-20 px-8 sm:px-12 md:px-16 lg:px-20 space-y-8">
              {/* Brand Name */}
              <h1 className="font-black tracking-tight text-[#FFD700] whitespace-nowrap text-center text-[clamp(2.5rem,6vw,5.5rem)] [text-shadow:0_4px_12px_rgba(0,0,0,0.4),0_0_30px_rgba(255,215,0,0.5)]">
                JOHN FLANDERS
              </h1>

              {/* Tagline */}
              <div className="space-y-6 sm:space-y-7 md:space-y-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFE4B5] uppercase tracking-wide leading-tight text-center [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
                  Live music from the heart of the Southwest.
                </h2>
                
                <p className="text-lg sm:text-xl md:text-2xl text-[#FFFAF0] font-light leading-relaxed text-center [text-shadow:0_2px_6px_rgba(0,0,0,0.3)]">
                  Multi-instrumentalist. Performer. Available for all occasions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available for bookings */}
      <Link 
        href="#contact"
        className="absolute z-30 text-[#F5DEB3] text-xs sm:text-sm uppercase tracking-widest hover:text-[#E9756D] transition-colors cursor-pointer bg-[#2D241E]/80 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl backdrop-blur-md bottom-8 sm:bottom-10 md:bottom-12 right-6 sm:right-8 md:right-10 [text-shadow:0_2px_4px_rgba(0,0,0,0.3)] hover:bg-[#2D241E]/90 shadow-lg"
      >
        <span className="hidden sm:inline">Available for bookings →</span>
        <span className="sm:hidden">Book now →</span>
      </Link>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 md:w-7 md:h-12 border-2 border-[#F19456] rounded-full flex items-start justify-center p-2 shadow-[0_0_15px_rgba(241,148,86,0.6)]">
          <div className="w-1 h-3 md:w-1.5 md:h-4 bg-[#F19456] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
