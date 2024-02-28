import { Button, Chip } from "@mui/joy";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { searchBook } from "../../../utils/book.js";
import { recommandGpt } from "../../../utils/gpt.js";
import { isBrowser } from "react-device-detect";

export default function BannerTop() {
  let randomNum = Math.floor(Math.random() * 4);
  let todayKeyWordList = ["마당을 나온 암탉", "홍길동", "철학콘서트", "AI"];

  const [todayBook, setTodayBook] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [url, setUrl] = useState();
  const [thum, setThum] = useState();

  useEffect(() => {
    (async () => {
      let data = await searchBook(todayKeyWordList[randomNum]);

      setTodayBook(data);
      setTitle(data[0].title);
      setDesc(data[0].contents);
      setUrl(data[0].url);
      setThum(data[0].thumbnail);
    })();
  }, []);

  // recommandGpt("가장 최근 성인 권장도서 10개 제목만 알려줘");

  const handleLength = () => {
    if (isBrowser) {
      if (desc && desc.length >= 200) {
        return desc.substr(0, 200) + "...";
      } else {
        return desc;
      }
    } else {
      if (desc && desc.length >= 55) {
        return desc.substr(0, 55) + "...";
      } else {
        return desc;
      }
    }
  };

  return (
    <BannerSection>
      <MyChip label="primary" color="primary" variant="outlined">
        추천 도서
      </MyChip>
      <div bg={thum} className="BannerCt">
        <div
          onClick={() => {
            window.open(url);
          }}
          className="imgCt"
        >
          <img src={thum} alt={title}></img>
        </div>
        <div className="contentCt">
          <Title variant="h4">{title}</Title>
          <Typography className="content" color={"black"} variant="h8">
            {handleLength()}
          </Typography>
          <Button
            color="primary"
            variant="soft"
            className="urlBtn"
            onClick={() => {
              window.open(url);
            }}
          >
            책 정보
          </Button>
        </div>
      </div>
    </BannerSection>
  );
}

const MyChip = styled(Chip)`
  background: #78daa38f;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #3ab06e;
  padding: 10px 30px;
  margin-bottom: 10px;
  z-index: 1;

  margin: 0px auto 10px;
  @media (min-width: 481px) {
    margin: 0px auto 50px;
  }
`;

const Title = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: 10px;
  word-break: keep-all;
  text-align: center;
  color: #888;

  @media (min-width: 481px) {
    font-size: 38px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #000;
    width: 300px;
    text-align: left;
    word-break: keep-all;
    margin-bottom: 50px;
  }
`;

const BannerSection = styled.div`
  z-indez: 1;
  color: #fff;
  font-weight: bold;
  width: 100%;
  // height: 350px;
  height: 100vh;

  padding: 60px 50px 40px;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  overflow: hidden;
  // &:after {
  //   content: "";
  //   // z-index: -1;
  //   background-color: #81c9a1;
  //   width: 80%;
  //   height: 100%;
  //   // border-radius: 50px;
  //   border-radius: 5px;
  //   position: absolute;
  //   // top: 15%;
  //   top: -5%;
  //   left: 50%;
  //   transform: translateX(-50%);
  // }

  & .BannerCt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .imgCt {
      margin: 10px;
      width: 200px;
      height: fit-content;

      position: relative;
      z-index: 1;

      &:after {
        content: "";
        width: 280px;
        height: 280px;
        background: #dcdcdc59;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 300px;
        transform: translate(-50%, -50%);
        z-index: -1;
      }

      &:hover {
        cursor: pointer;
        opacity: 0.9;
      }

      img {
        width: 100%;
        box-shadow: 2px 3px 10px #b6b6b6;
      }
    }

    .contentCt {
      padding: 20px 10px;
      display: flex;
      flex-direction: column;

      .content {
        width: 250px;
        color: #555;
        word-break: keep-all;
        font-size: 14px;
        line-height: 18px;
        font-weight: 600;
      }
      .urlBtn {
        margin: 20px 0 0 auto;
      }
    }

    @media (min-width: 481px) {
      flex-direction: row;
      .imgCt {
        width: 250px;
        margin-right: 150px;
        &:after {
          width: 380px;
          height: 380px;
          border-radius: 300px;
        }
      }
      .contentCt {
        height: 100%;
        text-align: left;
        align-items: start;
        .content {
          width: 300px;
          font-size: 17px;
          line-height: 20px;
          font-weight: 400;
        }
      }
    }
  }
`;
