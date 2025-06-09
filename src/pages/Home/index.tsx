import React, { memo } from "react";
import { Helmet } from "react-helmet";

import MetaData from "../../common/metadata";
import Everything from "../../components/Everything";
import Hero from "../../components/Hero";
import Introducing from "../../components/Introducing";
import * as S from "./styles";

const HomePageComponent: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home | Billia - Simplify Every Payment with One Powerful App</title>
        <MetaData />
      </Helmet>

      <S.HomeContainer>
        <Hero />
        <Everything />
        <Introducing />
      </S.HomeContainer>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const HomePage = memo(HomePageComponent);
export default HomePage;
