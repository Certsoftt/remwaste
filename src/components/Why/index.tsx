import React, { memo } from "react";
import { Fade } from "react-awesome-reveal";

import type { WhyProps } from "./types";

import {
  ContentWrapper,
  ImageWrapper,
  WhyContainer,
  WhySection,
} from "./styles";

const Why: React.FC<WhyProps> = ({
  heading,
  subheading,
  description,
  image,
}) => {
  return (
    <WhySection>
      <WhyContainer>
        <Fade direction="left" triggerOnce>
          <ContentWrapper>
            <h2>{subheading}</h2>
            <p>{heading}</p>
            <p>{description}</p>
          </ContentWrapper>
        </Fade>
        <Fade direction="right" triggerOnce>
          <ImageWrapper>
            <img
              src={image}
              alt="Why choose Billia"
              loading="lazy"
              width={500}
              height={500}
            />
          </ImageWrapper>
        </Fade>
      </WhyContainer>
    </WhySection>
  );
};

export default memo(Why);
