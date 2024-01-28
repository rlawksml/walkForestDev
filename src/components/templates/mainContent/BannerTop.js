import { Chip } from "@mui/joy";
import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { isBrowser } from "react-device-detect";
import styled from "styled-components";
import bg from '../../../assets/images/background.jpg';
import bgVideo from '../../../assets/images/bgVideo.mp4';

export default function BannerTop() {
  return (
    <>
      <BannerSection bg={bg}>
        <div className="BannerCt">
          <div className="textCt">

          <Chip sx={{zIndex:1}} label="primary" color="primary" variant="outlined">
            데일리 추천 코스
          </Chip>
          <Typography sx={{zIndex:1, position:"relative"}} variant={isBrowser ? "h4" : "h6"}>오늘의 추천코스 보라매공원</Typography>
          <Typography sx={{zIndex: 1,position:"relative"}} color={"white"} variant="h7">
          서울특별시 동작구 여의대방로20길 33
          </Typography>
          </div>
          <video autoPlay loop muted>
            <source src={bgVideo} type="video/mp4" />
          </video>
        </div>
      </BannerSection>
    </>
  );
}

const BannerSection = styled.div`

  background-size : cover;
  background-position: center;
  color: #fff;
  font-weight: bold;
  width: 100%;
  height: 220px;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  & .BannerCt{
    width:100%;
    height: 100%;
    overflow:hidden;
    position:relative;
  }
  & .textCt{
    display:flex;

    position: absolute;
    top:50%;
    left:50%;
    transform : translate(-50%,-50%);
    flex-direction:column;
    justify-content:center;
    z-index:1;
    padding:15px;
    background: rgba(0,0,0, 0.5);
    border-radius: 10px;

    @media(max-width:480px){
      width: 80%;
      font-size:12px;
      top:30%;
      left:50%;
      transform : translate(-50%,-50%);
    }
  }

  & video{
    top:50%;
    transform: translateY(-40%);
    left:0;
    z-index:0;
    width: 100%;
    z-index:-1;
  }
`;
