import { Button, ButtonGroup, Chip, Option } from "@mui/joy";
import Select, { selectClasses } from "@mui/joy/Select";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { searchBook } from "../../../utils/book.js";
import { recommandGpt } from "../../../utils/gpt.js";
import { isBrowser } from "react-device-detect";
import Loading from "../Loading.js";
import robot from "../../../assets/images/robot.png";
import Skeleton from "@mui/material/Skeleton";

export default function BannerTop({
  setOpenDia,
  setDiaMessageTitle,
  setDiaMessageDesc,
}) {
  let randomNum = Math.floor(Math.random() * 3);

  setDiaMessageTitle("데이터 오류");
  setDiaMessageDesc("페이지를 새로고침 할까요?");

  const [todayBook, setTodayBook] = useState(null);
  const [gptRecommandData, setGptRecommandData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 텍스트 배열을 객체 배열로 변환하는 함수
  const convertToObjects = (text) => {
    console.log("convertToObjects", text);
    let splitText = text.split(",");

    let objectBook = splitText.map((item) => {
      const [category, rest] = item.split(": ");
      const [title, author] = rest.split(" / ");

      return {
        category: category?.trim(),
        title: title?.replace(/'/g, "").trim(),
        author: author?.trim(),
      };
    });

    setGptRecommandData(objectBook);
    setIsLoading(false);
    handleSearchBook(objectBook);
  };

  const handleLength = () => {
    if (isBrowser) {
      if (todayBook?.contents && todayBook?.contents.length >= 80) {
        return todayBook?.contents.substr(0, 80) + "...";
      } else {
        return todayBook?.contents;
      }
    } else {
      if (todayBook?.contents && todayBook?.contents.length >= 55) {
        return todayBook?.contents.substr(0, 55) + "...";
      } else {
        return todayBook?.contents;
      }
    }
  };

  const handleSearchBook = (objectBook) => {
    (async () => {
      console.log("searchBook");
      console.log("searchBook gptRecommandData", objectBook);
      try {
        let data = await searchBook(
          objectBook[randomNum]?.title + " " + objectBook[randomNum]?.author
        );
        if (data !== undefined && data.length > 0) {
          setTodayBook(data[0]);
          console.log("연결 성공", data);
        } else {
          console.log("other Error", data);
        }
      } catch (error) {
        console.log("error", error);
        alert("새로고침");
      }
    })();
  };

  useEffect(() => {
    (async () => {
      console.log("recommandGpt");
      let keyword =
        "최근 국내 베스트셀러 중 그림으로 되어서 읽기 쉬운 사회, 경제, 과학, 인문, 문학 1권씩 제목을 알려줘 그리고 형식은 예시와 같이 작성해줘 예시 === 사회 : ' 제목 / 저자 ', 과학: ' 제목 / 저자 ',";
      let gptData = await recommandGpt(keyword);
      convertToObjects(gptData);
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isLoading ? (
        <BannerSection>
          <Skeleton variant="circular" width={200} height={200} />
          <Skeleton variant="text" width={200} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={150} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={180} sx={{ fontSize: "1rem" }} />
        </BannerSection>
      ) : (
        <BannerSection>
          <MyChip color="success" variant="soft">
            <img className="icon" src={robot} />
            <p>GPT 추천 도서</p>
          </MyChip>
          <div className="BannerCt">
            <div
              onClick={() => {
                window.open(todayBook?.url);
              }}
              className="imgCt"
            >
              <img src={todayBook?.thumbnail} alt={todayBook?.title}></img>
            </div>
            <div className="contentCt">
              <Title variant="subtitle2">{todayBook?.title}</Title>
              <Typography className="content" color={"black"} variant="h8">
                {handleLength()}
              </Typography>
              <ButtonGroup></ButtonGroup>
              {todayBook?.url && (
                <Button
                  color="primary"
                  variant="soft"
                  className="urlBtn"
                  onClick={() => {
                    window.open(todayBook?.url);
                  }}
                >
                  책 정보
                </Button>
              )}
            </div>
          </div>
        </BannerSection>
      )}
    </>
  );
}

const MyChip = styled(Button)`
  font-size: 18px;
  font-weight: 600;
  padding: 5px 30px;
  margin-bottom: 10px;
  z-index: 2;
  margin: 0px auto 10px;

  .icon {
    width: 45px;
    height: 45px;
    margin: 5px;
  }
  @media (min-width: 481px) {
    margin: 0px auto 50px;
  }
`;

const Title = styled(Typography)`
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-bottom: 10px;
  word-break: keep-all;
  text-align: center;
  color: #888;

  @media (min-width: 481px) {
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #000;
    width: 300px;
    text-align: left;
    word-break: keep-all;
    margin-bottom: 50px;
    line-height: 36px;
  }
`;

const BannerSection = styled.div`
  z-index: 1;
  color: #fff;
  font-weight: bold;
  width: 100%;
  height: 100vh;

  padding: 60px 50px 40px;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  overflow: hidden;
  & .BannerCt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .imgCt {
      margin: 10px;
      width: 150px;
      height: fit-content;

      position: relative;
      z-index: 1;

      &:after {
        content: "";
        width: 280px;
        height: 280px;
        background: #e6f2ffbf;
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
      min-height: 380px;
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
