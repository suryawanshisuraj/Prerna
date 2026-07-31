import React, { useState } from 'react';
import { Heart, Music, Volume2, VolumeX } from 'lucide-react';

export default function Header() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#fff8f7]/80 backdrop-blur-xl shadow-[0px_10px_30px_rgba(74,14,14,0.08)] flex items-center justify-between px-6 py-4 transition-all">
      <div className="flex items-center gap-2 cursor-pointer text-[#b0004a] hover:scale-110 active:scale-95 transition-transform duration-300">
        <Heart className="w-6 h-6 fill-current" />
      </div>
      
      <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#b0004a] tracking-tight">
        Our Story
      </h1>

      <button
        onClick={toggleMusic}
        title={isPlaying ? "Mute Music" : "Play Our Song"}
        className="relative group p-2 text-[#b0004a] hover:scale-110 active:scale-95 transition-transform duration-300"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 animate-pulse text-[#d81b60]" />
        ) : (
          <Music className="w-6 h-6" />
        )}
        <span className="absolute right-0 top-12 bg-white text-[#3d0506] px-3 py-1 rounded-lg text-xs font-sans opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          {isPlaying ? "Playing 'Our Song' ♪" : "Play Our Song"}
        </span>
      </button>
    </header>
  );
}
