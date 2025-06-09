import styled from "styled-components";

import { BREAKPOINTS, COLORS } from "../../utils/constants";

export const IntroducingSection = styled.section`
  padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 2rem);
  background-color: ${COLORS.background};
  overflow: hidden;
`;

export const Container = styled.div`
  max-width: ${BREAKPOINTS.largeDesktop}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column-reverse;
  gap: clamp(2rem, 5vw, 4rem);

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Content = styled.div`
  flex: 1;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    max-width: 45%;
  }
`;

export const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    max-width: 50%;
  }
`;

export const PhoneImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 400px;
  margin: 0 auto;
  display: block;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1));
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    max-width: 500px;
  }
`;

export const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${COLORS.text};
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${COLORS.textLight};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 8px;
  background: ${COLORS.primary}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.primary};
  font-size: 1.25rem;
`;

export const FeatureContent = styled.div``;

export const FeatureTitle = styled.h3`
  font-size: clamp(1.125rem, 1.5vw, 1.25rem);
  color: ${COLORS.text};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const FeatureDescription = styled.p`
  font-size: clamp(0.875rem, 1.25vw, 1rem);
  color: ${COLORS.textLight};
  line-height: 1.5;
`;
