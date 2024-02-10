import { BrowserRouter } from "react-router-dom";
import Router from "./components/pages/route";
import { StyledEngineProvider } from "@mui/material";
import { ModalProvider } from "./utils/providers/modal/ModalContext";
import { LoginProvider } from "./utils/providers/login/LoginContext";

function App() {
  return (
    <>
      {/* styleEngineProvider > mui 사용 컴포넌트 */}
      <StyledEngineProvider injectFirst>
        <LoginProvider>
          <ModalProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </ModalProvider>
        </LoginProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
