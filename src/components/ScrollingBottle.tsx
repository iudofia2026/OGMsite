'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Bottle reflection animation styles
const bottleStyles = `
  .bottle-reflection::before {
    content: '';
    position: absolute;
    inset: -10%;
    background: radial-gradient(
      ellipse at 30% 20%,
      rgba(255, 215, 0, 0.08) 0%,
      transparent 50%
    );
    animation: studio-lighting 12s ease-in-out infinite;
    pointer-events: none;
    filter: blur(20px);
    z-index: -1;
  }

  .bottle-reflection::after {
    content: '';
    position: absolute;
    inset: -5%;
    background: radial-gradient(
      ellipse at 70% 80%,
      rgba(255, 200, 100, 0.05) 0%,
      transparent 40%
    );
    animation: fill-light 15s ease-in-out infinite;
    animation-delay: -6s;
    pointer-events: none;
    filter: blur(15px);
    z-index: -1;
  }

  @keyframes studio-lighting {
    0%, 100% {
      opacity: 0.3;
      transform: translateX(0) translateY(0) scale(1);
    }
    50% {
      opacity: 0.6;
      transform: translateX(10px) translateY(-5px) scale(1.1);
    }
  }

  @keyframes fill-light {
    0%, 100% {
      opacity: 0.2;
      transform: translateX(0) translateY(0);
    }
    50% {
      opacity: 0.5;
      transform: translateX(-8px) translateY(5px);
    }
  }
`;

interface ScrollingBottleProps {
  bottleSrc?: string;
  bottleAlt?: string;
}

