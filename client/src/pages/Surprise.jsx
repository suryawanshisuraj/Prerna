import React, { useState } from 'react';
import { Lock, ArrowRight, Heart, Sparkles, Unlock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { unlockSurprise } from '../services/api';

export default function Surprise() {
  const [keyInput, setKeyInput] = useState('');
  const [letterData, setLetterData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!keyInput.trim()) return;

    try {
      const res = await unlockSurprise(keyInput);
      if (res.success) {
        setLetterData(res.data);
        setIsUnlocked(true);
        setErrorMsg('');
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        setErrorMsg(res.message || 'Incorrect key! Try "love"');
      }
    } catch (err) {
      setErrorMsg('Failed to unlock. Please try again.');
    }
  };

  return (
    <main className="relative z-10 pt-28 pb-36 px-6 max-w-2xl mx-auto flex flex-col items-center">
      {!isUnlocked ? (
        <div className="w-full max-w-md text-center flex flex-col items-center">
          <div className="mb-6">
            <h2 className="font-serif text-3xl md:text-5xl text-[#b0004a] font-bold mb-2">
              For Your Eyes Only
            </h2>
            <p className="font-sans text-sm text-[#5a4044]">
              Enter the passcode to unlock a secret surprise memory.
            </p>
          </div>

          {/* Envelope Styled Box */}
          <div className="relative w-full bg-[#ffe9e7] rounded-2xl shadow-xl border border-white p-8 flex flex-col items-center">
            <div className="absolute -top-6 bg-[#b0004a] text-white p-3.5 rounded-full shadow-lg">
              <Lock className="w-6 h-6" />
            </div>

            <form onSubmit={handleUnlock} className="w-full space-y-5 mt-4">
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Enter key (e.g. love)"
                className="w-full bg-white border-b-2 border-[#b0004a]/30 focus:border-[#b0004a] text-center text-xl tracking-widest py-3 px-4 rounded-xl focus:outline-none transition-all placeholder:text-xs placeholder:tracking-normal placeholder:text-[#8e6f74]"
              />

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#b0004a] to-[#ab2c5d] text-white rounded-full font-sans font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Reveal Surprise</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {errorMsg && (
              <p className="mt-4 text-xs font-bold text-[#ba1a1a] animate-pulse">
                {errorMsg}
              </p>
            )}

            <p className="mt-3 text-[11px] text-[#8e6f74]">
              Hint: Try key <span className="font-bold text-[#b0004a]">"love"</span> or <span className="font-bold text-[#b0004a]">"1012"</span>
            </p>
          </div>
        </div>
      ) : (
        /* The Unlocked Letter */
        <div className="w-full animate-fadeIn">
          <div className="relative bg-white p-8 md:p-14 shadow-2xl rounded-sm border-8 border-white transform rotate-1">
            <div className="flex justify-between items-start mb-6">
              <span className="font-handwritten text-2xl text-[#b0004a]">
                {letterData.date}
              </span>
              <Heart className="w-6 h-6 text-[#b0004a] fill-current" />
            </div>

            <div className="font-handwritten text-xl md:text-3xl text-[#3d0506] leading-relaxed space-y-4">
              <p className="font-bold text-2xl md:text-4xl text-[#b0004a]">
                {letterData.greeting}
              </p>

              {letterData.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              <div className="pt-4 text-right">
                <p className="text-lg md:text-2xl">{letterData.closing}</p>
                <p className="font-bold text-3xl md:text-5xl text-[#b0004a] mt-1">
                  {letterData.signature}
                </p>
              </div>
            </div>

            {/* Polaroid Photo Attached */}
            {letterData.polaroid && (
              <div className="pt-10 flex justify-center">
                <div className="polaroid-frame max-w-xs transform -rotate-2">
                  <img
                    src={letterData.polaroid.image}
                    alt={letterData.polaroid.caption}
                    className="w-full aspect-square object-cover mb-2 rounded-sm"
                  />
                  <p className="font-handwritten text-2xl text-center text-[#5a4044]">
                    {letterData.polaroid.caption}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsUnlocked(false)}
              className="text-xs font-bold text-[#ab2c5d] hover:text-[#b0004a] flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <Unlock className="w-3.5 h-3.5" /> Lock Message Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
