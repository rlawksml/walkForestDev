import { BrowserRouter } from "react-router-dom";
import Router from "./components/pages/route";
import { StyledEngineProvider } from "@mui/material";
import { ModalProvider } from "./utils/providers/modal/ModalContext";
import {
  LoginContext,
  LoginProvider,
} from "./utils/providers/login/LoginContext";
import { SearchProvider } from "./utils/providers/search/SearchContext";
import { useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      {/* styleEngineProvider > mui 사용 컴포넌트 */}
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <SearchProvider>
            <LoginProvider>
              <ModalProvider>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                  {/* <BrowserRouter> */}
                  <Router />
                </BrowserRouter>
              </ModalProvider>
            </LoginProvider>
          </SearchProvider>
        </QueryClientProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