export default function ScrollingBottle({
  bottleSrc = '/images/OGM_Labels_Premium_Full Front.png',
  bottleAlt = 'OGM Premium Tequila Bottle',
}: ScrollingBottleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const topBottleRef = useRef<HTMLDivElement>(null);
  const bottomBottleRef = useRef<HTMLDivElement>(null);
  const currentBottleSrcRef = useRef(bottleSrc);
  const isAnimatingRef = useRef(false);

  // State for bottle positioning
  const [isClient, setIsClient] = useState(false);
  const [bottlePosition, setBottlePosition] = useState<'fixed' | 'absolute'>('fixed');
  const [bottleTop, setBottleTop] = useState(0);

  // Client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle scroll-based positioning and centering animation
  useEffect(() => {
    if (!isClient) return;

    let animationId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth <= 768;
      const stickPoint = isMobile ? 1700 : 2225;
      // Desktop animation points
      const centerStart = 402;
      const centerEnd = 700;
      // Mobile animation points
      const mobileStart = 236;
      const mobileEnd = 636;
      // Second mobile animation phase
      const mobilePhase2Start = 838;
      const mobilePhase2End = 1100;
      // Third mobile animation phase
      const mobilePhase3Start = 1320;
      const mobilePhase3End = 1500;

      const bottleStartPoint = isMobile ? 0 : 805; // Desktop: bottle starts at scrollY 805

      if (scrollY >= stickPoint) {
        // Switch to absolute positioning and stick to the scroll position
        setBottlePosition('absolute');
        setBottleTop(stickPoint + (window.innerHeight / 2) - 275);
      } else if (scrollY >= bottleStartPoint) {
        // Desktop: from scrollY 805-2224, bottle is fixed and travels with you
        setBottlePosition('fixed');
        setBottleTop(0);
      } else {
        // Desktop: before scrollY 805, bottle is positioned on page at 805px
        setBottlePosition('absolute');
        setBottleTop(805 + (window.innerHeight / 2) - 275);
      }

      // Handle centering animation between scrollY 402-700
      const wrapper = wrapperRef.current;
      if (wrapper) {
        const bottle = wrapper.querySelector('.hero-bottle') as HTMLElement;
        if (bottle) {
          const isMobile = window.innerWidth <= 768;

          if (isMobile) {
            // Mobile Phase 1: scrollY 236-636
            if (scrollY >= mobileStart && scrollY <= mobileEnd) {
              const progress = (scrollY - mobileStart) / (mobileEnd - mobileStart);

              // Start: center (0px), End: center of right half (25% from center = ~100px right)
              const startX = 0;
              const endX = 100; // Center of right half of screen
              const translateX = startX + (endX - startX) * progress;

              // Vertical: start at 120px, end at -30px
              const startY = 120;
              const endY = -30;
              const translateY = startY + (endY - startY) * progress;

              // Scale: 1.0 to 1.35 (35% bigger)
              const scale = 1 + (0.35 * progress);

              bottle.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;

            } else if (scrollY >= mobilePhase2Start && scrollY <= mobilePhase2End) {
              // Mobile Phase 2: scrollY 1023-1371 - move to center of left half
              const progress = (scrollY - mobilePhase2Start) / (mobilePhase2End - mobilePhase2Start);

              // Start: center of right half (100px), End: center of left half (-100px)
              const startX = 100;
              const endX = -100; // Center of left half of screen
              const translateX = startX + (endX - startX) * progress;

              // Vertical: stay at -30px
              const translateY = -30;

              // Scale: stay at 1.35
              const scale = 1.35;

              bottle.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;

            } else if (scrollY >= mobilePhase3Start && scrollY <= mobilePhase3End) {
              // Mobile Phase 3: scrollY 1900-2150 - move back to center of right half
              const progress = (scrollY - mobilePhase3Start) / (mobilePhase3End - mobilePhase3Start);

              // Start: center of left half (-100px), End: center of right half (100px)
              const startX = -100;
              const endX = 100; // Center of right half of screen
              const translateX = startX + (endX - startX) * progress;

              // Vertical: stay at -30px
              const translateY = -30;

              // Scale: stay at 1.35
              const scale = 1.35;

              bottle.style.transform = `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`;

            } else if (scrollY < mobileStart) {
              // Before first mobile animation
              bottle.style.transform = 'translateX(0px) translateY(120px) scale(1)';
            } else if (scrollY > mobileEnd && scrollY < mobilePhase2Start) {
              // Between Phase 1 and 2 - stay at center-right
              bottle.style.transform = 'translateX(100px) translateY(-30px) scale(1.35)';
            } else if (scrollY > mobilePhase2End && scrollY < mobilePhase3Start) {
              // Between Phase 2 and 3 - stay at center-left
              bottle.style.transform = 'translateX(-100px) translateY(-30px) scale(1.35)';
            } else if (scrollY > mobilePhase3End) {
              // After third animation - stay at center-right
              bottle.style.transform = 'translateX(100px) translateY(-30px) scale(1.35)';
            }
          } else {
            // Desktop animation: keep bottle centered and scaled always
            bottle.style.transform = 'translateX(0px) translateY(-30px) scale(1.15)';
          }
        }
      }
    };

    const smoothScroll = () => {
      handleScroll();
      animationId = requestAnimationFrame(smoothScroll);
    };

    smoothScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    const wrapper = wrapperRef.current;
    const topBottle = topBottleRef.current;
    const bottomBottle = bottomBottleRef.current;

    if (!wrapper || !topBottle || !bottomBottle) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Initial load animation - slide in from right with delay
    gsap.fromTo(
      wrapper,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out', delay: 0.8 }
    );

    // Wipe transition function
    const transitionBottle = (newSrc: string) => {
      if (newSrc === currentBottleSrcRef.current || isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      const oldSrc = currentBottleSrcRef.current;

      // Get img elements
      const topImg = topBottle.querySelector('img') as HTMLImageElement;
      const bottomImg = bottomBottle.querySelector('img') as HTMLImageElement;

      if (!topImg || !bottomImg) {
        isAnimatingRef.current = false;
        return;
      }

      // Set up the layers for wipe - OLD on top (wipes away), NEW on bottom (revealed)
      topImg.src = oldSrc;  // Old bottle on top
      bottomImg.src = newSrc; // New bottle on bottom (destination)

      // Ensure both are fully visible
      gsap.set([topBottle, bottomBottle], { clearProps: 'clipPath' });

      // Animate the wipe - old bottle wipes away revealing new bottle
      gsap.to(topBottle, {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          currentBottleSrcRef.current = newSrc;
          // Reset top layer to show new bottle for next transition
          topImg.src = newSrc;
          gsap.set(topBottle, { clearProps: 'clipPath' });
          isAnimatingRef.current = false;
        },
      });
    };

    // Create scroll triggers with minimal debouncing for fast scrolling
    let triggerTimeout: NodeJS.Timeout;
    const debouncedTransition = (newSrc: string) => {
      clearTimeout(triggerTimeout);
      triggerTimeout = setTimeout(() => transitionBottle(newSrc), 5); // Very minimal delay
    };

    // Immediate transition for critical updates
    const immediateTransition = (newSrc: string) => {
      clearTimeout(triggerTimeout);
      transitionBottle(newSrc);
    };

    // Get sections once
    const premiumSection = document.querySelector('#premium-section');
    const gingerLimeSection = document.querySelector('#ginger-lime-section');
    const jalapenoSection = document.querySelector('#jalapeno-section');

    // Function to determine which bottle should be shown based on current scroll position
    const getCurrentBottle = () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth <= 768;
      const stickPoint = isMobile ? 1700 : 2225;

      // If we're at or past the stick point, always show jalapeño
      if (scrollY >= stickPoint) {
        return '/images/OGM_Labels_Jalapeno_Full Front.png';
      }

      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight * 0.5;

      // Check each section from top to bottom
      const premiumRect = premiumSection?.getBoundingClientRect();
      const gingerLimeRect = gingerLimeSection?.getBoundingClientRect();
      const jalapenoRect = jalapenoSection?.getBoundingClientRect();

      // Check if center of viewport is within each section
      if (premiumRect && premiumRect.top <= centerY && premiumRect.bottom >= centerY) {
        return '/images/OGM_Labels_Premium_Full Front.png';
      }
      if (gingerLimeRect && gingerLimeRect.top <= centerY && gingerLimeRect.bottom >= centerY) {
        return '/images/OGM_Labels_Ginger Lime_Full Front.png';
      }
      if (jalapenoRect && jalapenoRect.top <= centerY && jalapenoRect.bottom >= centerY) {
        return '/images/OGM_Labels_Jalapeno_Full Front.png';
      }

      // Always default to premium bottle if not in any colored section (including top of page)
      return '/images/OGM_Labels_Premium_Full Front.png';
    };

    // Single scroll trigger that handles everything
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      refreshPriority: 10,
      fastScrollEnd: 5,
      anticipatePin: 1,
      scrub: false,
      onUpdate: () => {
        const correctBottle = getCurrentBottle();
        immediateTransition(correctBottle);
      },
      onRefresh: () => {
        const correctBottle = getCurrentBottle();
        immediateTransition(correctBottle);
      }
    });

    // Specific trigger for top of page to ensure premium bottle
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'top+=100',
      refreshPriority: 11,
      onEnter: () => immediateTransition('/images/OGM_Labels_Premium_Full Front.png'),
      onEnterBack: () => immediateTransition('/images/OGM_Labels_Premium_Full Front.png'),
    });

    // Also add specific triggers for each section for redundancy
    if (premiumSection) {
      ScrollTrigger.create({
        trigger: premiumSection,
        start: 'top center',
        end: 'bottom center',
        refreshPriority: 9,
        fastScrollEnd: true,
        onEnter: () => immediateTransition('/images/OGM_Labels_Premium_Full Front.png'),
        onEnterBack: () => immediateTransition('/images/OGM_Labels_Premium_Full Front.png'),
      });
    }

    if (gingerLimeSection) {
      ScrollTrigger.create({
        trigger: gingerLimeSection,
        start: 'top center',
        end: 'bottom center',
        refreshPriority: 8,
        fastScrollEnd: true,
        onEnter: () => immediateTransition('/images/OGM_Labels_Ginger Lime_Full Front.png'),
        onEnterBack: () => immediateTransition('/images/OGM_Labels_Ginger Lime_Full Front.png'),
      });
    }

    if (jalapenoSection) {
      ScrollTrigger.create({
        trigger: jalapenoSection,
        start: 'top center',
        end: 'bottom center',
        refreshPriority: 7,
        fastScrollEnd: true,
        onEnter: () => immediateTransition('/images/OGM_Labels_Jalapeno_Full Front.png'),
        onEnterBack: () => immediateTransition('/images/OGM_Labels_Jalapeno_Full Front.png'),
      });
    }

    // Cleanup
    return () => {
      clearTimeout(triggerTimeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isClient]);

  // Removed bottleStyle object - now using Tailwind classes for responsive design

  // Don't render during SSR
  if (!isClient) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: bottleStyles }} />
      <div
      ref={wrapperRef}
      className={`hero-bottle-wrapper pointer-events-none z-40 flex items-center justify-center ${
        bottlePosition === 'fixed' ? 'fixed inset-0' : 'absolute left-0 right-0'
      }`}
      style={{
        opacity: 0,
        top: bottlePosition === 'absolute' ? `${bottleTop}px` : undefined
      }}
    >
      <div
        className="hero-bottle relative group cursor-pointer pointer-events-auto bottle-reflection"
        style={{
          transform: typeof window !== 'undefined' && window.innerWidth <= 768
            ? 'translateX(0px) translateY(120px)'  // Mobile: centered horizontally, bit higher
            : 'translateX(0px) translateY(-30px) scale(1.15)', // Desktop: start centered and scaled (scrollY 805 position)
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Bottom layer - revealed during wipe */}
        <div
          ref={bottomBottleRef}
          className="absolute top-0 left-0 w-[120px] h-[300px] md:w-[220px] md:h-[550px]"
          style={{ filter: 'drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.15))' }}
        >
          <Image
            src={bottleSrc}
            alt={bottleAlt}
            width={280}
            height={700}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Top layer - wipes away to reveal bottom */}
        <div
          ref={topBottleRef}
          className="relative w-[120px] h-[300px] md:w-[220px] md:h-[550px]"
          style={{ filter: 'drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.15))' }}
        >
          {/* Front bottle image */}
          <Image
            src={currentBottleSrcRef.current}
            alt={bottleAlt}
            width={280}
            height={700}
            className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
            priority
          />
          {/* Back bottle image - shown on hover */}
          <Image
            src="/images/OGM_Labels_Full Back.png"
            alt={bottleAlt + " - Back"}
            width={280}
            height={700}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          />
        </div>
      </div>
    </div>
    </>
  );
}
