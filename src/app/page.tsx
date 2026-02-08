import { homeController } from '@/controllers/home-controller';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import InstagramButton from '@/components/InstagramButton';
import ProductCard from '@/components/ProductCard';
import ScrollingBottle from '@/components/ScrollingBottle';
import ComingThisSpring from '@/components/ComingThisSpring';
import ScrollToTopLogo from '@/components/ScrollToTopLogo';

const signatureStyles = `
  .signature-container {
    animation: signatureFadeIn 0.5s ease-out 1.2s forwards;
  }

  @keyframes signatureFadeIn {
    to {
      opacity: 1;
    }
  }

  .signature-wrapper {
    overflow: hidden;
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
`;

export default function Home() {
  const { site, products, about, navigation } = homeController.getHomeData();

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
              src="/images/ogm_full_square_logo.svg"
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
            <div className="signature-wrapper">
              <Image
                src="/images/OGM_signature-wht.svg"
                alt="OGM Signature"
                width={160}
                height={125}
                className="signature-image"
                style={{
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))'
                }}
              />
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
            {about.map((section, index) => (
              <div
                key={section.id}
                className={`flex flex-col ${
                  section.layout === 'text-right' ? 'md:flex-row-reverse' : 'md:flex-row'
                } gap-8 items-center`}
              >
                <div className={`flex-1 ${section.layout === 'text-left' ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="font-raleway text-body text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
                {section.image && (
                  <div className="flex-1 flex justify-center">
                    <div className="relative w-64 h-80 md:w-80 md:h-96">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover rounded-lg shadow-gold-medium"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
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
