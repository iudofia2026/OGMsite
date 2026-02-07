import { siteConfig, products, aboutSections, navigationItems } from '@/models/site-data';
import { Product, AboutSection, SiteConfig, NavItem } from '@/models/types';

/**
 * Home Controller
 *
 * Business logic for the home page
 */

class HomeController {
  /**
   * Get all data needed for the home page
   */
  getHomeData() {
    return {
      site: this.getSiteConfig(),
      products: this.getProducts(),
      about: this.getAboutSections(),
      navigation: this.getNavigation(),
    };
  }

  /**
   * Get site configuration
   */
  getSiteConfig(): SiteConfig {
    return siteConfig;
  }

  /**
   * Get all products
   */
  getProducts(): Product[] {
    return products;
  }

  /**
   * Get product by ID
   */
  getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
  }

  /**
   * Get product by flavor
   */
  getProductByFlavor(flavor: Product['flavor']): Product | undefined {
    return products.find((p) => p.flavor === flavor);
  }

  /**
   * Get all about sections
   */
  getAboutSections(): AboutSection[] {
    return aboutSections;
  }

  /**
   * Get about section by ID
   */
  getAboutSectionById(id: string): AboutSection | undefined {
    return aboutSections.find((s) => s.id === id);
  }

  /**
   * Get navigation items
   */
  getNavigation(): NavItem[] {
    return navigationItems;
  }

  /**
   * Check if age verification is enabled
   */
  isAgeVerificationEnabled(): boolean {
    return siteConfig.ageVerification.enabled;
  }

  /**
   * Get minimum drinking age
   */
  getMinimumAge(): number {
    return siteConfig.ageVerification.minimumAge;
  }
}

// Export singleton instance
export const homeController = new HomeController();
