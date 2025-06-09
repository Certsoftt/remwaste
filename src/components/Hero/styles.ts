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
  margin-top: 60px;
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
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    width: 50%;
  }
`;

export const PhoneImage = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  z-index: 2;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-width: 100%;
  }

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    max-width: 350px;
  }

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    max-width: 400px;
  }
`;

export const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

export const FloatingIcon = styled.img<{ $position: number }>`
  position: absolute;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  
  @media (min-width: ${BREAKPOINTS.tablet}px) {
    width: 50px;
    height: 50px;
  }

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    width: 60px;
    height: 60px;
  }

  /* Adjust floating icon positions based on $position prop */
  ${({ $position }) => {
    switch ($position) {
      case 1306:
        return css`
          top: 15%;
          left: 10%;
          animation: ${float} 3s ease-in-out infinite;
        `;
      case 1307:
        return css`
          top: 25%;
          right: 10%;
          animation: ${float} 3s ease-in-out infinite 0.5s;
        `;
      case 1308:
        return css`
          top: 45%;
          left: 5%;
          animation: ${float} 3s ease-in-out infinite 1s;
        `;
      case 1310:
        return css`
          bottom: 35%;
          right: 8%;
          animation: ${float} 3s ease-in-out infinite 1.5s;
        `;
      case 1317:
        return css`
          bottom: 25%;
          left: 12%;
          animation: ${float} 3s ease-in-out infinite 2s;
        `;
      case 1320:
        return css`
          bottom: 15%;
          right: 15%;
          animation: ${float} 3s ease-in-out infinite 2s;
        `;
      default:
        return "";
    }
  }}
`;
