import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { AutoComplete } from "antd";
import { useMemo, useState } from "react";
import styled from "styled-components";

import type { AddressSuggestion } from "../mock/address-data";

import { addressSuggestions } from "../mock/address-data";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledAutoComplete = styled(AutoComplete)`
  .ant-select-selector {
    height: clamp(48px, 8vh, 60px) !important;
    border-radius: clamp(8px, 2vw, 12px) !important;
    background-color: rgba(45, 45, 45, 0.95) !important;
    border: 2px solid rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    padding: 0 clamp(16px, 3vw, 20px) !important;
    
    input {
      height: clamp(44px, calc(8vh - 4px), 56px) !important;
      color: white !important;
      font-size: clamp(0.95rem, 2.2vw, 1.1rem) !important;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5) !important;
      }
    }

    @media (max-width: 480px) {
      height: 48px !important;
      input {
        height: 44px !important;
        font-size: 0.95rem !important;
      }
    }
  }

  &.ant-select-focused .ant-select-selector {
    border-color: #1976d2 !important;
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2) !important;
  }

  .ant-select-clear {
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    font-size: clamp(14px, 2.5vw, 16px);
    right: clamp(36px, 8vw, 40px);

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .ant-select-dropdown {
    background-color: rgba(45, 45, 45, 0.98) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: clamp(8px, 2vw, 12px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    padding: clamp(6px, 1.5vw, 8px);
  }
`;

const SearchIcon = styled(SearchOutlined)`
  position: absolute;
  right: clamp(12px, 3vw, 16px);
  top: 50%;
  transform: translateY(-50%);
  font-size: clamp(16px, 3vw, 20px);
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
  z-index: 1;
`;

const AddressOption = styled.div`
  display: flex;
  align-items: flex-start;
  padding: clamp(8px, 2vw, 12px);
  border-radius: clamp(6px, 1.5vw, 8px);
  transition: all 0.2s ease;
  gap: clamp(8px, 2vw, 12px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .ant-select-item-option-active & {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const LocationIcon = styled(EnvironmentOutlined)`
  font-size: clamp(16px, 2.5vw, 18px);
  color: #1976d2;
  margin-top: 4px;
  flex-shrink: 0;
`;

const AddressDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const Street = styled.div`
  color: white;
  font-size: clamp(0.95rem, 2.2vw, 1rem);
  font-weight: 500;
  margin-bottom: clamp(2px, 1vw, 4px);
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.3;
`;

const AreaInfo = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: clamp(0.85rem, 2vw, 0.9rem);
  line-height: 1.4;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: baseline;
`;

const ResultCount = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: clamp(0.75rem, 1.8vw, 0.8rem);
  margin-left: clamp(4px, 1.5vw, 8px);
`;

type SearchBarProps = {
  onAddressSelect: (address: AddressSuggestion) => void;
};

function SearchBar({ onAddressSelect }: SearchBarProps) {
  const [searchText, setSearchText] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchText)
      return [];
    return addressSuggestions
      .filter((address: AddressSuggestion) =>
        address.street.toLowerCase().includes(searchText.toLowerCase())
        || address.postcode.toLowerCase().includes(searchText.toLowerCase())
        || address.city.toLowerCase().includes(searchText.toLowerCase()),
      )
      .map((address: AddressSuggestion) => ({
        value: address.id,
        label: (
          <AddressOption>
            <LocationIcon />
            <AddressDetails>
              <Street>{address.street}</Street>
              <AreaInfo>
                {address.city}
                {" "}
                {address.postcode}
                <ResultCount>
                  (
                  {address.results}
                  {" "}
                  Results)
                </ResultCount>
              </AreaInfo>
            </AddressDetails>
          </AddressOption>
        ),
        address,
      }));
  }, [searchText]);

  const handleSelect = (_value: unknown, option: any) => {
    onAddressSelect(option.address);
    // console.warn(value);
  };

  return (
    <SearchContainer>
      <StyledAutoComplete
        placeholder="Enter your postcode or street name"
        options={filteredOptions}
        onSearch={setSearchText}
        onSelect={handleSelect}
        allowClear
        size="large"
        style={{ width: "100%" }}
      />
      <SearchIcon />
    </SearchContainer>
  );
}

export default SearchBar;
