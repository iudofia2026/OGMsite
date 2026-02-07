'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  name: string;
  imageFront: string;
  imageBack: string;
  titleColor: string;
  description: string;
}

export default function ProductCard({ name, imageFront, imageBack, titleColor, description }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[3/4] mb-6">
        {/* Back Label */}
        <Image
          src={imageBack}
          alt={`${name} Back`}
          fill
          className={`object-contain absolute inset-0 transition-all duration-500 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />

        {/* Front Label */}
        <Image
          src={imageFront}
          alt={name}
          fill
          className={`object-contain transition-all duration-500 ${
            isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />
      </div>

      <h3
        className="font-goldenbook font-bold text-xl"
        style={{ color: titleColor }}
      >
        {name}
      </h3>
      <p className="font-raleway text-gray-600 mt-2 text-center">
        {description}
      </p>
    </div>
  );
}
