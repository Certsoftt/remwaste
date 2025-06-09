import styled from "styled-components";

import { COLORS } from "../../utils/constants";

export const HomeContainer = styled.main`
  background-color: ${COLORS.background};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  
  /* Improve scrolling performance */
  -webkit-overflow-scrolling: touch;
  backface-visibility: hidden;
  transform: translateZ(0);
  
  /* Prevent content shift on load */
  contain: content;
`;
