import { Chip } from "@mui/joy";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { searchBook } from "../../../utils/book.js";

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

  const handleLength = () => {
    if (desc && desc.length >= 85) {
      return desc.substr(0, 85) + "...";
    } else {
      return desc;
    }
  };

  return (
    <>
      <BannerSection>
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
            <MyChip label="primary" color="primary" variant="outlined">
              오늘의 추천
            </MyChip>
            <Title variant="h4">{title}</Title>
            <Typography className="content" color={"black"} variant="h8">
              {handleLength()}
            </Typography>
          </div>
        </div>
      </BannerSection>
    </>
  );
}

const MyChip = styled(Chip)`
  background: #fcde90;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  padding: 8px 30px;
  margin-bottom: 10px;
`;

const Title = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: 10px;
`;

const BannerSection = styled.div`
  background: transparent;
  z-indez: 1;
  color: #fff;
  font-weight: bold;
  width: 100%;
  height: 350px;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  overflow: hidden;
  &:after {
    content: "";
    // z-index: -1;
    background-color: #81c9a1;
    width: 80%;
    height: 100%;
    border-radius: 50px;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
  }

  & .BannerCt {
    display: flex;
    z-index: 1;
    .imgCt {
      &:hover {
        cursor: pointer;
        opacity: 0.9;
      }
      margin: 10px;
      img {
        width: 140px;
      }
    }
    .contentCt {
      padding: 20px 10px;
      display: flex;
      flex-direction: column;

      .content {
        width: 250px;
        word-break: keep-all;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
`;
