import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Fade, TextField } from "@mui/material";
import { Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(30, 30, 35, 0.98);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: clamp(12px, 2vw, 16px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    width: 90vw !important;
    max-width: 600px;
    margin: 0 auto;
  }

  .ant-modal-header {
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: clamp(1rem, 3vw, 1.5rem);
  }

  .ant-modal-body {
    padding: clamp(1.25rem, 4vw, 2rem);
  }

  .ant-modal-close {
    color: rgba(255, 255, 255, 0.7);
    
    &:hover {
      color: white;
    }
  }

  @media (max-width: 480px) {
    .ant-modal-content {
      border-radius: 12px;
      margin: 1rem;
    }
  }
`;

const Title = styled.h2`
  color: white;
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin: 0 0 clamp(0.75rem, 2vw, 1rem) 0;
  font-weight: 600;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  line-height: 1.6;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 1.5rem);
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(0.75rem, 2vw, 1rem);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    .MuiInputBase-root {
      background: rgba(255, 255, 255, 0.05);
      border-radius: clamp(6px, 1.5vw, 8px);
      color: white;
      min-height: clamp(48px, 8vh, 56px);

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      &.Mui-focused {
        background: rgba(255, 255, 255, 0.15);
      }

      .MuiInputAdornment-root {
        color: rgba(255, 255, 255, 0.5);
        margin-left: clamp(0.75rem, 2vw, 1rem);

        .anticon {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
        }
      }
    }

    .MuiInputBase-input {
      font-size: clamp(0.95rem, 2.2vw, 1rem);
      padding: clamp(0.75rem, 2vw, 1rem);

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
        opacity: 1;
      }
    }

    .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 255, 255, 0.1);
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(255, 255, 255, 0.2);
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #1976d2;
    }

    .MuiInputLabel-root {
      color: rgba(255, 255, 255, 0.7);
      font-size: clamp(0.9rem, 2.2vw, 1rem);

      &.Mui-focused {
        color: #1976d2;
      }
    }

    @media (max-width: 480px) {
      .MuiInputBase-root {
        min-height: 48px;
      }
    }
  }
`;

const InputFeedback = styled.div<{ $error?: boolean; $success?: boolean }>`
  display: flex;
  align-items: center;
  gap: clamp(0.35rem, 1vw, 0.5rem);
  margin-top: clamp(0.2rem, 0.5vw, 0.25rem);
  font-size: clamp(0.8rem, 2vw, 0.85rem);
  color: ${props =>
      props.$error
        ? "#ff4d4f"
        : props.$success
          ? "#52c41a"
          : "rgba(255, 255, 255, 0.5)"
  };

  .icon {
    font-size: clamp(0.9rem, 2.2vw, 1rem);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-top: clamp(0.75rem, 2vw, 1rem);
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  background: ${props =>
      props.$primary ? "#1976d2" : "rgba(255, 255, 255, 0.1)"
  };
  color: white;
  border: none;
  border-radius: clamp(6px, 1.5vw, 8px);
  padding: clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.95rem, 2.2vw, 1rem);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.35rem, 1vw, 0.5rem);
  min-height: clamp(48px, 8vh, 56px);

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

  .icon {
    font-size: clamp(1.1rem, 2.5vw, 1.2rem);
  }

  @media (max-width: 480px) {
    min-height: 48px;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.85rem, 2vw, 0.9rem);
  cursor: pointer;
  padding: clamp(0.35rem, 1vw, 0.5rem);
  display: flex;
  align-items: center;
  gap: clamp(0.35rem, 1vw, 0.5rem);
  margin: 0 auto;
  transition: all 0.2s ease;
  border-radius: 4px;

  @media (hover: hover) {
    &:hover {
      color: white;
      transform: translateX(-2px);
      background-color: rgba(255, 255, 255, 0.05);
    }
  }

  .icon {
    font-size: clamp(0.85rem, 2vw, 0.9rem);
  }
