import { Route, Routes } from "react-router-dom";
import { useContext, useState } from "react";

import Home from "./home";
import Dashboard from "./dashboard";
import SearchBook from "./SearchBook";
import Faq from "./docs/Faq";
import MyBox from "./MyBox";
import { LoginContext } from "../../utils/providers/login/LoginContext";

export default function Router() {
  const { isLogined, setIsLogined } = useContext(LoginContext);

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
