import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import ThreeHeart from '../components/ThreeHeart';
import { fetchJournalInfo } from '../services/api';

export default function Home() {
  const [info, setInfo] = useState(null);
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    fetchJournalInfo().then(data => {
      setInfo(data);
    });
  }, []);

  useEffect(() => {
    // Default anniversary date: June 14, 1 year prior
    const anniversaryDate = info?.anniversaryDate 
      ? new Date(info.anniversaryDate)
      : new Date(new Date().getFullYear() - 1, 5, 14);

    const updateTimer = () => {
      const now = new Date();
      const diff = Math.max(0, now - anniversaryDate);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [info]);

  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-28 pb-32 px-6">
      <section className="flex flex-col items-center text-center max-w-3xl w-full">
        {/* Romantic Title */}
        <div className="mb-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffe9e7] border border-[#ffd9de] text-[#b0004a] text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> Happy Girlfriend Day!
        </div>

        <h2 className="font-serif text-4xl md:text-6xl text-[#b0004a] mb-6 tracking-tight font-bold">
          To My Dearest <span className="italic underline decoration-[#fd6c9c] decoration-4">{info?.couple?.to || 'Prerna'}</span>
        </h2>

        {/* 3D Heart */}
        <div className="relative w-full my-2 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#fd6c9c]/10 blur-3xl rounded-full scale-75 animate-pulse" />
          <ThreeHeart />
        </div>

        {/* Live Relationship Counter */}
        <div className="mt-6 bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white shadow-[0_10px_30px_rgba(74,14,14,0.08)] w-full max-w-xl">
          <p className="font-sans text-xs font-bold text-[#ab2c5d] uppercase tracking-[0.2em] mb-6">
            Our Journey Together
          </p>

          <div className="grid grid-cols-4 gap-2 md:gap-6">
            <div className="flex flex-col items-center">
              <span className="font-sans text-3xl md:text-5xl font-bold text-[#b0004a]">
                {String(elapsed.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs uppercase text-[#5a4044] font-semibold mt-1">Days</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-sans text-3xl md:text-5xl font-bold text-[#b0004a]">
                {String(elapsed.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs uppercase text-[#5a4044] font-semibold mt-1">Hours</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-sans text-3xl md:text-5xl font-bold text-[#b0004a]">
                {String(elapsed.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs uppercase text-[#5a4044] font-semibold mt-1">Mins</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-sans text-3xl md:text-5xl font-bold text-[#b0004a]">
                {String(elapsed.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs uppercase text-[#5a4044] font-semibold mt-1">Secs</span>
            </div>
          </div>
        </div>

        {/* Action button to Explore */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <Link
            to="/timeline"
            className="group flex items-center gap-2 bg-gradient-to-r from-[#b0004a] to-[#ab2c5d] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore Our Memories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="bouncing-heart text-[#b0004a] mt-2">
            <Heart className="w-5 h-5 fill-current" />
          </div>
        </div>
      </section>
    </main>
  );
}
