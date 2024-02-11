import { BrowserRouter } from "react-router-dom";
import Router from "./components/pages/route";
import { StyledEngineProvider } from "@mui/material";
import { ModalProvider } from "./utils/providers/modal/ModalContext";
import { LoginProvider } from "./utils/providers/login/LoginContext";
import { SearchProvider } from "./utils/providers/search/SearchContext";

function App() {
  return (
    <>
      {/* styleEngineProvider > mui 사용 컴포넌트 */}
      <StyledEngineProvider injectFirst>
        <SearchProvider>
          <LoginProvider>
            <ModalProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </ModalProvider>
          </LoginProvider>
        </SearchProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
