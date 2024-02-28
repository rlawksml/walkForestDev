import { Avatar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import NormalButton from "../../../atomic/NormalButton";
import ToolTips from "../../ToolTips";
import { isBrowser } from "react-device-detect";
import roleImg01 from "../../../../assets/images/roleImg01.png";
import roleImg02 from "../../../../assets/images/roleImg02.png";
import roleImg03 from "../../../../assets/images/roleImg03.png";
import roleImg04 from "../../../../assets/images/roleImg04.png";
import roleImg05 from "../../../../assets/images/roleImgUser.png";
import ErrorIcon from "@mui/icons-material/Error";
import emojiFire from "../../../../assets/images/emo_fire.png";
import { LoginContext } from "../../../../utils/providers/login/LoginContext";
import RecommandBookCard from "../../modal/RecommandBookCard";
import book1 from "../../../../assets/images/book1.jpg";
import book2 from "../../../../assets/images/book2.jpg";
import book3 from "../../../../assets/images/book3.jpg";
import book4 from "../../../../assets/images/book4.jpg";

import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ScienceIcon from "@mui/icons-material/Science";
import PaidIcon from "@mui/icons-material/Paid";

export default function RoleContent({ handleClickOpen }) {
  const roleList = [
    {
      img: roleImg01,
      name: "인문학 도서",
      title: "마흔에 읽는 쇼펜하우어",
      desc: "2023년 8월 유노북스에서 펴낸 《마흔에 읽는 쇼펜하우어》가 전 서점 종합 베스트셀러 1위에 올랐다. ",
      thumnail: book1,
      createAt: "2023년 09월 07일",
    },
    {
      img: roleImg02,
      name: "철학 도서",
      title: "똑똑한 사람은 어떻게 생각하고 질문하는가",
      desc: "그러니 이제 우리는 질문하는 방법을 배워야 합니다. 그리고 훈련하고, 연습하고, 발전시켜야 하죠. AI뿐 아니라 우리 스스로에게 질문하면서 자기 자신을 발전시키고, 다른 사람에게도 적절한 질문을 하면서 관계를 형성해야 합니다.",
      thumnail: book2,
      createAt: "2024년 01월 24일",
    },
    {
      img: roleImg03,
      name: "문학 도서",
      title: "나는 메트로폴리탄 미술관의 경비원입니다",
      desc: "뉴욕 메트로폴리탄 미술관의 경비원으로 10년, 인류의 위대한 걸작들을 가장 가까이서 지켜본 한 남자의 삶과 죽음, 인생과 예술에 대한 우아하고 지적인 회고",
      thumnail: book3,
      createAt: "2023년 11월 24일",
    },
    {
      img: roleImg04,
      name: "랜덤 추천 도서",
      title: "퓨처 셀프",
      desc: "살 날이 얼마 남지 않은 ‘미래의 내’가 현재로 시간 여행을 왔다고 상상해보자. ‘현재의 나’는 해야 할 일은 미뤄둔 채 소파에 누워 핸드폰을 보느라 시간 가는 줄 모른다. 당장 사고 싶은 것, 먹고 싶은 것에 생각 없이 돈을 쓰고, ‘다음 달의 나’에게 결제를 미룬다. ",
      thumnail: book4,
      createAt: "2023년 08월 30일",
    },
  ];
  const UserRole = { img: roleImg05, name: "나의 기록" };

  const tipTitle = null;
  const tipDesc = (
    <span>
      어떤 책부터 독서를 시작해야할지? 정하기 어려울때!
      <br />
      추천 목록을 이용해보세요
    </span>
  );

  const { isLogined, setIsLogined } = useContext(LoginContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const [ItemList, setItemList] = useState();
  const [myRecord, setMyRecord] = useState();

  // 추천 아이템 클릭시 오픈 함수
  const handleUsesItemDetail = (role) => {
    setModalOpen((prev) => !prev);
    setModalInfo(role);
  };

  useEffect(() => {
    setItemList(roleList);
  }, []);
  useEffect(() => {
    setMyRecord(UserRole);
  }, [isLogined]);

  return (
    <RoleSection>
      <Title variant="">
        <img src={emojiFire} alt="불이미지"></img> 이번주 분야별
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
        {ItemList?.map((role, index) => {
          return (
            <RoleListItem
              onClick={() => {
                handleUsesItemDetail(role);
              }}
              key={index}
            >
              <EmojiPeopleIcon />
              <PsychologyAltIcon />
              <MenuBookIcon />
              <ScienceIcon />
              <PaidIcon />
              <RoelName variant="subtitle1">{role.name}</RoelName>
            </RoleListItem>
          );
        })}

        {isLogined && (
          <RoleListItem
            onClick={() => {
              setModalInfo(null);
              setModalOpen((prev) => !prev);
            }}
            className="roleUser"
          >
            <RoleImg variant="circular" src={UserRole.img} />
            <RoelName variant="subtitle1">{UserRole.name}</RoelName>
          </RoleListItem>
        )}

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
  font-weight: 400;
  line-height: 17px;
`;
const CusNoticeIcon = styled(ErrorIcon)`
  color: #3cb371;
`;
