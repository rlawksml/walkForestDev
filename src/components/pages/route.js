import { Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Home from "./home";
import Dashboard from "./dashboard";
import SearchBook from "./SearchBook";
import Faq from "./docs/Faq";
import MyBox from "./MyBox";
import { LoginContext } from "../../utils/providers/login/LoginContext";
import { LoginSessionGet } from "../../utils/providers/login/LoginSession";

export default function Router() {
  const { isLogined, setIsLogined, userInfo, setUserInfo } =
    useContext(LoginContext);

  useEffect(() => {
    const loggedInState = LoginSessionGet();
    setIsLogined(loggedInState);
    setUserInfo({
      userUUID: sessionStorage.getItem("uuid"),
      userNickName: sessionStorage.getItem("nickname"),
      userId: sessionStorage.getItem("ud"),
      userPw: "",
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home isLogined={isLogined} />} />
        <Route
          path="/dashboard"
          element={isLogined ? <Dashboard /> : <Home />}
        />
        <Route path="/mybox" element={isLogined ? <MyBox /> : <Home />} />
        <Route
          path="/SearchBook"
          element={<SearchBook isLogined={isLogined} />}
        />
      </Routes>
    </>
  );
}
