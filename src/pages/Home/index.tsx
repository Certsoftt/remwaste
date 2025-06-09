import React, { memo } from "react";
import { Helmet } from "react-helmet";

import MetaData from "../../common/metadata";
import Download from "../../components/Download";
import Everything from "../../components/Everything";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Introducing from "../../components/Introducing";
import Testimonials from "../../components/Testimonial";
import { testimonialData } from "../../components/Testimonial/data";
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
          mockupImage="/assets/images/home/download/image9.png"
        />
        <Footer
          logo="/assets/images/home/footer/footerlogo.png"
          description="Our all-in-one app for bills, airtime, data, and smart payments — powered by Billia AI."
          email="Billiainfo@gmail.com"
          phone="08023437727"
        />
      </S.HomeContainer>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const HomePage = memo(HomePageComponent);
export default HomePage;
