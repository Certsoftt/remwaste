import React, { memo } from "react";
import { Helmet } from "react-helmet";

import MetaData from "../../common/metadata";
import Reimaging from "../../components/Reimaging";
import Why from "../../components/Why";
import * as S from "../Home/styles";

const AboutPageComponent: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About | Billia - Simplify Every Payment with One Powerful App</title>
        <MetaData />
      </Helmet>

      <S.HomeContainer>
        <Reimaging
          title="Reimagining How Nigerians Pay, One Bill at a Time"
          description="At Billia, we're building more than just a payment app — we're creating a smarter, simpler way for everyday Nigerians to stay connected, pay their bills, and take control of their financial lives."
          imageSrc="/assets/images/about/young-afro-man-listening-music-with-headphones 1.png"
        />
        <Why
          heading="we created Billia because we saw a real problem, people struggling with too many apps, missed due dates, and unreliable payment platforms."
          subheading="Why We Started"
          description="So we built one app that brings it all together - electricity, internet, school fees, airtime, and even a virtual dollar card. Add Billia AI, and you've got the smartest payment experience available today."
          image="/assets/images/about/image 10.png"
        />
      </S.HomeContainer>
    </>
  );
};
export const AboutPage = memo(AboutPageComponent);
export default AboutPage;
