'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const topBottle = topBottleRef.current;
    const bottomBottle = bottomBottleRef.current;

    if (!wrapper || !topBottle || !bottomBottle) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Initial load animation
    gsap.fromTo(
      wrapper,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
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

      // Default to premium bottle if not in any colored section
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
  }, []);

  const bottleStyle = {
    width: '220px',
    height: '550px', // Fixed height instead of auto
    maxHeight: '70vh',
    filter: 'drop-shadow(8px 8px 20px rgba(0, 0, 0, 0.15))',
  };

  return (
    <div
      ref={wrapperRef}
      className="hero-bottle-wrapper fixed inset-0 pointer-events-none z-40 flex items-center justify-center"
      style={{ opacity: 0 }}
    >
      <div
        className="hero-bottle relative"
        style={{
          transform: 'translateX(380px) translateY(-30px)',
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
          <Image
            src={currentBottleSrcRef.current}
            alt={bottleAlt}
            width={280}
            height={700}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
