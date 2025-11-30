'use client';

import { Music2, Award, Users, Wind } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Music2,
      title: 'Multi-Instrumentalist',
      description: 'Proficient in guitar, piano, drums, and more',
    },
    {
      icon: Award,
      title: 'Professional Experience',
      description: '15+ years performing across the Southwest',
    },
    {
      icon: Users,
      title: 'Versatile Performer',
      description: 'Solo acts, bands, and collaborative projects',
    },
    {
      icon: Wind,
      title: 'Diverse Repertoire',
      description: 'From folk to rock, blues to contemporary',
    },
  ];

  return (
    <section id="about" className="py-32 bg-[#2D241E]">
      <div className="mx-auto px-8 sm:px-16 lg:px-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F6B800] mb-6 uppercase tracking-wide">
            About
          </h2>
          <p className="text-xl text-[#F5F0E8] mx-auto leading-relaxed text-center">
            A passionate musician dedicated to creating unforgettable experiences
          </p>
        </div>

        {/* Profile Image Placeholder */}
        <div className="flex justify-center mb-12">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#3A2F28] to-[#1C1612] border-4 border-[#F6B800] flex items-center justify-center overflow-hidden">
            <div className="text-[#F6B800] text-6xl">🎷</div>
          </div>
        </div>

        <div className="mx-auto mb-20">
          <div className="space-y-6 text-[#F5F0E8] text-lg leading-relaxed text-center">
            <p>
              John Flanders is a seasoned multi-instrumentalist whose music captures
              the essence of the American Southwest. With over 15 years of professional
              experience, John has performed at venues ranging from intimate gatherings
              to large festival stages.
            </p>
            <p>
              His unique style blends traditional folk, contemporary rock, and blues,
              creating a sound that resonates with audiences of all ages. Whether
              performing solo or with a band, John brings energy, authenticity, and
              passion to every show.
            </p>
            <p className="text-[#F6B800] font-semibold">
              Available for concerts, private events, weddings, corporate functions,
              and more. Let's create something memorable together.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#1C1612] rounded-xl p-8 border border-[#F6B800]/10 hover:border-[#F6B800]/30 transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                <Icon className="w-12 h-12 text-[#F6B800] mb-4 mx-auto" />
                <h4 className="text-lg font-bold text-[#F6B800] mb-2 uppercase tracking-wide">
                  {item.title}
                </h4>
                <p className="text-[#B8AFA3] leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
