import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import {
  LoginLocalGet,
  LoginlocalSet,
} from "../../../utils/providers/login/LoginSession";

export default function SignUp({
  setToastMessage,
  setOpenMeesage,
  setLoginPopState,
  handleChange,
}) {
  const [nickName, setNickname] = useState("");
  const [id, setIdState] = useState("");
  const [pw, setPwState] = useState("");
  const [pw2, setPw2State] = useState("");
  const [duplicateId, setDuplicateState] = useState(false);
  const [userUUID, setUserUUID] = useState([]);

  const [requiredMessage, setRequiredMessage] = useState(null);

  let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글

  const validCheck = (e) => {
    let userData = LoginLocalGet("user");
    if (id.length < 1 || id.length > 11) {
      // setToastMessage("ID는 1~10자 사이로 입력해주세요");
      setRequiredMessage("ID는 1~10자 사이로 입력해주세요");

      return false;
    } else if (checkKor.test(id)) {
      // setToastMessage("ID에 한글은 사용이 불가합니다.");
      setRequiredMessage("ID에 한글은 사용이 불가합니다.");

      return false;
    } else if (nickName.length < 1 || nickName.length > 11) {
      // setToastMessage("닉네임은 1~10자 사이로 입력해주세요.");
      setRequiredMessage("닉네임은 1~10자 사이로 입력해주세요.");

      return false;
    } else if (pw.length < 1 || pw.length > 11) {
      // setToastMessage("비밀번호는 1~10자 사이로 입력해주세요.");
      setRequiredMessage("비밀번호는 1~10자 사이로 입력해주세요.");

      return false;
    } else if (pw !== pw2) {
      // setToastMessage("비밀번호가 서로 다릅니다.");
      setRequiredMessage("비밀번호가 서로 다릅니다.");

      return false;
    }

    return true;
  };

  // submit함수
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setIdState(data.get("userId"));
    setPwState(data.get("password"));
    setPw2State(data.get("password2"));
    setNickname(data.get("nickName"));

    if (!duplicateId) {
      setRequiredMessage("아이디 중복 검사를 해주세요.");
      setOpenMeesage(true);
    }
    if (validCheck() && duplicateId) {
      handleSignUp(uuid());
      setDuplicateState(false);
    }
  };

  const dupyCheck = () => {
    const userData = LoginLocalGet("user");

    if (id.trim("") !== "") {
      let checkList = userData?.map((item) => item.id === id);

      if (checkList?.find((item) => item === true)) {
        setRequiredMessage("중복된 아이디입니다.");
        setDuplicateState(false);
      } else {
        if (id.length > 0 && id.length < 11) {
          setRequiredMessage("사용 가능한 아이디입니다.");
          setDuplicateState(true);
        }
      }
    } else {
      setRequiredMessage("ID는 1~10자 사이로 입력해주세요.");
    }
  };

  const handleSignUp = (uuid) => {
    handleChange(null, "2");
    setLoginPopState((prev) => !prev);
    LoginlocalSet(id, pw, nickName, uuid);
    setUserUUID(uuid);
    setToastMessage("회원가입이 완료되어습니다!");
    setOpenMeesage(true);
  };

  useEffect(() => {
    setRequiredMessage(null);
  }, [id, nickName]);

  return (
    <SignUpCt id="tab_sign">
      <Typography sx={{ textAlign: "center" }} variant="h5"></Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Box sx={{ display: "flex" }}>
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
          <Button
            size="small"
            variant="text"
            onClick={() => {
              dupyCheck();
            }}
          >
            중복체크
          </Button>
        </Box>
        <LoginInput
          margin="normal"
          required
          fullWidth
          name="nickName"
          label="닉네임(10자 이내)"
          type="text"
          value={nickName}
          id="nickName"
          autoComplete=""
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />

        <LoginInput
          margin="normal"
          required
          fullWidth
          name="password"
          label="비밀번호(10자 이내)"
          type="password"
          id="password"
          value={pw}
          autoComplete="current-password"
          onChange={(e) => {
            setPwState(e.target.value);
          }}
        />
        <LoginInput
          margin="normal"
          required
          fullWidth
          name="password2"
          label="비밀번호 확인"
          type="password"
          id="password2"
          value={pw2}
          autoComplete="current-password"
          onChange={(e) => {
            setPw2State(e.target.value);
          }}
        />

        {requiredMessage !== null && (
          <WarnMessage variant="h7">{requiredMessage} </WarnMessage>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          // onClick={() => {}}
        >
          회원가입
        </Button>
      </Box>
    </SignUpCt>
  );
}

const SignUpCt = styled.div`
  /* width: 440px; */
  width: 100%;
`;

const LoginInput = styled(TextField)`
  input {
    height: 52px;
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
