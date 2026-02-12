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
    let targetProgress = 0;
    let currentDisplayProgress = 0;
    let animationFrameId: number | null = null;

    // Smooth increment animation - gradually moves display progress toward target
    const animateProgress = () => {
      if (currentDisplayProgress < targetProgress) {
        // Increment by 1 each frame for smooth counting
        currentDisplayProgress += 1;
        setPercentage(currentDisplayProgress);
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Animation complete, clear the ref
        animationFrameId = null;
      }
    };

    // Start animating toward target
    const updateProgress = (newTarget: number, stage?: string) => {
      const oldTarget = targetProgress;
      targetProgress = Math.min(newTarget, 100);
      if (stage) setLoadingStage(stage);

      // Start animation if not already running and we haven't reached target
      if (animationFrameId === null && currentDisplayProgress < targetProgress) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
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
        updateProgress(30, 'Fonts loaded');
      } catch (e) {
        updateProgress(30, 'Fonts loaded');
      }
    };

    // Track image loading including critical preloads
    const trackImages = () => {
      updateProgress(40, 'Loading images');

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
          updateProgress(75, 'Images loaded');
          resolve();
          return;
        }

        allImagePromises.forEach((promise) => {
          promise.then(() => {
            loadedImages++;
            const progress = 40 + (loadedImages / totalImages) * 35;
            updateProgress(progress, 'Loading images');

            if (loadedImages === totalImages) {
              updateProgress(75, 'Images loaded');
              resolve();
            }
          });
        });

        // Timeout fallback
        setTimeout(() => {
          updateProgress(75, 'Images loaded');
          resolve();
        }, 8000);
      });
    };

    // Track CSS loading
    const trackStyles = () => {
      updateProgress(80, 'Loading styles');
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      let loadedStylesheets = 0;
      const totalStylesheets = Math.max(stylesheets.length, 1);

      if (stylesheets.length === 0) {
        updateProgress(92, 'Styles loaded');
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const stylePromises = Array.from(stylesheets).map((stylesheet) => {
          return new Promise<void>((styleResolve) => {
            if ((stylesheet as HTMLLinkElement).sheet) {
              loadedStylesheets++;
              updateProgress(80 + (loadedStylesheets / totalStylesheets) * 12, 'Loading styles');
              styleResolve();
            } else {
              const onLoad = () => {
                loadedStylesheets++;
                updateProgress(80 + (loadedStylesheets / totalStylesheets) * 12, 'Loading styles');
                styleResolve();
              };
              stylesheet.addEventListener('load', onLoad, { once: true });
              stylesheet.addEventListener('error', onLoad, { once: true });
            }
          });
        });

        Promise.all(stylePromises).then(() => {
          updateProgress(92, 'Styles loaded');
          resolve();
        });

        // Timeout fallback
        setTimeout(() => {
          updateProgress(92, 'Styles loaded');
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
              updateProgress(10, 'DOM ready');
              resolve();
            }, { once: true });
          });
        } else {
          updateProgress(10, 'DOM ready');
        }

        // Track fonts
        await trackFonts();

        // Wait a bit for DOM to be more complete
        await new Promise(resolve => setTimeout(resolve, 100));

        // Track images
        await trackImages();

        // Track styles
        await trackStyles();

        // Final steps with visible increments
        updateProgress(95, 'Finalizing');
        await new Promise(resolve => setTimeout(resolve, 150));

        updateProgress(98, 'Almost ready');
        await new Promise(resolve => setTimeout(resolve, 150));

        updateProgress(100, 'Complete');

        // Small delay at 100%
        setTimeout(() => {
          onComplete();
        }, 400);

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
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[10001]">
      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Percentage counter */}
        <div className="mb-8">
          <span
            className="font-cormorant text-[clamp(3rem,8vw,6rem)] font-light text-black tracking-wider"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {percentage.toString().padStart(3, '0')}
          </span>
          <span className="font-cormorant text-[clamp(2rem,5vw,4rem)] font-light text-gold ml-1">
            %
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-[1px] bg-black/10 mx-auto">
          <div
            className="h-full bg-gold transition-all duration-150 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Loading stage text */}
        <p className="font-cormorant text-sm text-gold mt-6 tracking-[0.3em] uppercase">
          {loadingStage}
        </p>
      </div>
    </div>
  );
}