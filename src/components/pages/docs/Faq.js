import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import styled from "styled-components";
import { Typography } from "@mui/material";

export default function Faq({ openFaq, setOpenFaq }) {
  return (
    <CusModal open={openFaq} onClose={() => setOpenFaq(false)}>
      <CusModalDialog>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          자주 묻는 질문
        </Typography>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            FAQ 1
          </AccordionSummary>
          <AccordionDetails>FAQ 첫번째 내용</AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            FAQ 2
          </AccordionSummary>
          <AccordionDetails>
            FAQ 두번째 내용입니다.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            FAQ 3
          </AccordionSummary>
          <AccordionDetails>
            FAQ 세번째 내용
          </AccordionDetails>
        </Accordion>
      </CusModalDialog>
    </CusModal>
  );
}

const CusModal = styled(Modal)``;

const CusModalDialog = styled(ModalDialog)`
  overflow: auto;
  max-height: 500px;
`;
