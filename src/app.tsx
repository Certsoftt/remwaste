import { Spin } from "antd";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import styled from "styled-components";

import { routes } from "./router/config";
import { COLORS } from "./utils/constants";

// Lazy load components for better initial load performance
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

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
          <Routes>
            {
              routes.map(route => (
                <Route key={route.id} path={route.path} element={<route.element />} />),
              )
            }
          </Routes>
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
