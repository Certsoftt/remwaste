import { memo } from "react";

import {
  Container,
  EverythingSection,
  FeatureCard,
  FeatureDescription,
  FeaturesGrid,
  FeatureTitle,
  Header,
  IconWrapper,
  Subtitle,
  Title,
} from "./styles";

const features = [
  {
    id: "payments",
    title: "All-in-One Bill Payments",
    description: "Pay all your bills in one place. From utilities to subscriptions, manage everything seamlessly.",
    icon: "💳", // We can replace this with actual SVG icons later
  },
  {
    id: "topup",
    title: "Airtime & Data Top-Up",
    description: "Instantly recharge airtime and data for any network. Schedule auto top-ups for uninterrupted connectivity.",
    icon: "📱",
  },
  {
    id: "card",
    title: "Virtual Dollar Card",
    description: "Shop globally with our secure virtual dollar card. Perfect for international transactions and subscriptions.",
    icon: "💵",
  },
];

function Everything() {
  return (
    <EverythingSection>
      <Container>
        <Header>
          <Title>Everything You Need to Pay Smarter</Title>
          <Subtitle>
            Experience seamless financial management with our comprehensive suite of payment solutions
          </Subtitle>
        </Header>
        <FeaturesGrid>
          {features.map(feature => (
            <FeatureCard key={feature.id}>
              <IconWrapper>
                <span role="img" aria-label={feature.title}>
                  {feature.icon}
                </span>
              </IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </EverythingSection>
  );
}

export default memo(Everything);
