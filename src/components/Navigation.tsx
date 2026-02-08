'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

interface NavigationProps {
  items: Array<{ label: string; href: string }>;
}

export default function Navigation({ items }: NavigationProps) {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [menuColor, setMenuColor] = useState('#D4AF37');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Change hamburger color based on scroll position
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const premiumSection = document.getElementById('premium-section');
      const gingerLimeSection = document.getElementById('ginger-lime-section');
      const jalapenoSection = document.getElementById('jalapeno-section');
      const scrollY = window.scrollY;

      let color = '#D4AF37'; // default gold

      const checkSection = (sectionId: string, sectionColor: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const sectionBottom = rect.bottom + scrollY;
          // Use hamburger button position (top-8 = 32px) as reference
          const hamburgerY = scrollY + 32;
          return hamburgerY >= sectionTop && hamburgerY <= sectionBottom;
        }
        return false;
      };

      if (checkSection('premium-section', '#FFFFFF')) {
        color = '#FFFFFF';
      } else if (checkSection('ginger-lime-section', '#FFFFFF')) {
        color = '#FFFFFF';
      } else if (checkSection('jalapeno-section', '#FFFFFF')) {
        color = '#FFFFFF';
      }

      setMenuColor(color);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient]);

  const openNav = () => {
    setIsOpen(true);
    setIsAnimating(true);
    if (isClient) {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeNav = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setIsAnimating(false), 500);
    if (isClient) {
      document.body.style.overflow = '';
    }
  }, [isClient]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeNav();

    if (isClient) {
      setTimeout(() => {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  };

  // Handle click outside overlay to close
  useEffect(() => {
    if (!isClient) return;
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
  }, [isOpen, isClient, closeNav]);

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
              stroke: menuColor,
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeDasharray: isOpen ? '20 300' : '12 63',
              strokeDashoffset: isOpen ? '-32.42' : '0',
              transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke 300ms ease-out',
            }}
          />
          <path
            className="line"
            d="M7 16 27 16"
            style={{
              fill: 'none',
              stroke: menuColor,
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              transition: 'stroke 300ms ease-out',
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
            className="absolute top-8 right-8 w-10 h-10 bg-transparent border-none cursor-pointer z-[10000] active:scale-95"
            style={{ transition: 'transform 300ms ease-out' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
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
              <Image
                src="/images/original_ogm_full_square_logo.svg"
                alt="OGM"
                width={128}
                height={128}
                className="w-32 h-auto mx-auto"
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
                <button
                  className="instagram-button"
                  style={{ width: '80px', height: '80px' }}
                  onClick={() => window.open('https://www.instagram.com/theogmlife/', '_blank')}
                  aria-label="Instagram"
                >
                  <div className="button__circle">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="button__icon"
                      width="25"
                    >
                      <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                        fill="currentColor"
                      />
                    </svg>

                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      width="25"
                      xmlns="http://www.w3.org/2000/svg"
                      className="button__icon button__icon--copy"
                    >
                      <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
