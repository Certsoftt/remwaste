export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
} as const;

export const COLORS = {
  primary: '#FF6B00',
  primaryHover: '#E65C00',
  text: '#333333',
  textLight: '#666666',
  background: '#FFFFFF',
  backgroundTransparent: 'rgba(255, 255, 255, 0.98)',
} as const;

export const NAV_ITEMS = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'about', label: 'About Us', href: '/about' },
  { key: 'features', label: 'Features', href: '/features' },
  { key: 'testimonials', label: 'Testimonials', href: '/testimonials' },
  { key: 'faq', label: 'FAQ', href: '/faq' },
  { key: 'contact', label: 'Contact Us', href: '/contact' },
] as const;
