'use client';

import { useState } from 'react';

export default function EmailButton() {
  const [copied, setCopied] = useState(false);
  const email = 'Drinks@theogmlife.com';

  const handleCopy = async () => {
    // Try modern clipboard API first
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback to older method
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        console.error('Failed to copy email');
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <button
        className="instagram-button"
        onClick={handleCopy}
      >
        <p className="button__text">
          {copied ? (
            <>
              <span style={{ '--index': '0' } as React.CSSProperties}>E</span>
              <span style={{ '--index': '1' } as React.CSSProperties}>M</span>
              <span style={{ '--index': '2' } as React.CSSProperties}>A</span>
              <span style={{ '--index': '3' } as React.CSSProperties}>I</span>
              <span style={{ '--index': '4' } as React.CSSProperties}>L</span>
              <span style={{ '--index': '5' } as React.CSSProperties}> </span>
              <span style={{ '--index': '6' } as React.CSSProperties}>C</span>
              <span style={{ '--index': '7' } as React.CSSProperties}>O</span>
              <span style={{ '--index': '8' } as React.CSSProperties}>P</span>
              <span style={{ '--index': '9' } as React.CSSProperties}>I</span>
              <span style={{ '--index': '10' } as React.CSSProperties}>E</span>
              <span style={{ '--index': '11' } as React.CSSProperties}>D</span>
              <span style={{ '--index': '12' } as React.CSSProperties}>!</span>
            </>
          ) : (
            <>
              <span style={{ '--index': '0' } as React.CSSProperties}>S</span>
              <span style={{ '--index': '1' } as React.CSSProperties}>E</span>
              <span style={{ '--index': '2' } as React.CSSProperties}>N</span>
              <span style={{ '--index': '3' } as React.CSSProperties}>D</span>
              <span style={{ '--index': '4' } as React.CSSProperties}> </span>
              <span style={{ '--index': '5' } as React.CSSProperties}>M</span>
              <span style={{ '--index': '6' } as React.CSSProperties}>E</span>
              <span style={{ '--index': '7' } as React.CSSProperties}> </span>
              <span style={{ '--index': '8' } as React.CSSProperties}>A</span>
              <span style={{ '--index': '9' } as React.CSSProperties}>N</span>
              <span style={{ '--index': '10' } as React.CSSProperties}> </span>
              <span style={{ '--index': '11' } as React.CSSProperties}>E</span>
              <span style={{ '--index': '12' } as React.CSSProperties}>M</span>
              <span style={{ '--index': '13' } as React.CSSProperties}>A</span>
              <span style={{ '--index': '14' } as React.CSSProperties}>I</span>
              <span style={{ '--index': '15' } as React.CSSProperties}>L</span>
            </>
          )}
        </p>

        <div className="button__circle">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="button__icon"
            width="25"
          >
            <path
              d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
              fill="currentColor"
            />
          </svg>

          <svg
            viewBox="0 0 24 24"
            fill="none"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
            className="button__icon button__icon--copy"
          >
            <path
              d="M16 1H4C2.9 1 2.01 1.9 2.01 3L2 15C2 16.1 2.9 17 4 17H16C17.1 17 18 16.1 18 15V3C18 1.9 17.1 1 16 1ZM16 15H4V3H16V15ZM20 5H19V19H5V20H20C21.1 20 22 19.1 22 18V7C22 5.9 21.1 5 20 5ZM20 18H19V7H20V18Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
  );
}
