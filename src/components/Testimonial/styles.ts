import { Carousel } from "antd";
import styled from "styled-components";

import { BREAKPOINTS } from "../../utils/constants";

export const TestimonialWrapper = styled.section`
  background: #F15A22;
  padding: 60px 20px;
  position: relative;
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    padding: 80px 40px;
  }
`;

export const TestimonialHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h2 {
    color: white;
    font-size: 28px;
    margin: 16px 0;
    
    @media (min-width: ${BREAKPOINTS.tablet}px) {
      font-size: 36px;
    }
  }
  
  .tag {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    padding: 4px 12px;
    border-radius: 16px;
  }
`;

export const StyledCarousel = styled(Carousel)`
  max-width: 1200px;
  margin: 0 auto;
  
  .slick-slide {
    padding: 0 10px;
  }
  
  .slick-arrow {
    color: white;
    font-size: 24px;
    
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

export const TestimonialCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin: 10px;
  
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 12px;
    }
  }
  
  .content {
    color: #666;
    margin-bottom: 16px;
    line-height: 1.6;
  }
  
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
