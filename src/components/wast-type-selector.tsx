import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Fade, IconButton } from "@mui/material";
import { Button, Checkbox, Tooltip } from "antd";
import { useState } from "react";
import styled from "styled-components";

import { wasteTypes } from "../mock/waste-types";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #fff, #e0e0e0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
  }
`;

const WasteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const WasteCard = styled.div<{ $selected: boolean }>`
  background: ${props =>
    props.$selected
      ? "rgba(25, 118, 210, 0.15)"
      : "rgba(255, 255, 255, 0.05)"};
  border: 2px solid ${props =>
    props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.1)"};
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    border-color: ${props =>
      props.$selected ? "#1976d2" : "rgba(255, 255, 255, 0.2)"};
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
      rgba(25, 118, 210, 0.1),
      transparent 70%
    );
    opacity: ${props => (props.$selected ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin: 0;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin: 0;
`;

const RestrictionsInfo = styled.div`
  margin-top: 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
`;

const BackButton = styled(IconButton)`
  && {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 1rem;
    position: absolute;
    left: 2rem;
    top: 2rem;

    &:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const ActionButton = styled(Button)`
  &.ant-btn {
    height: 50px;
    padding: 0 2rem;
    font-size: 1.1rem;
    border-radius: 8px;
    background: #1976d2;
    border: none;
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.2);

    &:hover:not(:disabled) {
      background: #1565c0;
    }

    &:disabled {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

type WasteTypeSelectorProps = {
  onBack: () => void;
  onContinue: (selectedTypes: string[]) => void;
};

export function WasteTypeSelector({ onBack, onContinue }: WasteTypeSelectorProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleWasteType = (id: string) => {
    setSelectedTypes(prev =>
      prev.includes(id)
        ? prev.filter(type => type !== id)
        : [...prev, id],
    );
  };

  return (
    <Fade in timeout={500}>
      <Container>
        <BackButton onClick={onBack}>
          <ArrowLeftOutlined />
        </BackButton>

        <Header>
          <h2>What type of waste are you disposing of?</h2>
          <p>Select all that apply</p>
        </Header>

        <WasteGrid>
          {wasteTypes.map(waste => (
            <WasteCard
              key={waste.id}
              $selected={selectedTypes.includes(waste.id)}
              onClick={() => toggleWasteType(waste.id)}
            >
              <CardHeader>
                <CardTitle>{waste.title}</CardTitle>
                <Checkbox
                  checked={selectedTypes.includes(waste.id)}
                  onChange={() => toggleWasteType(waste.id)}
                />
              </CardHeader>
              <CardDescription>{waste.description}</CardDescription>
              {waste.restrictions && (
                <RestrictionsInfo>
                  <Tooltip
                    title={(
                      <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                        {waste.restrictions.map(restriction => (
                          <li key={restriction}>{restriction}</li>
                        ))}
                      </ul>
                    )}
                  >
                    <InfoCircleOutlined style={{ marginRight: "0.5rem" }} />
                    Restrictions apply
                  </Tooltip>
                </RestrictionsInfo>
              )}
            </WasteCard>
          ))}
        </WasteGrid>

        <ButtonContainer>
          <ActionButton
            type="primary"
            disabled={selectedTypes.length === 0}
            onClick={() => onContinue(selectedTypes)}
          >
            Continue to Skip Selection
          </ActionButton>
        </ButtonContainer>
      </Container>
    </Fade>
  );
}
