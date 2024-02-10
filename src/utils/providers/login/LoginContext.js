import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogined, setIsLogined] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogined, setIsLogined }}>
      {children}
    </LoginContext.Provider>
  );
};
