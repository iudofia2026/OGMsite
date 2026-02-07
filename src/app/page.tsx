import { homeController } from '@/controllers/home-controller';
import Image from 'next/image';
import ExploreButton from '@/components/ExploreButton';
import Navigation from '@/components/Navigation';
import InstagramButton from '@/components/InstagramButton';

export default function Home() {
  const { site, products, about, navigation } = homeController.getHomeData();

  return (
    <main className="min-h-screen relative">
      {/* Navigation */}
      <Navigation items={navigation} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="z-10 text-center relative">
          <Image
            src="/images/ogm_full_square_logo.svg"
            alt="OGM Premium Tequila"
            width={400}
            height={400}
            className="w-80 md:w-[28rem] mx-auto"
            priority
            style={{ padding: 0, marginBottom: 0 }}
          />
          <p className="font-goldenbook text-ogm-gold text-h2 tracking-widest uppercase">
            {site.tagline}
          </p>
          <p className="font-raleway text-ogm-gold text-body mt-4 tracking-wider uppercase">
            Coming This Spring
          </p>
          <ExploreButton href="#products" />
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-goldenbook text-ogm-gold text-h1 text-center mb-16">
            Our Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col items-center"
              >
                <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden">
                  <Image
                    src={product.imageFront}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3
                  className="font-goldenbook font-bold text-xl"
                  style={{ color: product.titleColor }}
                >
                  {product.name}
                </h3>
                <p className="font-raleway text-ogm-gray400 mt-2 text-center">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-goldenbook text-ogm-gold text-h1 text-center mb-16">
            About OGM
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
                  <p className="font-raleway text-body text-gray-300 leading-relaxed">
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
        <h2 className="font-goldenbook text-white text-h1 mb-4">
          Get in Touch
        </h2>
        <p className="font-raleway text-ogm-gold text-subtitle uppercase tracking-wider mb-8">
          Follow us on Instagram
        </p>
        <InstagramButton />
      </section>
    </main>
  );
}
