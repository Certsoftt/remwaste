import React, { memo } from "react";
import { Fade } from "react-awesome-reveal";

import type { ReimagingProps } from "./types";

import {
  ContentWrapper,
  ImageWrapper,
  ReimagingContainer,
  ReimagingSection,
} from "./styles";

const Reimaging: React.FC<ReimagingProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = "Billia user experience",
}) => {
  return (
    <ReimagingSection>
      <ReimagingContainer>
        <Fade direction="left" triggerOnce>
          <ImageWrapper>
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              width={500}
              height={500}
            />
          </ImageWrapper>
        </Fade>
        <Fade direction="right" triggerOnce>
          <ContentWrapper>
            <h1>{title}</h1>
            <p>{description}</p>
          </ContentWrapper>
        </Fade>
      </ReimagingContainer>
    </ReimagingSection>
  );
};

export default memo(Reimaging);
