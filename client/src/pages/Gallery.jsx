import React, { useState, useEffect } from 'react';
import { fetchGallery } from '../services/api';
import LightboxModal from '../components/LightboxModal';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchGallery().then(data => setItems(data));
  }, []);

  return (
    <main className="relative z-10 pt-28 pb-36 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-5xl text-[#b0004a] font-bold mb-2">Our Gallery</h2>
        <p className="font-sans text-sm text-[#5a4044]">
          Polaroid snapshots of our most cherished milestones. Tap any photo to enlarge.
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="polaroid-frame bg-white cursor-pointer group"
            style={{ transform: `rotate(${item.rotation || '0deg'})` }}
          >
            <div className="aspect-square w-full overflow-hidden bg-[#ffe9e7] mb-4 rounded-sm">
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="font-handwritten text-2xl text-center text-[#5a4044]">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </main>
  );
}
