import React, { memo } from "react";
import { v4 as uuidv4 } from "uuid";

// import { Button } from 'antd';
import { useWindowSize } from "../../hooks/use-window-size";
import { BREAKPOINTS } from "../../utils/constants";
import * as S from "./styles";

const HeroComponent: React.FC = () => {
  const { width } = useWindowSize();
  const isMobile = width < BREAKPOINTS.tablet;

  const userAvatars = [
    "/assets/images/home/Ellipse 1.png",
    "/assets/images/home/Ellipse 2.png",
    "/assets/images/home/Ellipse 3.png",
  ];

  const floatingIcons = [
    ["/assets/images/home/hero/img1.png", 1306],
    ["/assets/images/home/hero/img2.png", 1307],
    ["/assets/images/home/hero/img3.png", 1308],
    ["/assets/images/home/hero/img4.png", 1310],
    ["/assets/images/home/hero/img5.png", 1317],
    ["/assets/images/home/hero/img6.png", 1320],
  ];

  return (
    <S.HeroSection>
      <S.ContentContainer>
        <S.LeftSection>
          <S.Tagline>One App. Every Payment. Zero Stress</S.Tagline>
          <S.Title>
            Simplify Every Payment with One Powerful App
          </S.Title>
          <S.Description>
            Billia lets you pay bills, top up airtime, buy data, and manage your wallet — all in one place. Fast. Secure. Reliable.
          </S.Description>

          <S.StoreButtons>
            <S.StoreButton
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
            >
              <img
                src="/assets/images/home/Store download button.png"
                alt="Get it on Google Play"
                width={135}
                height={40}
              />
            </S.StoreButton>
            <S.StoreButton
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
            >
              <img
                src="/assets/images/home/Store download button (1).png"
                alt="Download on the App Store"
                width={135}
                height={40}
              />
            </S.StoreButton>
          </S.StoreButtons>

          <S.UsersSection>
            <S.AvatarGroup>
              {userAvatars.map((avatar: string, index: number) => (
                <S.Avatar
                  key={uuidv4()}
                  src={avatar}
                  alt="User Avatar"
                  $index={index}
                />
              ))}
            </S.AvatarGroup>
            <S.UsersText>
              Join 20,000+ Nigerians making payments smarter every day
            </S.UsersText>
          </S.UsersSection>
        </S.LeftSection>

        <S.RightSection>
          <S.PhoneImage>
            <img
              src="/assets/images/home/hero/image1.png"
              alt="Billia App Interface"
              loading="eager"
              width={isMobile ? "300px" : "400px"}
              height={isMobile ? "593px" : "790px"}
            />
          </S.PhoneImage>
          <S.FloatingElements>
            {floatingIcons.map((icon) => {
              const [iconImage, num] = icon as [string, number];
              return (
                <S.FloatingIcon
                  key={num}
                  src={iconImage as string}
                  alt="Feature Icon"
                  $position={num as number}
                />
              );
            })}
          </S.FloatingElements>
        </S.RightSection>
      </S.ContentContainer>
    </S.HeroSection>
  );
};

export const Hero = memo(HeroComponent);
export default Hero;
