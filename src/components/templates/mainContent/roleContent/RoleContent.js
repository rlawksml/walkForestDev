import { Avatar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import NormalButton from "../../../atomic/NormalButton";
import ToolTips from "../../ToolTips";
import { isBrowser } from "react-device-detect";
import rSocial from "../../../../assets/images/social.png";
import rEcnomy from "../../../../assets/images/economy.png";
import rNovel from "../../../../assets/images/poet.png";
import rNotNovel from "../../../../assets/images/idea.png";
import ErrorIcon from "@mui/icons-material/Error";
import emojiCategory from "../../../../assets/images/categories.png";
import { LoginContext } from "../../../../utils/providers/login/LoginContext";
import RecommandBookCard from "../../modal/RecommandBookCard";
import book1 from "../../../../assets/images/book1.jpg";
import book2 from "../../../../assets/images/book2.jpg";
import book3 from "../../../../assets/images/book3.jpg";
import book4 from "../../../../assets/images/book4.jpg";

import { recommandGpt } from "../../../../utils/gpt";
import { searchBook } from "../../../../utils/book";

export default function RoleContent({ handleClickOpen }) {
  const replaceList = [
    {
      img: rSocial,
      name: "사회 도서",
      title: "나는 메트로폴리탄 미술관의 경비원입니다",
      contents:
        "뉴욕 메트로폴리탄 미술관의 경비원으로 10년, 인류의 위대한 걸작들을 가장 가까이서 지켜본 한 남자의 삶과 죽음, 인생과 예술에 대한 우아하고 지적인 회고",
      thumbnail: book3,
      createAt: "2023년 11월 24일",
    },
    {
      img: rEcnomy,
      name: "경제 도서",
      title: "똑똑한 사람은 어떻게 생각하고 질문하는가",
      contents:
        "그러니 이제 우리는 질문하는 방법을 배워야 합니다. 그리고 훈련하고, 연습하고, 발전시켜야 하죠. AI뿐 아니라 우리 스스로에게 질문하면서 자기 자신을 발전시키고, 다른 사람에게도 적절한 질문을 하면서 관계를 형성해야 합니다.",
      thumbnail: book2,
      createAt: "2024년 01월 24일",
    },
    {
      img: rNotNovel,
      name: "인문학 도서",
      title: "마흔에 읽는 쇼펜하우어",
      contents:
        "2023년 8월 유노북스에서 펴낸 《마흔에 읽는 쇼펜하우어》가 전 서점 종합 베스트셀러 1위에 올랐다. ",
      thumbnail: book1,
      createAt: "2023년 09월 07일",
    },
    {
      img: rNovel,
      name: "문학 도서",
      title: "퓨처 셀프",
      contents:
        "살 날이 얼마 남지 않은 ‘미래의 내’가 현재로 시간 여행을 왔다고 상상해보자. ‘현재의 나’는 해야 할 일은 미뤄둔 채 소파에 누워 핸드폰을 보느라 시간 가는 줄 모른다. 당장 사고 싶은 것, 먹고 싶은 것에 생각 없이 돈을 쓰고, ‘다음 달의 나’에게 결제를 미룬다. ",
      thumbnail: book4,
      createAt: "2023년 08월 30일",
    },
  ];

  const bookCategory = [
    {
      type: 0,
      img: rSocial,
      name: "사회 도서",
    },
    {
      type: 1,
      img: rEcnomy,
      name: "경제 도서",
    },
    {
      type: 2,
      img: rNotNovel,
      name: "인문학 도서",
    },
    {
      type: 3,
      img: rNovel,
      name: "문학 도서",
    },
  ];

  const tipTitle = null;
  const tipDesc = (
    <span>
      GPT를 통한 분야별 추천도서입니다!
      <br />
      추천 목록을 통해 독서를 시작해보세요
    </span>
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState("");

  const [todayBook, setTodayBook] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [url, setUrl] = useState();
  const [thum, setThum] = useState();
  const [gptRecommandData, setGptRecommandData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("mid");
  const [isLoading, setIsLoading] = useState(true);

  // 추천 아이템 클릭시 오픈 함수
  const handleUsesItemDetail = (index) => {
    setModalOpen((prev) => !prev);

    if (!todayBook[index]) {
      setModalInfo(replaceList[index]);
    } else {
      setModalInfo(todayBook[index]);
    }
  };

  // 텍스트 배열을 객체 배열로 변환하는 함수
  const convertToObjects = async (text) => {
    let splitText = text?.split(", ");

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
    handleRecommanList();
  };

  const handleLength = () => {
    if (isBrowser) {
      if (desc && desc.length >= 80) {
        return desc.substr(0, 80) + "...";
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

  const handleRecommanList = async () => {};

  useEffect(() => {
    (async () => {
      try {
        let promise = gptRecommandData.map((item, index) => {
          return searchBook(item.title + item.author);
        });

        let result = await Promise.all(promise);

        setTodayBook(
          result.map((item) => {
            return item[0];
          })
        );
      } catch (error) {
        console.log("error ", error);
      }
    })();
  }, [isLoading]);

  useEffect(() => {
    (async () => {
      let gptData = await recommandGpt(
        "최근 국내 베스트셀러 사회, 경제, 인문, 문학 1권씩 제목을 알려줘 그리고 형식은 예시와 같이 작성해줘 예시 === 사회 : ' 제목 / 저자 ', 경제: ' 제목 / 저자 ',"
      );
      // let gptData =
      //   "사회: '마당을 나온 암탉', 경제: '금융공부 / 하하', 과학: '쉽게 배우는 물리학 / 박성열', 인문: '행복한 철학 / 루이스 미터스', 문학: '나의 작은 아쿠아리움 / 김풍'";

      await convertToObjects(gptData);
    })();
  }, []);

  return (
    <RoleSection>
      <Title variant="">
        <img style={{ width: "25px" }} src={emojiCategory} alt="불이미지"></img>
        분야별
        <Typography sx={{ margin: "0 0 0 7px" }} variant="" color={"primary"}>
          추천도서
        </Typography>
        {isBrowser ? (
          <ToolTips position={"right"} title={tipTitle} desc={tipDesc}>
            <CusNoticeIcon color="" />
          </ToolTips>
        ) : (
          <NormalButton
            callBackFunc={(e) => {
              handleClickOpen(tipTitle, tipDesc);
            }}
            buttonTitle={<CusNoticeIcon color="" />}
          ></NormalButton>
        )}
      </Title>
      <RoleList>
        {bookCategory?.map((role, index) => {
          return (
            <RoleListItem
              onClick={() => {
                handleUsesItemDetail(index);
              }}
              key={index}
            >
              <img className="icon" src={role.img} alt="도서 아이콘"></img>
              <RoelName variant="subtitle1">{role.name}</RoelName>
            </RoleListItem>
          );
        })}

        {modalOpen && (
          <RecommandBookCard
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            modalInfo={modalInfo}
          />
        )}
      </RoleList>
    </RoleSection>
  );
}

const RoleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  margin-bottom: 10px;
`;

const RoleList = styled.ul`
  display: flex;
  width: 100%;
  padding: 10px 0;

  overflow-x: auto;

  @media (min-width: 481px) {
  }
`;

const RoleListItem = styled.li`
  display: flex;
  flex-direction: column;
  flex: 0 0 30%;

  align-items: center;
  justify-content: center;
  margin: 0;

  img.icon {
    width: 75px;
    margin: 10px 0;
  }

  @media (min-width: 481px) {
    flex: 0 0 15%;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &.roleUser {
    margin-left: 10%;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      width: 2px;
      height: 100%;
      left: 5px;
      top: 0;
      background: #dcdcdc;
    }

    @media (min-width: 481px) {
      &:after {
        content: "";
        position: absolute;
        width: 2px;
        height: 100%;
        left: -50%;
        top: 0;
        background: #dcdcdc;
      }
    }
  }
`;

const Title = styled(Typography)`
  display: flex;
  align-items: center;
  width: 100%;

  font-size: 17px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.75px;

  margin-bottom: 20px;

  & img {
    margin-right: 5px;
  }
`;

const RoleImg = styled(Avatar)`
  /* border: 1px solid #dcdcdc; */
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  /* overflow: none; */
  & img {
    width: 55px;
    height: 55px;
    object-fit: contain;
  }
`;

const RoelName = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
`;
const CusNoticeIcon = styled(ErrorIcon)`
  color: #3cb371;
`;
