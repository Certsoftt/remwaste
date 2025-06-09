import React, { memo } from 'react';
import { FacebookFilled, InstagramFilled, TwitterOutlined } from '@ant-design/icons';
import type { FooterProps, NavLinkProps } from './types';
import {
  FooterWrapper,
  FooterContainer,
  FooterContent,
  BrandSection,
  NavSection,
  Copyright,
  SocialLinks,
} from './styles';

const navLinks: NavLinkProps[] = [
  {
    label: 'Company',
    links: [
      { text: 'About Us', url: '/about' },
      { text: 'Features', url: '/features' },
      { text: 'Testimonials', url: '/testimonials' },
      { text: 'Services', url: '/services' },
      { text: 'FAQ', url: '/faq' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { text: 'Privacy Policy', url: '/privacy' },
      { text: 'Terms of Service', url: '/terms' },
    ],
  },
];

const Footer: React.FC<FooterProps> = ({
  logo,
  description,
  email,
  phone,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>
          <BrandSection>
            <img src={logo} alt="Billia" />
            <p>{description}</p>
            <SocialLinks>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookFilled />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramFilled />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterOutlined />
              </a>
            </SocialLinks>
          </BrandSection>

          {navLinks.map((section) => (
            <NavSection key={section.label}>
              <h3>{section.label}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a href={link.url}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </NavSection>
          ))}

          <NavSection>
            <h3>Contact Us</h3>
            <ul>
              <li><a href={`mailto:${email}`}>{email}</a></li>
              <li><a href={`tel:${phone}`}>{phone}</a></li>
            </ul>
          </NavSection>
        </FooterContent>

        <Copyright>
          © {currentYear} Billia Technologies. All rights reserved.
        </Copyright>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default memo(Footer);
