import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import Chip from "@mui/joy/Chip";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { isBrowser } from "react-device-detect";
import styled from "styled-components";
import NormalButton from "../../../atomic/NormalButton";
import ToolTips from "../../ToolTips";
import UseItems from "./UseItems";

import emojiLight from "../../../../assets/images/emo_light.png";
import ModalPop from "../../ModalPop";

export default function UsesContent({ handleClickOpen }) {
  const defaultData = [
    {
      type: "hash",
      typeText: "등산로",
      typeColor: "p",
      desc: "초보자도 가기 쉬운 등산로를 추천합니다!",
    },
    {
      type: "copy",
      typeText: "공원",
      typeColor: "y",
      desc: "집앞 공원이지만, 운동기구도 많고 사람들이 많이 나와서 운동을 하고 있네요 접근성이 좋아서 추천합니다!",
    },
    {
      type: "intro",
      typeText: "동네구석",
      typeColor: "g",
      desc: "산책로나 등산로가 아니여도, 동네 구석구석 숨어있는 걷기 좋은 나만의 산책로를 추천합니다!",
    },
  ];

  const usesCategory = [
    { type: "all", img: "", title: "전체", icon: "" },
    { type: "copy", img: "", title: "공원", icon: "" },
    { type: "hash", img: "", title: "등산로", icon: "" },
    { type: "intro", img: "", title: "동네구석", icon: "" },
  ];

  const tipTitle = null;
  const tipDesc =
    "방문한 숲 또는 산책로의 방문 기록을 남겨보고 추천해보세요!";

  const [usesData, setUsesData] = useState();
  const [categoryState, setCategoryState] = useState(0);
  const [cardState, setCardState] = useState("none");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState("");

  // 카테고리 버튼
  const handleCategoryBtn = (index, type) => {
    setCategoryState(index);
    sortUsesItem(index, type);
  };
  // 카테고리 버튼 클릭시 정렬 함수
  const sortUsesItem = (index, type) => {
    if (index === 0) {
      setUsesData(defaultData);
    } else {
      setUsesData(defaultData.filter((item) => item.type === type));
    }
  };
  //둘러보기 아이템 클릭시 효과
  const handleUsesItem = (index, item) => {
    // 스타일 효과
    setCardState(index);

    // 클릭한 아이템 정보를 모달로 전달할 state
    setModalInfo(item);
  };

  // 활용 아이템 클릭시 오픈 함수
  const handleUsesItemDetail = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    setUsesData(defaultData);

    // 다른 부분 클릭시 아이템 active 해제
    const handleClickOutside = (event) => {
      if (!event.target.closest(".usesItem")) {
        setCardState(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <UsesSection>
      <Title variant="">
        <img src={emojiLight} alt="전구 아이콘" />
        이렇게{" "}
        <Typography variant="" color={"primary"}>
          활용
        </Typography>
        해보세요!{" "}
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
      <CategoryCt container>
        {usesCategory?.map((item, index) => {
          const isActive = categoryState === index;
          return (
            <CategoryItem
              key={index}
              variant="outlined"
              color="neutral"
              size="lg"
              className={isActive ? "active" : ""}
              endDecorator={isActive && <CheckIcon fontSize="md" />}
              onClick={(e) => handleCategoryBtn(index, item.type)}
            >
              {item.title}
            </CategoryItem>
          );
        })}
      </CategoryCt>

      <CusGrid container>
        {usesData?.map((item, index) => {
          const isActive = cardState === index;
          return (
            <UseItems
              item
              key={index}
              itemtype={item.typeText}
              desc={item.desc}
              typeColor={item.typeColor}
              cardClass={isActive}
              onClick={() => {
                handleUsesItem(index, item);
              }}
              handleUsesItemDetail={handleUsesItemDetail}
            />
          );
        })}
      </CusGrid>

      {modalOpen && (
        <ModalPop
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          modalInfo={modalInfo}
        />
      )}
    </UsesSection>
  );
}

const UsesSection = styled.div`
  padding: 10px 0;
`;

const CusGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 481px) {
    flex-direction: row;
    justify-content: start;
  }
`;

const Title = styled(Typography)`
  display: flex;
  align-items: center;
  width: 100%;

  font-size: 20px;
  font-weight: 700;
  line-height: 24px;

  margin-bottom: 20px;

  & img {
    margin-right: 5px;
  }
`;

const CategoryCt = styled(Grid)`
  display: flex;
  flex-wrap: nowrap;

  overflow-x: auto;
  margin: 5px;
  /* padding: 7.5px; */
`;

const CategoryItem = styled(Chip)`
  margin: 5px 10px 5px 0;

  &.active {
    button {
      background: #3cb371;
    }
    span{
      color : #fff;
    }
  }
`;

const CusNoticeIcon = styled(ErrorIcon)`
  color: #3cb371;
`;
