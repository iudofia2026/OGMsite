'use client';

import { useState, useEffect } from 'react';
import AgeVerification from './AgeVerification';

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  // Development toggles - check environment variables
  const enableAgeVerification = process.env.NEXT_PUBLIC_ENABLE_AGE_VERIFICATION !== 'false';

  const [isAgeVerified, setIsAgeVerified] = useState(!enableAgeVerification);
  const [shouldShowContent, setShouldShowContent] = useState(!enableAgeVerification);

  // Aggressively preload critical images
  useEffect(() => {
    const preloadImages = [
      '/images/ogm background.png',
      '/images/white_ogm_full_square_logo.svg',
      '/images/OGM_signature-wht.svg'
    ];

    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      // Force browser to download by setting to body temporarily
      img.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
      document.body.appendChild(img);

      // Clean up after a delay
      setTimeout(() => {
        if (document.body.contains(img)) {
          document.body.removeChild(img);
        }
      }, 5000);
    });
  }, []);

  useEffect(() => {
    // Only show content after age verification is complete
    if (isAgeVerified) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setShouldShowContent(true);
        document.body.style.overflow = '';
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAgeVerified]);

  const handleAgeVerificationComplete = () => {
    setIsAgeVerified(true);
  };

  return (
    <>
      {/* Age Verification - conditionally rendered based on environment */}
      {enableAgeVerification && !isAgeVerified && (
        <AgeVerification onComplete={handleAgeVerificationComplete} />
      )}

      {/* Main content - ALWAYS rendered but hidden behind age verification */}
      <div
        className={`transition-opacity duration-500 ${
          shouldShowContent ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          position: 'relative',
          zIndex: shouldShowContent ? 1 : -1,
          pointerEvents: shouldShowContent ? 'auto' : 'none'
        }}
      >
        {children}
      </div>
    </>
  );
}