import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, BookOpen, Stars, Flower2, PartyPopper, Brain, Moon, Music } from 'lucide-react';
import { fetchReasons } from '../services/api';

const iconMap = {
  mail: Mail,
  favorite: Heart,
  auto_awesome: Sparkles,
  auto_stories: BookOpen,
  stars: Stars,
  spa: Flower2,
  celebration: PartyPopper,
  psychology: Brain,
  nightlight: Moon,
  music_note: Music,
};

export default function Reasons() {
  const [reasons, setReasons] = useState([]);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    fetchReasons().then(data => setReasons(data));
  }, []);

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="relative z-10 pt-28 pb-36 px-6 max-w-6xl mx-auto">
      {/* Title */}
      <section className="text-center mb-12 space-y-3">
        <span className="text-[#b0004a] font-sans text-xs uppercase tracking-widest block font-bold">
          A Little Something Extra
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#3d0506] font-bold">
          Reasons I Love You
        </h2>
        <p className="text-[#5a4044] max-w-xl mx-auto font-sans text-sm opacity-90">
          Click on the envelopes to reveal the little things that make my world brighter every day.
        </p>
      </section>

      {/* Interactive Flip Card Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {reasons.map((card) => {
          const IconComponent = iconMap[card.frontIcon] || Heart;
          const isFlipped = !!flipped[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className={`flip-card perspective-1000 group h-48 cursor-pointer ${card.colSpan || ''} ${card.rotation || ''}`}
            >
              <div
                className={`flip-card-inner relative w-full h-full preserve-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <div
                  className={`absolute inset-0 ${card.bg} rounded-2xl flex flex-col items-center justify-center p-4 backface-hidden shadow-lg border border-white/30`}
                >
                  <IconComponent className={`w-8 h-8 ${card.color} mb-2`} />
                  <span className={`font-sans text-xs uppercase tracking-wider ${card.color} opacity-70 font-bold`}>
                    Reason {card.number}
                  </span>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 bg-[#ffe2df] rotate-y-180 backface-hidden rounded-2xl flex flex-col items-center justify-center p-4 text-center border border-[#b0004a]/20 shadow-md">
                  {card.image ? (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <img
                        src={card.image}
                        alt="Reason photo"
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <p className="font-sans text-xs font-bold text-[#ab2c5d]">
                        {card.backText}
                      </p>
                    </div>
                  ) : (
                    <p className="font-serif text-sm md:text-base text-[#b0004a] font-semibold italic leading-snug">
                      "{card.backText}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <div className="mt-12 text-center">
        <button className="bg-gradient-to-r from-[#b0004a] to-[#ab2c5d] text-white px-8 py-4 rounded-full font-sans font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
          And a million more... ❤️
        </button>
      </div>
    </main>
  );
}
