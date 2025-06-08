import {
  CalculatorOutlined,
  CalendarOutlined,
  DeleteOutlined,
  DollarOutlined,
  FileProtectOutlined,
  HomeOutlined,
} from "@ant-design/icons";
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
  gap: clamp(0.35rem, 1vw, 0.5rem);
  z-index: 2;

  @media (max-width: 1200px) {
    position: sticky;
    top: 0;
    left: 0;
    transform: none;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background: rgba(18, 18, 18, 0.95);
    backdrop-filter: blur(10px);
    padding: clamp(0.75rem, 2vw, 1rem);
    gap: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    justify-content: flex-start;
    gap: clamp(1rem, 3vw, 1.5rem);
    padding: 0.75rem;
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

  @media (max-width: 1200px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    transform: none;
    background: linear-gradient(
      to right,
      #1976d2 ${props => props.$progress}%,
      rgba(255, 255, 255, 0.2) ${props => props.$progress}%
    );
  }
`;

const StepCircle = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: clamp(32px, 5vw, 40px);
  height: clamp(32px, 5vw, 40px);
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
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 70%
    );
    opacity: ${props => (props.$active ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  svg {
    font-size: clamp(16px, 3vw, 20px);
    z-index: 1;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    
    svg {
      font-size: 16px;
    }
  }
`;

const StepLabel = styled.span<{ $active?: boolean; $completed?: boolean }>`
  position: absolute;
  left: calc(100% + 1rem);
  white-space: nowrap;
  color: ${props =>
    props.$completed || props.$active ? "white" : "rgba(255, 255, 255, 0.5)"};
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  transition: all 0.3s ease;
  font-weight: ${props => (props.$active ? "500" : "400")};

  @media (max-width: 1200px) {
    position: static;
    display: block;
    text-align: center;
    margin-top: 0.5rem;
    font-size: clamp(0.75rem, 1.8vw, 0.85rem);
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const Step = styled.div`
  position: relative;
  width: clamp(32px, 5vw, 40px);
  height: clamp(32px, 5vw, 40px);

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: auto;
    min-width: clamp(60px, 15vw, 80px);
  }

  @media (max-width: 480px) {
    min-width: 60px;
  }
`;

function getStepIcon(step: string, completed: boolean) {
  if (completed)
    return <Check />;

  switch (step) {
    case "Address":
      return <HomeOutlined />;
    case "Waste Type":
      return <DeleteOutlined />;
    case "Skip Size":
      return <CalculatorOutlined />;
    case "Permit":
      return <FileProtectOutlined />;
    case "Schedule":
      return <CalendarOutlined />;
    case "Payment":
      return <DollarOutlined />;
    default:
      return step;
  }
}

type ProgressTrackerProps = {
  currentStep: number;
  steps: Array<{
    label: string;
  }>;
};

function ProgressTracker({ currentStep, steps }: ProgressTrackerProps) {
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
            {getStepIcon(step.label, index + 1 < currentStep)}
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
export default ProgressTracker;
