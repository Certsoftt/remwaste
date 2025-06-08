import { QuestionCircleOutlined } from "@ant-design/icons";
import { Fade } from "@mui/material";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

import PlasterboardPercentageModal from "./plasterboard-percentage-modal";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(30, 30, 35, 0.98);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: clamp(12px, 2vw, 16px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    width: 90vw !important;
    max-width: 500px;
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

const IconWrapper = styled.div`
  margin-bottom: clamp(1rem, 3vw, 1.5rem);

  .anticon {
    font-size: clamp(2.25rem, 5vw, 3rem);
    color: #1976d2;
  }
`;

const Title = styled.h3`
  color: #fff;
  font-size: clamp(1.25rem, 3.5vw, 1.5rem);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  font-weight: 600;
  line-height: 1.3;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.6;
  padding: 0 clamp(0.5rem, 2vw, 1rem);
`;

const Note = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: clamp(0.85rem, 2vw, 0.9rem);
  font-style: italic;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.5;
  padding: 0 clamp(0.5rem, 2vw, 1rem);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 0 clamp(0.5rem, 2vw, 1rem);
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
    border: none;

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

type HistoryStep = {
  selectedPercentage: string | null;
  currentStep: "noHeavy" | "plasterboard" | "skip";
};

type NoHeavyWasteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (plasterboardPercentage?: string) => void;
  onGoBack: () => void;
  onShowSkipSelector: () => void;
  initialData?: {
    selectedPercentage: string | null;
  };
};

export default function NoHeavyWasteModal({
  open,
  onClose,
  onConfirm,
  onGoBack,
  onShowSkipSelector,
  initialData,
}: NoHeavyWasteModalProps) {
  const [showPlasterboardModal, setShowPlasterboardModal] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState<string | null>(
    initialData?.selectedPercentage || null,
  );
  const [_history, setHistory] = useState<HistoryStep[]>([]);

  useEffect(() => {
    if (initialData?.selectedPercentage) {
      setSelectedPercentage(initialData.selectedPercentage);
    }
  }, [initialData]);

  const addToHistory = (step: HistoryStep) => {
    setHistory(prev => [...prev, step]);
  };

  const handleBack = () => {
    // Save current state to history before going back
    addToHistory({
      selectedPercentage,
      currentStep: "noHeavy",
    });
    onGoBack();
  };

  const handleNo = () => {
    // Save current state and show skip selector
    addToHistory({
      selectedPercentage: null,
      currentStep: "skip",
    });
    onShowSkipSelector();
  };

  const handleYes = () => {
    // Save current state and show plasterboard modal
    addToHistory({
      selectedPercentage,
      currentStep: "plasterboard",
    });
    setShowPlasterboardModal(true);
  };

  const handlePercentageSelect = (percentage: string) => {
    setSelectedPercentage(percentage);
    setShowPlasterboardModal(false);
    onConfirm(percentage);
  };

  return (
    <Fade in={open} timeout={300}>
      <>
        <StyledModal
          open={open}
          onCancel={onClose}
          footer={null}
          width={500}
          centered
          closable={false}
        >
          <ContentContainer>
            <IconWrapper>
              <QuestionCircleOutlined />
            </IconWrapper>

            <Title>Do You Have Any Plasterboard?</Title>

            <Description>
              Let us know if you have any plasterboard waste that needs to be disposed of separately.
            </Description>

            <Note>
              Please note: Incorrect waste type declaration may result in additional charges
              or service refusal.
            </Note>

            <ButtonGroup>
              <StyledButton
                $variant="secondary"
                onClick={handleBack}
              >
                Back
              </StyledButton>
              <StyledButton
                $variant="secondary"
                onClick={handleNo}
              >
                No
              </StyledButton>
              <StyledButton
                $variant="primary"
                onClick={handleYes}
              >
                Yes
              </StyledButton>
            </ButtonGroup>
          </ContentContainer>
        </StyledModal>

        <PlasterboardPercentageModal
          open={showPlasterboardModal}
          onClose={() => setShowPlasterboardModal(false)}
          selectedPercentage={selectedPercentage}
          onPercentageSelect={handlePercentageSelect}
          initialData={selectedPercentage ? { selectedPercentage } : undefined}
          onShowSkipSelector={onShowSkipSelector}
          onBack={() => setShowPlasterboardModal(false)}
        />
      </>
    </Fade>
  );
}
