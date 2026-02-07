'use client';

import { useEffect, useRef, useState } from 'react';

interface NavigationProps {
  items: Array<{ label: string; href: string }>;
}

export default function Navigation({ items }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const openNav = () => {
    setIsOpen(true);
    setIsAnimating(true);
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    setIsOpen(false);
    setTimeout(() => setIsAnimating(false), 500);
    document.body.style.overflow = '';
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeNav();

    setTimeout(() => {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  };

  // Handle click outside overlay to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        closeNav();
      }
    };

    // Handle ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeNav();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Menu */}
      <button
        onClick={isOpen ? closeNav : openNav}
        className="hamburger fixed top-8 right-8 z-[1000] cursor-pointer bg-transparent border-none p-0"
        aria-label="Toggle navigation"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-12 transition-transform duration-600 ease-out"
          style={{
            transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
          }}
        >
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            style={{
              fill: 'none',
              stroke: '#D4AF37',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeDasharray: isOpen ? '20 300' : '12 63',
              strokeDashoffset: isOpen ? '-32.42' : '0',
              transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          <path
            className="line"
            d="M7 16 27 16"
            style={{
              fill: 'none',
              stroke: '#D4AF37',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          />
        </svg>
      </button>

      {/* Navigation Overlay */}
      <div
        ref={overlayRef}
        className={`nav-overlay fixed inset-0 z-[9999] ${
          isAnimating ? 'transition-opacity duration-500 ease-out' : ''
        } ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 246, 242, 0.98) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center p-8">
          {/* Close Button */}
          <button
            onClick={closeNav}
            className="absolute top-8 right-8 w-10 h-10 bg-transparent border-none cursor-pointer z-[10000] transition-all duration-300 hover:scale-110 hover:rotate-90 active:scale-95"
            aria-label="Close navigation"
          >
            <span
              className="absolute top-1/2 left-1/2 w-[30px] h-[2px] bg-[#D4AF37] transition-transform duration-300"
              style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}
            />
            <span
              className="absolute top-1/2 left-1/2 w-[30px] h-[2px] bg-[#D4AF37] transition-transform duration-300"
              style={{ transform: 'translate(-50%, -50%) rotate(-45deg)' }}
            />
          </button>

          {/* Nav Content */}
          <div className="text-center max-w-[600px] w-full">
            {/* Logo */}
            <div
              className="mb-12 transition-all duration-500 ease-out"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
                transitionDelay: isOpen ? '0.1s' : '0s',
              }}
            >
              <img
                src="/images/ogm_full_square_logo.svg"
                alt="OGM"
                className="w-32 h-auto mx-auto block"
              />
            </div>

            {/* Nav Links */}
            <ul className="list-none p-0 m-0 mb-12">
              {items.map((item, index) => (
                <li
                  key={item.label}
                  className="mb-6 transition-all duration-500 ease-out"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-30px)',
                    transitionDelay: isOpen ? `${0.2 + index * 0.08}s` : '0s',
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative inline-block no-underline font-goldenbook text-[clamp(2rem,5vw,3rem)] font-normal text-gray-700 tracking-[0.15em] uppercase transition-all duration-300 hover:text-[#D4AF37] hover:translate-x-2"
                  >
                    {item.label}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#D4AF37] transition-all duration-400 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div
              className="transition-all duration-500 ease-out"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: isOpen ? '0.6s' : '0s',
              }}
            >
              <p className="font-raleway text-[clamp(0.875rem,2vw,1rem)] text-gray-500 tracking-[0.2em] uppercase mb-6">
                Premium Craft Beverages
              </p>
              <div className="flex gap-8 justify-center items-center">
                <a
                  href="https://www.instagram.com/theogmlife/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-raleway text-[clamp(0.875rem,2vw,1rem)] text-gray-500 no-underline tracking-[0.1em] uppercase transition-all duration-300 hover:text-[#D4AF37] hover:-translate-y-0.5"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
