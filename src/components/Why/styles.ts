import styled from "styled-components";

import { BREAKPOINTS } from "../../utils/constants";

export const WhySection = styled.section`
  padding: 40px 20px;
  background-color: #FFF7F2;
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    padding: 80px 40px;
  }
`;

export const WhyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: center;
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }
`;

export const ContentWrapper = styled.div`
  order: 2;
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    order: 1;
  }
  
  span {
    color: #F15A22;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  h2 {
    color: #1A1A1A;
    font-size: 32px;
    font-weight: 700;
    margin: 16px 0;
    line-height: 1.2;
    
    @media (min-width: ${BREAKPOINTS.tablet}px) {
      font-size: 42px;
    }
  }
  
  p {
    color: #666666;
    font-size: 16px;
    line-height: 1.6;
    margin: 0;
    
    @media (min-width: ${BREAKPOINTS.tablet}px) {
      font-size: 18px;
    }
  }
`;

export const ImageWrapper = styled.div`
  order: 1;
  position: relative;
  border-radius: 50%;
  background: #F15A22;
  overflow: hidden;
  aspect-ratio: 1;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    order: 2;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;
