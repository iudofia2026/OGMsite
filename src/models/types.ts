/**
 * OGM Data Types & Interfaces
 */

// Product Types
export interface Product {
  id: string;
  name: string;
  flavor: 'premium' | 'jalapeno' | 'ginger-lime';
  description: string;
  imageFront: string;
  imageBack: string;
  backgroundColor: string;
  titleColor: string;
}

// About Section Types
export interface AboutSection {
  id: string;
  title: string;
  content: string;
  image?: string;
  layout: 'text-left' | 'text-right';
}

// Site Configuration
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  socialLinks: {
    instagram: string;
    twitter?: string;
  };
  ageVerification: {
    enabled: boolean;
    minimumAge: number;
  };
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}
