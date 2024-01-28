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

export default function PersonalPolicy({ openPersonM, setOpenPersonM }) {
  return (
    <CusModal open={openPersonM} onClose={() => setOpenPersonM(false)}>
      <CusModalDialog>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          개인정보처리방침
        </Typography>
      </CusModalDialog>
    </CusModal>
  );
}

const CusModal = styled(Modal)``;

const CusModalDialog = styled(ModalDialog)`
  overflow: auto;
  max-height: 500px;
`;
