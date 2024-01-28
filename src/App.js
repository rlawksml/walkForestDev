import { BrowserRouter } from "react-router-dom";
import Router from "./components/pages/route";
import { StyledEngineProvider } from "@mui/material";
import { ModalProvider } from "./utils/providers/modal/ModalContext";

function App() {
  return (
    <>
      {/* styleEngineProvider > mui 사용 컴포넌트 */}
      <StyledEngineProvider injectFirst>
        <ModalProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ModalProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
