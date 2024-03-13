import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/joy";
import Input from "@mui/joy/Input";
import { Container, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ModalContext } from "../../../utils/providers/modal/ModalContext";
import Faq from "../../pages/docs/Faq";
import PersonalPolicy from "../../pages/docs/PersonalPolicy";
import ServicePolicy from "../../pages/docs/ServicePolicy";
import Dialogs from "../Dialogs";
import BannerTop from "./BannerTop";
import BookList from "./BookList/BookList";
import AroundContent from "./aroundContent/AroundContent";
import RoleContent from "./roleContent/RoleContent";
import UsesContent from "./useContent/UsesContent";
import styled from "styled-components";
import MainSearch from "../../organisms/MainSearch";
import KakaoMap from "../map/KakaoMap";
import MapSection from "./mapContent/MapSection";
import LibararyData from "../../../utils/LibararyData";
import NormalButton from "../../atomic/NormalButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { isBrowser } from "react-device-detect";
import ToolTips from "../ToolTips";
import ErrorIcon from "@mui/icons-material/Error";
import mapIcon from "../../../assets/images/library.png";

export default function Main() {
  // 다이아로그 관련 state
  const [openDia, setOpenDia] = useState(false);
  const [diaMessageTitle, setDiaMessageTitle] = useState("다이얼로그 타이틀");
  const [diaMessageDesc, setDiaMessageDesc] = useState("다이얼로그 상세설명");

  const tipTitle = null;
  // const tipDesc = `나의 도서 리스트는 내가 찜한 도서 목록을 보여줍니다.<br/> <로그인 이후 사용 가능합니다>`
  const tipDesc = (
    <span>
      1. 도서관 정보를 검색하거나 제시되어 있는 정보를 클릭하면 지도가
      이동됩니다
      <br />
      2. 위치 아이콘을 누르며 현재 위치로 돌아옵니다
    </span>
  );

  // Faq
  // const [openFaq, setOpenFaq] = useState(false);
  const { modalOpen, setModalOpen } = useContext(ModalContext);

  // map 정보
  const [selectedPosition, setSelectedPosition] = useState({ x: 0, y: 0 });

  const handleDialog = (title, desc) => {
    setOpenDia(true);
    // 문구 변경
    handleDialogText(title, desc);
  };

  // 다이아로그 제목 및 문구 변경 함수
  const handleDialogText = (title, desc) => {
    setDiaMessageTitle(title);
    setDiaMessageDesc(desc);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <MyContainer maxWidth={"lg"}>
        <BannerTop
          setOpenDia={setOpenDia}
          handleDialogText={handleDialogText}
          setDiaMessageTitle={setDiaMessageTitle}
          setDiaMessageDesc={setDiaMessageDesc}
        />
        <MainSearch />
        <RoleContent
          handleDialogText={handleDialogText}
          handleClickOpen={handleDialog}
        />
        {/* 로그인 되면 옮길 곳 */}
        <AroundContent
          handleDialogText={handleDialogText}
          handleClickOpen={handleDialog}
        />
        {/* <UsesContent
          handleDialogText={handleDialogText}
          handleClickOpen={handleDialog}
        /> */}
        <MapText variant="h8">
          <img className="icon2" src={mapIcon} alt="지도 아이콘"></img>
          가까운 도서관 찾기
          <MyLocationIcon
            onClick={() => {
              setSelectedPosition({ x: 0, y: 0 });
            }}
            className="icon"
            fontSize="small"
            color="primary"
          />
          {isBrowser ? (
            <ToolTips position={"right"} title={tipTitle} desc={tipDesc}>
              <CusNoticeIcon color="" />
            </ToolTips>
          ) : (
            <NormalButton
              callBackFunc={(e) => {
                handleDialog(tipTitle, tipDesc);
              }}
              buttonTitle={<CusNoticeIcon color="" />}
            ></NormalButton>
          )}
        </MapText>
        <MapSection
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
        />
      </MyContainer>

      {openDia && (
        <Dialogs
          title={diaMessageTitle}
          desc={diaMessageDesc}
          openDia={openDia}
          setOpenDia={setOpenDia}
          callBackFunc={handleRefresh}
        />
      )}

      {modalOpen && <Faq openFaq={modalOpen} setOpenFaq={setModalOpen} />}
    </>
  );
}

const MyContainer = styled(Container)`
  padding-bottom: 50px;
`;

const MapText = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 5px 0 20px;
  font-weight: 600;
  & .icon2 {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  & .icon {
    margin: 0 5px;
    cursor: pointer;
    &:hover {
      color: tomato;
    }
  }
`;
const CusNoticeIcon = styled(ErrorIcon)`
  color: #3cb371;
`;
