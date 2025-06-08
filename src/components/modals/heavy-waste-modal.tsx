import { Button, Fade } from "@mui/material";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(30, 30, 35, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: clamp(12px, 2vw, 16px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    width: 90vw !important;
    max-width: 600px;
    margin: 0 auto;
    
    .ant-modal-header {
      background: transparent;
      border-bottom: none;
      padding: clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px) 0;
    }

    .ant-modal-body {
      padding: clamp(16px, 3vw, 20px) clamp(16px, 4vw, 24px);
    }

    .ant-modal-footer {
      border-top: none;
      padding: clamp(16px, 3vw, 16px) clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px);
    }

    @media (max-width: 480px) {
      border-radius: 12px;
      margin: 1rem;
    }
  }
`;

const Title = styled.h3`
  color: #fff;
  font-size: clamp(1.25rem, 3.5vw, 1.5rem);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  text-align: center;
  font-weight: 600;
  line-height: 1.3;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  font-size: clamp(0.95rem, 2.2vw, 1rem);
  line-height: 1.5;
`;

const WasteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(120px, 100%), 1fr));
  gap: clamp(0.75rem, 2vw, 1rem);
  margin: clamp(1rem, 3vw, 1.5rem) 0;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const WasteOption = styled.div<{ $selected: boolean }>`
  background: ${props =>
    props.$selected ? "rgba(25, 118, 210, 0.2)" : "rgba(255, 255, 255, 0.05)"};
  border: 2px solid ${props =>
    props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.1)"};
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(0.75rem, 2vw, 1rem);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (hover: hover) {
    &:hover {
      border-color: ${props => props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.2)"};
      transform: translateY(-2px);
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
      rgba(25, 118, 210, 0.2),
      transparent 70%
    );
    opacity: ${props => props.$selected ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    border-radius: 8px;
    min-height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const WasteText = styled.span`
  color: white;
  font-size: clamp(0.9rem, 2.2vw, 0.95rem);
  font-weight: 500;
  position: relative;
  z-index: 1;
  line-height: 1.3;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  justify-content: center;
  margin-top: clamp(1.5rem, 4vw, 2rem);

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const StyledButton = styled(Button)<{ $variant?: "primary" | "secondary" }>`
  && {
    min-width: clamp(120px, 25vw, 140px);
    height: clamp(44px, 7vh, 48px);
    border-radius: clamp(6px, 1.5vw, 8px);
    font-size: clamp(0.95rem, 2.2vw, 1rem);
    text-transform: none;
    background: ${props => props.$variant === "primary" ? "#1976d2" : "rgba(255, 255, 255, 0.1)"};
    color: ${props => props.$variant === "primary" ? "white" : "rgba(255, 255, 255, 0.9)"};

    @media (hover: hover) {
      &:hover {
        background: ${props => props.$variant === "primary" ? "#1565c0" : "rgba(255, 255, 255, 0.15)"};
      }
    }

    @media (max-width: 480px) {
      width: 100%;
      min-width: unset;
      height: 44px;
    }
  }
`;

const heavyWasteTypes = [
  "Soil",
  "Concrete",
  "Bricks",
  "Tiles",
  "Sand",
  "Gravel",
  "Rubble",
];

type HistoryStep = {
  selectedTypes: string[];
  currentStep: "heavy" | "noHeavy" | "percentage";
};

type HeavyWasteModalProps = {
  open: boolean;
  onClose: () => void;
  onContinue: (selectedTypes: string[]) => void;
  onNoneSelected: () => void;
  onBack?: () => void;
  initialData?: {
    selectedTypes: string[];
  };
};

export default function HeavyWasteModal({
  open,
  onClose,
  onContinue,
  onNoneSelected,
  onBack,
  initialData,
}: HeavyWasteModalProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialData?.selectedTypes || []);
  const [_history, setHistory] = useState<HistoryStep[]>([]);

  useEffect(() => {
    if (initialData?.selectedTypes) {
      setSelectedTypes(initialData.selectedTypes);
    }
  }, [initialData]);

  const addToHistory = (step: HistoryStep) => {
    setHistory(prev => [...prev, step]);
  };

  const toggleWasteType = (type: string) => {
    setSelectedTypes((prev) => {
      const newTypes = prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type];
      return newTypes;
    });
  };

  const handleBack = () => {
    if (onBack) {
      // Save current state to history before going back
      addToHistory({
        selectedTypes,
        currentStep: "heavy",
      });
      onBack();
    }
  };

  const handleNoneSelected = () => {
    // Save current state to history
    addToHistory({
      selectedTypes: [],
      currentStep: "noHeavy",
    });
    setSelectedTypes([]);
    onNoneSelected();
  };

  const handleContinue = () => {
    // Save current state to history
    addToHistory({
      selectedTypes,
      currentStep: selectedTypes.length > 0 ? "percentage" : "noHeavy",
    });
    onContinue(selectedTypes);
  };

  return (
    <Fade in={open} timeout={300}>
      <StyledModal
        open={open}
        onCancel={onClose}
        footer={null}
        width={600}
        centered
        closable={false}
      >
        <Title>Do You Have Any Heavy Waste Types?</Title>
        <Subtitle>Select all types of heavy waste you need to dispose of</Subtitle>

        <WasteGrid>
          {heavyWasteTypes.map(type => (
            <WasteOption
              key={type}
              $selected={selectedTypes.includes(type)}
              onClick={() => toggleWasteType(type)}
            >
              <WasteText>{type}</WasteText>
            </WasteOption>
          ))}
        </WasteGrid>

        <ButtonGroup>
          <StyledButton
            $variant="secondary"
            onClick={handleBack}
          >
            Back
          </StyledButton>
          <StyledButton
            $variant="secondary"
            onClick={handleNoneSelected}
          >
            I Don't Have Any
          </StyledButton>
          <StyledButton
            $variant="primary"
            onClick={handleContinue}
          >
            Continue
          </StyledButton>
        </ButtonGroup>
      </StyledModal>
    </Fade>
  );
}
