import styled from "styled-components";

import { BREAKPOINTS } from "../../utils/constants";

export const DownloadSection = styled.section`
  background-color: #FFF7F2;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    padding: 80px 40px;
  }
`;

export const DownloadContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  
  h1 {
    font-size: 32px;
    color: #1A1A1A;
    margin-bottom: 16px;
    font-weight: 700;
    
    @media (min-width: ${BREAKPOINTS.tablet}px) {
      font-size: 48px;
    }
  }

  p {
    font-size: 16px;
    color: #666666;
    margin-bottom: 32px;
    line-height: 1.6;
  }
`;

export const StoreButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  a {
    img {
      height: 48px;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
`;

export const MockupWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  img {
    max-width: 100%;
    height: auto;
    
    @media (min-width: ${BREAKPOINTS.tablet}px) {
      max-width: 600px;
    }
  }
`;
