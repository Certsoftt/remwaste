import { CarOutlined, ClockCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { Card, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

import PrivateRoadModal from "./modals/private-road-modal";
import PublicRoadModal from "./modals/public-road-modal";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 2rem);
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  color: #fff;
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  text-align: center;
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  font-weight: 600;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  margin-bottom: clamp(2rem, 5vw, 3rem);
  line-height: 1.5;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 3vw, 1.5rem);
  margin: clamp(1.5rem, 4vw, 2rem) 0;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const LocationCard = styled(Card)<{ $selected: boolean }>`
  && {
    background: ${props =>
        props.$selected
          ? "linear-gradient(135deg, rgba(25, 118, 210, 0.15), rgba(25, 118, 210, 0.05))"
          : "rgba(255, 255, 255, 0.05)"
    };
    border: 2px solid ${props =>
        props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.1)"
    };
    border-radius: clamp(12px, 2vw, 16px);
    padding: clamp(1.5rem, 4vw, 2rem);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    @media (hover: hover) {
      &:hover {
        transform: translateY(-4px);
        border-color: ${props =>
            props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.2)"
        };
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      }
    }

    @media (max-width: 480px) {
      padding: 1.25rem;
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
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
`;

const IconWrapper = styled.div<{ $selected: boolean }>`
  width: clamp(48px, 10vw, 64px);
  height: clamp(48px, 10vw, 64px);
  border-radius: clamp(12px, 2vw, 16px);
  background: ${props =>
      props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.1)"
  };
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  transition: all 0.3s ease;

  .anticon {
    font-size: clamp(24px, 5vw, 32px);
    color: ${props =>
        props.$selected ? "white" : "rgba(255, 255, 255, 0.7)"
    };
  }

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    
    .anticon {
      font-size: 24px;
    }
  }
`;

const CardTitle = styled.h3<{ $selected: boolean }>`
  color: ${props =>
      props.$selected ? "#1976d2" : "white"
  };
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  font-weight: 600;
  transition: color 0.3s ease;
  line-height: 1.3;
`;

const CardSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.95rem, 2.2vw, 1.1rem);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  line-height: 1.5;
`;

const PermitInfo = styled.div<{ $warning?: boolean }>`
  background: ${props =>
      props.$warning
        ? "rgba(255, 152, 0, 0.1)"
        : "rgba(46, 125, 50, 0.1)"
  };
  border: 1px solid ${props =>
      props.$warning
        ? "rgba(255, 152, 0, 0.2)"
        : "rgba(46, 125, 50, 0.2)"
  };
  border-radius: clamp(6px, 1.5vw, 8px);
  padding: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.9rem, 2vw, 0.95rem);
  color: ${props =>
      props.$warning
        ? "rgba(255, 152, 0, 0.9)"
        : "rgba(46, 125, 50, 0.9)"
  };
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: clamp(0.5rem, 2vw, 1rem);
  margin-top: clamp(2rem, 5vw, 3rem);
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  background: ${props =>
      props.$primary ? "#1976d2" : "rgba(255, 255, 255, 0.1)"
  };
  color: white;
  border: none;
  border-radius: clamp(6px, 1.5vw, 8px);
  padding: clamp(0.65rem, 1.5vw, 0.75rem) clamp(1.5rem, 4vw, 2rem);
  font-size: clamp(0.95rem, 2vw, 1rem);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: clamp(110px, 20vw, 120px);
  width: 100%;

  @media (min-width: 481px) {
    width: auto;
  }

  @media (hover: hover) {
    &:hover {
      background: ${props =>
          props.$primary ? "#1565c0" : "rgba(255, 255, 255, 0.15)"
      };
      transform: translateY(-2px);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const PermitRequiredSection = styled.div`
  margin: clamp(1.5rem, 4vw, 2rem) 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PermitAlert = styled.div`
  background: rgba(25, 118, 210, 0.1);
  border: 1px solid rgba(25, 118, 210, 0.2);
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(1.25rem, 3vw, 1.5rem);
  margin-bottom: clamp(1.25rem, 3vw, 1.5rem);
`;

const PermitTitle = styled.h4`
  color: #1976d2;
  font-size: clamp(1.1rem, 2.5vw, 1.25rem);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  line-height: 1.3;
`;

// Styled component for processing time info
const ProcessingTimeInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;

  .icon {
    font-size: 2rem;
    color: #1976d2;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem 1rem;

    .icon {
      font-size: 1.5rem;
    }
  }
`;

type HistoryStep = {
  selectedLocation: "private" | "public" | null;
  currentStep: "location" | "next";
};

type PermitCheckProps = {
  onBack: () => void;
  onContinue: (location: "private" | "public") => void;
  initialData?: {
    selectedLocation: "private" | "public" | null;
  };
};

export default function PermitCheck({ onBack, onContinue, initialData }: PermitCheckProps) {
  const [selectedLocation, setSelectedLocation] = useState<"private" | "public" | null>(
    initialData?.selectedLocation || null,
  );
  const [history, setHistory] = useState<HistoryStep[]>([]);
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [showPrivateModal, setShowPrivateModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData?.selectedLocation) {
      setSelectedLocation(initialData.selectedLocation);
    }
  }, [initialData]);

  const addToHistory = (step: HistoryStep) => {
    setHistory(prev => [...prev, step]);
    console.warn(history);
  };

  const handleLocationSelect = (location: "private" | "public") => {
    setSelectedLocation(location);
  };

  const handleBack = () => {
    // Save current state to history before going back
    addToHistory({
      selectedLocation,
      currentStep: "location",
    });
    onBack();
  };

  const handleContinue = () => {
    if (selectedLocation) {
      // Save current state to history
      addToHistory({
        selectedLocation,
        currentStep: "next",
      });

      // Show appropriate modal based on selection
      if (selectedLocation === "public") {
        setShowPublicModal(true);
      }
      else {
        setShowPrivateModal(true);
      }
    }
  };

  const handleModalUpload = (file: File) => {
    setUploadedFile(file);
    console.warn(uploadedFile);
  };

  const handleModalCancel = () => {
    setShowPublicModal(false);
    setShowPrivateModal(false);
  };

  const handleModalContinue = () => {
    setShowPublicModal(false);
    setShowPrivateModal(false);
    onContinue(selectedLocation!);
  };

  return (
    <Fade in timeout={500}>
      <Container>
        <Title>Where will the skip be placed?</Title>
        <Subtitle>
          This helps us determine if you need a permit for your skip
        </Subtitle>

        <OptionsGrid>
          <LocationCard
            $selected={selectedLocation === "private"}
            onClick={() => handleLocationSelect("private")}
          >
            <CardContent>
              <IconWrapper $selected={selectedLocation === "private"}>
                <HomeOutlined />
              </IconWrapper>
              <CardTitle $selected={selectedLocation === "private"}>
                Private Property
              </CardTitle>
              <CardSubtitle>
                Driveway or private land
              </CardSubtitle>
              <PermitInfo>
                No permit required when placed on your private property
              </PermitInfo>
            </CardContent>
          </LocationCard>

          <LocationCard
            $selected={selectedLocation === "public"}
            onClick={() => handleLocationSelect("public")}
          >
            <CardContent>
              <IconWrapper $selected={selectedLocation === "public"}>
                <CarOutlined />
              </IconWrapper>
              <CardTitle $selected={selectedLocation === "public"}>
                Public Road
              </CardTitle>
              <CardSubtitle>
                Council or public property
              </CardSubtitle>
              <PermitInfo $warning>
                Permit required for placement on public roads
              </PermitInfo>
            </CardContent>
          </LocationCard>
        </OptionsGrid>

        <PermitRequiredSection className={selectedLocation === "public" ? "visible" : ""}>
          <PermitAlert>
            <PermitTitle>
              <span>Permit Required</span>
            </PermitTitle>
            <p>A permit is required when placing a skip on a public road. We'll handle the permit application process for you.</p>
          </PermitAlert>

          <ProcessingTimeInfo>
            <ClockCircleOutlined className="icon" />
            <div>
              <h4 style={{ color: "white", marginBottom: "0.5rem" }}>Processing Time</h4>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", margin: 0 }}>
                The council requires 1 working days notice to process permit applications. Please plan your delivery date accordingly.
              </p>
            </div>
          </ProcessingTimeInfo>
        </PermitRequiredSection>

        <ButtonContainer>
          <ActionButton onClick={handleBack}>
            Back
          </ActionButton>
          <ActionButton
            $primary
            onClick={handleContinue}
            disabled={!selectedLocation}
          >
            Continue
          </ActionButton>
        </ButtonContainer>

        <PublicRoadModal
          open={showPublicModal}
          onClose={() => setShowPublicModal(false)}
          onUpload={handleModalUpload}
          onCancel={handleModalCancel}
          onContinue={handleModalContinue}
        />

        <PrivateRoadModal
          open={showPrivateModal}
          onClose={() => setShowPrivateModal(false)}
          onUpload={handleModalUpload}
          onCancel={handleModalCancel}
          onContinue={handleModalContinue}
        />
      </Container>
    </Fade>
  );
}
