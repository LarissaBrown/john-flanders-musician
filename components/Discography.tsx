'use client';

import { Music, ExternalLink, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Discography() {
  const doubleHelixAlbums = [
    {
      title: 'The Go Between',
      year: 'Latest Release',
      description: 'The newest album from John Flanders & Double Helix',
      tracks: ['Latin Blues', 'The Go Between'],
      featured: true,
      image: '/images/the-go-between-cover.jpg', // Placeholder - upload actual cover
    },
    {
      title: 'In The Sky Tonight',
      year: '2010s',
      description: 'John Flanders & Double Helix',
      tracks: ['Architeuthis'],
      image: '/images/in-the-sky-tonight-cover.jpg', // Placeholder - upload actual cover
    },
    {
      title: 'Natural Selection',
      year: '2000s',
      description: 'Audience favorite - Named Best Jazz Group after debut',
      highlight: 'City Weekly Best Jazz Group',
      image: '/images/natural-selection-cover.jpg', // Placeholder - upload actual cover
    },
  ];

  const soloAlbums = [
    {
      title: 'A Prehensile Tale',
      year: '2000s',
      description: 'John Flanders solo project',
      image: '/images/a-prehensile-tale-cover.jpg', // Placeholder - upload actual cover
    },
    {
      title: 'Stranded in Time',
      year: '2000s',
      description: 'John Flanders solo album',
      image: '/images/stranded-in-time-cover.jpg', // Placeholder - upload actual cover
    },
  ];

  const collaborations = [
    {
      artist: 'Steve Kusaba',
      album: 'The Centrifugal Satz Clock',
      note: 'with Steve Vai, Dweezil Zappa, Vinnie Colaiuta, Mike Miller, Mitch Forman, Chad Wackerman',
    },
    {
      artist: 'Access Film Music',
      album: 'Compilation 2012',
      link: 'http://accessfilmmusic.net/',
    },
    {
      artist: 'Sons of Nothing',
      album: '"Green and Grey" & "Clarity"',
      link: 'http://www.sonsofnothing.com/',
    },
    {
      artist: 'Red Rock Hot Club',
      album: 'Gyptology',
    },
    {
      artist: 'Jonni Lightfoot',
      album: 'BLU (2006)',
    },
    {
      artist: 'Greg Donovan',
      album: 'Various Works',
    },
    {
      artist: 'Andy Monaco',
      album: '"Nobody Said Love", "Maybe"',
      link: 'http://andymonaco.com',
    },
    {
      artist: 'The Gene Swift Project',
      album: 'Backseat Guru (2007)',
    },
    {
      artist: 'KRCL 90.9 FM',
      album: 'Live - Vol. 4',
      link: 'http://www.krcl.org',
    },
  ];

  const filmTV = [
    'Broken Hearts Club (New Line Cinema)',
    'Touched By An Angel (TV)',
    'The Promised Land (TV)',
    'Stalking Santa (2007)',
    'Flop House',
    'Sharks: Myth and Mystery (Monterey Bay Aquarium)',
  ];

  return (
    <section id="discography" className="py-20 sm:py-24 lg:py-32 bg-[#2D241E] px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F6B800] mb-6 uppercase tracking-wide">
            Discography
          </h2>
          <p className="text-lg sm:text-xl text-[#F5F0E8] max-w-3xl mx-auto leading-relaxed">
            Albums, collaborations, and film & television work
          </p>
        </div>

        {/* Double Helix Albums */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#F6B800] mb-8 flex items-center gap-3">
            <Music className="w-8 h-8" />
            John Flanders & Double Helix
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {doubleHelixAlbums.map((album, index) => (
              <div
                key={index}
                className={`bg-[#1C1612] rounded-2xl overflow-hidden border transition-all duration-300 hover:transform hover:-translate-y-1 ${
                  album.featured
                    ? 'border-[#F6B800] shadow-lg shadow-[#F6B800]/20'
                    : 'border-[#F6B800]/10 hover:border-[#F6B800]/30'
                }`}
              >
                {/* Album Cover Image */}
                <div className="relative w-full aspect-square bg-[#2D241E]">
                  <Image
                    src={album.image}
                    alt={`${album.title} album cover`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                
                <div className="p-8">
                  {album.featured && (
                    <span className="inline-block bg-[#F6B800] text-[#1C1612] px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
                      Latest
                    </span>
                  )}
                  <h4 className="text-2xl font-bold text-[#F5F0E8] mb-2">{album.title}</h4>
                  <p className="text-[#F6B800] text-sm mb-4">{album.year}</p>
                  <p className="text-[#B8AFA3] mb-4">{album.description}</p>
                  {album.highlight && (
                    <p className="text-[#F6B800] text-sm font-semibold mb-4">
                      🏆 {album.highlight}
                    </p>
                  )}
                  {album.tracks && (
                    <div className="mt-4 pt-4 border-t border-[#F6B800]/20">
                      <p className="text-[#B8AFA3] text-sm mb-2">Sample Tracks:</p>
                      <ul className="space-y-1">
                        {album.tracks.map((track, i) => (
                          <li key={i} className="text-[#F5F0E8] text-sm flex items-center gap-2">
                            <Play className="w-3 h-3 text-[#F6B800]" />
                            {track}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solo Albums */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#F6B800] mb-8 flex items-center gap-3">
            <Music className="w-8 h-8" />
            Solo Albums
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {soloAlbums.map((album, index) => (
              <div
                key={index}
                className="bg-[#1C1612] rounded-2xl overflow-hidden border border-[#F6B800]/10 hover:border-[#F6B800]/30 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                {/* Album Cover Image */}
                <div className="relative w-full aspect-square bg-[#2D241E]">
                  <Image
                    src={album.image}
                    alt={`${album.title} album cover`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-[#F5F0E8] mb-2">{album.title}</h4>
                  <p className="text-[#F6B800] text-sm mb-4">{album.year}</p>
                  <p className="text-[#B8AFA3]">{album.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborations */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#F6B800] mb-8">
            Featured Collaborations
          </h3>
          <div className="bg-[#1C1612] rounded-2xl p-8 sm:p-10 border border-[#F6B800]/10">
            <div className="grid gap-4 sm:gap-6">
              {collaborations.map((collab, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#2D241E] rounded-xl hover:bg-[#3A2F28] transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-[#F5F0E8] mb-1">
                      {collab.artist}
                    </h4>
                    <p className="text-[#F6B800] text-sm mb-2">{collab.album}</p>
                    {collab.note && (
                      <p className="text-[#B8AFA3] text-sm">{collab.note}</p>
                    )}
                  </div>
                  {collab.link && (
                    <a
                      href={collab.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#F6B800] hover:text-[#FFCA28] text-sm font-semibold transition-colors"
                    >
                      Visit Site
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Film & TV */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#F6B800] mb-8">
            Film & Television
          </h3>
          <div className="bg-[#1C1612] rounded-2xl p-8 sm:p-10 border border-[#F6B800]/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filmTV.map((credit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-[#2D241E] rounded-lg"
                >
                  <div className="w-2 h-2 bg-[#F6B800] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-[#F5F0E8] text-sm">{credit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-[#F6B800]/10 to-[#F6B800]/5 rounded-2xl p-10 sm:p-12 border border-[#F6B800]/20">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F0E8] mb-4">
            Get the Music
          </h3>
          <p className="text-[#B8AFA3] mb-8 max-w-2xl mx-auto">
            Purchase albums and support independent music
          </p>
          <Link
            href="#shop"
            className="inline-block bg-[#F6B800] hover:bg-[#FFCA28] text-[#1C1612] px-8 py-4 rounded-xl font-black text-base uppercase tracking-wide transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Visit Shop
          </Link>
        </div>
      </div>
    </section>
  );
}

