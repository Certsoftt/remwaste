import { WarningOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import { Badge, Card, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { SkipCardSkeleton, SkipGridSkeleton } from "./styled/skeleton";

const { Text } = Typography;

const SkipContainer = styled.div`
  padding: clamp(1rem, 4vw, 2rem);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  color: white;
  font-size: clamp(1.5rem, 4vw, 2rem);
  text-align: center;
  margin-bottom: clamp(0.35rem, 1vw, 0.5rem);
  background: linear-gradient(45deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
`;

const Subtitle = styled(Text)`
  display: block;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.5;
`;

const SkipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1rem, 3vw, 1.5rem);
  padding: clamp(0.5rem, 2vw, 1rem);

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const SkipCard = styled(Card)`
  background: rgba(45, 45, 45, 0.95) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: clamp(8px, 2vw, 12px) !important;
  overflow: hidden;
  transition: all 0.3s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      border-color: rgba(25, 118, 210, 0.5) !important;
    }
  }

  .ant-card-cover {
    position: relative;
    background: #1a1a1a;
    padding: clamp(0.75rem, 2vw, 1rem);

    img {
      width: 100%;
      height: clamp(150px, 30vw, 200px);
      object-fit: contain;
      border-radius: clamp(6px, 1.5vw, 8px);
      transition: all 0.3s ease;
    }
  }

  .ant-card-body {
    padding: clamp(1rem, 3vw, 1.5rem) !important;
  }

  @media (max-width: 480px) {
    border-radius: 8px !important;

    .ant-card-cover {
      padding: 0.75rem;

      img {
        height: 150px;
        border-radius: 6px;
      }
    }

    .ant-card-body {
      padding: 1rem !important;
    }
  }
`;

const YardBadge = styled(Badge)`
  position: absolute;
  top: clamp(1rem, 3vw, 1.5rem);
  right: clamp(1rem, 3vw, 1.5rem);
  z-index: 2;

  .ant-badge-count {
    background: #1976d2;
    padding: 0 clamp(8px, 2vw, 12px);
    height: clamp(20px, 4vw, 24px);
    line-height: clamp(20px, 4vw, 24px);
    border-radius: clamp(10px, 2vw, 12px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-weight: 500;
    font-size: clamp(0.85rem, 2vw, 0.9rem);
  }
`;

const WarningOverlay = styled.div`
  position: absolute;
  bottom: clamp(1rem, 3vw, 1.5rem);
  left: clamp(1rem, 3vw, 1.5rem);
  right: clamp(1rem, 3vw, 1.5rem);
  background: rgba(0, 0, 0, 0.85);
  padding: clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 12px);
  border-radius: clamp(6px, 1.5vw, 8px);
  display: flex;
  align-items: center;
  gap: clamp(6px, 1.5vw, 8px);
  color: #ffd700;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 215, 0, 0.3);
  font-size: clamp(0.85rem, 2vw, 0.9rem);
`;

const Price = styled.div`
  font-size: clamp(1.5rem, 4vw, 1.8rem);
  color: #1976d2;
  font-weight: 600;
  margin: clamp(0.75rem, 2vw, 1rem) 0;
  line-height: 1.2;
`;

const HirePeriod = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.85rem, 2vw, 0.9rem);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  display: flex;
  align-items: center;
  gap: clamp(4px, 1vw, 6px);
  line-height: 1.4;

  &::before {
    content: '';
    display: inline-block;
    width: clamp(6px, 1.5vw, 8px);
    height: clamp(6px, 1.5vw, 8px);
    background: #1976d2;
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const SelectButton = styled(Button)`
  && {
    width: 100%;
    height: clamp(40px, 7vh, 44px);
    background: #1976d2;
    color: white;
    border-radius: clamp(6px, 1.5vw, 8px);
    text-transform: none;
    font-size: clamp(0.95rem, 2.2vw, 1rem);
    transition: all 0.3s ease;

    @media (hover: hover) {
      &:hover {
        background: #1565c0;
        transform: translateY(-2px);
      }
    }

    &:active {
      transform: translateY(0);
    }

    @media (max-width: 480px) {
      height: 40px;
      font-size: 0.95rem;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: clamp(250px, 50vh, 300px);
  gap: clamp(0.75rem, 2vw, 1rem);
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.9rem, 2.2vw, 1rem);
`;

type Skip = {
  id: string;
  size: number;
  price_before_vat: number;
  hire_period_days: number;
  allows_heavy_waste: boolean;
  allowed_on_road: boolean;
};

type SelectSkipProps = {
  wastePercentage: string;
  onSkipSelect: (skip: Skip) => void;
  _onBack: () => void;
};

function getSkipImage(_size: number, allowedOnRoad: boolean, wastePercentage: string) {
  if (!allowedOnRoad) {
    const notAllowedImages = [
      "not-allowed-on-road-10-20.jpg",
      "not-allowed-on-road-10.jpg",
      "not-allowed-on-road-over-10.jpg",
      "not-allowed-on-road-over-20.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * notAllowedImages.length);
    return `/src/assets/${notAllowedImages[randomIndex]}`;
  }

  return `/src/assets/yarder-skip-${wastePercentage === "under-5" ? "1" : "2"}.jpg`;
}

export function SelectSkip({ wastePercentage, onSkipSelect, _onBack }: SelectSkipProps) {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft",
        );

        let filteredSkips = response.data;
        if (wastePercentage === "under-5") {
          filteredSkips = response.data.filter((skip: Skip) =>
            !skip.allows_heavy_waste && skip.allowed_on_road,
          );
        }
        else if (wastePercentage === "5-10") {
          filteredSkips = response.data.filter((skip: Skip) =>
            skip.allows_heavy_waste && skip.allowed_on_road,
          );
        }
        else {
          filteredSkips = response.data.filter((skip: Skip) =>
            skip.allows_heavy_waste && !skip.allowed_on_road,
          );
        }

        setSkips(filteredSkips);
      }
      catch (err) {
        setError("Failed to load skip options");
        console.warn(err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, [wastePercentage]);

  if (loading) {
    return (
      <SkipContainer>
        <Title>Select Your Skip</Title>
        <Subtitle>Choose the right size for your needs</Subtitle>
        <SkipGridSkeleton>
          {[1, 2, 3, 4].map((_, index) => (
            <SkipCardSkeleton key={index} />
          ))}
        </SkipGridSkeleton>
      </SkipContainer>
    );
  }

  if (error) {
    return (
      <LoadingContainer>
        <WarningOutlined style={{ fontSize: 32, color: "#ff4d4f" }} />
        <Text>{error}</Text>
      </LoadingContainer>
    );
  }

  return (
    <SkipContainer>
      <Title>Choose Your Skip Size</Title>
      <Subtitle>Select the skip size that best suits your needs</Subtitle>

      <SkipGrid>
        {skips.map(skip => (
          <SkipCard key={skip.id}>
            <div className="ant-card-cover">
              <img
                src={getSkipImage(skip.size, skip.allowed_on_road, wastePercentage)}
                alt={`${skip.size} Yard Skip`}
              />
              <YardBadge count={`${skip.size} Yards`} />
              {!skip.allowed_on_road && (
                <WarningOverlay>
                  <WarningOutlined />
                  Not Allowed On Road
                </WarningOverlay>
              )}
            </div>
            <div>
              <Typography.Title level={4} style={{ color: "white", margin: 0 }}>
                {skip.size}
                {" "}
                Yard Skip
              </Typography.Title>
              <HirePeriod>
                {skip.hire_period_days}
                {" "}
                day hire period
              </HirePeriod>
              <Price>
                £
                {skip.price_before_vat}
              </Price>
              <SelectButton
                variant="contained"
                onClick={() => onSkipSelect(skip)}
              >
                Select This Skip →
              </SelectButton>
            </div>
          </SkipCard>
        ))}
      </SkipGrid>
    </SkipContainer>
  );
}
