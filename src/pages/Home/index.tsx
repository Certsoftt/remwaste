import React, { memo } from "react";
import { Helmet } from "react-helmet";

import MetaData from "../../common/metadata";
import Download from "../../components/Download";
import Everything from "../../components/Everything";
import Hero from "../../components/Hero";
import Introducing from "../../components/Introducing";
import Testimonials from "../../components/Testimonial";
import { testimonialData } from "../../components/Testimonials/data";
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
        <Testimonials testimonials={testimonialData} />
        <Download
          title="Download Billia Today"
          description="Fast payments, smart reminders, and secure wallet tools — all inside Billia"
          googlePlayLink="#"
          appStoreLink="#"
          mockupImage="/assets/images/home/download/images/image 9.png"
        />
      </S.HomeContainer>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const HomePage = memo(HomePageComponent);
export default HomePage;
