import styled, { css, keyframes } from "styled-components";

import { BREAKPOINTS, COLORS } from "../../utils/constants";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const HeroSection = styled.section`
  min-height: 100vh;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  background-color: ${COLORS.background};
  overflow: hidden;
  position: relative;
`;

export const ContentContainer = styled.div`
  max-width: ${BREAKPOINTS.largeDesktop}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 5vw, 4rem);
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  animation: ${fadeIn} 0.6s ease-out;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    max-width: 50%;
  }
`;

export const Tagline = styled.p`
  color: ${COLORS.primary};
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 500;
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
`;

export const Title = styled.h1`
  color: ${COLORS.text};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
`;

export const Description = styled.p`
  color: ${COLORS.textLight};
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.6;
  margin-bottom: clamp(2rem, 4vw, 3rem);
  max-width: 540px;
`;

export const StoreButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: clamp(2rem, 4vw, 3rem);
  flex-wrap: wrap;
`;

export const StoreButton = styled.a`
  transition: transform 0.2s ease;

  img {
    width: clamp(120px, 30vw, 135px);
    height: auto;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const UsersSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img<{ $index: number }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid white;
  margin-left: ${props => props.$index === 0 ? "0" : "-12px"};
`;

export const UsersText = styled.p`
  color: ${COLORS.textLight};
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 500;
`;

export const RightSection = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  animation: ${fadeIn} 0.6s ease-out 0.3s backwards;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    max-width: 50%;
  }
`;

export const PhoneImage = styled.div`
  position: relative;
  z-index: 1;

  img {
    width: 100%;
    height: auto;
    max-width: 400px;
  }
`;

export const FloatingElements = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

export const FloatingIcon = styled.img<{ $position: number }>`
  position: absolute;
  width: clamp(40px, 8vw, 60px);
  height: auto;
  
  ${(props) => {
    switch (props.$position) {
      case 1306:
        return css`
          top: 10%;
          left: -10%;
          animation: ${float} 3s ease-in-out infinite;
        `;
      case 1307:
        return css`
          top: 20%;
          right: -5%;
          animation: ${float} 3s ease-in-out infinite 0.5s;
        `;
      case 1308:
        return css`
          bottom: 30%;
          left: -15%;
          animation: ${float} 3s ease-in-out infinite 1s;
        `;
      case 1310:
        return css`
          bottom: 20%;
          right: -10%;
          animation: ${float} 3s ease-in-out infinite 1.5s;
        `;
      case 1317:
        return css`
          top: 40%;
          right: -15%;
          animation: ${float} 3s ease-in-out infinite 2s;
        `;
      default:
        return "";
    }
  }}
`;
