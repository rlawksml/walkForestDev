import { useContext, useState } from "react";
import AroundContent from "./aroundContent/AroundContent";
import BannerTop from "./BannerTop";
import RoleContent from "./roleContent/RoleContent";
import UsesContent from "./useContent/UsesContent";
import Dialogs from "../Dialogs";
import { Container } from "@mui/material";
import Footer from "../../organisms/Footer";
import { isBrowser } from "react-device-detect";
import Faq from "../../pages/docs/Faq";
import ServicePolicy from "../../pages/docs/ServicePolicy";
import PersonalPolicy from "../../pages/docs/PersonalPolicy";
import { ModalContext } from "../../../utils/providers/modal/ModalContext";

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
      <BannerTop />
      <Container maxWidth={"lg"}>
        <RoleContent />
        <UsesContent
          handleDialogText={handleDialogText}
          handleClickOpen={handleDialog}
        />
        <AroundContent
          handleDialogText={handleDialogText}
          handleClickOpen={handleDialog}
        />
      </Container>

      {openDia && (
        <Dialogs
          title={diaMessageTitle}
          desc={diaMessageDesc}
          openDia={openDia}
          setOpenDia={setOpenDia}
        />
      )}

      {modalOpen && <Faq openFaq={modalOpen} setOpenFaq={setModalOpen} />}
      {openServiceM && (
        <ServicePolicy
          openServiceM={openServiceM}
          setOpenServiceM={setOpenServiceM}
        />
      )}
      {openPersonM && (
        <PersonalPolicy
          openPersonM={openPersonM}
          setOpenPersonM={setOpenPersonM}
        />
      )}
    </>
  );
}
