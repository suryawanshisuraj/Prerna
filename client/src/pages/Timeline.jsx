import React, { useEffect, useState } from 'react';
import { fetchTimeline } from '../services/api';

export default function Timeline() {
  const [timelineItems, setTimelineItems] = useState([]);

  useEffect(() => {
    fetchTimeline().then(data => setTimelineItems(data));
  }, []);

  return (
    <main className="relative z-10 pt-28 pb-36 px-6 max-w-screen-md mx-auto space-y-16">
      {/* Page Title */}
      <div className="text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-[#b0004a] font-bold mb-2">Our Story</h2>
        <p className="font-sans text-sm text-[#5a4044]">
          A timeline of how two paths crossed and built a shared lifetime.
        </p>
      </div>

      {timelineItems.map((item) => {
        if (item.type === 'polaroid' && item.subtitle === 'How We Met...') {
          return (
            <section key={item.id} className="flex flex-col items-center">
              <div className="polaroid-frame max-w-sm w-full rotate-[1.5deg]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square object-cover mb-4 rounded-sm"
                />
                <p className="font-handwritten text-3xl text-[#5a4044] text-center">
                  {item.caption}
                </p>
              </div>

              <div className="mt-8 text-center max-w-md">
                <h3 className="font-sans text-xl font-bold text-[#ab2c5d] mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-sm md:text-base text-[#5a4044] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </section>
          );
        }

        if (item.type === 'chat') {
          return (
            <section key={item.id} className="space-y-6">
              <h3 className="font-serif text-2xl md:text-3xl text-center text-[#b0004a] mb-8 font-bold">
                {item.title}
              </h3>
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                {item.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[82%] px-5 py-3.5 rounded-2xl shadow-sm ${
                      msg.sender === 'Emma'
                        ? 'self-start glass-blush rounded-bl-none border border-white/30 text-[#6e0034]'
                        : 'self-end bg-[#d81b60] text-white rounded-br-none shadow-md'
                    }`}
                  >
                    <p className="font-sans text-sm md:text-base leading-snug">{msg.text}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (item.type === 'polaroid' && item.subtitle === 'The Red Bistro') {
          return (
            <section key={item.id} className="flex flex-col items-center">
              <div className="polaroid-frame max-w-sm w-full -rotate-[2deg]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square object-cover mb-4 rounded-sm"
                />
                <div className="space-y-1 text-center">
                  <p className="font-handwritten text-3xl text-[#5a4044]">{item.caption}</p>
                  <p className="font-sans text-xs text-[#ab2c5d] uppercase tracking-widest font-bold">
                    {item.date} • The Red Bistro
                  </p>
                </div>
              </div>
            </section>
          );
        }

        if (item.type === 'collage') {
          return (
            <section key={item.id} className="space-y-10">
              <h3 className="font-serif text-2xl md:text-3xl text-center text-[#b0004a] font-bold">
                {item.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
                {item.memories.map((mem) => (
                  <div
                    key={mem.id}
                    className="polaroid-frame"
                    style={{ transform: `rotate(${mem.rotation})` }}
                  >
                    <img
                      src={mem.image}
                      alt={mem.caption}
                      className="w-full aspect-[4/5] object-cover mb-3 rounded-sm"
                    />
                    <p className="font-handwritten text-2xl text-center text-[#5a4044]">
                      {mem.caption}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        return null;
      })}
    </main>
  );
}
