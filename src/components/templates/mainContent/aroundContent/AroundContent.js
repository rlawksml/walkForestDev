import ErrorIcon from "@mui/icons-material/Error";
import Chip from "@mui/joy/Chip";
import { Grid, Typography } from "@mui/material";
import { Button } from "@mui/joy";
import React, { useContext, useEffect, useState } from "react";
import { isBrowser } from "react-device-detect";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import favIcon from "../../../../assets/images/touch.png";
import { LoginContext } from "../../../../utils/providers/login/LoginContext";
import NormalButton from "../../../atomic/NormalButton";
import ModalPopProgram from "../../ModalPopProgram";
import ToastMessage from "../../ToastMessage";
import ToolTips from "../../ToolTips";

export default function AroundContent({ handleClickOpen }) {
  const navigate = useNavigate();

  const usesCategory = [{ type: "all", img: "", title: "더보기", icon: "" }];

  const tipTitle = null;
  // const tipDesc = `나의 도서 리스트는 내가 찜한 도서 목록을 보여줍니다.<br/> <로그인 이후 사용 가능합니다>`
  const tipDesc = (
    <span>
      나의 도서 리스트는 내가 찜한 도서 목록을 최대 8개까지 보여줍니다.
      <br />
      로그인 이후 사용 가능합니다
    </span>
  );

  const { isLogined, setIsLogined } = useContext(LoginContext);

  const favoriteList = useSelector((state) => state.favorites.favorites);

  const [aroundData, setAroundData] = useState();
  const [categoryState, setCategoryState] = useState(0);
  const [categoryList, setCategoryList] = useState("");
  const [toastState, setToastState] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [aroundItemState, setAroundItemState] = useState("none");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState("");

  let sliceSize;

  // 카테고리 버튼
  const handleCategoryBtn = (index, type) => {
    if (!isLogined) {
      setToastState("💗 로그인 이후 사용하실 수 있습니다.!");
      setShowToast((prev) => !prev);
    } else {
      navigate("/dashboard");
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
    setCategoryList(usesCategory);

    // 다른 부분 클릭시 아이템 active 해제
    const handleClickOutside = (event) => {
      if (!event.target.closest(".aroundItem")) {
        setAroundItemState(null);
      }
    };
    sliceSize = isBrowser ? 8 : 4;

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <UsesSection>
      <Title variant="h6">
        <img style={{ width: "25px" }} src={favIcon} alt=""></img>
        나의 도서 리스트{" "}
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
              onClick={() => handleCategoryBtn()}
            >
              {item.title}
            </CategoryItem>
          );
        })}
      </CategoryCt>

      {isLogined ? (
        <CusGrid container>
          {favoriteList.length > 0 ? (
            favoriteList?.slice(0, sliceSize)?.map((item, index) => {
              return (
                <FavItemCt>
                  <img className="img" src={item.thumbnail} />
                  <div className="descCt">
                    <Typography className="title">{item.title}</Typography>
                    <Typography className="auth">{item.authors[0]}</Typography>
                  </div>
                </FavItemCt>
              );
            })
          ) : (
            <Empty>
              <p>도서 검색을 통해 나의 도서 리스트를 추가해보세요</p>
              <Button
                onClick={() => {
                  navigate("/SearchBook");
                }}
                variant="soft"
                color="primary"
              >
                바로가기
              </Button>
            </Empty>
          )}
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

  font-size: 17px;
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
  min-height: 60px;
  padding: 20px;
  background-color: #dcdcdc;
  border-left: 5px solid tomato;
  color: #434;
  font-size: 14px;
  line-height: auto;
  font-weight: 400;

  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    margin: 10px 0;
    font-weight: 600;
    letter-spacing: -1px;
    word-break: keep-all;
  }
`;

const FavItemCt = styled.div`
  box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  padding: 10px 15px;

  width: 250px;
  height: 150px;
  margin: 5px 10px;
  display: flex;

  .descCt {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .auth {
    font-size: 11px;
    font-weight: 300;

    letter-spacing: -1px;
    line-height: auto;

    font-weight: 600;
    margin-top: auto;
    text-align: right;
  }
  .title {
    font-size: 13px;
    font-weight: 300;
    letter-spacing: -1px;
    line-height: auto;
  }
  .img {
    width: 100px;
    margin-right: 10px;
    border: 1px solid #dcdcdc;
    background-color: #dcdcdc;
  }
`;
