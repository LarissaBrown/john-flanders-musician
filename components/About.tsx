'use client';

import Image from 'next/image';

export default function About() {

  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32 bg-[#2D241E] px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F6B800] mb-6 uppercase tracking-wide">
            About
          </h2>
          <p className="text-lg sm:text-xl text-[#F5F0E8] max-w-3xl mx-auto leading-relaxed">
            A passionate musician dedicated to creating unforgettable experiences
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-16">
          <div className="relative w-64 h-96 sm:w-80 sm:h-[30rem] md:w-96 md:h-[36rem] rounded-2xl overflow-hidden border-4 border-[#F6B800] shadow-2xl">
            <Image
              src="/images/john_flanders_brick_sax.jpg"
              alt="John Flanders with saxophone"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
              priority
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-20">
          <div className="space-y-6 text-[#F5F0E8] text-base sm:text-lg leading-relaxed">
            <p className="px-4">
              For more than a decade, <strong className="text-[#F6B800]">John Flanders</strong> has been one of the most in-demand saxophone and woodwind players in Salt Lake City and across the Intermountain West. His sound is heard everywhere—from TV and radio commercials to popular television shows and major film soundtracks. Known as both a standout bandleader and a trusted session musician, John's recordings have earned widespread praise and solidified his reputation as a skilled composer and arranger.
            </p>
            
            <p className="px-4">
              John is a multi-time City Weekly <em>Best of Utah</em> award winner, recognized both for his instrumental work and for his classic jazz groups. He has performed the National Anthem at NBA games, appeared with the Utah Symphony, and toured extensively throughout Europe, including Italy, France, Germany, Switzerland, and more. His freelance career has paired him with iconic artists such as The Temptations, Billy Preston, Solomon Burke, Wayne Newton, Frankie Avalon, Rodney Dangerfield, Don Rickles, Patty Andrews, Sam Moore, Ben Folds, and many others.
            </p>
            
            <p className="px-4">
              John leads several acclaimed projects, including the long-running jazz quartet <strong className="text-[#F6B800]">Bias Sphere</strong>, featuring Linke Hebrew (bass), Wayne Coons (drums), and Chris Hough (guitar). His fusion-swing group, <strong className="text-[#F6B800]">Double Helix</strong>, was named Best Jazz Group shortly after its debut and has released three albums, including the audience favorite <em>Natural Selection</em>. The group has also been featured nationally on NPR's <em>Marketplace</em>, and John has contributed original compositions to NPR's <em>To The Best of Our Knowledge</em>.
            </p>
            
            <p className="px-4">
              A versatile multi-instrumentalist, John performs primarily on tenor and alto saxophones and flute, while also playing clarinet, bass clarinet, piccolo, baritone and soprano saxophones, and keyboards. Beyond performing, he remains active as an arranger, composer, conductor, producer, and recording artist.
            </p>
            
            <p className="px-4">
              Originally from Canton, Ohio, John studied at The Ohio State University and the University of Connecticut, learning from jazz greats such as Ted Nash, Lou Donaldson, Ernie Krivda, and Eddie Daniels. His career has taken him from New York to Los Angeles to international stages—and even the open seas during his years performing in cruise-ship orchestras backing top Vegas entertainers. With more than 15 years of teaching experience and guest lectures on jazz history, John brings both expertise and passion to every musical endeavor.
            </p>
            
            <p className="text-[#F6B800] font-semibold text-center mt-12 px-4 text-lg">
              Available for concerts, private events, weddings, corporate functions, and more. Let's create something memorable together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
