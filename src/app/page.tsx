import { homeController } from '@/controllers/home-controller';
import Image from 'next/image';

export default function Home() {
  const { site, products, about } = homeController.getHomeData();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="z-10 text-center">
          <Image
            src="/images/ogm_full_square_logo.svg"
            alt="OGM Premium Tequila"
            width={400}
            height={400}
            className="w-64 md:w-96 mb-8"
            priority
          />
          <p className="font-goldenbook text-ogm-gold text-h2 tracking-widest uppercase">
            {site.tagline}
          </p>
          <p className="font-raleway text-ogm-gold text-body mt-4 tracking-wider uppercase">
            Coming This Spring
          </p>
          <a
            href="#products"
            className="inline-block mt-8 px-8 py-3 border border-ogm-gold text-ogm-gold font-raleway tracking-widest uppercase hover:bg-ogm-gold hover:text-white transition-colors duration-300"
          >
            Explore
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-6">
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
                <p className="font-raleway text-ogm-gray600 mt-2 text-center">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-ogm-cream">
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
                  <p className="font-raleway text-body text-ogm-gray700 leading-relaxed">
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
      <section id="contact" className="py-24 px-6 text-center">
        <h2 className="font-goldenbook text-white text-h1 mb-4">
          Get in Touch
        </h2>
        <p className="font-raleway text-ogm-gold text-subtitle uppercase tracking-wider mb-8">
          Follow us on Instagram
        </p>
        <a
          href={site.socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-raleway tracking-widest uppercase rounded-full hover:shadow-gold-medium transition-all duration-300 hover:scale-105"
        >
          Instagram
        </a>
      </section>
    </main>
  );
}
