import {
  CameraOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Fade } from "@mui/material";
import { Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Schedule from "../schedule";

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

  .ant-modal-close {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.2s ease;
    padding: clamp(8px, 2vw, 12px);

    &:hover {
      color: white;
    }
  }

  .ant-modal-body {
    padding: 0;
  }
`;

const Container = styled.div`
  padding: clamp(1rem, 3vw, 1.5rem);
`;

const Title = styled.h2`
  color: white;
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 1rem);
  line-height: 1.3;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  line-height: 1.6;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
`;

const InfoBox = styled.div`
  background: rgba(46, 125, 50, 0.1);
  border: 1px solid rgba(46, 125, 50, 0.2);
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(1.25rem, 3vw, 1.5rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  align-items: flex-start;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .icon {
    color: #2e7d32;
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    flex-shrink: 0;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-size: clamp(0.875rem, 2.5vw, 0.95rem);
    line-height: 1.5;
  }
`;

const UploadArea = styled.div<{ $isDragActive?: boolean; $hasError?: boolean }>`
  border: 2px dashed ${props =>
      props.$hasError
        ? "#ff4d4f"
        : props.$isDragActive
          ? "#2e7d32"
          : "rgba(255, 255, 255, 0.2)"
  };
  background: ${props =>
      props.$isDragActive
        ? "rgba(46, 125, 50, 0.1)"
        : "rgba(255, 255, 255, 0.05)"
  };
  border-radius: clamp(12px, 2vw, 16px);
  padding: clamp(1.5rem, 4vw, 2rem);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2e7d32;
    background: rgba(46, 125, 50, 0.1);
  }

  /* Touch device optimizations */
  @media (hover: none) {
    &:active {
      border-color: #2e7d32;
      background: rgba(46, 125, 50, 0.1);
    }
  }
