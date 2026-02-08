'use client';

import { homeController } from '@/controllers/home-controller';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import InstagramButton from '@/components/InstagramButton';
import ProductCard from '@/components/ProductCard';
import ScrollingBottle from '@/components/ScrollingBottle';
import ComingThisSpring from '@/components/ComingThisSpring';
import ScrollToTopLogo from '@/components/ScrollToTopLogo';

const signatureStyles = `
  @import url('https://api.fontshare.com/v2/css?f[]=comico@400&display=swap');

  .signature-container {
    animation: signatureFadeIn 0.5s ease-out 1.2s forwards;
  }

  @keyframes signatureFadeIn {
    to {
      opacity: 1;
    }
  }

  .signature-wrapper {
    overflow: visible;
    position: relative;
  }

  .signature-image {
    clip-path: inset(0 100% 0 0);
    animation: revealSignature 3s ease-out 1.5s forwards;
  }

  @keyframes revealSignature {
    to {
      clip-path: inset(0 0% 0 0);
    }
  }

  .signature-hover-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Comico', cursive;
    font-weight: 400;
    font-size: 20px;
    color: white;
    text-align: center;
    line-height: 1.4;
    opacity: 0;
    pointer-events: none;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
    z-index: 10;
    white-space: nowrap;
    width: 400px;
    min-width: 400px;
    overflow: visible;
    transition: opacity 0.4s ease-in-out;
  }

  .signature-hover-text div {
    clip-path: inset(0 100% 0 0);
    transition: clip-path 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: block;
  }

  .signature-hover-text div:nth-child(2) {
    transition-delay: 0.4s;
  }

  .signature-wrapper:hover .signature-hover-text {
    opacity: 1;
  }

  .signature-wrapper:hover .signature-hover-text div {
    clip-path: inset(0 0% 0 0);
  }

  .signature-wrapper:not(:hover) .signature-hover-text div {
    clip-path: inset(0 100% 0 0);
    transition: clip-path 0.6s ease-in;
  }

  .signature-wrapper:hover .signature-image {
    opacity: 0.2;
  }

  .signature-image {
    transition: opacity 0.4s ease-in-out;
    opacity: 1;
  }

  /* Gentle Background Zoom Animation */
  .hero-background-wrapper {
    animation: subtle-zoom 45s ease-in-out infinite;
  }

  @keyframes subtle-zoom {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.03);
    }
  }

  /* Ambient Light Rays */
  .light-ray {
    position: absolute;
    background: linear-gradient(
      to bottom,
      rgba(255, 215, 0, 0.03) 0%,
      rgba(255, 215, 0, 0.01) 50%,
      transparent 100%
    );
    filter: blur(30px);
    pointer-events: none;
    transform-origin: top center;
  }

  .ray-1 {
    top: 0;
    left: 5%;
    width: 200px;
    height: 100%;
    animation: ray-drift-1 90s ease-in-out infinite;
    opacity: 0.4;
  }

  .ray-2 {
    top: 0;
    right: 10%;
    width: 180px;
    height: 100%;
    animation: ray-drift-2 75s ease-in-out infinite;
    animation-delay: -30s;
    opacity: 0.3;
  }

  .ray-3 {
    top: 0;
    left: 45%;
    width: 150px;
    height: 100%;
    animation: ray-drift-3 80s ease-in-out infinite;
    animation-delay: -50s;
    opacity: 0.35;
  }

  @keyframes ray-drift-1 {
    0%, 100% {
      transform: translateX(0) rotate(-2deg);
      opacity: 0.3;
    }
    50% {
      transform: translateX(30px) rotate(2deg);
      opacity: 0.5;
    }
  }

  @keyframes ray-drift-2 {
    0%, 100% {
      transform: translateX(0) rotate(1deg);
      opacity: 0.25;
    }
    50% {
      transform: translateX(-25px) rotate(-1deg);
      opacity: 0.4;
    }
  }

  @keyframes ray-drift-3 {
    0%, 100% {
      transform: translateX(0) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      transform: translateX(15px) rotate(1deg);
      opacity: 0.45;
    }
  }

  /* Text Shadow Breathing */
  .breathing-shadow {
    animation: shadow-breathe 8s ease-in-out infinite;
  }

  @keyframes shadow-breathe {
    0%, 100% {
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    }
    50% {
      text-shadow: 0 0 30px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.1);
    }
  }

  /* Minimalist Parallax Effects */
  .parallax-slow {
    transition: transform 0.3s ease-out;
    will-change: transform;
  }

  .parallax-medium {
    transition: transform 0.3s ease-out;
    will-change: transform;
  }

  .parallax-fast {
    transition: transform 0.3s ease-out;
    will-change: transform;
  }

  @media (prefers-reduced-motion: no-preference) {
    .parallax-slow:hover {
      transform: translateY(-8px);
    }

    .parallax-medium:hover {
      transform: translateY(-12px);
    }

    .parallax-fast:hover {
      transform: translateY(-16px);
    }
  }

  /* Mini Instagram Button Style for Link */
  .instagram-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(
      45deg,
      #f09433 0%,
      #e6683c 25%,
      #dc2743 50%,
      #cc2366 75%,
      #bc1888 100%
    );
    color: white;
    text-decoration: none;
    font-family: 'Raleway', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .instagram-link:hover {
    background: linear-gradient(
      135deg,
      #d4a574 0%,
      #c9956c 25%,
      #b8860b 50%,
      #daa520 75%,
      #d4a574 100%
    );
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(218, 165, 32, 0.4);
    color: white;
  }

  .instagram-link-icon {
    width: 20px;
    height: 20px;
    margin-bottom: 2px;
  }

  /* Lightweight About Signature Animation */
  .about-signature {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out;
  }

  .about-signature.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .about-signature-image {
    clip-path: inset(0 100% 0 0);
    transition: clip-path 3s ease-out;
  }

  .about-signature.visible .about-signature-image {
    clip-path: inset(0 0% 0 0);
  }
`;

