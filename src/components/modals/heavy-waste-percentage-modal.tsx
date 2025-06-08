import { WarningOutlined } from "@ant-design/icons";
import { Fade } from "@mui/material";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(30, 30, 35, 0.98);
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

const ContentContainer = styled.div`
  text-align: center;
  padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 2vw, 1rem);
`;

const WarningIcon = styled(WarningOutlined)`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  color: #ffd700;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
`;

const Title = styled.h3`
  color: #fff;
  font-size: clamp(1.35rem, 4vw, 1.75rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  font-weight: 600;
  line-height: 1.3;
`;

const Notice = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  
  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: clamp(0.95rem, 2.5vw, 1.1rem);
    line-height: 1.6;
    margin: 0;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(0.75rem, 2vw, 1rem);
  margin: clamp(1.5rem, 4vw, 2rem) 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const PercentageOption = styled.button<{ $selected: boolean }>`
  background: ${props =>
    props.$selected ? "rgba(25, 118, 210, 0.3)" : "rgba(255, 255, 255, 0.05)"};
  border: 2px solid ${props =>
    props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.1)"};
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(1rem, 2.5vw, 1.25rem) clamp(0.75rem, 2vw, 1rem);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.35rem, 1vw, 0.5rem);
  width: 100%;
  min-height: clamp(90px, 15vh, 120px);

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      border-color: ${props =>
        props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.2)"};
    }
  }

  .percentage {
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    font-weight: 600;
    color: ${props =>
      props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.9)"};
  }

  .label {
    font-size: clamp(0.85rem, 2vw, 0.9rem);
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    min-height: 80px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-top: clamp(1.5rem, 4vw, 2rem);

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  background: ${props =>
    props.$primary ? "#1976d2" : "rgba(255, 255, 255, 0.1)"};
  color: white;
  border: none;
  border-radius: clamp(6px, 1.5vw, 8px);
  padding: clamp(0.65rem, 1.5vw, 0.75rem) clamp(1.25rem, 3vw, 1.5rem);
  font-size: clamp(0.95rem, 2.2vw, 1rem);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: clamp(110px, 20vw, 120px);

  @media (hover: hover) {
    &:hover {
      background: ${props =>
        props.$primary ? "#1565c0" : "rgba(255, 255, 255, 0.15)"};
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    min-width: unset;
    padding: 0.75rem;
  }
`;

const percentageOptions = [
  { value: "under-5", label: "Under 5%" },
  { value: "5-10", label: "5-10%" },
  { value: "10-20", label: "10-20%" },
  { value: "over-20", label: "Over 20%" },
];

export const ImageContainer = styled.div`
  margin: clamp(1.5rem, 4vw, 2rem) 0;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: clamp(8px, 2vw, 12px);
  }
`;

type HistoryStep = {
  selectedPercentage: string | null;
  currentStep: "heavyPercentage" | "skip";
};

type HeavyWastePercentageModalProps = {
  open: boolean;
  onClose: () => void;
  onPercentageSelect: (percentage: string) => void;
  onShowSkipSelector: () => void;
  onBack: () => void;
  initialData?: {
    selectedPercentage: string | null;
  };
};

export default function HeavyWastePercentageModal({
  open,
  onClose,
  onPercentageSelect,
  onShowSkipSelector,
  onBack,
  initialData,
}: HeavyWastePercentageModalProps) {
  const [selectedPercentage, setSelectedPercentage] = useState<string | null>(
    initialData?.selectedPercentage || "under-5",
  );
  const [_history, setHistory] = useState<HistoryStep[]>([]);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // Set default selection when modal opens
    if (open && !selectedPercentage) {
      setSelectedPercentage("under-5");
    }
  }, [open, selectedPercentage]);

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
    setShowImage(true);
  };

  const handleBack = () => {
    // Save current state to history before going back
    addToHistory({
      selectedPercentage,
      currentStep: "heavyPercentage",
    });
    onBack();
  };

  const handleContinue = () => {
    if (selectedPercentage) {
      // Save current state to history
      addToHistory({
        selectedPercentage,
        currentStep: "skip",
      });
      onPercentageSelect(selectedPercentage);
      onShowSkipSelector();
    }
  };

  return (
    <Fade in={open} timeout={300}>
      <StyledModal
        open={open}
        onCancel={onClose}
        footer={null}
        width={700}
        centered
        closable={false}
      >
        <ContentContainer>
          <WarningIcon />
          <Title>How Much Heavy Waste Will You Put In The Skip?</Title>

          <Notice>
            <p>
              Our skip trucks have weight restrictions, we cannot lift skips that weigh
              too much or transport them safely. Tell us how much heavy waste you will
              be putting in your skip and we will tell you which size is available.
            </p>
          </Notice>

          <OptionsGrid>
            {percentageOptions.map(option => (
              <PercentageOption
                key={option.value}
                $selected={selectedPercentage === option.value}
                onClick={() => handleSelect(option.value)}
              >
                <span className="percentage">{option.label.split(" ")[0]}</span>
                <span className="label">of skip</span>
              </PercentageOption>
            ))}
          </OptionsGrid>

          {showImage && (
            <ImageContainer>
              <img
                src="/src/assets/plasterboard.png"
                alt="Plasterboard waste guide"
              />
            </ImageContainer>
          )}

          <ButtonContainer>
            <ActionButton onClick={handleBack}>
              Back
            </ActionButton>
            <ActionButton
              $primary
              onClick={handleContinue}
              disabled={!selectedPercentage}
            >
              Continue
            </ActionButton>
          </ButtonContainer>
        </ContentContainer>
      </StyledModal>
    </Fade>
  );
}
