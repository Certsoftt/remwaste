import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { Form, Input } from "antd";
import styled from "styled-components";

import type { AddressSuggestion } from "../mock/address-data";

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.5rem;
  }
`;

const SelectedAddress = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  word-break: break-word;

  @media (max-width: 480px) {
    padding: 12px;
    margin-bottom: 16px;
  }

  h3 {
    color: rgba(255, 255, 255, 0.9);
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    margin: 0 0 8px 0;
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: clamp(0.85rem, 2vw, 0.9rem);
    margin: 0;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  animation: slideUp 0.4s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .ant-form-item {
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
  }

  .ant-input {
    height: clamp(48px, 8vh, 56px);
    background-color: rgba(45, 45, 45, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    color: white;
    font-size: clamp(0.9rem, 2vw, 1rem);
    padding: 0.5rem clamp(0.75rem, 2vw, 1rem);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    @media (max-width: 480px) {
      height: 48px;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:hover {
      border-color: rgba(255, 255, 255, 0.3);
    }

    &:focus {
      border-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    }
  }

  .ant-form-item-label > label {
    color: rgba(255, 255, 255, 0.8);
    font-size: clamp(0.85rem, 2vw, 0.9rem);
    margin-bottom: clamp(0.3rem, 1.5vw, 0.5rem);
  }

  .ant-form-item-explain-error {
    color: #ff4d4f;
    margin-top: 0.3rem;
    font-size: clamp(0.75rem, 1.8vw, 0.8rem);
  }
`;

const BackButton = styled(IconButton)`
  && {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: clamp(12px, 3vw, 16px);
    padding: clamp(8px, 2vw, 12px);

    @media (max-width: 480px) {
      margin-bottom: 12px;
    }

    &:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const SubmitButton = styled(Button)`
  && {
    width: 100%;
    height: clamp(48px, 8vh, 56px);
    background-color: #1976d2;
    color: white;
    border-radius: 8px;
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    text-transform: none;
    margin-top: clamp(1rem, 3vw, 1.5rem);
    transition: all 0.3s ease;

    @media (max-width: 480px) {
      height: 48px;
    }

    &:hover {
      background-color: #1565c0;
    }

    &:disabled {
      background-color: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.3);
    }
  }
`;

export type AddressFormValues = {
  city: string;
  streetname: string;
  postcode: string;
};

type AddressFormProps = {
  onSubmit: (values: AddressFormValues) => void;
  onBack: () => void;
  loading?: boolean;
  selectedAddress: AddressSuggestion | null;
  initialValues?: AddressFormValues | null;
};

export function AddressForm({ onSubmit, onBack, loading, selectedAddress }: AddressFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit(values as AddressFormValues);
  };

  if (!selectedAddress)
    return null;

  return (
    <FormContainer>
      <BackButton onClick={onBack}>
        <ArrowLeftOutlined />
      </BackButton>

      <SelectedAddress>
        <h3>Selected Address</h3>
        <p>{selectedAddress.street}</p>
        <p>
          {selectedAddress.city}
          {" "}
          {selectedAddress.postcode}
        </p>
      </SelectedAddress>

      <StyledForm
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        initialValues={{
          city: selectedAddress.city,
          streetname: selectedAddress.street,
          postcode: selectedAddress.postcode,
        }}
      >
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "City is Required" }]}
        >
          <Input
            placeholder="e.g., Washington way"
          />
        </Form.Item>

        <Form.Item
          label="Street Name"
          name="streetname"
          rules={[{ required: true, message: "Street name is Requirede" }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label="Postcode"
          name="postcode"
          rules={[
            { required: true, message: "House/Flat Number is Required" },
          ]}
        >
          <Input placeholder="Enter your postcode" />
        </Form.Item>

        <SubmitButton
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? "Processing..." : "Continue"}
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
}

export default AddressForm;
