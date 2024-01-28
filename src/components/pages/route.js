import { Route, Routes } from "react-router-dom";
import { useContext, useState } from "react";

import Home from "./home";
import Dashboard from "./dashboard";
import Intro from "./Intro";
import Faq from "./docs/Faq";
import MyBox from "./MyBox";

export default function Router() {
  // context로 변경해야함
  const [isLoggedIn, setIsLoggenIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Home />}
        />
        <Route path="/mybox" element={isLoggedIn ? <MyBox /> : <Home />} />
        <Route path="/intro" element={<Intro />} />
      </Routes>
    </>
  );
}
