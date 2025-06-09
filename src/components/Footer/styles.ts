import styled from 'styled-components';
import { BREAKPOINTS } from '../../utils/constants';

export const FooterWrapper = styled.footer`
  background-color: #F15A22;
  padding: 40px 20px;
  color: #FFFFFF;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    padding: 60px 40px;
  }
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 40px;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
`;

export const BrandSection = styled.div`
  img {
    height: 40px;
    margin-bottom: 16px;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 24px;
    line-height: 1.6;
  }
`;

export const NavSection = styled.div`
  h3 {
    font-size: 18px;
    margin-bottom: 24px;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 12px;
      
      a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
          color: #FFFFFF;
        }
      }
    }
  }
`;

export const Copyright = styled.div`
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;

  a {
    color: #FFFFFF;
    font-size: 20px;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;
