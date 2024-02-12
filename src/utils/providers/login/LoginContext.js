import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogined, setIsLogined] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userUUID: "",
    userNickName: "",
    userId: "",
    userPw: "",
  });

  return (
    <LoginContext.Provider
      value={{
        isLogined,
        setIsLogined,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
