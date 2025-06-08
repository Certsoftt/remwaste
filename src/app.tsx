import { lazy, Suspense } from "react";
import styled from "styled-components";

// Lazy load the Navbar component for better initial load performance
const Navbar = lazy(() => import("./components/Navbar"));

// Styled components for the layout
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  /* Add padding-top to account for fixed navbar height */
  padding-top: clamp(60px, 8vh, 80px);
`;

// Loading fallback component
const LoadingFallback = styled.div`
  height: clamp(60px, 8vh, 80px);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

function App() {
  return (
    <AppContainer>
      <Suspense fallback={<LoadingFallback />}>
        <Navbar />
      </Suspense>
      <MainContent>
        {/* Other components will be rendered here */}
      </MainContent>
    </AppContainer>
  );
}

export default App;
