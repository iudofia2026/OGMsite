'use client';

import { useEffect, useState } from 'react';

const AGE_VERIFICATION_KEY = 'ogm_age_verified';
const AGE_VERIFICATION_ANSWER_KEY = 'ogm_age_answer';

export default function AgeVerification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isUnderage, setIsUnderage] = useState(false);

  useEffect(() => {
    // Check if user has already verified
    try {
      const verified = localStorage.getItem(AGE_VERIFICATION_KEY);
      const answer = localStorage.getItem(AGE_VERIFICATION_ANSWER_KEY);

      if (verified === 'true' && answer === 'yes') {
        // User verified and of age - don't show modal
        setIsVisible(false);
        return;
      } else if (verified === 'true' && answer === 'no') {
        // User verified but underage - show underage message
        setIsUnderage(true);
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
      } else {
        // First visit - show modal
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
      }
    } catch (e) {
      // localStorage might be disabled - show modal anyway
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleYes = () => {
    try {
      localStorage.setItem(AGE_VERIFICATION_KEY, 'true');
      localStorage.setItem(AGE_VERIFICATION_ANSWER_KEY, 'yes');
    } catch (e) {}
    setIsVisible(false);
    document.body.style.overflow = '';
  };

  const handleNo = () => {
    try {
      localStorage.setItem(AGE_VERIFICATION_KEY, 'true');
      localStorage.setItem(AGE_VERIFICATION_ANSWER_KEY, 'no');
    } catch (e) {}
    setIsUnderage(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center z-[10000]">
      {/* Background with subtle logo */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'url(/images/ogm_full_square_logo.svg)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content */}
      <div className="relative z-[2] text-center p-12 max-w-[600px] w-[90%]">
        {!isUnderage ? (
          <>
            <h2 className="font-goldenbook text-[clamp(1.8rem,4.5vw,2.5rem)] font-normal text-ogm-gold mb-6 leading-tight tracking-[0.1em] uppercase whitespace-nowrap">
              Welcome to <span className="font-black text-black tracking-[0.15em]">OGM</span>
            </h2>
            <p className="font-raleway text-[clamp(1rem,2.5vw,1.25rem)] text-ogm-gray700 mb-10 tracking-[0.05em]">
              Are you 21 or older?
            </p>
            <div className="flex gap-6 justify-center flex-wrap mb-8">
              <button
                onClick={handleYes}
                className="age-btn px-10 py-3.5 font-raleway text-[clamp(0.875rem,2vw,1rem)] font-medium border border-ogm-gold text-ogm-gold uppercase tracking-[0.1em] min-w-[100px] bg-transparent transition-all duration-200 hover:bg-ogm-gold hover:text-white hover:-translate-y-0.5"
              >
                Yes
              </button>
              <button
                onClick={handleNo}
                className="age-btn px-10 py-3.5 font-raleway text-[clamp(0.875rem,2vw,1rem)] font-medium border border-ogm-gold text-ogm-gold uppercase tracking-[0.1em] min-w-[100px] bg-transparent transition-all duration-200 hover:bg-ogm-gray100 hover:text-ogm-gray700"
              >
                No
              </button>
            </div>
            <p className="font-raleway text-sm text-ogm-gray500">
              You must be of legal drinking age to enter this site.
            </p>
          </>
        ) : (
          <>
            <h2 className="font-goldenbook text-[clamp(1.8rem,4.5vw,2.5rem)] font-normal text-ogm-gold mb-6 leading-tight tracking-[0.1em] uppercase">
              Sorry
            </h2>
            <p className="font-raleway text-[clamp(1rem,2.5vw,1.25rem)] text-ogm-gray700 mt-8">
              You must be 21 or older to access this website.
            </p>
            <p className="font-raleway text-ogm-gray500 mt-4">
              Thank you for your honesty.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
