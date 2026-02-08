'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ScrollToTopLogo() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showThreshold = 700;

      setIsVisible(scrollY >= showThreshold);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Don't render during SSR
  if (!isClient) return null;

  return (
    <div
      className={`fixed top-6 left-6 z-50 cursor-pointer transition-all duration-500 ease-out ${
        isVisible
          ? 'translate-x-0 opacity-100 scale-100'
          : '-translate-x-20 opacity-0 scale-90'
      }`}
      onClick={scrollToTop}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <div className="group relative">
        {/* Logo container with hover effects */}
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:bg-white group-hover:scale-105">
          <Image
            src="/images/ogm_full_square_logo.svg"
            alt="Scroll to top - OGM Logo"
            width={40}
            height={40}
            className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
            priority={false}
          />
        </div>

        {/* Subtle golden glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm scale-150 -z-10"></div>
      </div>
    </div>
  );
}