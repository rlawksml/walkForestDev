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

export default function Main() {
  // 다이아로그 관련 state
  const [openDia, setOpenDia] = useState(false);
  const [diaMessageTitle, setDiaMessageTitle] = useState("다이얼로그 타이틀");
  const [diaMessageDesc, setDiaMessageDesc] = useState("다이얼로그 상세설명");

  // Faq
  // const [openFaq, setOpenFaq] = useState(false);
  const { modalOpen, setModalOpen } = useContext(ModalContext);

  // 서비스이용약관
  const [openServiceM, setOpenServiceM] = useState(false);

  // 개인정보처리방침
  const [openPersonM, setOpenPersonM] = useState(false);

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

  return (
    <>
      <MyContainer maxWidth={"lg"}>
        <BannerTop />
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
        <UsesContent
          handleDialogText={handleDialogText}
          handleClickOpen={handleDialog}
        />
        <MapText variant="h8">가까운 도서관 찾기</MapText>
        <MapSection />
      </MyContainer>

      {openDia && (
        <Dialogs
          title={diaMessageTitle}
          desc={diaMessageDesc}
          openDia={openDia}
          setOpenDia={setOpenDia}
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
  display: block;
  margin: 5px 0 20px;
  font-weight: 600;
`;
