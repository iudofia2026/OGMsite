'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Elegant transition out animation
const useExitAnimation = (isComplete: boolean, onComplete: () => void) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isComplete && !isExiting) {
      setIsExiting(true);
      // Start exit animation, then call onComplete
      setTimeout(onComplete, 800); // Animation duration
    }
  }, [isComplete, isExiting, onComplete]);

  return isExiting;
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [percentage, setPercentage] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing');

  useEffect(() => {
    let currentProgress = 0;
    const stages = [
      { name: 'Initializing', weight: 5 },
      { name: 'Loading fonts', weight: 10 },
      { name: 'Loading images', weight: 40 },
      { name: 'Loading styles', weight: 15 },
      { name: 'Loading components', weight: 20 },
      { name: 'Finalizing', weight: 10 }
    ];

    let stageIndex = 0;
    let stageProgress = 0;

    const updateProgress = (newProgress: number, stage?: string) => {
      currentProgress = Math.min(newProgress, 100);
      setPercentage(Math.floor(currentProgress));
      if (stage) setLoadingStage(stage);
    };

    // Track document ready state
    const checkDocumentReady = () => {
      if (document.readyState === 'loading') {
        updateProgress(5, 'Loading document');
      } else if (document.readyState === 'interactive') {
        updateProgress(25, 'Document interactive');
      } else if (document.readyState === 'complete') {
        updateProgress(60, 'Document complete');
      }
    };

    // Track font loading
    const trackFonts = async () => {
      try {
        updateProgress(15, 'Loading fonts');
        await document.fonts.ready;
        updateProgress(25, 'Fonts loaded');
      } catch (e) {
        updateProgress(25, 'Fonts loaded');
      }
    };

    // Track image loading including critical preloads
    const trackImages = () => {
      updateProgress(30, 'Loading images');

      // Critical images that need to be preloaded
      const criticalImages = [
        '/images/ogm background.png', // Hero background
        '/images/white_ogm_full_square_logo.svg', // Main logo
        '/images/OGM_signature-wht.svg' // Signature
      ];

      // Get existing images in DOM
      const domImages = document.querySelectorAll('img');

      // Preload critical images
      const preloadPromises = criticalImages.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Don't fail on errors
          img.src = src;
        });
      });

      // Track DOM images
      const domImagePromises = Array.from(domImages).map((img) => {
        return new Promise<void>((imgResolve) => {
          if (img.complete) {
            imgResolve();
          } else {
            const onLoad = () => imgResolve();
            img.addEventListener('load', onLoad, { once: true });
            img.addEventListener('error', onLoad, { once: true });
          }
        });
      });

      const allImagePromises = [...preloadPromises, ...domImagePromises];
      const totalImages = Math.max(allImagePromises.length, 1);
      let loadedImages = 0;

      return new Promise<void>((resolve) => {
        if (allImagePromises.length === 0) {
          updateProgress(70, 'Images loaded');
          resolve();
          return;
        }

        allImagePromises.forEach((promise) => {
          promise.then(() => {
            loadedImages++;
            const progress = 30 + (loadedImages / totalImages) * 40;
            updateProgress(progress, 'Loading images');

            if (loadedImages === totalImages) {
              updateProgress(70, 'Images loaded');
              resolve();
            }
          });
        });

        // Timeout fallback
        setTimeout(() => {
          updateProgress(70, 'Images loaded');
          resolve();
        }, 8000); // Increased timeout for large images
      });
    };

    // Track CSS loading
    const trackStyles = () => {
      updateProgress(75, 'Loading styles');
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      let loadedStylesheets = 0;
      const totalStylesheets = Math.max(stylesheets.length, 1);

      if (stylesheets.length === 0) {
        updateProgress(85, 'Styles loaded');
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const stylePromises = Array.from(stylesheets).map((stylesheet) => {
          return new Promise<void>((styleResolve) => {
            if ((stylesheet as HTMLLinkElement).sheet) {
              loadedStylesheets++;
              updateProgress(75 + (loadedStylesheets / totalStylesheets) * 10, 'Loading styles');
              styleResolve();
            } else {
              const onLoad = () => {
                loadedStylesheets++;
                updateProgress(75 + (loadedStylesheets / totalStylesheets) * 10, 'Loading styles');
                styleResolve();
              };
              stylesheet.addEventListener('load', onLoad, { once: true });
              stylesheet.addEventListener('error', onLoad, { once: true });
            }
          });
        });

        Promise.all(stylePromises).then(() => {
          updateProgress(85, 'Styles loaded');
          resolve();
        });

        // Timeout fallback
        setTimeout(() => {
          updateProgress(85, 'Styles loaded');
          resolve();
        }, 3000);
      });
    };

    // Main loading sequence
    const loadSequence = async () => {
      try {
        // Initial check
        checkDocumentReady();

        // Wait for document ready if not already
        if (document.readyState === 'loading') {
          await new Promise<void>((resolve) => {
            document.addEventListener('DOMContentLoaded', () => {
              updateProgress(20, 'DOM ready');
              resolve();
            }, { once: true });
          });
        } else {
          updateProgress(20, 'DOM ready');
        }

        // Track fonts
        await trackFonts();

        // Wait a bit for DOM to be more complete
        await new Promise(resolve => setTimeout(resolve, 100));

        // Track images
        await trackImages();

        // Track styles
        await trackStyles();

        // Final steps
        updateProgress(90, 'Finalizing');
        await new Promise(resolve => setTimeout(resolve, 200));

        updateProgress(95, 'Almost ready');
        await new Promise(resolve => setTimeout(resolve, 100));

        updateProgress(100, 'Complete');

        // Small delay at 100%
        setTimeout(() => {
          onComplete();
        }, 300);

      } catch (error) {
        console.warn('Loading tracking error:', error);
        // Fallback to completion
        updateProgress(100, 'Complete');
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    // Start the loading sequence
    loadSequence();

    // Listen for document state changes
    document.addEventListener('readystatechange', checkDocumentReady);

    // Cleanup
    return () => {
      document.removeEventListener('readystatechange', checkDocumentReady);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[10001]">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url(/images/ogm_full_square_logo.svg)',
          backgroundSize: '200px 200px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Percentage counter */}
        <div className="mb-8">
          <span
            className="font-mono text-[clamp(3rem,8vw,6rem)] font-light text-black tracking-wider"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {percentage.toString().padStart(3, '0')}
          </span>
          <span className="font-mono text-[clamp(2rem,5vw,4rem)] font-light text-gray-400 ml-1">
            %
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-[1px] bg-gray-200 mx-auto">
          <div
            className="h-full bg-black transition-all duration-150 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Loading stage text */}
        <p className="font-ranade text-sm text-gray-500 mt-6 tracking-[0.2em] uppercase">
          {loadingStage}
        </p>
      </div>
    </div>
  );
}