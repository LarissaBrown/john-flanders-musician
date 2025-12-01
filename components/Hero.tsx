'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start justify-center overflow-hidden pt-20 px-6 sm:px-8 lg:px-12"
    >
      {/* Background Image */}
      <div className="absolute top-16 left-0 right-0 bottom-0 z-0">
        <Image
          src="/images/john_flanders_goldner_hirsch_inn.jpg"
          alt="Warm ambient background"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Content - Positioned lower on page */}
      <div className="relative z-20 w-full max-w-7xl mx-auto text-center pt-[40vh] sm:pt-[45vh] md:pt-[50vh]">

        <div className="animate-fade-in-up space-y-8 sm:space-y-10 md:space-y-12 flex justify-center">
          {/* Warm backdrop for text readability */}
          <div className="relative w-full max-w-5xl mx-auto z-20">
            <div className="absolute inset-0 bg-gradient-to-b from-[#8B2E3E]/25 via-[#5B4260]/20 to-[#8B2E3E]/25 backdrop-blur-sm rounded-2xl sm:rounded-3xl"></div>
            
            <div className="relative z-40 py-8 sm:py-10 md:py-12 lg:py-14 px-6 sm:px-10 md:px-12 lg:px-16 space-y-6">
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
