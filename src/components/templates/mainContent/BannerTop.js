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
    const promise = searchBook(todayKeyWordList[randomNum]);
    const getData = () => {
      promise.then((data) => {
        setTodayBook(data);

        setTitle(data[0].title);
        setDesc(data[0].contents);
        setUrl(data[0].url);
        setThum(data[0].thumbnail);
      });
    };
    getData();
  }, []);

  // recommandGpt("중학생이 가장 많이보는 경제 도서 한권만 추천").then(
  //   (response) => {
  //     console.log("response", response);
  //   }
  // );

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
  background: #ffecb8;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #ffb900;
  padding: 15px 30px;
  margin-bottom: 10px;
  z-index: 1;

  margin: 10px auto;
  @media (min-width: 481px) {
    margin: 50px auto;
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
        background: #dcdcdc;
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
        box-shadow: 5px 5px 5px #dcdcdc;
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
          content: "";
          width: 380px;
          height: 380px;
          background: #dcdcdc;
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 300px;
          transform: translate(-50%, -50%);
          z-index: -1;
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