`;

type ValidationError = {
  firstName?: string;
  lastName?: string;
  email?: string;
  confirmEmail?: string;
  phone?: string;
};

type AccountState = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  errors: ValidationError;
};

type HistoryState = {
  timestamp: number;
} & AccountState;

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  onComplete: (data: Omit<AccountState, "errors">) => void;
  initialState?: Omit<AccountState, "errors">;
};

export default function PaymentModal({
  open,
  onClose,
  onBack,
  onComplete,
  initialState,
}: PaymentModalProps) {
  const [state, setState] = useState<AccountState>(() => ({
    firstName: initialState?.firstName || "",
    lastName: initialState?.lastName || "",
    email: initialState?.email || "",
    confirmEmail: initialState?.confirmEmail || "",
    phone: initialState?.phone || "",
    errors: {},
  }));

  const [history, setHistory] = useState<HistoryState[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const updateStateWithHistory = (newState: AccountState) => {
    setHistory(prev => [...prev, { ...state, timestamp: Date.now() }]);
    setState(newState);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setState(previousState);
      setHistory(prev => prev.slice(0, -1));
    }
    onBack();
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email)
      return "Email is required";
    if (!/^[\w.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return "Invalid email address";
    }
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone)
      return "Phone number is required";
    if (!/^[\d\s\-()+]+$/.test(phone)) {
      return "Invalid phone number";
    }
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const errors: ValidationError = {
        firstName: !state.firstName ? "First name is required" : undefined,
        lastName: !state.lastName ? "Last name is required" : undefined,
        email: validateEmail(state.email),
        confirmEmail: state.email !== state.confirmEmail ? "Emails do not match" : undefined,
        phone: validatePhone(state.phone),
      };

      if (Object.values(errors).some(error => error)) {
        setState(prev => ({ ...prev, errors }));
        return;
      }

      // Save to localStorage for persistence
      localStorage.setItem("accountFormState", JSON.stringify({
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        confirmEmail: state.confirmEmail,
        phone: state.phone,
      }));

      onComplete({
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        confirmEmail: state.confirmEmail,
        phone: state.phone,
      });
    }
    catch (error) {
      console.error("Payment error:", error);
    }
    finally {
      setSubmitting(false);
    }
  };

  // Load state from localStorage on mount
  useEffect(() => {
    if (!initialState) {
      const savedState = localStorage.getItem("accountFormState");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setState(prev => ({ ...prev, ...parsedState }));
      }
    }
  }, [initialState]);

  // Clean up localStorage when modal is closed
  useEffect(() => {
    return () => {
      if (!open) {
        localStorage.removeItem("accountFormState");
      }
    };
  }, [open]);

  return (
    <StyledModal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
    >
      <Fade in timeout={500}>
        <div>
          <Title>Create Account</Title>
          <Subtitle>
            To help you track your order and manage your skip hire, we'll create an account for you.
          </Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <div>
                <StyledTextField
                  fullWidth
                  label="First Name"
                  value={state.firstName}
                  onChange={e => updateStateWithHistory({
                    ...state,
                    firstName: e.target.value,
                    errors: { ...state.errors, firstName: undefined },
                  })}
                  error={!!state.errors.firstName}
                  InputProps={{
                    startAdornment: <UserOutlined style={{ marginRight: "8px" }} />,
                  }}
                />
                {state.errors.firstName && (
                  <InputFeedback $error>
                    <ExclamationCircleOutlined className="icon" />
                    {state.errors.firstName}
                  </InputFeedback>
                )}
              </div>

              <div>
                <StyledTextField
                  fullWidth
                  label="Last Name"
                  value={state.lastName}
                  onChange={e => updateStateWithHistory({
                    ...state,
                    lastName: e.target.value,
                    errors: { ...state.errors, lastName: undefined },
                  })}
                  error={!!state.errors.lastName}
                  InputProps={{
                    startAdornment: <UserOutlined style={{ marginRight: "8px" }} />,
                  }}
                />
                {state.errors.lastName && (
                  <InputFeedback $error>
                    <ExclamationCircleOutlined className="icon" />
                    {state.errors.lastName}
                  </InputFeedback>
                )}
              </div>
            </InputGroup>

            <div>
              <StyledTextField
                fullWidth
                label="Email Address"
                type="email"
                value={state.email}
                onChange={e => updateStateWithHistory({
                  ...state,
                  email: e.target.value,
                  errors: {
                    ...state.errors,
                    email: undefined,
                    confirmEmail: e.target.value !== state.confirmEmail ? "Emails do not match" : undefined,
                  },
                })}
                error={!!state.errors.email}
                InputProps={{
                  startAdornment: <MailOutlined style={{ marginRight: "8px" }} />,
                }}
              />
              {state.errors.email
                ? (
                    <InputFeedback $error>
                      <ExclamationCircleOutlined className="icon" />
                      {state.errors.email}
                    </InputFeedback>
                  )
                : state.email && !state.errors.email && (
                  <InputFeedback $success>
                    <CheckCircleOutlined className="icon" />
                    Valid email address
                  </InputFeedback>
                )}
            </div>

            <div>
              <StyledTextField
                fullWidth
                label="Confirm Email Address"
                type="email"
                value={state.confirmEmail}
                onChange={e => updateStateWithHistory({
                  ...state,
                  confirmEmail: e.target.value,
                  errors: {
                    ...state.errors,
                    confirmEmail: e.target.value !== state.email ? "Emails do not match" : undefined,
                  },
                })}
                error={!!state.errors.confirmEmail}
                InputProps={{
                  startAdornment: <MailOutlined style={{ marginRight: "8px" }} />,
                }}
              />
              {state.errors.confirmEmail
                ? (
                    <InputFeedback $error>
                      <ExclamationCircleOutlined className="icon" />
                      {state.errors.confirmEmail}
                    </InputFeedback>
                  )
                : state.confirmEmail && state.confirmEmail === state.email && (
                  <InputFeedback $success>
                    <CheckCircleOutlined className="icon" />
                    Emails match
                  </InputFeedback>
                )}
            </div>

            <div>
              <StyledTextField
                fullWidth
                label="Phone Number"
                value={state.phone}
                onChange={e => updateStateWithHistory({
                  ...state,
                  phone: e.target.value,
                  errors: { ...state.errors, phone: undefined },
                })}
                error={!!state.errors.phone}
                InputProps={{
                  startAdornment: <PhoneOutlined style={{ marginRight: "8px" }} />,
                }}
                placeholder="Phone number for order updates"
              />
              {state.errors.phone && (
                <InputFeedback $error>
                  <ExclamationCircleOutlined className="icon" />
                  {state.errors.phone}
                </InputFeedback>
              )}
            </div>

            <ButtonContainer>
              <ActionButton
                $primary
                type="submit"
                disabled={!state.firstName || !state.lastName || !state.email || !state.confirmEmail || !state.phone}
              >
                {submitting ? <Spin size="small" /> : "Continue"}
              </ActionButton>
              <BackButton onClick={handleBack}>
                <ArrowLeftOutlined className="icon" />
                {" "}
                Go Back To Payment
              </BackButton>
            </ButtonContainer>
          </Form>
        </div>
      </Fade>
    </StyledModal>
  );
}
