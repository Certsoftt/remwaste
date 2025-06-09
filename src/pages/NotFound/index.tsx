import { HomeOutlined } from "@ant-design/icons";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import {
  BackgroundShape,
  Content,
  Description,
  ErrorCode,
  NotFoundContainer,
  StyledButton,
  Title,
} from "./styles";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | RemWaste</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to Billia Home page."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <NotFoundContainer>
        <BackgroundShape $top="10%" $left="5%" $size="400px" />
        <BackgroundShape $top="60%" $left="70%" $size="300px" />

        <Content>
          <ErrorCode>404</ErrorCode>
          <Title>Page Not Found</Title>
          <Description>
            Oops! The page you're looking for seems to have gone on a holiday.
            Let's get you back to where you need to be.
          </Description>
          <StyledButton
            type="primary"
            size="large"
            onClick={handleBackHome}
          >
            <HomeOutlined />
            Back to Home
          </StyledButton>
        </Content>
      </NotFoundContainer>
    </>
  );
};

export default memo(NotFound);
