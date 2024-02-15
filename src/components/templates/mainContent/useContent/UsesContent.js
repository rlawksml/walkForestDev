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
import ModalPop from "../../modal/ModalPop";
import ToastMessage from "../../ToastMessage";

export default function UsesContent({ handleClickOpen }) {
  const defaultData = [
    {
      type: "hash",
      typeText: "검색하기",
      typeColor: "p",
      desc: "검색어를 통해서 다양한 책 정보를 검색해보세요! '검색 한번을 통해 블로그, youtube 검색을 할 수 있습니다!",
    },
    {
      type: "copy",
      typeText: "랜덤리스트",
      typeColor: "y",
      desc: "어떤 책을 읽어야할지 고민이 깊을때, 또는 어떤 책이 좋을지 모르겠을 때! 랜덤 리스트를 통해 책을 선택하고 시작해보세요!",
    },
    {
      type: "intro",
      typeText: "도서관 찾기",
      typeColor: "g",
      desc: "도서관에 대한 정보를 찾고 싶어",
    },
  ];

  const usesCategory = [
    { type: "all", img: "", title: "전체", icon: "" },
    { type: "copy", img: "", title: "공원", icon: "" },
    { type: "hash", img: "", title: "등산로", icon: "" },
    { type: "intro", img: "", title: "동네구석", icon: "" },
  ];

  const tipTitle = null;
  const tipDesc = "다양한 방식의 독서 습관 시작을 지원합니다!";

  const [usesData, setUsesData] = useState();
  const [categoryState, setCategoryState] = useState(0);
  const [cardState, setCardState] = useState("none");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState("");

  const [showToast, setShowToast] = useState(false);

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
        <Typography sx={{ margin: "0 0 0 7px" }} variant="" color={"primary"}>
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
      {/* <CategoryCt container>
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
      </CategoryCt> */}

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
          setShowToast={setShowToast}
        />
      )}

      {showToast && (
        <ToastMessage
          text={"개발중인 영역입니다."}
          setShowToast={setShowToast}
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
    span {
      color: #fff;
    }
  }
`;

const CusNoticeIcon = styled(ErrorIcon)`
  color: #3cb371;
`;
