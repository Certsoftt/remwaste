import styled, { css } from "styled-components";

import { BREAKPOINTS, COLORS } from "../../utils/constants";

const slideIn = css`
  @keyframes slideIn {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${COLORS.backgroundTransparent};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  ${slideIn}

  @supports not (backdrop-filter: blur(8px)) {
    background: ${COLORS.background};
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${BREAKPOINTS.largeDesktop}px;
  margin: 0 auto;
  padding: clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem);
  height: clamp(60px, 8vh, 80px);
`;

export const LogoContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

export const LogoLink = styled.a`
  display: block;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.primary};
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export const Logo = styled.img`
  height: auto;
  width: auto;
  max-height: 40px;
  object-fit: contain;
`;

export const MenuContainer = styled.nav`
  display: none;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    display: flex;
    align-items: center;
    gap: clamp(1.5rem, 3vw, 2rem);
  }
`;

export const MenuItem = styled.a`
  color: ${COLORS.text};
  text-decoration: none;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.2s ease;
  position: relative;
  
  &:hover, &:focus-visible {
    color: ${COLORS.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${COLORS.primary};
    transition: width 0.2s ease;
  }

  &:hover::after,
  &:focus-visible::after {
    width: 100%;
  }

  &:focus-visible {
    outline: none;
  }
`;

export const MobileMenuButton = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: ${BREAKPOINTS.tablet}px) {
    display: none;
  }

  .ant-btn {
    color: ${COLORS.text};
    font-size: 1.5rem;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover, &:focus {
      color: ${COLORS.primary};
      background: rgba(255, 107, 0, 0.1);
    }

    &:focus-visible {
      outline: 2px solid ${COLORS.primary};
      outline-offset: 2px;
    }
  }
`;

export const MobileMenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;

  ${MenuItem} {
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
    width: 100%;
    transition: all 0.2s ease;

    &:hover, &:focus-visible {
      background-color: rgba(255, 107, 0, 0.1);
    }

    &::after {
      display: none;
    }
  }
`;
