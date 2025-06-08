import { InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Fade } from "@mui/material";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { ImageContainer } from "./heavy-waste-percentage-modal";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(30, 30, 35, 0.98);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: clamp(12px, 2vw, 16px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    margin: clamp(10px, 3vw, 20px);
    width: calc(100% - clamp(20px, 6vw, 40px)) !important;
  }

  .ant-modal-body {
    padding: 0;
  }
`;

const ContentContainer = styled.div`
  padding: clamp(1.25rem, 4vw, 2rem) clamp(1rem, 3vw, 1.5rem);
`;

const Title = styled.h2`
  color: white;
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  text-align: center;
  font-weight: 600;
  line-height: 1.3;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
`;

const PercentageOption = styled.button<{ $selected?: boolean }>`
  background: ${props => props.$selected ? "rgba(25, 118, 210, 0.2)" : "rgba(255, 255, 255, 0.05)"};
  border: 2px solid ${props => props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.1)"};
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(0.875rem, 2.5vw, 1rem);
  color: white;
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  position: relative;
  overflow: hidden;
  min-height: clamp(60px, 15vw, 80px);

  &:hover {
    background: ${props => props.$selected ? "rgba(25, 118, 210, 0.25)" : "rgba(255, 255, 255, 0.1)"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  /* Touch device optimizations */
  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(25, 118, 210, 0.2), transparent 70%);
    opacity: ${props => props.$selected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const InfoBox = styled.div`
  background: rgba(25, 118, 210, 0.1);
  border: 1px solid rgba(25, 118, 210, 0.2);
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(1.25rem, 3vw, 1.5rem);
  margin: clamp(1.5rem, 4vw, 2rem) 0;
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  align-items: flex-start;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const InfoIcon = styled(InfoCircleOutlined)`
  color: #1976d2;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  flex-shrink: 0;
  margin-top: 0.2rem;

  @media (max-width: 480px) {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const InfoText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.875rem, 2.5vw, 0.95rem);
  line-height: 1.5;

  strong {
    color: white;
    display: block;
    margin-bottom: clamp(0.375rem, 1.5vw, 0.5rem);
    font-size: clamp(0.95rem, 2.5vw, 1rem);
  }
`;

const ImportantNote = styled.div`
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid rgba(255, 152, 0, 0.2);
  border-radius: clamp(6px, 1.5vw, 8px);
  padding: clamp(0.875rem, 2.5vw, 1rem);
  margin-top: clamp(1.25rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(0.825rem, 2.25vw, 0.9rem);
  line-height: 1.5;
`;

const WarningNote = styled(ImportantNote)`
  background: rgba(255, 77, 79, 0.1);
  border-color: rgba(255, 77, 79, 0.2);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-top: clamp(1.5rem, 4vw, 2rem);

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary ? "#1976d2" : "rgba(255, 255, 255, 0.1)"};
  color: white;
  border: none;
  border-radius: clamp(6px, 1.5vw, 8px);
  padding: clamp(0.625rem, 2vw, 0.75rem) clamp(1.25rem, 3vw, 1.5rem);
  font-size: clamp(0.9375rem, 2.5vw, 1rem);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: clamp(100px, 25vw, 120px);
  width: 100%;

  &:hover {
    background: ${props => props.$primary ? "#1565c0" : "rgba(255, 255, 255, 0.15)"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: 481px) {
    width: auto;
  }

  /* Touch device optimizations */
  @media (hover: none) {
    &:active {
      background: ${props => props.$primary ? "#1565c0" : "rgba(255, 255, 255, 0.15)"};
    }
  }
`;

type PercentageContent = {
  infoTitle: string;
  infoText: string;
  noteType: "info" | "warning";
  noteText: string;
};

const percentageContents: Record<string, PercentageContent> = {
  "under-5": {
    infoTitle: "No Permit Bag Required",
    infoText: "For small amounts of plasterboard (under 5%), you need to have your own bag to separate plasterboard from other waste in the skip.",
    noteType: "info",
    noteText: "Important: Plasterboard has to be disposed of separately and cannot be mixed with other waste. Failing to do this could result in additional charges.",
  },
  "5-10": {
    infoTitle: "Permit Bag Required",
    infoText: "For amounts between 5-10%, you will need a special permit bag to dispose of your plasterboard. This will be provided with your skip.",
    noteType: "info",
    noteText: "Important: Plasterboard must be placed in the provided permit bag and kept separate from other waste materials.",
  },
  "over-10": {
    infoTitle: "Not Permitted",
    infoText: "We cannot accept skips containing more than 10% plasterboard due to environmental regulations and disposal restrictions.",
    noteType: "warning",
    noteText: "Warning: Please consider hiring a specialized plasterboard disposal service for larger amounts of plasterboard waste.",
  },
};

type HistoryStep = {
  selectedPercentage: string | null;
  currentStep: "plasterboard" | "skip";
};

type PlasterboardPercentageModalProps = {
  open: boolean;
  onClose: () => void;
  onShowSkipSelector: () => void;
  onBack: () => void;
  initialData?: {
    selectedPercentage: string | null;
  };
  onPercentageSelect: (percentage: string) => void;
  selectedPercentage: string | null;
};

export default function PlasterboardPercentageModal({
  open,
  onClose,
  onShowSkipSelector,
  onBack,
  initialData,
}: PlasterboardPercentageModalProps) {
  const [selectedPercentage, setSelectedPercentage] = useState<string | null>(
    initialData?.selectedPercentage || "under-5",
  );
  const [_history, setHistory] = useState<HistoryStep[]>([]);

  const percentageOptions = [
    { value: "under-5", label: "Under 5%" },
    { value: "5-10", label: "5-10%" },
    { value: "over-10", label: "Over 10%" },
  ];

  useEffect(() => {
    // Set default selection when modal opens
    if (open && !selectedPercentage) {
      setSelectedPercentage("under-5");
    }
  }, [open]);

  useEffect(() => {
    if (initialData?.selectedPercentage) {
      setSelectedPercentage(initialData.selectedPercentage);
    }
  }, [initialData]);

  const addToHistory = (step: HistoryStep) => {
    setHistory(prev => [...prev, step]);
  };

  const handleSelect = (value: string) => {
    setSelectedPercentage(value);
  };

  const handleBack = () => {
    // Save current state to history before going back
    addToHistory({
      selectedPercentage,
      currentStep: "plasterboard",
    });
    onBack();
  };

  const handleContinue = () => {
    if (selectedPercentage) {
      // Save current state to history and proceed to skip selector
      addToHistory({
        selectedPercentage,
        currentStep: "skip",
      });
      onShowSkipSelector();
    }
  };

  const currentContent = selectedPercentage ? percentageContents[selectedPercentage] : percentageContents["under-5"];

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
        <ContentContainer>
          <Title>What percentage of plasterboard would fill your skip?</Title>

          <OptionsGrid>
            {percentageOptions.map(option => (
              <PercentageOption
                key={option.value}
                $selected={selectedPercentage === option.value}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </PercentageOption>
            ))}
          </OptionsGrid>

          <ImageContainer>
            <img
              src="/src/assets/plasterboard.png"
              alt="Plasterboard waste guide"
            />
          </ImageContainer>

          <InfoBox>
            <InfoIcon />
            <InfoText>
              <strong>{currentContent.infoTitle}</strong>
              {currentContent.infoText}
            </InfoText>
          </InfoBox>

          {currentContent.noteType === "warning"
            ? (
                <WarningNote>
                  <WarningOutlined style={{ marginRight: "8px", color: "#ff4d4f" }} />
                  {currentContent.noteText}
                </WarningNote>
              )
            : (
                <ImportantNote>
                  {currentContent.noteText}
                </ImportantNote>
              )}

          <ButtonContainer>
            <ActionButton onClick={handleBack}>
              Back
            </ActionButton>
            <ActionButton
              $primary
              onClick={handleContinue}
            >
              Continue
            </ActionButton>
          </ButtonContainer>
        </ContentContainer>
      </StyledModal>
    </Fade>
  );
}
