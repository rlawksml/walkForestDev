import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import icon_close from "../../../assets/images/icon_close.svg";

import {
  CheckLoginStatus,
  LoginLocalGet,
  LoginSessionSet,
} from "../../../utils/providers/login/LoginSession";
import SignUp from "./SignUp";
import { LoginContext } from "../../../utils/providers/login/LoginContext";

const defaultTheme = createTheme();

export default function Login({
  setToastMessage,
  setOpenMeesage,
  setLoginPopState,
}) {
  let { isLogined, setIsLogined, userInfo, setUserInfo } =
    useContext(LoginContext);
  // 로그인 tabState
  const [tabState, setTabState] = useState("login");

  const [value, setValue] = useState("1");
  const [id, setIdState] = useState("");
  const [pw, setPwState] = useState("");
  const [requiredMessage, setRequiredMessage] = useState(null);

  // submit함수
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let userData = LoginLocalGet();
    let checkList = userData?.map((item) => item.id === id);

    if (checkList?.find((item) => item === true)) {
      let loginuser = userData.filter((item) => item.id === id);
      if (loginuser.length > 0 && loginuser[0].pw === pw) {
        setUserInfo({
          userUUID: loginuser[0].uuid,
          userNickName: loginuser[0].nickname,
          userId: loginuser[0].id,
          userPw: loginuser[0].pw,
        });
        setIsLogined(true);

        LoginSessionSet(
          loginuser[0].id,
          loginuser[0].nickname,
          loginuser[0].uuid,
          true
        );
        setLoginPopState((prev) => !prev);
        return true;
      } else {
        setRequiredMessage("아이디 또는 비밀번호가 다릅니다.");
      }
    } else {
      setRequiredMessage("가입되지 않은 아이디입니다.");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <LoginCt>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <CloseBtn
            icon={icon_close}
            onClick={(e) => {
              setLoginPopState((prev) => !prev);
            }}
          ></CloseBtn>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">BOOK-ROAD</Typography>
            {/* <img src={Logo} alt="MESsie"></img> */}

            <LoginTab>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <CusTabList
                      onChange={handleChange}
                      aria-label="lab API tabs"
                    >
                      <Tab label="로그인" value="1" />
                      <Tab label="회원가입" value="2" />
                    </CusTabList>
                  </Box>
                  {/* 로그인 텝 */}
                  <TabPanel value="1">
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <LoginInput
                        margin="normal"
                        required
                        fullWidth
                        id="userId"
                        label="아이디"
                        name="userId"
                        autoComplete="text"
                        autoFocus
                        value={id}
                        onChange={(e) => {
                          setIdState(e.target.value);
                        }}
                      />
                      <LoginInput
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호(영문, 숫자, 특수문자 조합 6~20자 이내)"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={pw}
                        onChange={(e) => {
                          setPwState(e.target.value);
                        }}
                      />
                      {requiredMessage !== null && (
                        <WarnMessage variant="h7">
                          {requiredMessage}{" "}
                        </WarnMessage>
                      )}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                          // handleLoginBtn();
                        }}
                      >
                        로그인
                      </Button>

                      <Grid container>
                        <Grid item xs>
                          <Button
                            onClick={(e) => {
                              handleChange(e, "2");
                            }}
                            variant="text"
                            color="info"
                          >
                            아직 회원이 아니신가요? 회원가입
                          </Button>
                        </Grid>
                        <Grid item></Grid>
                      </Grid>
                    </Box>
                  </TabPanel>

                  {/* 회원가입 텝 */}
                  <TabPanel value="2">
                    <SignUp
                      setLoginPopState={setLoginPopState}
                      setToastMessage={setToastMessage}
                      setOpenMeesage={setOpenMeesage}
                      handleChange={handleChange}
                    />
                  </TabPanel>
                </TabContext>
              </Box>
            </LoginTab>
          </Box>
        </Container>
      </ThemeProvider>
    </LoginCt>
  );
}

const LoginCt = styled.div`
  position: fixed;

  top: 0;

  background: #fff;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const LoginOtherAcc = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
  color: #4d4d4d;

  text-align: center;

  margin-top: 30px;
`;
const LoginOtherAccText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;

  & span {
    width: 142px;
    flex: 1 1 auto;
    height: 1px;
    border-top: 1px solid #9d9d9d;
  }

  & p {
    margin: 0 13px;
    flex: 0 0 auto;
  }
`;

const LoginOtherAccA = styled.a`
  /* width: 50px;
  height: 50px;
  border-radius: 100%;
  margin: 0 7px;
  color: transparent; */
  display: inline-block;
  margin: 0 7px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  &.google {
    background: url(${({ icon_google }) => icon_google}) no-repeat;
    background-position: center;
    background-size: cover;
  }
  &.naver {
    background: url(${({ icon_naver }) => icon_naver}) no-repeat;
    background-position: center;
    background-size: cover;
  }
  &.kakao {
    background: url(${({ icon_kakao }) => icon_kakao}) no-repeat;
    background-position: center;
    background-size: cover;
  }
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;

  background: url(${({ icon }) => icon}) no-repeat;
  background-size: cover;
  background-position: center;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
const LoginTabBtn = styled.button`
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: #9d9d9d;
  &.active {
    color: #ffc42e;
    font-weight: 700;
    font-size: 26px;
    line-height: 38px;
  }
`;

const DescText = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #d31f55;
  margin-bottom: 69px;

  @media (max-width: 480px) {
    text-align: center;
  }
`;

const LoginTab = styled.div`
  margin-bottom: 30px;
  width: 100%;
`;

const LoginInput = styled(TextField)`
  input {
    height: 52px;
  }
`;

const SignUpCt = styled.div`
  /* width: 440px; */
  width: 100%;
`;

const SignupOtherBtns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & span {
    margin: 16px 0 36px;
    width: 100%;
    height: 1px;
    display: block;
    border: 1px solid #9d9d9d;
  }
`;

const SignupOtherBtn = styled.button`
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  border: 1px solid #dcdcdc;
  margin-bottom: 20px;
  width: 100%;
  height: 50px;
  border-radius: 2px;

  @media (max-width: 480px) {
    width: 100%;
    border-radius: 20px;
  }

  &.google {
    background: #e74234;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #ffffff;
  }
  &.naver {
    background: #1ace61;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #ffffff;
  }
  &.kakao {
    background: #fee101;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #3a1c1c;
  }
  &.email {
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #ffffff;
    background: #40b3db;
  }
`;

const CusTabList = styled(TabList)`
  & .MuiTabs-flexContainer {
    justify-content: center;
  }
`;
const WarnMessage = styled(Typography)`
  width: 100%;
  display: block;
  border-radius: 5px;
  background-color: crimson;
  color: #fff;
  font-weight: 600;
  position: relative;
  padding: 10px;
  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background-color: darkred;
  }
`;
