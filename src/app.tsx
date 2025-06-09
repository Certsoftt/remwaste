import { Spin } from "antd";
import { lazy, Suspense, useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import styled from "styled-components";

// import { routes } from "./router/config";
import { COLORS } from "./utils/constants";

// Lazy load components for better initial load performance
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Styled components for the layout
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${COLORS.background};
`;

function App() {
  const [endpoint, setEndpoint] = useState("");
  const [loadPage, setLoadPage] = useState("");
  const handleEndpoint = () => {
    setEndpoint(window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]);
  };
  useEffect(() => {
    handleEndpoint();
    if (endpoint === "") {
      setLoadPage("home");
    }
    else {
      setLoadPage(endpoint);
    }
  }, [endpoint]);
  return (
    <HelmetProvider>
      <AppContainer>
        <Suspense
          fallback={(
            <LoadingContainer>
              <Spin size="large" />
            </LoadingContainer>
          )}
        >
          <Navbar />
          {loadPage === "home" && <Home />}
          {loadPage === "about" && <About />}
          {(loadPage !== "home" && loadPage !== "about") && <NotFound />}
          <Footer
            logo="/assets/images/home/footer/footerlogo.png"
            description="Our all-in-one app for bills, airtime, data, and smart payments — powered by Billia AI."
            email="Billiainfo@gmail.com"
            phone="08023437727"
          />
        </Suspense>
      </AppContainer>
    </HelmetProvider>
  );
}

export default App;
