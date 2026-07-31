import React from 'react';
import { X } from 'lucide-react';

export default function LightboxModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative max-w-3xl w-full bg-white p-4 pb-12 shadow-2xl rounded-sm transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-[#b0004a] p-2 rounded-full hover:scale-110 active:scale-95 transition-all z-20 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-[4/3] md:aspect-video w-full bg-[#ffe9e7] overflow-hidden rounded-sm mb-4">
          <img
            src={item.image}
            alt={item.caption}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="font-handwritten text-3xl md:text-4xl text-center text-[#5a4044]">
          {item.caption}
        </h2>
        {item.prompt && (
          <p className="text-center font-sans text-xs text-[#8e6f74] mt-2 italic px-6">
            "{item.prompt}"
          </p>
        )}
      </div>
    </div>
  );
}
