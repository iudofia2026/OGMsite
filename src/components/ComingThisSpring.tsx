'use client';

import React from 'react';

export default function ComingThisSpring() {
  return (
    <p
      className="font-ranade text-white text-subtitle tracking-[0.2em] uppercase relative inline-block transition-all duration-500 group breathing-shadow cursor-pointer"
      onClick={() => window.open('https://www.instagram.com/theogmlife/', '_blank')}
    >
      <span className="relative z-10">Coming This Spring</span>
      <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
    </p>
  );
}