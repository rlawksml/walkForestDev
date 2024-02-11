import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import Chip from "@mui/joy/Chip";
import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { isBrowser } from "react-device-detect";
import styled from "styled-components";
import emoLens from "../../../../assets/images/emo_lens.png";
import roleImg01 from "../../../../assets/images/roleImg01.png";
import roleImg02 from "../../../../assets/images/roleImg02.png";
import roleImg03 from "../../../../assets/images/roleImg03.png";
import NormalButton from "../../../atomic/NormalButton";
import ModalPopProgram from "../../ModalPopProgram";
import ToastMessage from "../../ToastMessage";
import ToolTips from "../../ToolTips";
import AroundItems from "./AroundItems";
import { LoginContext } from "../../../../utils/providers/login/LoginContext";

export default function AroundContent({ handleClickOpen }) {
  const defaultData = [
    {
      type: "hash",
      typeText: "유료 프로그램",
      typeColor: "p",
      desc: "바리스타와 함께하는 숲속의 커피 타임, 숲속에서의 휴식을 즐겨보세요",
      thumNail: roleImg01,
      userName: "낭만 커피",
      numOfCart: 444,
      numOfLike: 123,
    },
    {
      type: "copy",
      typeText: "동행 프로그램",
      typeColor: "y",
      desc: "매주 시간을 정해놓고 가까운 숲을 지정해서 같이 탐방해요!",
      thumNail: roleImg02,
      userName: "함께 러닝",
      numOfCart: 666,
      numOfLike: 100,
    },
    {
      type: "intro",
      typeText: "1인 프로그램",
      typeColor: "g",
      desc: "숲 해설가와 함께 하는 트레킹! 🎋",
      thumNail: roleImg03,
      userName: "숲속해설가",
      numOfCart: 6007,
      numOfLike: 301,
    },
  ];

  const usesCategory = [
    { type: "all", img: "", title: "전체", icon: "" },
    { type: "copy", img: "", title: "최신순", icon: "" },
    { type: "hash", img: "", title: "오래된순", icon: "" },
    { type: "intro", img: "", title: "선호도순", icon: "" },
  ];

  const tipTitle = null;
  // const tipDesc = `나의 도서 리스트는 내가 찜한 도서 목록을 보여줍니다.<br/> <로그인 이후 사용 가능합니다>`
  const tipDesc = (
    <span>
      나의 도서 리스트는 내가 찜한 도서 목록을 보여줍니다.
      <br />
      로그인 이후 사용 가능합니다
    </span>
  );

  const { isLogined, setIsLogined } = useContext(LoginContext);

  const [aroundData, setAroundData] = useState();
  const [categoryState, setCategoryState] = useState(0);
  const [categoryList, setCategoryList] = useState("");
  const [toastState, setToastState] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [aroundItemState, setAroundItemState] = useState("none");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState("");

  const handleToastMessage = (type) => {
    if (type === "like") {
      setToastState("💗 좋아요를 누르셨습니다!");
      setShowToast((prev) => !prev);
    } else if (type === "copy") {
      setToastState("🎁 담아가기를 누르셨습니다!");
      setShowToast((prev) => !prev);
    }
    return;
  };

  // 카테고리 버튼
  const handleCategoryBtn = (index, type) => {
    setCategoryState(index);
    sortAroundItem(index, type);
  };

  // 카테고리 버튼 클릭시 정렬 함수
  const sortAroundItem = (index) => {
    if (index === 0) {
      setAroundData(defaultData);
    } else {
      setAroundData(
        defaultData.filter((item) => item.type === categoryList[index].type)
      );
    }
  };

  //둘러보기 아이템 클릭시 효과
  const handleAroundItem = (index, item) => {
    // 스타일 효과
    setAroundItemState(index);

    // 클릭한 아이템 정보를 모달로 전달할 state
    setModalInfo(item);
  };

  // 둘러보기 아이템 클릭시 오픈 함수
  const handleAroundItemDetail = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    setAroundData([]);
  }, [categoryState]);

  useEffect(() => {
    setAroundData(defaultData);
    setCategoryList(usesCategory);

    // 다른 부분 클릭시 아이템 active 해제
    const handleClickOutside = (event) => {
      if (!event.target.closest(".aroundItem")) {
        setAroundItemState(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <UsesSection>
      <Title variant="h6">
        ❤️ 나의 도서 리스트{" "}
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
              // endDecorator={isActive && <CheckIcon fontSize="md" />}
              onClick={() => handleCategoryBtn(index, item.type)}
            >
              {item.title}
            </CategoryItem>
          );
        })}
      </CategoryCt>

      {isLogined ? (
        <CusGrid container>
          {aroundData?.map((item, index) => {
            const isActive = aroundItemState === index;
            return (
              <AroundItems
                item
                key={index}
                typeColor={item.typeColor}
                itemtype={item.typeText}
                desc={item.desc}
                thumNail={item.thumNail}
                userName={item.userName}
                Ncart={item.numOfCart}
                Nlike={item.numOfLike}
                handleToastMessage={handleToastMessage}
                setShowToast={setShowToast}
                aroundCalss={isActive}
                onClick={() => {
                  handleAroundItem(index, item);
                }}
                handleAroundItemDetail={handleAroundItemDetail}
              />
            );
          })}
        </CusGrid>
      ) : (
        <Empty>로그인 후 사용해보세요</Empty>
      )}

      {showToast && (
        <ToastMessage setShowToast={setShowToast} text={toastState} />
      )}
      {modalOpen && (
        <ModalPopProgram
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
    span {
      color: #fff;
    }
  }
`;
const CusNoticeIcon = styled(ErrorIcon)`
  color: #3cb371;
`;

const Empty = styled.div`
  width: 100%;
  height: 60px;
  padding: 30px;
  background-color: #dcdcdc;
  border-left: 5px solid tomato;
  color: #434;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;
