import { MessageOutlined, SyncOutlined, ThunderboltOutlined } from "@ant-design/icons";
import React, { memo } from "react";

import {
  Container,
  Content,
  FeatureContent,
  FeatureDescription,
  FeatureIcon,
  FeatureItem,
  FeatureList,
  FeatureTitle,
  ImageContainer,
  IntroducingSection,
  PhoneImage,
  Subtitle,
  Title,
} from "./styles";

const features = [
  {
    id: "command",
    icon: <MessageOutlined style={{ fontSize: "24px", color: "#4A2B2B" }} />,
    title: "Pay Bills by Typing a Command",
    description: "Just say \"Pay my WAEC fees\" or \"Buy airtime for 0803...\" — no need to search or fill endless forms.",
  },
  {
    id: "repeats",
    icon: <SyncOutlined style={{ fontSize: "24px", color: "#4A2B2B" }} />,
    title: "One-Tap Repeats",
    description: "AI remembers your past payments so you can repeat them in seconds — no retyping required.",
  },
  {
    id: "assistance",
    icon: <ThunderboltOutlined style={{ fontSize: "24px", color: "#4A2B2B" }} />,
    title: "In-App Chat Assistance",
    description: "AI remembers your past payments so you can repeat them in seconds — no retyping required.",
  },
];

const Introducing: React.FC = () => {
  return (
    <IntroducingSection>
      <Container>
        <Content>
          <Title>
            Introducing Billia AI: Smarter, Faster, Personal
          </Title>
          <Subtitle>
            From paying school fees to buying airtime or electricity, Billia AI makes every payment smarter, faster, and stress-free — just by asking.
          </Subtitle>
          <FeatureList>
            {features.map(feature => (
              <FeatureItem key={feature.id}>
                <FeatureIcon>
                  {feature.icon}
                </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            ))}
          </FeatureList>
        </Content>
        <ImageContainer>
          <PhoneImage
            src="/assets/images/home/introducing/image7.png"
            alt="Billia AI Chat Interface"
            loading="lazy"
            width="500"
            height="600"
          />
        </ImageContainer>
      </Container>
    </IntroducingSection>
  );
};

export default memo(Introducing);
