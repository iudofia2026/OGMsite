import { Product, AboutSection, SiteConfig, NavItem } from './types';

/**
 * OGM Site Data
 *
 * Central data store for all site content
 */

export const siteConfig: SiteConfig = {
  name: 'OGM',
  tagline: 'Premium Reposado Tequila',
  description: 'Small batch reposado tequila made with passion, served with pride.',
  socialLinks: {
    instagram: 'https://www.instagram.com/theogmlife/',
  },
  ageVerification: {
    enabled: true,
    minimumAge: 21,
  },
};

export const products: Product[] = [
  {
    id: 'premium',
    name: 'Premium Reposado',
    flavor: 'premium',
    description: 'Small batch reposado tequila made with passion, served with pride',
    imageFront: '/images/OGM_Labels_Premium_Full Front.png',
    imageBack: '/images/OGM_Labels_Full Back.png',
    backgroundColor: 'transparent',
    titleColor: '#C9A55B',
  },
  {
    id: 'ginger-lime',
    name: 'Ginger Lime',
    flavor: 'ginger-lime',
    description: 'Refreshing ginger lime reposado tequila with citrus notes',
    imageFront: '/images/OGM_Labels_Ginger Lime_Full Front.png',
    imageBack: '/images/OGM_Labels_Full Back.png',
    backgroundColor: 'transparent',
    titleColor: '#02BBB7',
  },
  {
    id: 'jalapeno',
    name: 'Jalapeño Reposado',
    flavor: 'jalapeno',
    description: 'Bold jalapeño-infused reposado tequila with a fiery finish',
    imageFront: '/images/OGM_Labels_Jalapeno_Full Front.png',
    imageBack: '/images/OGM_Labels_Full Back.png',
    backgroundColor: 'transparent',
    titleColor: '#CC071E',
  },
];

export const aboutSections: AboutSection[] = [
  {
    id: 'about-1',
    title: 'About OGM',
    content: 'Founded in July 2020 during the COVID era, OGM grew from a simple idea into a bold vision. Inspired by the warmth of Miami beaches and the vibrancy of Mexican culture, OGM represents freedom, joy, and living life unapologetically.',
    image: '/images/about-images/about-1.jpg',
    layout: 'text-left',
  },
  {
    id: 'about-2',
    title: 'A New Chapter',
    content: 'After two decades devoted to motherhood, this became a new chapter—an entrepreneurial journey that began at 50, rooted in passion, purpose, and the belief that it\'s never too late to start something meaningful.',
    image: '/images/about-images/about-2.jpg',
    layout: 'text-right',
  },
  {
    id: 'about-3',
    title: 'Crafted with Purpose',
    content: 'OGM began with a dream to create the perfect margarita using only real ingredients. That journey evolved into reposado tequila—chosen for its balance, depth, and sophistication, and because it reflects how the founder truly enjoys drinking.',
    image: '/images/about-images/about-3.jpg',
    layout: 'text-left',
  },
  {
    id: 'about-4',
    title: 'Bold Flavors',
    content: 'Crafted with bold, natural flavors, OGM is made for those who seek experiences, not just drinks. Every pour marks moments worth remembering—long days into nights, celebrations big and small.',
    layout: 'text-right',
  },
  {
    id: 'about-5',
    title: 'Your Story',
    content: 'OGM is for the modern explorer, the dreamer—the one who knows life tastes best when it\'s real. Raise a glass, and write your story with OGM.',
    layout: 'text-left',
  },
];

export const navigationItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
];
