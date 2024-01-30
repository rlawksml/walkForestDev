import { useState } from "react";
import styled from "styled-components";
import GlobalHeader from "../../organisms/GlobalHeader";
import Login from "../../templates/login/Login";
import Main from "../../templates/mainContent/Main";
import { Container } from "@mui/material";
import { isBrowser } from "react-device-detect";
import axios from 'axios';

export default function Home({ isLoggedIn }) {
  const KEY = process.env.REACT_APP_API_KEY
  const [loginPopState, setLoginPopState] = useState(false);
  const handleLoginPop = () => {
    setLoginPopState((prev) => !prev);
  };




function fetchData() {
  const serviceKey = encodeURIComponent(KEY);
  const url = `https://api.odcloud.kr/api/15071311/v1/uddi:75461a18-17a3-42fe-9322-a51148003b69?page=1&perPage=10`;
  const params = {
    serviceKey,
    "page": 0,
    "perPage": 0,
    "totalCount": 0,
    "currentCount": 0,
    "matchCount": 0,
    "data": [
      {
        "연번": 0,
        "요일구분": "string",
        "호선": 0,
        "역번호": 0,
        "출발역": "string",
        "상하구분": "string",
        "5시30분": "string",
        "6시00분": "string",
        "6시30분": "string",
        "7시00분": "string",
        "7시30분": "string",
        "8시00분": "string",
        "8시30분": "string",
        "9시00분": "string",
        "9시30분": "string",
        "10시00분": "string",
        "10시30분": "string",
        "11시00분": "string",
        "11시30분": "string",
        "12시00분": "string",
        "12시30분": "string",
        "13시00분": "string",
        "13시30분": "string",
        "14시00분": "string",
        "14시30분": "string",
        "15시00분": "string",
        "15시30분": "string",
        "16시00분": "string",
        "16시30분": "string",
        "17시00분": "string",
        "17시30분": "string",
        "18시00분": "string",
        "18시30분": "string",
        "19시00분": "string",
        "19시30분": "string",
        "20시00분": "string",
        "20시30분": "string",
        "21시00분": "string",
        "21시30분": "string",
        "22시00분": "string",
        "22시30분": "string",
        "23시00분": "string",
        "23시30분": "string",
        "00시00분": "string",
        "00시30분": "string"
      }
    ]
  };

  

  axios.get(url, { params })
    .then(response => {
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      // 필요한 경우, response를 처리하는 로직 추가
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
fetchData()

  return (
    <Wrapper>
      <GlobalHeader
        isLoggedIn={isLoggedIn}
        loginPopState={loginPopState}
        handleLoginPop={handleLoginPop}
      />
      <Main />

      {loginPopState && <Login setLoginPopState={setLoginPopState} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fbfcff;
`;
