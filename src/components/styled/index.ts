import { Box, Container } from "@mui/material";
import styled from "styled-components";

export const StyledContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: clamp(1rem, 4vw, 2rem);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at center,
        rgba(25, 25, 25, 0.5) 0%,
        rgba(0, 0, 0, 0.8) 100%
      );
    z-index: 0;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    justify-content: flex-start;
    padding-top: clamp(2rem, 10vh, 4rem);
  }
`;

export const LogoWrapper = styled(Box)`
  margin-bottom: clamp(2rem, 6vw, 3rem);
  position: relative;
  z-index: 1;
  padding: 0 clamp(1rem, 3vw, 2rem);

  h1 {
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 700;
    margin: 0;
    letter-spacing: clamp(2px, 0.5vw, 4px);
    text-transform: uppercase;
    background: linear-gradient(to right, #fff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeIn 1s ease-out;
    line-height: 1.2;
  }

  p {
    font-size: clamp(0.875rem, 2.5vw, 1.5rem);
    margin: clamp(0.375rem, 1vw, 0.5rem) 0;
    font-style: italic;
    opacity: 0.8;
    letter-spacing: clamp(0.5px, 0.25vw, 1px);
    animation: fadeIn 1s ease-out 0.3s both;
    line-height: 1.4;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;

    h1 {
      font-size: clamp(1.75rem, 8vw, 2.5rem);
    }

    p {
      font-size: clamp(0.8rem, 4vw, 1rem);
      padding: 0 1rem;
    }
  }
`;

export const SearchWrapper = styled(Box)`
  width: 100%;
  max-width: min(90vw, 600px);
  margin: 0 auto;
  position: relative;
  z-index: 1;
  animation: fadeIn 1s ease-out 0.6s both;
  padding: 0 clamp(1rem, 3vw, 2rem);

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

export const ContentWrapper = styled(Box)`
  width: 100%;
  max-width: min(95vw, 800px);
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: clamp(1rem, 3vw, 2rem);

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const VersionText = styled.div`
  position: fixed;
  bottom: clamp(0.75rem, 2vw, 1rem);
  right: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  opacity: 0.5;
  z-index: 1;
  animation: fadeIn 1s ease-out 0.9s both;

  @media (max-width: 480px) {
    position: static;
    margin-top: auto;
    padding: 1rem 0;
    text-align: center;
  }
`;
