import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Image, Heart, Sparkles } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/gallery', label: 'Gallery', icon: Image },
    { to: '/timeline', label: 'Timeline', icon: BookOpen },
    { to: '/reasons', label: 'Reasons', icon: Heart },
    { to: '/quiz', label: 'Quiz', icon: Heart },
    { to: '/surprise', label: 'Surprise', icon: Sparkles },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#fd6c9c]/80 backdrop-blur-xl rounded-full px-4 py-2.5 z-50 border border-white/40 shadow-[0_15px_35px_rgba(176,0,74,0.2)] flex justify-around items-center transition-all">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'text-[#b0004a] font-bold scale-110 drop-shadow'
                  : 'text-[#6e0034]/70 hover:text-[#b0004a]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-[#cca730] rounded-full mb-0.5 animate-pulse" />
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
                <span className="text-[10px] font-sans font-medium mt-0.5">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
