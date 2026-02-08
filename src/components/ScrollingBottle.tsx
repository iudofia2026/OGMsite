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
      const stickPoint = 2225;
      const centerStart = 402;
      const centerEnd = 700;

      if (scrollY >= stickPoint) {
        // Switch to absolute positioning and stick to the scroll position
        setBottlePosition('absolute');
        setBottleTop(stickPoint + (window.innerHeight / 2) - 275);
      } else {
        // Keep fixed positioning
        setBottlePosition('fixed');
        setBottleTop(0);
      }

      // Handle centering animation between scrollY 402-700
      const wrapper = wrapperRef.current;
      if (wrapper) {
        const bottle = wrapper.querySelector('.hero-bottle') as HTMLElement;
        if (bottle) {
          if (scrollY >= centerStart && scrollY <= centerEnd) {
            // Calculate progress from 0 to 1
            const progress = (scrollY - centerStart) / (centerEnd - centerStart);

            // Animate from right (420px) to center (0px)
            const translateX = 420 - (420 * progress);

            // Scale from 1 to 1.15
            const scale = 1 + (0.15 * progress);

            bottle.style.transform = `translateX(${translateX}px) translateY(-30px) scale(${scale})`;
          } else if (scrollY < centerStart) {
            // Before animation - at original position
            bottle.style.transform = 'translateX(420px) translateY(-30px) scale(1)';
          } else if (scrollY > centerEnd) {
            // After animation - stay centered and enlarged
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

    // Initial load animation
    gsap.fromTo(
      wrapper,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
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
      const stickPoint = 2225;

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

  const bottleStyle = {
    width: '220px',
    height: '550px', // Fixed height instead of auto
    maxHeight: '70vh',
    filter: 'drop-shadow(8px 8px 20px rgba(0, 0, 0, 0.15))',
  };

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
          transform: 'translateX(420px) translateY(-30px)',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Bottom layer - revealed during wipe */}
        <div
          ref={bottomBottleRef}
          className="absolute top-0 left-0"
          style={bottleStyle}
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
          className="relative"
          style={bottleStyle}
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
