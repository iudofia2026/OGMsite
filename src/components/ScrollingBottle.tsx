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
  const bottleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const bottle = bottleRef.current;

    if (!wrapper || !bottle) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Initial load animation - fade in the bottle
    gsap.fromTo(
      wrapper,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
    );

    // Set up responsive scroll animations
    const mm = gsap.matchMedia();

    mm.add(
      '(min-width: 769px)',
      () => {
        // Desktop scroll animations

        // Phase 1: Hero to Products - bottle scales down and rotates
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            endTrigger: '#products',
            end: 'top center',
            scrub: 1,
          },
        });

        tl1.to(bottle, {
          scale: 0.85,
          y: 50,
          ease: 'none',
        });

        // Phase 2: Products section - bottle shifts left
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: '#products',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        });

        tl2.to(bottle, {
          scale: 0.75,
          x: -150,
          ease: 'none',
        });

        // Phase 3: About section - bottle shifts right
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: '#about',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        });

        tl3.to(bottle, {
          scale: 0.7,
          x: 150,
          ease: 'none',
        });

        // Phase 4: Contact section - bottle centers and fades
        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: '#contact',
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
        });

        tl4.to(bottle, {
          rotate: 0,
          scale: 0.6,
          x: 0,
          opacity: 0.5,
          ease: 'none',
        });
      },
      wrapper
    );

    // Mobile - simple fade in, no scroll animation
    mm.add('(max-width: 768px)', () => {
      gsap.to(wrapper, {
        opacity: 1,
        duration: 1,
        delay: 0.3,
      });
    });

    // Cleanup
    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="hero-bottle-wrapper fixed inset-0 pointer-events-none z-40 flex items-center justify-center"
      style={{ opacity: 0 }}
    >
      <div
        ref={bottleRef}
        className="hero-bottle relative"
        style={{
          width: '240px',
          height: 'auto',
          maxHeight: '70vh',
          filter: 'drop-shadow(8px 8px 20px rgba(0, 0, 0, 0.15))',
          transform: 'translateX(480px) translateY(-30px)',
        }}
      >
        <Image
          src={bottleSrc}
          alt={bottleAlt}
          width={280}
          height={700}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
