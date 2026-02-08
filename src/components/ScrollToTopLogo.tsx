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
      className={`fixed top-6 left-8 z-50 cursor-pointer transition-all duration-500 ease-out ${
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
        {/* Logo without background circle */}
        <Image
          src="/images/original_ogm_full_square_logo.svg"
          alt="Scroll to top - OGM Logo"
          width={60}
          height={60}
          className="w-15 h-15 transition-all duration-300 group-hover:scale-110 drop-shadow-lg group-hover:drop-shadow-xl"
          priority={false}
          style={{
            filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))'
          }}
        />

        {/* Subtle golden glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm scale-150 -z-10"></div>
      </div>
    </div>
  );
}