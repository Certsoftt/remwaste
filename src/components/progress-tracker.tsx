import { Check } from "@mui/icons-material";
import styled from "styled-components";

const ProgressContainer = styled.div`
  position: fixed;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const ProgressLine = styled.div<{ $progress: number }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    #1976d2 ${props => props.$progress}%,
    rgba(255, 255, 255, 0.2) ${props => props.$progress}%
  );
  z-index: -1;
`;

const StepCircle = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.$completed
      ? "#1976d2"
      : props.$active
        ? "rgba(25, 118, 210, 0.2)"
        : "rgba(255, 255, 255, 0.1)"};
  border: 2px solid
    ${props =>
      props.$completed || props.$active ? "#1976d2" : "rgba(255, 255, 255, 0.2)"};
  color: ${props =>
    props.$completed
      ? "white"
      : props.$active
        ? "#1976d2"
        : "rgba(255, 255, 255, 0.5)"};
  transition: all 0.3s ease;

  svg {
    font-size: 20px;
  }
`;

const StepLabel = styled.span<{ $active?: boolean; $completed?: boolean }>`
  position: absolute;
  left: calc(100% + 1rem);
  white-space: nowrap;
  color: ${props =>
    props.$completed || props.$active ? "white" : "rgba(255, 255, 255, 0.5)"};
  font-size: 0.9rem;
  transition: all 0.3s ease;
`;

const Step = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
`;

type ProgressTrackerProps = {
  currentStep: number;
  steps: Array<{
    label: string;
    icon?: React.ReactNode;
  }>;
};

export function ProgressTracker({ currentStep, steps }: ProgressTrackerProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <ProgressContainer>
      <ProgressLine $progress={progress} />
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepCircle
            $completed={index + 1 < currentStep}
            $active={index + 1 === currentStep}
          >
            {index + 1 < currentStep ? <Check /> : index + 1}
          </StepCircle>
          <StepLabel
            $completed={index + 1 < currentStep}
            $active={index + 1 === currentStep}
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </ProgressContainer>
  );
}
