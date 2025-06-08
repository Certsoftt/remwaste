import {
  CalendarOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Card, Fade } from "@mui/material";
import { Modal } from "antd";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(1rem, 4vw, 2rem);
  
  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
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
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.5;
`;

const DeliveryTimeInfo = styled.div`
  background: rgba(25, 118, 210, 0.1);
  border: 1px solid rgba(25, 118, 210, 0.2);
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  display: flex;
  align-items: flex-start;
  gap: clamp(0.75rem, 2vw, 1rem);

  .icon {
    color: #1976d2;
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-size: clamp(0.9rem, 2.2vw, 1rem);
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const CalendarContainer = styled(Card)`
  && {
    background: rgba(30, 30, 35, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: clamp(12px, 2vw, 16px);
    padding: clamp(1rem, 4vw, 2rem);
    margin-bottom: clamp(1.5rem, 4vw, 2rem);
    overflow: hidden;

    @media (max-width: 480px) {
      padding: 1rem;
      border-radius: 12px;
    }
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  padding: 0 0.5rem;

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
  }
`;

const MonthYear = styled.h3`
  color: white;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  margin: 0;
  display: flex;
  align-items: center;
  gap: clamp(0.35rem, 1vw, 0.5rem);
  line-height: 1.3;

  .icon {
    color: #1976d2;
    font-size: clamp(1.25rem, 3vw, 1.5rem);
  }
`;

const NavigationButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: clamp(6px, 1.5vw, 8px);
  width: clamp(32px, 8vw, 36px);
  height: clamp(32px, 8vw, 36px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const WeekDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: clamp(0.25rem, 1vw, 0.5rem);
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
  text-align: center;
  padding: 0 0.5rem;

  @media (max-width: 480px) {
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }
`;

const WeekDay = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  font-weight: 500;
  padding: clamp(0.35rem, 1vw, 0.5rem);

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.35rem;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: clamp(0.25rem, 1vw, 0.5rem);
  padding: 0 0.5rem;

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const DayCell = styled.button<{
  $isToday?: boolean;
  $isSelected?: boolean;
  $isDisabled?: boolean;
  $isInCurrentMonth?: boolean;
}>`
  background: ${props =>
      props.$isSelected
        ? "#1976d2"
        : props.$isToday
          ? "rgba(25, 118, 210, 0.2)"
          : "rgba(255, 255, 255, 0.05)"
  };
  border: 1px solid ${props =>
      props.$isSelected
        ? "#1976d2"
        : props.$isToday
          ? "rgba(25, 118, 210, 0.3)"
          : "transparent"
  };
  border-radius: clamp(6px, 1.5vw, 8px);
  padding: clamp(0.5rem, 1.5vw, 0.75rem);
  color: ${props =>
      props.$isDisabled
        ? "rgba(255, 255, 255, 0.3)"
        : props.$isInCurrentMonth
          ? "white"
          : "rgba(255, 255, 255, 0.5)"
  };
  cursor: ${props => props.$isDisabled ? "not-allowed" : "pointer"};
  transition: all 0.2s ease;
  font-size: clamp(0.9rem, 2.2vw, 1rem);
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: ${props =>
          props.$isSelected ? "#1976d2" : "rgba(255, 255, 255, 0.1)"
      };
      transform: translateY(-2px);
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: none;
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
    opacity: ${props => props.$isSelected ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    font-size: 0.9rem;
    border-radius: 6px;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(30, 30, 35, 0.98);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .ant-modal-close {
    color: rgba(255, 255, 255, 0.7);
    &:hover {
      color: white;
    }
  }
`;

type HistoryStep = {
  selectedDate: Date | null;
  collectionDate: Date;
  currentMonth: number;
  currentYear: number;
};

type PermitInfo = {
  text: string;
  earliestDate: Date;
};

type ScheduleProps = {
  onBack: () => void;
  onContinue: (deliveryDate: Date) => void;
  initialDate?: Date;
  permitInfo?: PermitInfo;
};

const PermitInformation = styled.div`
  background: rgba(25, 118, 210, 0.08);
  border: 1px solid rgba(25, 118, 210, 0.18);
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  color: rgba(255, 255, 255, 0.95);

  h3 {
    color: #1976d2;
    font-size: 1.1rem;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
  }

  p {
    margin: 0.25rem 0;
    font-size: 1rem;
    color: rgba(255,255,255,0.9);
  }

  .highlight {
    color: #1976d2;
    font-weight: 500;
    margin-top: 0.5rem;
  }
`;

// Add missing styled component for CollectionCard
const CollectionCard = styled.div`
  background: rgba(25, 118, 210, 0.08);
  border: 1px solid rgba(25, 118, 210, 0.18);
  border-radius: clamp(8px, 2vw, 12px);
  padding: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  color: rgba(255, 255, 255, 0.95);
`;

// Add missing styled component for ChangeButton
const ChangeButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: background 0.2s;
  &:hover {
    background: rgba(25, 118, 210, 0.08);
  }
`;

// Add missing styled component for CollectionCardHeader
const CollectionCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

// Add missing styled component for ButtonContainer
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }
`;

// Add missing styled component for ActionButton
const ActionButton = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary ? "#1976d2" : "rgba(255,255,255,0.08)"};
  color: ${props => props.$primary ? "#fff" : "#1976d2"};
  border: 1px solid ${props => props.$primary ? "#1976d2" : "rgba(25, 118, 210, 0.18)"};
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.05);
  &:hover:not(:disabled) {
    background: ${props => props.$primary ? "#1565c0" : "rgba(25, 118, 210, 0.12)"};
    color: #fff;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function Schedule({ onBack, onContinue, initialDate, permitInfo }: ScheduleProps) {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || null);
  const [currentMonth, setCurrentMonth] = useState(initialDate?.getMonth() || currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate?.getFullYear() || currentDate.getFullYear());

  // Collection calendar states
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [collectionDate, setCollectionDate] = useState<Date>(() => {
    // Initialize with a date one week after the current date
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  });
  const [collectionMonth, setCollectionMonth] = useState(collectionDate.getMonth());
  const [collectionYear, setCollectionYear] = useState(collectionDate.getFullYear());
  const [history, setHistory] = useState<HistoryStep[]>([]);

  const addToHistory = () => {
    setHistory(prev => [...prev, {
      selectedDate,
      collectionDate,
      currentMonth,
      currentYear,
    }]);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const lastStep = history[history.length - 1];
      setSelectedDate(lastStep.selectedDate);
      setCollectionDate(lastStep.collectionDate);
      setCurrentMonth(lastStep.currentMonth);
      setCurrentYear(lastStep.currentYear);
      setHistory(prev => prev.slice(0, -1));
    }
    onBack();
  };

  const isCollectionDateDisabled = (date: Date) => {
    if (!selectedDate)
      return true;

    // Must be at least 7 days after delivery date
    const minDate = new Date(selectedDate);
    minDate.setDate(minDate.getDate() + 7);

    // Max 3 months after delivery
    const maxDate = new Date(selectedDate);
    maxDate.setMonth(maxDate.getMonth() + 3);

    return date < minDate || date > maxDate || date.getDay() === 0; // No Sundays
  };

  const isDateDisabled = (date: Date) => {
    // Add permit date restriction if permitInfo is provided
    if (permitInfo && date < permitInfo.earliestDate) {
      return true;
    }

    // Original restrictions
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    return (
      date < currentDate
      || date > maxDate
      || date.getDay() === 0 // Sunday
    );
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
    else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
    else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    if (!isDateDisabled(selectedDate)) {
      setSelectedDate(selectedDate);
    }
  };

  const handleContinue = () => {
    if (selectedDate) {
      onContinue(selectedDate);
    }
  };

  const handleCollectionDateSelect = (day: number) => {
    const date = new Date(collectionYear, collectionMonth, day);
    if (!isCollectionDateDisabled(date)) {
      addToHistory();
      setCollectionDate(date);
      setShowCollectionModal(false);
    }
  };

  const handleCollectionPrevMonth = () => {
    if (collectionMonth === 0) {
      setCollectionMonth(11);
      setCollectionYear(collectionYear - 1);
    }
    else {
      setCollectionMonth(collectionMonth - 1);
    }
  };

  const handleCollectionNextMonth = () => {
    if (collectionMonth === 11) {
      setCollectionMonth(0);
      setCollectionYear(collectionYear + 1);
    }
    else {
      setCollectionMonth(collectionMonth + 1);
    }
  };

  const renderDays = () => {
    const days = [];
    const daysFromPrevMonth = new Date(currentYear, currentMonth, 1).getDay();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

    // Previous month days
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <DayCell
          key={`prev-${day}`}
          disabled
          $isInCurrentMonth={false}
        >
          {day}
        </DayCell>,
      );
    }

    // Current month days
    for (let day = 1; day <= new Date(currentYear, currentMonth + 1, 0).getDate(); day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === currentDate.toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isDisabled = isDateDisabled(date);

      days.push(
        <DayCell
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={isDisabled}
          $isToday={isToday}
          $isSelected={isSelected}
          $isInCurrentMonth={true}
        >
          {day}
        </DayCell>,
      );
    }

    // Next month days
    const totalDays = days.length;
    const remainingDays = 42 - totalDays; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <DayCell
          key={`next-${day}`}
          disabled
          $isInCurrentMonth={false}
        >
          {day}
        </DayCell>,
      );
    }

    return days;
  };

  const renderCollectionDays = () => {
    const daysInMonth = new Date(collectionYear, collectionMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(collectionYear, collectionMonth, 1).getDay();
    const days = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevMonthDays = new Date(collectionYear, collectionMonth, 0).getDate();
      const day = prevMonthDays - i;
      days.push(
        <DayCell key={`prev-${day}`} disabled $isInCurrentMonth={false}>
          {day}
        </DayCell>,
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(collectionYear, collectionMonth, day);
      const isSelected = collectionDate.toDateString() === date.toDateString();
      const isDisabled = isCollectionDateDisabled(date);

      days.push(
        <DayCell
          key={day}
          onClick={() => handleCollectionDateSelect(day)}
          disabled={isDisabled}
          $isSelected={isSelected}
          $isInCurrentMonth={true}
        >
          {day}
        </DayCell>,
      );
    }

    // Next month days
    const totalDays = days.length;
    const remainingDays = 42 - totalDays;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <DayCell key={`next-${day}`} disabled $isInCurrentMonth={false}>
          {day}
        </DayCell>,
      );
    }

    return days;
  };

  return (
    <Fade in timeout={500}>
      <Container>
        <Title>Choose Your Delivery Date</Title>
        <Subtitle>
          Select your preferred skip delivery date. We'll aim to deliver between 7am and 6pm on your chosen day.
        </Subtitle>

        <DeliveryTimeInfo>
          <ClockCircleOutlined className="icon" />
          <p>Delivery hours: Monday to Saturday, 7am - 6pm</p>
        </DeliveryTimeInfo>

        {permitInfo && (
          <PermitInformation>
            <h3>
              <InfoCircleOutlined />
              {" "}
              Permit Information
            </h3>
            <p>{permitInfo.text}</p>
            <p className="highlight">
              The earliest available date is
              {" "}
              {permitInfo.earliestDate.toLocaleDateString("default", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
              .
            </p>
          </PermitInformation>
        )}

        <CalendarContainer>
          <CalendarHeader>
            <MonthYear>
              <CalendarOutlined className="icon" />
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </MonthYear>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <NavigationButton
                onClick={handlePrevMonth}
                disabled={
                  currentYear === currentDate.getFullYear()
                  && currentMonth === currentDate.getMonth()
                }
              >
                <LeftOutlined />
              </NavigationButton>
              <NavigationButton
                onClick={handleNextMonth}
                disabled={
                  currentYear === currentDate.getFullYear() + 1
                  && currentMonth === currentDate.getMonth()
                }
              >
                <RightOutlined />
              </NavigationButton>
            </div>
          </CalendarHeader>

          <WeekDaysGrid>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}
          </WeekDaysGrid>

          <DaysGrid>
            {renderDays()}
          </DaysGrid>
        </CalendarContainer>

        {selectedDate && (
          <CollectionCard>
            <CollectionCardHeader>
              <h3>Collection Date</h3>
              <ChangeButton onClick={() => setShowCollectionModal(true)}>
                Change
              </ChangeButton>
            </CollectionCardHeader>
            <p style={{ marginBottom: "0.5rem" }}>
              {collectionDate.toLocaleDateString("default", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>We'll collect your skip on this date. Please ensure it's accessible.</p>
          </CollectionCard>
        )}

        <ButtonContainer>
          <ActionButton onClick={handleBack}>
            Back
          </ActionButton>
          <ActionButton
            $primary
            onClick={handleContinue}
            disabled={!selectedDate}
          >
            Continue to Payment
          </ActionButton>
        </ButtonContainer>

        <StyledModal
          open={showCollectionModal}
          onCancel={() => setShowCollectionModal(false)}
          footer={null}
          width={600}
          centered
        >
          <Container style={{ padding: "1rem" }}>
            <h2 style={{ color: "white", marginBottom: "1.5rem" }}>
              Choose Collection Date
            </h2>

            <CalendarContainer>
              <CalendarHeader>
                <MonthYear>
                  <CalendarOutlined className="icon" />
                  {new Date(collectionYear, collectionMonth).toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </MonthYear>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <NavigationButton onClick={handleCollectionPrevMonth}>
                    <LeftOutlined />
                  </NavigationButton>
                  <NavigationButton onClick={handleCollectionNextMonth}>
                    <RightOutlined />
                  </NavigationButton>
                </div>
              </CalendarHeader>

              <WeekDaysGrid>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <WeekDay key={day}>{day}</WeekDay>
                ))}
              </WeekDaysGrid>

              <DaysGrid>
                {renderCollectionDays()}
              </DaysGrid>
            </CalendarContainer>
          </Container>
        </StyledModal>
      </Container>
    </Fade>
  );
}
