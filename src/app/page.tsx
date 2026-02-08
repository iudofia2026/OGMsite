import { homeController } from '@/controllers/home-controller';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import InstagramButton from '@/components/InstagramButton';
import ProductCard from '@/components/ProductCard';
import ScrollingBottle from '@/components/ScrollingBottle';

export default function Home() {
  const { site, products, about, navigation } = homeController.getHomeData();

  return (
    <main className="min-h-screen relative">
      {/* Navigation */}
      <Navigation items={navigation} />

      {/* Scrolling Bottle */}
      <ScrollingBottle />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/ogm background.png"
            alt="OGM brand background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Logo */}
        <div className="z-10 relative -mt-24">
          <div className="flex items-center justify-center gap-0">
            <Image
              src="/images/ogm_full_square_logo.svg"
              alt="OGM Premium Tequila"
              width={400}
              height={400}
              className="w-[18.7rem] md:w-[24.2rem] transition-transform duration-500 hover:scale-105 mx-0"
              priority
              style={{ padding: 0, marginBottom: 0 }}
            />
          </div>
          <div className="flex justify-center mt-4">
            <p className="font-raleway text-white text-subtitle tracking-[0.2em] uppercase relative inline-block transition-all duration-500 cursor-default group">
              <span className="relative z-10">Coming This Spring</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </p>
          </div>
        </div>
      </section>

      {/* Tequila Type Sections */}
      <section id="premium-section" className="py-60 px-6 relative flex items-center" style={{ backgroundColor: '#C9A55B' }}>
        <div className="w-1/3">
          <h2 className="font-goldenbook text-white text-h1 mb-4">
            Premium Reposado
          </h2>
          <p className="font-raleway text-white text-body leading-relaxed">
            Small batch reposado tequila made with passion, served with pride
          </p>
        </div>
        <div className="w-2/3"></div>
      </section>

      <section id="ginger-lime-section" className="py-72 px-6 relative flex items-center" style={{ backgroundColor: '#02BBB7' }}>
        <div className="w-1/3">
          <h2 className="font-goldenbook text-white text-h1 mb-4">
            Ginger Lime
          </h2>
          <p className="font-raleway text-white text-body leading-relaxed">
            Refreshing ginger lime reposado tequila with citrus notes
          </p>
        </div>
        <div className="w-2/3"></div>
      </section>

      <section id="jalapeno-section" className="py-60 px-6 relative flex items-center" style={{ backgroundColor: '#CC071E' }}>
        <div className="w-1/3">
          <h2 className="font-goldenbook text-white text-h1 mb-4">
            Jalapeño Reposado
          </h2>
          <p className="font-raleway text-white text-body leading-relaxed">
            Bold jalapeño-infused reposado tequila with a fiery finish
          </p>
        </div>
        <div className="w-2/3"></div>
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
  );
}
