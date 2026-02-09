'use client';

import React, { useEffect, useState } from 'react';

export default function ComingThisSpring() {
  const [showText, setShowText] = useState(false);
  const text = "Coming This Spring";

  useEffect(() => {
    // Show text after logo fade-in completes
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1300); // Logo fades in for 1s, start text at 1.3s

    return () => clearTimeout(timer);
  }, []);

  return (
    <p
      className="font-ranade text-white text-subtitle tracking-[0.2em] uppercase relative inline-block transition-all duration-500 group breathing-shadow cursor-pointer"
      onClick={() => {
        const premiumSection = document.querySelector('#premium-section');
        if (premiumSection) {
          premiumSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }}
    >
      <span className="relative z-10">
        {showText ? (
          text.split('').map((char, index) => (
            <span
              key={index}
              className="letter-fade"
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))
        ) : (
          <span className="opacity-0">{text}</span>
        )}
      </span>
      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
    </p>
  );
}