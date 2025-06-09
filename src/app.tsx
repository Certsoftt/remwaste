import { Spin } from "antd";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import { routes } from "./router/config";
import { COLORS } from "./utils/constants";

// Lazy load components for better initial load performance
const Navbar = lazy(() => import("./components/Navbar"));

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
              routes.map(route =>
                <Route key={route.id} path={route.path} element={<route.element />} />,
              )
            }
          </Routes>
        </Suspense>
      </AppContainer>
    </HelmetProvider>
  );
}

export default App;
