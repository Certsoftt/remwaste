import {
  CalendarOutlined,
  CarOutlined,
  DeleteOutlined,
  DollarOutlined,
  FileTextOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { createTheme, CssBaseline, Fade, ThemeProvider } from "@mui/material";
import { ConfigProvider, theme } from "antd";
import { lazy, Suspense, useState } from "react";

import type { AddressFormValues } from "./components/address-form";
import type { AddressSuggestion } from "./mock/address-data";

import {
  ContentWrapper,
  LogoWrapper,
  SearchWrapper,
  StyledContainer,
  VersionText,
} from "./components/styled";

const AddressForm = lazy(() => import("./components/address-form"));
const ProgressTracker = lazy(() => import("./components/progress-tracker"));
const SearchBar = lazy(() => import("./components/search-bar"));
const WasteTypeSelector = lazy(() => import("./components/wast-type-selector"));

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#000",
      paper: "#1a1a1a",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "scrollbarWidth": "thin",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#1a1a1a",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#333",
            borderRadius: "3px",
          },
        },
      },
    },
  },
});

const steps = [
  {
    label: "Address",
    icon: <HomeOutlined />,
  },
  {
    label: "Waste Type",
    icon: <DeleteOutlined />,
  },
  {
    label: "Skip Size",
    icon: <CarOutlined />,
  },
  {
    label: "Permit",
    icon: <FileTextOutlined />,
  },
  {
    label: "Schedule",
    icon: <CalendarOutlined />,
  },
  {
    label: "Payment",
    icon: <DollarOutlined />,
  },
];

type FormStep =
  | "address-search"
  | "address-form"
  | "waste-type"
  | "skip-size"
  | "permit"
  | "schedule"
  | "payment";

function App() {
  const [currentStep, setCurrentStep] = useState<FormStep>("address-search");
  const [selectedAddress, setSelectedAddress] = useState<AddressSuggestion | null>(
    null,
  );
  const [addressDetails, setAddressDetails] = useState<AddressFormValues | null>(
    null,
  );
  const [_selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddressSelect = (address: AddressSuggestion) => {
    setSelectedAddress(address);
    setCurrentStep("address-form");
  };

  const handleAddressSubmit = async (values: AddressFormValues) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setAddressDetails(values);
      setCurrentStep("waste-type");
    }
    finally {
      setLoading(false);
    }
  };

  const handleBackToSearch = () => {
    setCurrentStep("address-search");
    setSelectedAddress(null);
  };

  const handleBackToAddress = () => {
    setCurrentStep("address-form");
  };

  const handleWasteTypeSubmit = (types: string[]) => {
    setSelectedWasteTypes(types);
    // Navigate to next step (skip size selection)
    // console.warn("Selected waste types:", types, selectedWasteTypes);
  };

  const getCurrentStepNumber = () => {
    switch (currentStep) {
      case "address-search":
      case "address-form":
        return 1;
      case "waste-type":
        return 2;
      case "skip-size":
        return 3;
      case "permit":
        return 4;
      case "schedule":
        return 5;
      case "payment":
        return 6;
      default:
        return 1;
    }
  };

  return (
    <Suspense fallback={null}>
      <ThemeProvider theme={darkTheme}>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: "#1976d2",
              borderRadius: 12,
              colorBgContainer: "#1a1a1a",
              colorBgElevated: "#1a1a1a",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CssBaseline />
          <StyledContainer maxWidth={false}>
            <ProgressTracker
              currentStep={getCurrentStepNumber()}
              steps={steps}
            />

            <LogoWrapper>
              <h1>SKIP HIRE</h1>
              <p>With A Difference</p>
            </LogoWrapper>

            <ContentWrapper>
              <Fade in={currentStep === "address-search"} timeout={500}>
                <div
                  style={{
                    display: currentStep === "address-search" ? "block" : "none",
                    width: "100%",
                  }}
                >
                  <SearchWrapper>
                    <SearchBar onAddressSelect={handleAddressSelect} />
                  </SearchWrapper>
                </div>
              </Fade>

              <Fade in={currentStep === "address-form"} timeout={500}>
                <div
                  style={{
                    display: currentStep === "address-form" ? "block" : "none",
                    width: "100%",
                  }}
                >
                  <AddressForm
                    onSubmit={handleAddressSubmit}
                    loading={loading}
                    onBack={handleBackToSearch}
                    selectedAddress={selectedAddress}
                    initialValues={addressDetails}
                  />
                </div>
              </Fade>

              <Fade in={currentStep === "waste-type"} timeout={500}>
                <div
                  style={{
                    display: currentStep === "waste-type" ? "block" : "none",
                    width: "100%",
                  }}
                >
                  <WasteTypeSelector
                    onBack={handleBackToAddress}
                    onContinue={handleWasteTypeSubmit}
                  />
                </div>
              </Fade>
            </ContentWrapper>

            <VersionText>Version 1.1.34</VersionText>
          </StyledContainer>
        </ConfigProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
