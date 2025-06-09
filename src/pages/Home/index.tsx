import React, { memo } from "react";
import { Helmet } from "react-helmet";

import MetaData from "../../common/metadata";
import Everything from "../../components/Everything";
import Hero from "../../components/Hero";
import Introducing from "../../components/Introducing";
import Testimonials from "../../components/Testimonial";
import * as S from "./styles";

const testimonialData = [
  {
    id: "1",
    name: "Arlene McCoy",
    image: "/path-to-image.jpg",
    duration: "One Year of using Billia",
    content: "Before Billia, I always missed my PHCN payment dates. Now I get reminders, and I can repeat past payments without filling forms. It's efficient, secure, and perfect for people like me who forget easily",
    rating: 4.7,
    date: "4 June 2025",
  },
  {
    id: "2",
    name: "Savannah Nguyen",
    image: "/path-to-image.jpg",
    duration: "Six Months of using Billia",
    content: "I was surprised how fast wallet funding worked. I transferred from my bank to the Billia virtual account, and the money reflected instantly. I've used it to pay my cable and internet bills ever since.",
    rating: 4.5,
    date: "24 April 2025",
  },
  // ... more testimonials
];

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
      </S.HomeContainer>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const HomePage = memo(HomePageComponent);
export default HomePage;
