import { homeController } from '@/controllers/home-controller';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import InstagramButton from '@/components/InstagramButton';
import ProductCard from '@/components/ProductCard';
import ScrollingBottle from '@/components/ScrollingBottle';

const signatureStyles = `
  .signature-container {
    animation: signatureFadeIn 0.5s ease-out 1.2s forwards;
  }

  @keyframes signatureFadeIn {
    to {
      opacity: 1;
    }
  }

  .signature-path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
  }

  .signature-path-1 {
    animation: drawSignature 0.8s ease-out 1.5s forwards;
  }

  .signature-path-2 {
    animation: drawSignature 3s ease-out 2.2s forwards;
  }

  .signature-path-3 {
    animation: drawSignature 1.2s ease-out 5s forwards;
  }

  @keyframes drawSignature {
    to {
      stroke-dashoffset: 0;
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
              style={{
                padding: 0,
                marginBottom: 0,
                clipPath: 'inset(25px 0 25px 0)'
              }}
            />
          </div>
          <div className="flex justify-center mt-4">
            <p className="font-raleway text-white text-subtitle tracking-[0.2em] uppercase relative inline-block transition-all duration-500 cursor-default group">
              <span className="relative z-10">Coming This Spring</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </p>
          </div>

          {/* Animated Signature */}
          <div className="flex justify-center mt-6">
            <div className="signature-container opacity-0 animate-fade-in">
              <svg
                width="160"
                height="125"
                viewBox="0 0 80.27 62.821"
                className="signature-svg"
                style={{
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))'
                }}
              >
                <path
                  className="signature-path signature-path-1"
                  d="M69.366,17.334l.157.008c.15.007.28.013.413.042.082.015.179.029.274.029.282,0,.414-.125.474-.229.063-.158.086-.35-.06-.576-.214-.332-.743-.613-1.055-.633-.045-.013-.126-.021-.205-.021-.5,0-.806.355-.812.699-.006.324.243.66.814.682Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="signature-path signature-path-2"
                  d="M79.745,24.282c-.1,0-.2.021-.29.061-1.073.34-1.596,1.218-2.102,2.067-.126.211-.251.423-.386.625-.379.429-1.049.96-1.624.96-.258,0-.471-.11-.652-.337-.527-.766-.44-1.787-.356-2.775l.015-.182c-.011-.254-.045-.927-.512-.927-.451,0-.8.778-.872,1.223-.066.165-.132.332-.198.5-.398,1.021-.81,2.077-1.599,2.799-.656.692-1.355,1.083-1.933,1.083-.775,0-1.226-.721-1.238-1.978-.046-.421.122-.834.284-1.234.118-.292.24-.593.283-.894l.01-.071-.03-.066c-.145-.324-.382-.372-.51-.372-.393,0-.791.425-1.176.837-.155.165-.33.353-.419.405-2.664,2.172-5.279,3.712-7.803,4.599-.181.075-.279.09-.332.09-.166-.114.043-.85.121-1.127.069-.243.128-.453.149-.619.399-1.398.796-2.837,1.194-4.277,1.549-5.607,3.152-11.406,5.262-16.908.107-.275,2.618-6.766,2.05-7.597-.071-.104-.183-.164-.307-.164h0c-.191,0-.393.133-.673.446l-.038.042-.016.055c-.312,1.064-.715,2.127-1.105,3.155-.422,1.112-.858,2.262-1.188,3.431-1.299,4.29-2.746,8.428-4.299,12.294-.234.521-.462,1.07-.692,1.626-.747,1.807-1.52,3.674-2.775,5.099-.078-.087-.199-.42-.29-.669-.345-.948-.923-2.536-2.837-2.536-.454,0-.967.092-1.524.272-.869.324-1.495.698-1.949,1.167.357-2.087.976-4.178,1.576-6.206.302-1.02.614-2.074.887-3.11.029-.161.144-.565.288-1.079.865-3.07,1.264-4.825.897-5.311-.081-.107-.198-.166-.328-.166-.069,0-.142.017-.216.05l-.024.011-.021.015c-.599.433-.784,1.199-.948,1.875-.078.324-.152.629-.262.883-.41.924-.68,1.937-.941,2.917-.095.358-.19.715-.291,1.063-.552,1.995-.944,4.053-1.323,6.043-.111.582-.222,1.163-.337,1.744-.236.897-.531,1.823-.816,2.718-.283.889-.576,1.808-.816,2.718-.289.658-.571,1.495-.869,2.382-.815,2.421-1.739,5.163-3.431,6.203-.048.013-.08.016-.099.016-.129-.157-.004-.868,1.249-3.331.127-.251.223-.439.259-.527.063-.223.421-.675.737-1.074.787-.995,1.292-1.686,1.152-2.198-.035-.129-.13-.304-.383-.401l-.075-.029-.078.021c-.803.21-1.343,1.174-1.968,2.29-.772,1.378-1.648,2.94-3.106,2.94-.059,0-.119-.002-.18-.007-.737-.237-1.019-.859-1.246-1.36-.177-.39-.344-.758-.718-.758-.415,0-.878.412-2.387,2.752-.108.104-.352.567-.806,1.441-.309.594-.766,1.475-1.084,1.982l.002-.013-.005-.037c-.054-.417.231-1.983.507-3.498.607-3.333.945-5.394.523-5.899-.082-.098-.195-.152-.317-.152-.329,0-.737.342-1.664,2.014-.534,1.017-1.012,2.071-1.474,3.089-.359.792-.731,1.612-1.123,2.401-.085.123-.24.424-.456.842-.445.861-1.627,3.147-2.13,3.147-.042,0-.169-.113-.252-.63-.202-.692-.2-2.098-.198-3.457.002-1.098.003-2.233-.092-3.093-.085-.764-.265-1.642-.912-1.642-.378,0-.974.286-2.248,2.52-.854,1.438-1.578,2.981-2.279,4.474-.854,1.821-1.738,3.703-2.86,5.396-.048.072-.091.133-.128.185.067-.403.243-1.096.527-2.07.043-.147.076-.262.094-.328,2.173-7.036,3.892-12.8,5.407-18.129.388-1.503.381-2.482-.02-3-.211-.273-.52-.411-.917-.412h0c-1.391,0-3.675,1.748-5.186,2.904l-.42.32c-1.119.98-2.144,2.072-3.135,3.127-.563.6-1.146,1.22-1.733,1.807-1.37,1.495-2.8,2.98-4.183,4.417-2.019,2.097-4.107,4.266-6.039,6.495-.194.202-.393.421-.593.642-.435.479-.884.975-1.373,1.377-.056.045-.124.095-.196.148-.405.299-1.017.75-.737,1.328l.072.149.165-.008c1.225-.059,2.816-1.947,4.22-3.613.527-.625,1.025-1.216,1.385-1.553,1.238-1.335,2.508-2.661,3.737-3.943,1.571-1.64,3.195-3.335,4.744-5.043,2.518-2.69,5.042-5.257,8.197-7.067.38-.209.603-.253.722-.253s.166.042.197.083c.325.433-.163,2.117-.454,3.123-.17.587-.305,1.051-.331,1.338-.388,1.296-.794,2.635-1.199,3.972-.819,2.702-1.667,5.496-2.417,8.276-.13.516-.37,1.184-.623,1.891-.729,2.032-1.554,4.335-.918,5.662l.029.06.054.038c.138.096.29.144.45.144,1.121,0,2.324-2.378,3.667-5.251.327-.699.609-1.303.771-1.55.036-.061.142-.279.301-.606,1.863-3.851,2.667-5.115,3.008-5.43.004.047.005.11.002.193.043.333.033.986.022,1.742-.033,2.267-.078,5.372.879,6.343.208.211.454.318.731.318.31,0,.642-.133,1.013-.406l.029-.021.021-.028c1.355-1.766,2.346-3.828,3.303-5.822.465-.969.942-1.961,1.458-2.912-.092.632-.197,1.277-.306,1.944-.245,1.509-.499,3.069-.612,4.579-.062.704.014,1.164.234,1.404.112.122.257.186.421.186.549,0,1.193-.743,1.588-1.479.922-1.776,2.634-5.076,3.085-5.076.062,0,.209.203.307.337.316.435.793,1.091,1.869,1.091.447,0,.946-.111,1.521-.339-.009.029-.018.057-.025.078-.019.06-.037.115-.046.158-.321,1.007-.33,1.745-.02,2.169.171.234.428.357.743.357.702,0,1.638-.64,2.329-1.593.776-.934,1.264-2.047,1.689-3.169-.076.628-.11,1.239-.103,1.832-.002.067-.012.199-.023.368-.123,1.789-.164,3.522.362,4.086.124.133.28.203.45.203.167,0,.338-.065.523-.199l.045-.032.027-.048c.585-1.043,1.017-2.185,1.436-3.29.319-.842.649-1.714,1.041-2.523.255-.694.412-.713.629-.741.39-.049.746-.167,1.141-1.097.086-.046.192-.068.32-.068.276,0,.611.101.965.207.394.118.801.241,1.188.241.102,0,.2-.008.296-.027.204-.036.389-.055.548-.055.301,0,.51.065.639.199.27.279.248.904.222,1.628l-.011.333c-1.197,5.202-2.053,10.073-2.613,14.842-.082.951-.191,1.921-.297,2.86-.355,3.154-.722,6.416-.166,9.572l.009.05.028.043c.354.541.709.804,1.087.804,2.455,0,3.267-12.947,3.274-13.078.005-1.026.024-2.039.044-3.051.049-2.537.099-5.16-.098-7.759l-.01-.565c-.043-2.087-.088-4.246.878-6.106.396-.368.945-.537,1.525-.715.458-.141.933-.286,1.347-.542,1.167-.54,2.273-1.281,3.344-1.997.428-.287.855-.572,1.287-.847.124-.068.284-.192.453-.324.236-.185.594-.463.755-.463h0c.006,0,.059.054.071.291.353,2.453,1.46,2.963,2.328,2.963,1.476,0,3.144-1.479,4.121-3.007.634,1.356,1.487,1.658,2.119,1.658,1.102,0,2.307-.951,3.144-2.483.319-.597.772-1.035,1.47-1.422.135-.093.33-.263.383-.521.027-.152-.007-.289-.094-.393-.095-.113-.249-.178-.423-.178Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="signature-path signature-path-3"
                  d="M14.367,21.64c.139.134,9.445-4.61,9.43-4.688-.31-1.625-1.05-4.557-1.05-4.557l-.461.781s.336,2.294.164,2.349c-.598-.151-2.542-2.03-2.831-2.254,0,0-.013,3.62-.013,3.62l-3.822-4.083c.13.62,1.138,4.768.9,5.511-.069-.007-2.556-2.062-2.853-2.298.019.315.127,3.405-.01,3.683-.146.086-1.658-1.319-1.658-1.319,0,0-.738-.113-1.146-.234.96,1.119,2.948,3.102,3.351,3.491ZM21.623,15.989c.086.106.2.297.166.436-.08.33-1.137.931-1.309.13-.084-.393-.116-1.746-.116-1.746l1.259,1.18ZM18.765,17.361c.181.265.26.47-.021.686-.333.257-.977.581-1.194.049-.265-.647-.422-2.619-.422-2.619l1.637,1.883ZM14.574,17.611c.269.408,1.23,1.008,1.376,1.418.173.484-1.016,1.066-1.243.496-.056-.7-.183-1.925-.134-1.915Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
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
    </>
  );
}
