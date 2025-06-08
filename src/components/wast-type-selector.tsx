import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Fade } from "@mui/material";
import { Button, Checkbox, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { wasteTypes } from "../mock/waste-types";
import HeavyWasteModal from "./modals/heavy-waste-modal";
import HeavyWastePercentageModal from "./modals/heavy-waste-percentage-modal";
import NoHeavyWasteModal from "./modals/no-heavy-waste-modal";
import { TextLineSkeleton, WasteCardSkeleton, WasteTypeGridSkeleton } from "./styled/skeleton";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 2rem);
  position: relative;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);

  h2 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
    background: linear-gradient(45deg, #fff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: clamp(0.95rem, 2.5vw, 1.1rem);
    line-height: 1.5;
    padding: 0 clamp(0.5rem, 2vw, 1rem);
  }
`;

const WasteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: clamp(1rem, 3vw, 1.5rem);
  margin: clamp(1.5rem, 4vw, 2rem) 0;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const WasteCard = styled.div<{ $selected: boolean }>`
  background: ${props =>
    props.$selected
      ? "rgba(25, 118, 210, 0.15)"
      : "rgba(255, 255, 255, 0.05)"};
  border: 2px solid ${props =>
    props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.1)"};
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(1rem, 3vw, 1.5rem);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      border-color: ${props =>
        props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.2)"};
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at top right,
      rgba(25, 118, 210, 0.1),
      transparent 70%
    );
    opacity: ${props => (props.$selected ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 8px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  gap: 1rem;
`;

const CardTitle = styled.h3`
  font-size: clamp(1.1rem, 2.8vw, 1.2rem);
  color: white;
  margin: 0;
  line-height: 1.3;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.9rem, 2.2vw, 0.95rem);
  margin: 0;
  line-height: 1.5;
`;

const RestrictionsInfo = styled.div`
  margin-top: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.8rem, 2vw, 0.85rem);
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.4;
`;

const BackButton = styled.button`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  position: absolute;
  left: clamp(1rem, 4vw, 2rem);
  top: clamp(1rem, 4vw, 2rem);
  background: none;
  border: none;
  cursor: pointer;
  padding: clamp(0.5rem, 1.5vw, 0.75rem);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    left: 1rem;
    top: 1rem;
  }
