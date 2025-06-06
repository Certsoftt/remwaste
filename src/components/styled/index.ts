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
  padding: 2rem;

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
`;

export const LogoWrapper = styled(Box)`
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;

  h1 {
    font-size: clamp(2.5rem, 8vw, 4rem);
    font-weight: 700;
    margin: 0;
    letter-spacing: 4px;
    text-transform: uppercase;
    background: linear-gradient(to right, #fff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: fadeIn 1s ease-out;
  }

  p {
    font-size: clamp(1rem, 3vw, 1.5rem);
    margin: 0.5rem 0;
    font-style: italic;
    opacity: 0.8;
    letter-spacing: 1px;
    animation: fadeIn 1s ease-out 0.3s both;
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
`;

export const SearchWrapper = styled(Box)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  animation: fadeIn 1s ease-out 0.6s both;
`;

export const ContentWrapper = styled(Box)`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const VersionText = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  opacity: 0.5;
  z-index: 1;
  animation: fadeIn 1s ease-out 0.9s both;
`;
