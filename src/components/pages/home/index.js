import { useState } from "react";
import styled from "styled-components";
import { searchBook } from '../../../utils/book.js';
import { searchVideo } from '../../../utils/video.js';
import GlobalHeader from "../../organisms/GlobalHeader";
import Login from "../../templates/login/Login";
import Main from "../../templates/mainContent/Main";

export default function Home({ isLoggedIn }) {
  const [loginPopState, setLoginPopState] = useState(false);
  const handleLoginPop = () => {
    setLoginPopState((prev) => !prev);
  };

  const handleVideo = () =>{
    let keyword = "눈사람"
    console.log(searchVideo(keyword))
  }

  const handleBook = () => {
    let keyword = "눈사람"
    console.log(searchBook(keyword)) 
  }

  return (
    <Wrapper>
      <GlobalHeader
        isLoggedIn={isLoggedIn}
        loginPopState={loginPopState}
        handleLoginPop={handleLoginPop}
      /><>
      {handleBook()}
      {handleVideo()}
      </>

      <Main />

      {loginPopState && <Login setLoginPopState={setLoginPopState} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fbfcff;
`;