export default function Home() {
  const { site, products, about, navigation } = homeController.getHomeData();
  const [signatureVisible, setSignatureVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const signature = document.querySelector('.about-signature');
          if (signature && !signatureVisible) {
            const rect = signature.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.8) {
              setSignatureVisible(true);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [signatureVisible]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: signatureStyles }} />
      <main className="min-h-screen relative">
      {/* Navigation */}
      <Navigation items={navigation} />

      {/* Scroll to Top Logo */}
      <ScrollToTopLogo />

      {/* Scrolling Bottle */}
      <ScrollingBottle />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 hero-background-wrapper">
          <Image
            src="/images/ogm background.png"
            alt="OGM brand background"
            fill
            className="object-cover object-top"
            priority
            style={{ willChange: 'transform' }}
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Ambient Light Rays */}
        <div className="absolute inset-0 z-3 pointer-events-none overflow-hidden">
          <div className="light-ray ray-1"></div>
          <div className="light-ray ray-2"></div>
          <div className="light-ray ray-3"></div>
        </div>

        {/* Logo */}
        <div className="z-10 relative -mt-64">
          <div className="flex items-center justify-center gap-0">
            <Image
              src="/images/white_ogm_full_square_logo.svg"
              alt="OGM Premium Tequila"
              width={400}
              height={400}
              className="w-[22rem] md:w-[28rem] transition-transform duration-500 hover:scale-105 mx-0 logo-fade-in"
              priority
              style={{
                padding: 0,
                marginBottom: 0,
                clipPath: 'inset(25px 0 25px 0)'
              }}
            />
          </div>
          <div className="flex justify-center">
            <ComingThisSpring />
          </div>
        </div>

        {/* Animated Signature */}
        <div className="z-10 absolute bottom-16 left-0 right-0 flex justify-center">
          <div className="signature-container opacity-0 animate-fade-in">
            <div className="signature-wrapper cursor-pointer">
              <Image
                src="/images/OGM_signature-wht.svg"
                alt="OGM Signature"
                width={160}
                height={125}
                className="signature-image"
                style={{
                  filter: 'drop-shadow(1px 2px 3px rgba(0, 0, 0, 0.8))'
                }}
              />
              <div className="signature-hover-text">
                <div>woman founded</div>
                <div>woman owned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tequila Type Sections */}
      <section id="premium-section" className="py-60 px-6 relative flex items-center overflow-hidden" style={{ backgroundColor: '#C9A55B', minHeight: '24rem' }}>
        <div className="w-1/3 z-10">
          <h2 className="font-goldenbook text-white text-h1 mb-4">
            Premium Reposado
          </h2>
          <p className="font-raleway text-white text-body leading-relaxed">
            Small batch reposado tequila made with passion, served with pride
          </p>
        </div>
        <div className="absolute right-[-10%] top-0 bottom-0 w-2/3 flex items-center justify-center">
          <Image
            src="/images/backgrounds/agave.png"
            alt="Agave"
            fill
            className="object-contain p-8"
          />
        </div>
      </section>

      <section id="ginger-lime-section" className="py-72 px-6 relative flex items-center overflow-hidden" style={{ backgroundColor: '#02BBB7', minHeight: '28rem' }}>
        <div className="absolute left-[-10%] top-0 bottom-0 w-2/3 flex items-center justify-center">
          <Image
            src="/images/backgrounds/gingerlime.png"
            alt="Ginger Lime"
            fill
            className="object-contain p-8"
          />
        </div>
        <div className="w-1/3 z-10 ml-auto">
          <h2 className="font-goldenbook text-white text-h1 mb-4">
            Ginger Lime
          </h2>
          <p className="font-raleway text-white text-body leading-relaxed">
            Refreshing ginger lime reposado tequila with citrus notes
          </p>
        </div>
      </section>

      <section id="jalapeno-section" className="py-60 px-6 relative flex items-center overflow-hidden" style={{ backgroundColor: '#CC071E', minHeight: '24rem' }}>
        <div className="w-1/3 z-10">
          <h2 className="font-goldenbook text-white text-h1 mb-4">
            Jalapeño Reposado
          </h2>
          <p className="font-raleway text-white text-body leading-relaxed">
            Bold jalapeño-infused reposado tequila with a fiery finish
          </p>
        </div>
        <div className="absolute right-[-10%] top-0 bottom-0 w-2/3 flex items-center justify-center">
          <Image
            src="/images/backgrounds/jalapeno.jpg"
            alt="Jalapeño"
            fill
            className="object-contain p-8"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-goldenbook text-ogm-gold text-h1 text-center mb-8">
            My Story
          </h2>
          <div className="space-y-16">
            {/* First group: First two paragraphs with first image */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 md:text-right">
                <p className="font-raleway text-body text-gray-700 leading-relaxed mb-6">
                  {about[0].content}
                </p>
                <p className="font-raleway text-body text-gray-700 leading-relaxed">
                  {about[1].content}
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden">
                  <Image
                    src="/images/about-images/about-1.jpg"
                    alt="About OGM"
                    fill
                    className="object-cover shadow-gold-medium parallax-slow"
                  />
                </div>
              </div>
            </div>

            {/* Second group: Next two paragraphs with second image */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="flex-1 md:text-left">
                <p className="font-raleway text-body text-gray-700 leading-relaxed mb-6">
                  {about[2].content}
                </p>
                <p className="font-raleway text-body text-gray-700 leading-relaxed">
                  {about[3].content}
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden">
                  <Image
                    src="/images/about-images/about-2.jpg"
                    alt="Crafted with Purpose"
                    fill
                    className="object-cover shadow-gold-medium parallax-medium"
                  />
                </div>
              </div>
            </div>

            {/* Third group: Remaining text with third image */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 md:text-right">
                <p className="font-raleway text-3xl text-gray-700 leading-relaxed">
                  OGM is for the <strong>modern explorer</strong>, the <strong>dreamer</strong>—the one who knows life tastes best when it&apos;s <strong>real</strong>. Raise a glass, and write your story with <strong>OGM</strong>.
                </p>

                {/* Black Signature */}
                <div className="mt-12 flex justify-center">
                  <div className={`about-signature ${signatureVisible ? 'visible' : ''}`}>
                    <div className="signature-wrapper">
                      <Image
                        src="/images/OGM_signature-blk.svg"
                        alt="OGM Signature"
                        width={160}
                        height={125}
                        className="about-signature-image"
                        style={{
                          filter: 'drop-shadow(1px 2px 3px rgba(0, 0, 0, 0.2))'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-64 h-80 md:w-80 md:h-96 overflow-hidden">
                  <Image
                    src="/images/about-images/about-3.jpg"
                    alt="Your Story"
                    fill
                    className="object-cover shadow-gold-medium parallax-fast"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-goldenbook text-ogm-gold text-h1 text-center mb-4">
            Our Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                imageFront={product.imageFront}
                imageBack={product.imageBack}
                titleColor={product.titleColor}
                description={product.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 text-center relative">
        <div className="flex items-center justify-center gap-12">
          <div className="text-left">
            <h2 className="font-goldenbook text-ogm-gold text-h1 mb-4">
              Get in Touch
            </h2>
            <p className="font-raleway text-ogm-gold text-subtitle uppercase tracking-wider">
              Follow us on Instagram
            </p>
          </div>
          <InstagramButton />
        </div>
      </section>
    </main>
    </>
  );
}
