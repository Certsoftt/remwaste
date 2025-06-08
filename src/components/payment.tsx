/* eslint multiline-ternary: ["error", "always"] */
import {
  CalendarOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  LockOutlined,
  SafetyCertificateOutlined,

} from "@ant-design/icons";
import { Fade, MenuItem, TextField } from "@mui/material";
import { Card, message, Spin } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

import PaymentModal from "./modals/payment-modal";
import {
  ButtonSkeleton,
  InputSkeleton,
  OrderSummarySkeleton,
  PaymentCardSkeleton,
  TextLineSkeleton,
} from "./styled/skeleton";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1rem, 3vw, 2rem);

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    gap: 1rem;
  }
`;

const OrderSummaryCard = styled(Card)`
  && {
    background: rgba(30, 30, 35, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: clamp(12px, 2vw, 16px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    height: fit-content;
    overflow: hidden;

    .ant-card-head {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: clamp(1rem, 2.5vw, 1.5rem);
    }

    .ant-card-head-title {
      color: white;
      font-size: clamp(1.25rem, 3vw, 1.5rem);
      font-weight: 600;
      line-height: 1.3;
    }

    .ant-card-body {
      padding: clamp(1rem, 2.5vw, 1.5rem);
    }
  }

  @media (max-width: 480px) {
    border-radius: 12px;
  }
`;

const PaymentCard = styled(Card)`
  && {
    background: rgba(30, 30, 35, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: clamp(12px, 2vw, 16px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    .ant-card-head {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: clamp(1rem, 2.5vw, 1.5rem);
    }

    .ant-card-head-title {
      color: white;
      font-size: clamp(1.25rem, 3vw, 1.5rem);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: clamp(0.5rem, 1.5vw, 0.75rem);
      line-height: 1.3;

      .icon {
        color: #1976d2;
        font-size: clamp(1.25rem, 3vw, 1.5rem);
      }
    }

    .ant-card-body {
      padding: clamp(1rem, 2.5vw, 1.5rem);
    }
  }

  @media (max-width: 480px) {
    border-radius: 12px;
  }
`;

const AddressSection = styled.div`
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  padding-bottom: clamp(1.5rem, 4vw, 2rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    color: white;
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
    display: flex;
    align-items: center;
    gap: clamp(0.35rem, 1vw, 0.5rem);
    line-height: 1.4;
    word-break: break-word;

    .icon {
      color: #1976d2;
      flex-shrink: 0;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: clamp(0.9rem, 2.2vw, 1rem);
    line-height: 1.6;
    word-break: break-word;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
  }
`;

const DateSection = styled(AddressSection)`
  h3 {
    margin-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
  }

  .date-row {
    display: flex;
    align-items: center;
    gap: clamp(0.35rem, 1vw, 0.5rem);
    margin-bottom: clamp(0.35rem, 1vw, 0.5rem);
    flex-wrap: wrap;

    label {
      color: rgba(255, 255, 255, 0.6);
      min-width: clamp(75px, 15vw, 85px);
      font-size: clamp(0.9rem, 2.2vw, 1rem);
    }

    span {
      color: white;
      font-size: clamp(0.9rem, 2.2vw, 1rem);
    }

    @media (max-width: 480px) {
      gap: 0.35rem;
      margin-bottom: 0.5rem;
    }
  }
`;

const OrderDetails = styled.div`
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  padding-bottom: clamp(1.5rem, 4vw, 2rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
    gap: 1rem;

    .title {
      color: white;
      font-size: clamp(1rem, 2.5vw, 1.1rem);
      margin: 0;
      line-height: 1.4;
      word-break: break-word;
    }

    .period {
      color: rgba(255, 255, 255, 0.6);
      font-size: clamp(0.85rem, 2vw, 0.9rem);
      margin: clamp(0.2rem, 0.5vw, 0.25rem) 0 0 0;
    }

    .price {
      color: white;
      font-size: clamp(1rem, 2.5vw, 1.1rem);
      font-weight: 500;
      white-space: nowrap;
    }

    .vat {
      color: rgba(255, 255, 255, 0.6);
      font-size: clamp(0.85rem, 2vw, 0.9rem);
      margin-left: clamp(0.35rem, 1vw, 0.5rem);
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
  }
`;

const TotalSection = styled.div`
  .subtotal, .vat {
    display: flex;
    justify-content: space-between;
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
    color: rgba(255, 255, 255, 0.7);
    font-size: clamp(0.9rem, 2.2vw, 0.95rem);
    gap: 1rem;
  }

  .total {
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: clamp(1.15rem, 2.8vw, 1.25rem);
    font-weight: 600;
    margin-top: clamp(1.25rem, 3vw, 1.5rem);
    padding-top: clamp(1.25rem, 3vw, 1.5rem);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    gap: 1rem;
  }
`;

const CardInputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 1.5rem;

    .MuiInputBase-root {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      color: white;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      &.Mui-focused {
        background: rgba(255, 255, 255, 0.15);
      }
    }

    .MuiInputBase-input {
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
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

      &.Mui-focused {
        color: #1976d2;
      }
    }

    .MuiSelect-icon {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const CardImages = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;

  img {
    height: 24px;
    opacity: 0.7;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const SaveCardCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 1.5rem 0;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    accent-color: #1976d2;
  }

  .icon {
    color: #1976d2;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  background: ${props =>
      props.$primary
        ? "#1976d2"
        : "rgba(255, 255, 255, 0.1)"
  };
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${props =>
        props.$primary
          ? "#1565c0"
          : "rgba(255, 255, 255, 0.15)"
    };
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .icon {
    font-size: 1.2rem;
  }
`;

const InputFeedback = styled.div<{ $error?: boolean; $success?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: ${props =>
      props.$error
        ? "#ff4d4f"
        : props.$success
          ? "#52c41a"
          : "rgba(255, 255, 255, 0.5)"
  };

  .icon {
    font-size: 1rem;
  }
`;

const CardTypeIcon = styled.div<{ $active?: boolean }>`
  img {
    opacity: ${props => props.$active
      ? 1
      : 0.3};
    transition: opacity 0.3s ease;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;

  .text {
    color: white;
    font-size: 1.2rem;
  }

  .ant-spin {
    .ant-spin-dot-item {
      background-color: #1976d2;
    }
  }
`;

type ValidationError = {
  cardNumber?: string;
  expiryDate?: string;
  cvc?: string;
  country?: string;
};

type PaymentState = {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  country: string;
  saveCard: boolean;
  errors: ValidationError;
  cardType?: "visa" | "mastercard" | "amex";
  isProcessing: boolean;
};

type HistoryState = {
  timestamp: number;
} & PaymentState;

type PaymentProps = {
  orderData: {
    address: {
      street: string;
      postcode: string;
    };
    dates: {
      delivery: string;
      collection: string;
    };
    skipSize: string;
    hirePeriod: string;
    price: {
      subtotal: number;
      vat: number;
      total: number;
    };
  };
  onBack?: () => void;
  onComplete: () => void;
  initialState?: PaymentState;
  onStateChange?: (state: PaymentState) => void;
};

export default function Payment({
  orderData,
  onComplete,
  initialState,
  onStateChange,
}: PaymentProps) {
  const [state, setState] = useState<PaymentState>(() =>
    initialState || {
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      country: "",
      saveCard: false,
      errors: {},
      cardType: undefined,
      isProcessing: false,
    },
  );
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);
  const [orderDataState, setOrderData] = useState<PaymentProps["orderData"] | null>(null);

  // Save state to history before any state change
  const updateStateWithHistory = (newState: PaymentState) => {
    setHistory(prev => [...prev, { ...state, timestamp: Date.now() }]);
    console.warn(history);
    setState(newState);
    onStateChange?.(newState);
  };

  // Restore state when going back
  // const handleBack = () => {
  //   if (history.length > 0) {
  //     const previousState = history[history.length - 1];
  //     setState(previousState);
  //     setHistory(prev => prev.slice(0, -1));
  //     onStateChange?.(previousState);
  //   }
  //   onBack();
  // };

  const detectCardType = (number: string): "visa" | "mastercard" | "amex" | undefined => {
    const cleaned = number.replace(/\D/g, "");
    if (!cleaned)
      return undefined;

    if (cleaned.startsWith("4"))
      return "visa";
    if (cleaned.startsWith("5"))
      return "mastercard";
    if (cleaned.startsWith("34") || cleaned.startsWith("37"))
      return "amex";

    return undefined;
  };

  const validateCardNumber = (number: string): string | undefined => {
    const cleaned = number.replace(/\D/g, "");
    if (!cleaned)
      return "Card number is required";
    if (cleaned.length !== 16)
      return "Card number must be 16 digits";

    // Luhn algorithm for card number validation
    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = Number.parseInt(cleaned[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9)
          digit -= 9;
      }

      sum += digit;
      isEven = !isEven;
    }

    if (sum % 10 !== 0)
      return "Invalid card number";
    return undefined;
  };

  const validateExpiryDate = (date: string): string | undefined => {
    if (!date)
      return "Expiry date is required";
    if (date.length !== 5)
      return "Invalid format";

    const [month, year] = date.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expMonth = Number.parseInt(month);
    const expYear = Number.parseInt(year);

    if (expMonth < 1 || expMonth > 12)
      return "Invalid month";
    if (expYear < currentYear)
      return "Card has expired";
    if (expYear === currentYear && expMonth < currentMonth)
      return "Card has expired";

    return undefined;
  };

  const validateCvc = (cvc: string, cardType?: string): string | undefined => {
    if (!cvc)
      return "Security code is required";
    const isAmex = cardType === "amex";
    const requiredLength = isAmex
      ? 4
      : 3;

    if (cvc.length !== requiredLength) {
      return `Security code must be ${requiredLength} digits`;
    }
    return undefined;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "").substring(0, 16);
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
    const cardType = detectCardType(value);

    updateStateWithHistory({
      ...state,
      cardNumber: formattedValue,
      cardType,
      errors: {
        ...state.errors,
        cardNumber: validateCardNumber(value),
      },
    });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4);
    let formatted = value;

    if (value.length >= 2) {
      formatted = `${value.substring(0, 2)}/${value.substring(2)}`;
    }

    updateStateWithHistory({
      ...state,
      expiryDate: formatted,
      errors: {
        ...state.errors,
        expiryDate: validateExpiryDate(formatted),
      },
    });
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const maxLength = state.cardType === "amex"
      ? 4
      : 3;
    const truncated = value.substring(0, maxLength);

    updateStateWithHistory({
      ...state,
      cvc: truncated,
      errors: {
        ...state.errors,
        cvc: validateCvc(truncated, state.cardType),
      },
    });
  };

  // const _handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   updateStateWithHistory({
  //     ...state,
  //     country: e.target.value,
  //     errors: {
  //       ...state.errors,
  //       country: undefined
  //     }
  //   });
  // };

  const handleSaveCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStateWithHistory({
      ...state,
      saveCard: e.target.checked,
    });
  };

  // const handleSubmit = async () => {
  //   const errors = {
  //     cardNumber: validateCardNumber(state.cardNumber),
  //     expiryDate: validateExpiryDate(state.expiryDate),
  //     cvc: validateCvc(state.cvc, state.cardType),
  //     country: !state.country ? 'Country is required' : undefined
  //   };

  //   if (Object.values(errors).some(error => error)) {
  //     setState(prev => ({ ...prev, errors }));
  //     return;
  //   }

  //   // Show account creation modal instead of processing payment immediately
  //   setShowAccountModal(true);
  // };

  const handleAccountComplete = (_accountData: any) => {
    setState(prev => ({ ...prev, isProcessing: true }));

    // Simulate payment processing
    setTimeout(async () => {
      try {
        // In a real app, you would make an API call here with both payment and account data
        message.success("Payment successful!");
        onComplete();
      }
      catch (error) {
        message.error("Payment failed. Please try again.");
        console.warn(error);
      }
      finally {
        setState(prev => ({ ...prev, isProcessing: false }));
      }
    }, 2000);
  };

  // const _isFormValid = () => {
  //   return !Object.values(state.errors).some(error => error) &&
  //     state.cardNumber &&
  //     state.expiryDate &&
  //     state.cvc &&
  //     state.country;
  // };

  // Save state to localStorage when it changes
  useEffect(() => {
    if (!state.isProcessing) { // Don't persist processing state
      localStorage.setItem("paymentFormState", JSON.stringify({
        ...state,
        isProcessing: false, // Ensure we don't persist processing state
      }));
    }
  }, [state]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("paymentFormState");
    if (savedState && !initialState) {
      const parsedState = JSON.parse(savedState);
      setState(parsedState);
    }
  }, [initialState]);

  // Clean up localStorage when payment is completed
  useEffect(() => {
    return () => {
      localStorage.removeItem("paymentFormState");
    };
  }, []);

  useEffect(() => {
    // Simulate loading order data
    setSummaryLoading(true);
    const timerId = setTimeout(() => {
      setOrderData({
        address: {
          street: "123 Mockingbird Lane",
          postcode: "12345",
        },
        dates: {
          delivery: "2023-10-10",
          collection: "2023-10-15",
        },
        skipSize: "Large Skip",
        hirePeriod: "2 Weeks",
        price: {
          subtotal: 300,
          vat: 60,
          total: 360,
        },
      });
      setSummaryLoading(false);
      setCardLoading(true);
    }, 1500);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Container>
        <OrderSummarySkeleton>
          <TextLineSkeleton $height="32px" $width="60%" />
          <TextLineSkeleton $height="24px" $width="80%" />
          <TextLineSkeleton $height="24px" $width="40%" />
          <TextLineSkeleton $height="24px" $width="90%" />
          <ButtonSkeleton />
        </OrderSummarySkeleton>

        <PaymentCardSkeleton>
          <TextLineSkeleton $height="32px" $width="50%" />
          <div style={{ marginTop: "2rem" }}>
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
          </div>
          <ButtonSkeleton />
        </PaymentCardSkeleton>
      </Container>
    );
  }

  return (
    <Fade in timeout={500}>
      <Container>
        {/* Order Summary Card */}
        <OrderSummaryCard title="Order Summary">
          <Fade in={!summaryLoading} timeout={300}>
            <div style={{ display: summaryLoading
              ? "none"
              : "block" }}
            >
              <AddressSection>
                <h3>
                  <EnvironmentOutlined className="icon" />
                  {" "}
                  Delivery Address
                </h3>
                <p>{orderDataState?.address.street}</p>
                <p>{orderDataState?.address.postcode}</p>
              </AddressSection>

              <DateSection>
                <h3>
                  <CalendarOutlined className="icon" />
                  {" "}
                  Delivery & Collection
                </h3>
                <div className="date-row">
                  <label>Delivery:</label>
                  <span>{orderDataState?.dates.delivery}</span>
                </div>
                <div className="date-row">
                  <label>Collection:</label>
                  <span>{orderDataState?.dates.collection}</span>
                </div>
              </DateSection>

              <OrderDetails>
                <div className="item">
                  <div>
                    <p className="title">{orderDataState?.skipSize}</p>
                    <p className="period">{orderDataState?.hirePeriod}</p>
                  </div>
                  <div>
                    <span className="price">
                      £
                      {orderDataState?.price.subtotal.toFixed(2)}
                    </span>
                    <span className="vat">
                      + VAT £
                      {orderData?.price.vat.toFixed(2)}
                    </span>
                  </div>
                </div>
              </OrderDetails>

              <TotalSection>
                <div className="subtotal">
                  <span>Subtotal (excl. VAT)</span>
                  <span>
                    £
                    {orderDataState?.price.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="vat">
                  <span>VAT (20%)</span>
                  <span>
                    £
                    {orderDataState?.price.vat.toFixed(2)}
                  </span>
                </div>
                <div className="total">
                  <span>Total</span>
                  <span>
                    £
                    {orderDataState?.price.total.toFixed(2)}
                  </span>
                </div>
              </TotalSection>
            </div>
          </Fade>
          <Fade in={summaryLoading} timeout={300}>
            <div style={{ display: !summaryLoading
              ? "none"
              : "block" }}
            >
              <OrderSummarySkeleton>
                <TextLineSkeleton $width="70%" />
                <TextLineSkeleton $width="40%" />
                <TextLineSkeleton $width="50%" />
                <TextLineSkeleton $width="60%" />
              </OrderSummarySkeleton>
            </div>
          </Fade>
        </OrderSummaryCard>

        {/* Payment Card */}
        <PaymentCard title={(
          <span>
            <CreditCardOutlined className="icon" />
            Payment Details
          </span>
        )}
        >
          <Fade in={!cardLoading} timeout={300}>
            <div style={{ display: cardLoading
              ? "none"
              : "block" }}
            >
              <StyledTextField
                fullWidth
                label="Card number"
                variant="outlined"
                value={state.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 1234 1234 1234"
                error={!!state.errors.cardNumber}
              />
              {state.errors.cardNumber
                ? (
                    <InputFeedback $error>
                      <ExclamationCircleOutlined className="icon" />
                      {state.errors.cardNumber}
                    </InputFeedback>
                  )
                : state.cardNumber && !state.errors.cardNumber
                  ? (
                      <InputFeedback $success>
                        <CheckCircleOutlined className="icon" />
                        Valid card number
                      </InputFeedback>
                    )
                  : null}

              <CardImages>
                <CardTypeIcon $active={state.cardType === "visa"}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                </CardTypeIcon>
                <CardTypeIcon $active={state.cardType === "mastercard"}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                </CardTypeIcon>
                <CardTypeIcon $active={state.cardType === "amex"}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="American Express" />
                </CardTypeIcon>
              </CardImages>

              <CardInputGroup>
                <div>
                  <StyledTextField
                    fullWidth
                    label="Expiration date"
                    variant="outlined"
                    value={state.expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    error={!!state.errors.expiryDate}
                  />
                  {state.errors.expiryDate && (
                    <InputFeedback $error>
                      <ExclamationCircleOutlined className="icon" />
                      {state.errors.expiryDate}
                    </InputFeedback>
                  )}
                </div>

                <div>
                  <StyledTextField
                    fullWidth
                    label="Security code"
                    variant="outlined"
                    value={state.cvc}
                    onChange={handleCvcChange}
                    placeholder={state.cardType === "amex"
                      ? "XXXX"
                      : "XXX"}
                    type="password"
                    error={!!state.errors.cvc}
                  />
                  {state.errors.cvc && (
                    <InputFeedback $error>
                      <ExclamationCircleOutlined className="icon" />
                      {state.errors.cvc}
                    </InputFeedback>
                  )}
                </div>
              </CardInputGroup>

              <StyledTextField
                select
                fullWidth
                label="Country"
                variant="outlined"
                value={state.country}
                onChange={e => setState(prev => ({
                  ...prev,
                  country: e.target.value,
                  errors: {
                    ...prev.errors,
                    country: undefined,
                  },
                }))}
                error={!!state.errors.country}
              >
                <MenuItem value="GB">United Kingdom</MenuItem>
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="CA">Canada</MenuItem>
                <MenuItem value="AU">Australia</MenuItem>
              </StyledTextField>
              {state.errors.country && (
                <InputFeedback $error>
                  <ExclamationCircleOutlined className="icon" />
                  {state.errors.country}
                </InputFeedback>
              )}

              <SaveCardCheckbox>
                <input
                  type="checkbox"
                  checked={state.saveCard}
                  onChange={handleSaveCardChange}
                />
                <span>Save this card as default payment method</span>
                <SafetyCertificateOutlined className="icon" />
              </SaveCardCheckbox>

              <ButtonContainer>
                {loading
                  ? (<ButtonSkeleton />)
                  : (
                      <ActionButton
                        $primary
                        onClick={() => {
                          setLoading(true);
                          setTimeout(() => {
                            setLoading(false);
                            message.success("Payment processed successfully");
                          }, 2000);
                        }}
                      >
                        <LockOutlined className="icon" />
                        Complete Payment
                      </ActionButton>
                    )}
              </ButtonContainer>
            </div>
          </Fade>
          <Fade in={cardLoading} timeout={300}>
            <div style={{ display: !cardLoading
              ? "none"
              : "block" }}
            >
              <PaymentCardSkeleton>
                <TextLineSkeleton $width="70%" />
                <TextLineSkeleton $width="40%" />
                <ButtonSkeleton />
              </PaymentCardSkeleton>
            </div>
          </Fade>
        </PaymentCard>

        <PaymentModal
          open={showAccountModal}
          onClose={() => setShowAccountModal(false)}
          onBack={() => setShowAccountModal(false)}
          onComplete={handleAccountComplete}
        />

        {state.isProcessing && (
          <LoadingOverlay>
            <Spin size="large" />
            <div className="text">Processing your payment...</div>
          </LoadingOverlay>
        )}
      </Container>
    </Fade>
  );
}
