import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { AutoComplete } from "antd";
import { useMemo, useState } from "react";
import styled from "styled-components";

import type { AddressSuggestion } from "../mock/address-data";

import { addressSuggestions } from "../mock/address-data";

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledAutoComplete = styled(AutoComplete)`
  .ant-select-selector {
    height: 60px !important;
    border-radius: 12px !important;
    background-color: rgba(45, 45, 45, 0.95) !important;
    border: 2px solid rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    padding: 0 20px !important;
    
    input {
      height: 56px !important;
      color: white !important;
      font-size: 1.1rem !important;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5) !important;
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
    font-size: 16px;
    right: 40px;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .ant-select-dropdown {
    background-color: rgba(45, 45, 45, 0.98) !important;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    padding: 8px;
  }
`;

const SearchIcon = styled(SearchOutlined)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
  z-index: 1;
`;

const AddressOption = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .ant-select-item-option-active & {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const LocationIcon = styled(EnvironmentOutlined)`
  font-size: 18px;
  color: #1976d2;
  margin-right: 12px;
  margin-top: 4px;
`;

const AddressDetails = styled.div`
  flex: 1;
`;

const Street = styled.div`
  color: white;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 4px;
`;

const AreaInfo = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const ResultCount = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
  margin-left: 8px;
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

  const handleSelect = (value: unknown, option: any) => {
    onAddressSelect(option.address);
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