`;

const ActionButton = styled(Button)`
  &.ant-btn {
    height: clamp(44px, 8vh, 50px);
    padding: 0 clamp(1.5rem, 4vw, 2rem);
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    border-radius: clamp(6px, 1.5vw, 8px);
    background: #1976d2;
    border: none;
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.2);

    @media (hover: hover) {
      &:hover:not(:disabled) {
        background: #1565c0;
      }
    }

    &:disabled {
      background: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 480px) {
      height: 44px;
      padding: 0 1.5rem;
      font-size: 1rem;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: clamp(1.5rem, 4vw, 2rem);
  padding: 0 clamp(0.5rem, 2vw, 1rem);

  @media (max-width: 480px) {
    margin-top: 1.5rem;
    padding: 0 0.5rem;
  }
`;

type NavigationStep = {
  selectedTypes: string[];
  heavyWasteTypes: string[];
  heavyWastePercentage?: string;
  currentModal: "none" | "heavy" | "noHeavy" | "percentage";
};

type WasteTypeSelectorProps = {
  onBack: () => void;
  onContinue: (
    selectedTypes: string[],
    heavyWasteTypes: string[],
    heavyWastePercentage?: string,
  ) => void;
  initialData?: {
    selectedTypes: string[];
    heavyWasteTypes: string[];
    heavyWastePercentage?: string;
  };
};

export default function WasteTypeSelector({
  onBack,
  onContinue,
  initialData,
}: WasteTypeSelectorProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialData?.selectedTypes || []);
  const [showHeavyWasteModal, setShowHeavyWasteModal] = useState(false);
  const [showNoHeavyWasteModal, setShowNoHeavyWasteModal] = useState(false);
  const [showPercentageModal, setShowPercentageModal] = useState(false);
  const [heavyWasteTypes, setHeavyWasteTypes] = useState<string[]>(initialData?.heavyWasteTypes || []);
  const [awaitingPercentage, setAwaitingPercentage] = useState(false);
  const [_navigationHistory, setNavigationHistory] = useState<NavigationStep[]>([{
    selectedTypes: initialData?.selectedTypes || [],
    heavyWasteTypes: initialData?.heavyWasteTypes || [],
    heavyWastePercentage: initialData?.heavyWastePercentage,
    currentModal: "none",
  }]);

  const [loading, setLoading] = useState(true);

  const toggleWasteType = (id: string) => {
    setSelectedTypes(prev =>
      prev.includes(id)
        ? prev.filter(type => type !== id)
        : [...prev, id],
    );
  };

  const handleContinue = () => {
    if (awaitingPercentage) {
      setShowPercentageModal(true);
    }
    else {
      setShowHeavyWasteModal(true);
    }
  };

  const handleHeavyWasteSelect = (types: string[]) => {
    setHeavyWasteTypes(types);
    setShowHeavyWasteModal(false);
    if (types.length > 0) {
      setAwaitingPercentage(true);
      setShowPercentageModal(true);
    }
    else {
      setAwaitingPercentage(false);
      setShowNoHeavyWasteModal(true);
    }
  };

  const handleNoHeavyWaste = () => {
    setHeavyWasteTypes([]);
    setShowHeavyWasteModal(false);
    setShowNoHeavyWasteModal(true);
  };

  const handleConfirmNoHeavyWaste = () => {
    setShowNoHeavyWasteModal(false);
    onContinue(selectedTypes, []);
  };

  const handleGoBackToHeavyWaste = () => {
    setShowNoHeavyWasteModal(false);
    setShowHeavyWasteModal(true);
  };

  const handlePercentageSelect = (percentage: string) => {
    setShowPercentageModal(false);
    setAwaitingPercentage(false);
    onContinue(selectedTypes, heavyWasteTypes, percentage);
  };

  useEffect(() => {
    // Update navigation history on selection or modal open
    setNavigationHistory(prev => [
      ...prev,
      {
        selectedTypes,
        heavyWasteTypes,
        heavyWastePercentage: awaitingPercentage ? undefined : heavyWasteTypes.join(","),
        currentModal: showHeavyWasteModal
          ? "heavy"
          : showNoHeavyWasteModal
            ? "noHeavy"
            : showPercentageModal
              ? "percentage"
              : "none",
      },
    ]);
  }, [selectedTypes, showHeavyWasteModal, showNoHeavyWasteModal, showPercentageModal, heavyWasteTypes, awaitingPercentage]);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        // Your data fetching logic here
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        setLoading(false);
      }
      catch (error) {
        console.error("Error loading waste types:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Header>
          <TextLineSkeleton $width="60%" $height="32px" />
          <TextLineSkeleton $width="80%" $height="24px" />
        </Header>
        <WasteTypeGridSkeleton>
          {[1, 2, 3, 4].map((_, index) => (
            <WasteCardSkeleton key={index} />
          ))}
        </WasteTypeGridSkeleton>
      </Container>
    );
  }

  return (
    <Fade in timeout={500}>
      <Container>
        <BackButton onClick={onBack}>
          <ArrowLeftOutlined />
        </BackButton>

        <Header>
          <h2>What type of waste are you disposing of?</h2>
          <p>Select all that apply</p>
        </Header>

        <WasteGrid>
          {wasteTypes.map(waste => (
            <WasteCard
              key={waste.id}
              $selected={selectedTypes.includes(waste.id)}
              onClick={() => toggleWasteType(waste.id)}
            >
              <CardHeader>
                <CardTitle>{waste.title}</CardTitle>
                <Checkbox
                  checked={selectedTypes.includes(waste.id)}
                  onChange={() => toggleWasteType(waste.id)}
                />
              </CardHeader>
              <CardDescription>{waste.description}</CardDescription>
              {waste.restrictions && (
                <RestrictionsInfo>
                  <Tooltip
                    title={(
                      <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                        {waste.restrictions.map(restriction => (
                          <li key={restriction}>{restriction}</li>
                        ))}
                      </ul>
                    )}
                  >
                    <InfoCircleOutlined style={{ marginRight: "0.5rem" }} />
                    Restrictions apply
                  </Tooltip>
                </RestrictionsInfo>
              )}
            </WasteCard>
          ))}
        </WasteGrid>

        <ButtonContainer>
          <ActionButton
            type="primary"
            disabled={selectedTypes.length === 0}
            onClick={handleContinue}
          >
            Continue
          </ActionButton>
        </ButtonContainer>

        <HeavyWasteModal
          open={showHeavyWasteModal}
          onClose={() => setShowHeavyWasteModal(false)}
          onContinue={handleHeavyWasteSelect}
          onNoneSelected={handleNoHeavyWaste}
        />

        <NoHeavyWasteModal
          open={showNoHeavyWasteModal}
          onClose={() => setShowNoHeavyWasteModal(false)}
          onConfirm={handleConfirmNoHeavyWaste}
          onGoBack={handleGoBackToHeavyWaste}
          onShowSkipSelector={() => {}}
        />

        <HeavyWastePercentageModal
          open={showPercentageModal}
          onClose={() => setShowPercentageModal(false)}
          onPercentageSelect={handlePercentageSelect}
          onShowSkipSelector={() => {}}
          onBack={() => setShowPercentageModal(false)}
        />
      </Container>
    </Fade>
  );
}
