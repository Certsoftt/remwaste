import styled, { keyframes } from "styled-components";

import { BREAKPOINTS, COLORS } from "../../utils/constants";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const EverythingSection = styled.section`
  padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 2rem);
  background-color: ${COLORS.background};
  overflow: hidden;
`;

export const Container = styled.div`
  max-width: ${BREAKPOINTS.largeDesktop}px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 4rem);
  animation: ${slideUp} 0.6s ease-out;
`;

export const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${COLORS.text};
  margin-bottom: 1rem;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${COLORS.textLight};
  max-width: 600px;
  margin: 0 auto;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  margin-top: 2rem;
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${BREAKPOINTS.desktop}px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FeatureCard = styled.div`
  padding: clamp(1.5rem, 4vw, 2rem);
  background: ${COLORS.background};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  animation: ${slideUp} 0.6s ease-out;

  &:hover {
    transform: translateY(-8px);
  }
`;

export const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.primary}15;
  border-radius: 12px;
`;

export const FeatureTitle = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  color: ${COLORS.text};
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

export const FeatureDescription = styled.p`
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: ${COLORS.textLight};
  line-height: 1.6;
`;
