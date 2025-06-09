import styled from "styled-components";

import { BREAKPOINTS } from "../../utils/constants";

export const ReimagingSection = styled.section`
  background-color: #FFF7F2;
  padding: 40px 20px;
  overflow: hidden;
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    padding: 80px 40px;
  }
`;

export const ReimagingContainer = styled.div`
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

export const ImageWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  background: #F15A22;
  overflow: hidden;
  aspect-ratio: 1;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const ContentWrapper = styled.div`
  h1 {
    color: #1A1A1A;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 24px;
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
