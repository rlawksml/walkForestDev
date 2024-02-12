import { useContext } from "react";
import { LoginContext } from "../../../utils/providers/login/LoginContext";
import GlobalHeader from "../../organisms/GlobalHeader";

export default function DashBoard() {
  const { isLogined, setIsLogined, userInfo, setUserInfo } =
    useContext(LoginContext);
  return (
    <>
      <GlobalHeader />
      <div>왜 자꾸 이상해지는거니?</div>
    </>
  );
}
