import React, { memo } from "react";
import { Fade } from "react-awesome-reveal";

import type { DownloadProps } from "./types";

import {
  ContentWrapper,
  DownloadContainer,
  DownloadSection,
  MockupWrapper,
  StoreButtons,
} from "./styles";

const Download: React.FC<DownloadProps> = ({
  title,
  description,
  googlePlayLink,
  appStoreLink,
  mockupImage,
}) => {
  return (
    <DownloadSection>
      <DownloadContainer>
        <Fade direction="left" triggerOnce>
          <ContentWrapper>
            <h1>{title}</h1>
            <p>{description}</p>
            <StoreButtons>
              <a
                href={googlePlayLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >
                <img
                  src="/assets/images/home/download/googlestore.png"
                  alt="Get it on Google Play"
                  loading="lazy"
                />
              </a>
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
              >
                <img
                  src="/assets/images/home/download/appstore.png"
                  alt="Download on the App Store"
                  loading="lazy"
                />
              </a>
            </StoreButtons>
          </ContentWrapper>
        </Fade>
        <Fade direction="right" triggerOnce>
          <MockupWrapper>
            <img
              src={mockupImage}
              alt="Billia App Interface"
              loading="lazy"
            />
          </MockupWrapper>
        </Fade>
      </DownloadContainer>
    </DownloadSection>
  );
};

export default memo(Download);