`;

const UploadIcon = styled.div`
  width: clamp(48px, 12vw, 64px);
  height: clamp(48px, 12vw, 64px);
  background: rgba(46, 125, 50, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto clamp(1rem, 3vw, 1.5rem);

  .anticon {
    font-size: clamp(20px, 5vw, 28px);
    color: #2e7d32;
  }
`;

const UploadText = styled.div`
  h4 {
    color: white;
    font-size: clamp(1rem, 3vw, 1.2rem);
    margin-bottom: clamp(0.375rem, 1vw, 0.5rem);
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
    font-size: clamp(0.875rem, 2.5vw, 1rem);
  }
`;

const PreviewArea = styled.div`
  position: relative;
  margin: clamp(1.5rem, 4vw, 2rem) 0;
  border-radius: clamp(8px, 2vw, 12px);
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: clamp(0.75rem, 2vw, 1rem);
  right: clamp(0.75rem, 2vw, 1rem);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: clamp(28px, 8vw, 32px);
  height: clamp(28px, 8vw, 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  /* Touch device optimizations */
  @media (hover: none) {
    &:active {
      background: rgba(0, 0, 0, 0.7);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  margin-top: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.825rem, 2.25vw, 0.9rem);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckboxContainer = styled.div`
  margin: clamp(1.5rem, 4vw, 2rem) 0;
  .ant-checkbox-wrapper {
    color: rgba(255, 255, 255, 0.9);
    font-size: clamp(0.9rem, 2.5vw, 1rem);
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #2e7d32;
    border-color: #2e7d32;
  }

  /* Improve touch target size */
  .ant-checkbox {
    transform: scale(clamp(1, 1.1vw, 1.2));
    margin-right: clamp(0.5rem, 1.5vw, 0.75rem);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-top: clamp(1.5rem, 4vw, 2rem);

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: stretch;
  }
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  background: ${props =>
      props.$primary ? "#2e7d32" : "rgba(255, 255, 255, 0.1)"
  };
  color: white;
  border: none;
  border-radius: clamp(6px, 1.5vw, 8px);
  padding: clamp(0.625rem, 2vw, 0.75rem) clamp(1.5rem, 3vw, 2rem);
  font-size: clamp(0.9375rem, 2.5vw, 1rem);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: clamp(100px, 25vw, 120px);

  &:hover {
    background: ${props =>
        props.$primary ? "#1b5e20" : "rgba(255, 255, 255, 0.15)"
    };
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }

  /* Touch device optimizations */
  @media (hover: none) {
    &:active {
      background: ${props =>
          props.$primary ? "#1b5e20" : "rgba(255, 255, 255, 0.15)"
      };
    }
  }
`;

type HistoryStep = {
  selectedFile: File | null;
  previewUrl: string | null;
  skipPhotoStep: boolean;
  currentStep: "upload" | "preview" | "back" | "schedule";
};

type PrivateRoadModalProps = {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  onCancel: () => void;
  onContinue: (deliveryDate?: Date) => void;
  initialData?: {
    selectedFile: File | null;
    previewUrl: string | null;
    skipPhotoStep: boolean;
    deliveryDate?: Date;
  };
};

export default function PrivateRoadModal({
  open,
  onClose,
  onUpload,
  onCancel,
  onContinue,
  initialData,
}: PrivateRoadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(
    initialData?.selectedFile || null,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.previewUrl || null,
  );
  const [skipPhotoStep, setSkipPhotoStep] = useState(
    initialData?.skipPhotoStep || false,
  );
  const [showSchedule, setShowSchedule] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    initialData?.deliveryDate,
  );
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [_history, setHistory] = useState<HistoryStep[]>([]);

  useEffect(() => {
    // Restore state from initialData if provided
    if (initialData) {
      setSelectedFile(initialData.selectedFile);
      setPreviewUrl(initialData.previewUrl);
      setSkipPhotoStep(initialData.skipPhotoStep);
    }
  }, [initialData]);

  const addToHistory = (step: HistoryStep) => {
    setHistory(prev => [...prev, step]);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    setError(null);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleCancel = () => {
    // Save current state to history before canceling
    addToHistory({
      selectedFile,
      previewUrl,
      skipPhotoStep,
      currentStep: "back",
    });

    // Clean up any object URLs before navigating
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    onCancel();
  };

  const handlePhotoStepContinue = () => {
    // Save current state to history before continuing
    addToHistory({
      selectedFile,
      previewUrl,
      skipPhotoStep,
      currentStep: "schedule",
    });
    setShowSchedule(true);
  };

  const handleScheduleBack = () => {
    setShowSchedule(false);
  };

  const handleScheduleContinue = (date: Date) => {
    setDeliveryDate(date);
    onContinue(date);
  };

  // Cleanup effect for object URLs
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (showSchedule) {
    return (
      <Schedule
        onBack={handleScheduleBack}
        onContinue={handleScheduleContinue}
        initialDate={deliveryDate}
      />
    );
  }

  return (
    <Fade in={open} timeout={300}>
      <StyledModal
        open={open}
        onCancel={onClose}
        footer={null}
        width={600}
        centered
        closeIcon={<CloseOutlined />}
      >
        <Container>
          <Title>
            <CameraOutlined />
            {" "}
            Skip Placement Photo
          </Title>

          <Description>
            Please provide a photo of where you plan to place the skip.
            This helps us ensure proper placement and identify any potential access issues.
          </Description>

          <InfoBox>
            <CheckCircleOutlined className="icon" />
            <p>
              Since you're placing the skip on private property, a photo is optional
              but recommended to help us identify any potential access issues.
            </p>
          </InfoBox>

          {!previewUrl && !skipPhotoStep
            ? (
                <UploadArea
                  onDragEnter={handleDragEnter}
                  onDragOver={e => e.preventDefault()}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  $isDragActive={isDragActive}
                  $hasError={!!error}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <input
                    type="file"
                    id="file-input"
                    hidden
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                  <UploadIcon>
                    <UploadOutlined />
                  </UploadIcon>
                  <UploadText>
                    <h4>Upload Photo</h4>
                    <p>Drag and drop or click to select</p>
                  </UploadText>
                  {error && (
                    <ErrorMessage>
                      <CloseOutlined />
                      {" "}
                      {error}
                    </ErrorMessage>
                  )}
                </UploadArea>
              )
            : (
                previewUrl && (
                  <PreviewArea>
                    <img src={previewUrl} alt="Skip placement location" />
                    <RemoveButton onClick={handleRemove}>
                      <CloseOutlined />
                    </RemoveButton>
                  </PreviewArea>
                )
              )}

          <CheckboxContainer>
            <Checkbox
              checked={skipPhotoStep}
              onChange={e => setSkipPhotoStep(e.target.checked)}
            >
              Skip this step to upload a photo later
            </Checkbox>
          </CheckboxContainer>

          <ButtonContainer>
            <ActionButton onClick={handleCancel}>
              Cancel
            </ActionButton>
            <ActionButton
              $primary
              onClick={handlePhotoStepContinue}
              disabled={!selectedFile && !skipPhotoStep}
            >
              Continue
            </ActionButton>
          </ButtonContainer>
        </Container>
      </StyledModal>
    </Fade>
  );
}
