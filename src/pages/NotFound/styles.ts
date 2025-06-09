import { Button } from "antd";
import styled from "styled-components";

import { BREAKPOINTS, COLORS } from "../../utils/constants";

export const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  text-align: center;
  background-color: ${COLORS.background};
  position: relative;
  overflow: hidden;
`;

export const Content = styled.div`
  max-width: ${BREAKPOINTS.tablet}px;
  margin: 0 auto;
  z-index: 1;
`;

export const ErrorCode = styled.h1`
  font-size: clamp(4rem, 15vw, 8rem);
  font-weight: 700;
  color: ${COLORS.primary};
  margin: 0;
  line-height: 1;
  opacity: 0.9;
`;

export const Title = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: ${COLORS.text};
  margin: 1rem 0;
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: ${COLORS.textLight};
  margin-bottom: 2rem;
  max-width: 600px;
`;

export const StyledButton = styled(Button)`
  height: auto;
  padding: 12px 32px;
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
`;

export const BackgroundShape = styled.div<{ $top?: string; $left?: string; $size?: string }>`
  position: absolute;
  width: ${props => props.$size || "300px"};
  height: ${props => props.$size || "300px"};
  top: ${props => props.$top || "auto"};
  left: ${props => props.$left || "auto"};
  background: ${COLORS.primary}10;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  opacity: 0.6;
`;
