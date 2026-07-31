// Central In-Memory Data Store for Digital Love Anniversary Journal

const journalData = {
  info: {
    title: "Digital Love Girlfriend Day Journal",
    theme: "Ethereal Devotion",
    couple: {
      from: "Suraj",
      to: "Prerna"
    },
    // Set anniversary date to November 19, 2025
    anniversaryDate: "2025-11-19T00:00:00.000Z",
    subtitle: "A digital keepsake celebrating our love story, memories, and journey together."
  },
  timeline: [
    {
      id: 2,
      title: "The Math Assignment Excuse",
      subtitle: "The First Conversation",
      type: "text",
      description: "It started with a simple message: \"Hey, can you send me today's math assignment?\" What was supposed to be a quick favor somehow turned into hours of chatting. The assignment was finished in minutes, but the conversation never really ended. Looking back, asking for those notes might have been the best homework I ever had."
    },
    {
      id: 3,
      title: "Our First Date",
      subtitle: "Sea Breeze & City Lights",
      date: "October 14, 2025",
      type: "polaroid",
      image: "/photo2.jpg",
      caption: "Sea Breeze & City Lights",
      rotation: "-2deg",
      description: "Standing together watching the cool sea breeze and skyline lights."
    },
    {
      id: 35,
      title: "Promenade Night",
      subtitle: "Red Rose & Starry Skies",
      date: "December 20, 2025",
      type: "polaroid",
      image: "/photo11.jpg",
      caption: "Night by the Water",
      rotation: "1.5deg",
      description: "Wrapped in a tight hug under the starry night sky with a red rose in her hair."
    },
    {
      id: 4,
      title: "Little Moments",
      subtitle: "Special Memories",
      type: "collage",
      memories: [
        {
          id: "m1",
          caption: "Cozy Vintage Selfie",
          rotation: "3deg",
          image: "/photo7.jpg"
        },
        {
          id: "m2",
          caption: "Matching Navy Suits",
          rotation: "-4deg",
          image: "/photo9.jpg"
        },
        {
          id: "m3",
          caption: "Art Festival Hugs",
          rotation: "2deg",
          image: "/photo10.jpg"
        }
      ]
    }
  ],
  gallery: [
    {
      id: "g1",
      caption: "Sunny Smiles",
      rotation: "-2deg",
      prompt: "Suraj & Prerna smiling together in natural sunlight.",
      image: "/photo1.jpg"
    },
    {
      id: "g2",
      caption: "Traditional Festive Glow",
      rotation: "1.5deg",
      prompt: "Prerna in her beautiful floral pink ethnic outfit and silver jhumkas next to Suraj.",
      image: "/photo3.jpg"
    },
    {
      id: "g3",
      caption: "Sunny Park Days",
      rotation: "-1deg",
      prompt: "Suraj & Prerna sitting together under shady trees on a bright afternoon.",
      image: "/photo4.jpg"
    },
    {
      id: "g4",
      caption: "City Night Out",
      rotation: "2deg",
      prompt: "Suraj & Prerna dressed up together for a fun night out in the city.",
      image: "/photo6.jpg"
    },
    {
      id: "g5",
      caption: "Sky Blue & Silver Grace",
      rotation: "-1.5deg",
      prompt: "Prerna in a metallic blue saree and Suraj in sky blue kurta.",
      image: "/photo12.jpg"
    },
    {
      id: "g6",
      caption: "Park Fountain Moments",
      rotation: "1deg",
      prompt: "Selfie in front of the park fountain.",
      image: "/photo13.jpg"
    }
  ],
  reasons: [
    { id: 1, number: "01", type: "text", frontIcon: "mail", backText: "The way your eyes crinkle when you laugh.", bg: "bg-secondary-container", color: "text-on-secondary-container" },
    { id: 2, number: "02", type: "image", frontIcon: "favorite", backText: "Your radiant smile & vibrant spirit.", image: "/photo14.jpg", bg: "bg-primary-container", color: "text-on-primary-container", rotation: "rotate-2" },
    { id: 3, number: "03", type: "text", frontIcon: "auto_awesome", backText: "The sweet way you care for me every single day.", bg: "bg-tertiary-container", color: "text-on-tertiary-container", rotation: "-rotate-1" },
    { id: 4, number: "04", type: "text", frontIcon: "auto_stories", backText: "The way you always know when I need a hug.", bg: "bg-outline-variant", color: "text-on-surface-variant" },
    { id: 5, number: "05", type: "text", frontIcon: "stars", backText: "How you bring so much joy and sunshine into my life.", bg: "bg-secondary", color: "text-on-secondary", colSpan: "lg:col-span-1 md:col-span-2" },
    { id: 6, number: "06", type: "text", frontIcon: "spa", backText: "Your patience with my silliness.", bg: "bg-surface-container-highest", color: "text-primary" },
    { id: 7, number: "07", type: "image", frontIcon: "celebration", backText: "How stunning we look together.", image: "/photo15.jpg", bg: "bg-primary", color: "text-white", colSpan: "md:col-span-2" },
    { id: 8, number: "08", type: "text", frontIcon: "psychology", backText: "Your brilliant, beautiful mind.", bg: "bg-surface-container-high", color: "text-secondary" },
    { id: 9, number: "09", type: "text", frontIcon: "nightlight", backText: "How you look in your sleep.", bg: "bg-white border-2 border-primary-container", color: "text-primary-container", rotation: "rotate-1" },
    { id: 10, number: "10", type: "text", frontIcon: "music_note", backText: "Because being with you feels like home.", bg: "bg-secondary-container/30 border border-secondary-container", color: "text-secondary", rotation: "-rotate-2" }
  ],
  quiz: [
    {
      id: 1,
      q: "Where did we have our very first date?",
      options: ["The Tiny Coffee Shop", "The Red Bistro", "Marine Drive Day Out", "Midnight Cinema"],
      correct: 2,
      image: "/photo2.jpg"
    },
    {
      id: 2,
      q: "What is my favorite nickname for you?",
      options: ["Sunshine", "Lovebug", "Sweetheart", "bebudi"],
      correct: 3,
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      q: "Which outfit made our favorite photo unforgettable?",
      options: ["Sari & Kurta", "Casual wear", "Black outfits", "Matching T-shirts"],
      correct: 0,
      image: "/photo8.jpg"
    },
    {
      id: 4,
      q: "Who said 'I love you' first?",
      options: ["Me, obviously!", "You, in the garden", "We said it together", "The cat told us"],
      correct: 1,
      image: "/photo4.jpg"
    },
    {
      id: 5,
      q: "Where is our dream honeymoon destination?",
      options: ["🏔️ Manali, Himachal Pradesh", "🏞️ Kashmir (Srinagar & Gulmarg)", "🏖️ Goa", "🌊 Andaman & Nicobar Islands"],
      correct: -1,
      image: "/photo12.jpg"
    }
  ],
  surprise: {
    validKeys: ["2128", "love", "1012", "10-12", "prerna", "suraj"],
    letter: {
      date: "November 19th, 2025",
      greeting: "My Dearest Prerna,",
      paragraphs: [
        "I've been keeping this here for the moment you found it. Every day with you feels like a new chapter of a story I never want to end. From that first coffee we shared to the quiet moments we have now, my heart has never felt more at home.",
        "You are my greatest adventure, my softest place to land, and my most beautiful 'yes'."
      ],
      closing: "Forever yours,",
      signature: "— Suraj",
      polaroid: {
        caption: "Forever & Always ❤️",
        image: "/photo5.jpg"
      }
    }
  }
};

module.exports = journalData;
