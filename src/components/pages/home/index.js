import { useState } from 'react';
import styled from 'styled-components';
import GlobalHeader from '../../organisms/GlobalHeader';
import Login from '../../templates/login/Login';
import Main from '../../templates/mainContent/Main';
import { Container } from '@mui/material';
import { isBrowser } from 'react-device-detect';
import axios from 'axios';

export default function Home({ isLoggedIn }) {
  const KEY = process.env.REACT_APP_API_KEY;
  const [loginPopState, setLoginPopState] = useState(false);
  const handleLoginPop = () => {
    setLoginPopState((prev) => !prev);
  };

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
