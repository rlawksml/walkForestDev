import CloseIcon from "@mui/icons-material/Close";
import { Box, Textarea } from "@mui/joy";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import { Avatar, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from "react";

import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import styled from "styled-components";

export default function ModalPop({ modalOpen, setModalOpen, modalInfo }) {
  // const [moodState, setMoodState] = useState("wit");
  const [moodState, setMoodState] = useState("lively");
  const handleMoodBtn = (e) => {
    setMoodState(e.target.id);
    return;
  };
  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog>
          <DialogTitle>
            {modalInfo.thumNail && <Avatar src={modalInfo.thumNail} />}
            {modalInfo?.userName}

            <CloseBtn
              onClick={() => {
                setModalOpen(false);
              }}
              size="sm"
              variant=""
            >
              <CloseIcon />
            </CloseBtn>
          </DialogTitle>
          <DialogTitle className={modalInfo?.typeColor}>
            <CusTypoToHash
              className={modalInfo?.typeColor}
              style={{ marginRight: "auto" }}
            >
              {modalInfo?.typeText}
            </CusTypoToHash>
           
          </DialogTitle>
          <Divider />
          {/* <DialogContent></DialogContent> */}
          <form
            style={{ overflowY: "scroll" }}
            onSubmit={(event) => {
              event.preventDefault();
              setModalOpen(false);
            }}
          >
            <CusStack spacing={2}>
              <FormControl>
                <FormLabel>주제</FormLabel>
                <CusTextArea
                  disabled
                  autoFocus
                  required
                  value={modalInfo.desc}
                />
              </FormControl>
              <FormControl>
                <FormLabel>내용</FormLabel>
                <CusTextArea
                  disabled
                  autoFocus
                  required
                  value={modalInfo.desc}
                />
                {/* <Input required /> */}
              </FormControl>
              <FormControl>
                <FormLabel>대상</FormLabel>
                <CusTextArea
                  disabled
                  autoFocus
                  required
                  value={modalInfo.desc}
                />
                {/* <Input required /> */}
              </FormControl>
              <FormControl>
                <FormLabel>태그 추가</FormLabel>
                <ResponseCt>
                  <ResponseTextCt>
                    <p>#초보자등산로</p>
                    <p>#가까운등산로</p>
                    <p>#등린이</p>
                    <p>#공원</p>
                    <p>#가족동반</p>
                    <p>#시니어산책로</p>
                    <p>#무릎건강</p>
                  </ResponseTextCt>
                  <ButtonCt>
                    <Button size="sm" variant="">
                      <AutoFixHighIcon />
                    </Button>
                    <Button size="sm" variant="">
                      <AutoAwesomeMotionIcon />
                    </Button>
                    <Button size="sm" variant="">
                      <FingerprintIcon />
                    </Button>
                  </ButtonCt>
                </ResponseCt>
              </FormControl>
              <Button type="submit">작성 하러가기</Button>
            </CusStack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

const CusTypoToHash = styled(Typography)`
  width: fit-content;
  font-weight: bold;

  border-radius: 4px;
  padding: 3.5px 7.5px;
  font-size: 13px;
  font-weight: 500;
  line-height: 25px;
  &.y {
    background: #ffd66b7d;
    color: #ff9921;
  }
  &.g {
    background: #1ad28433;
    color: #289c6b;
  }
  &.p {
    background: #8b44ff2e;
    color: #8b44ff;
  }
`;

const CloseBtn = styled(Button)`
  color: #808080;
  width: 12px;
  height: 12px;
  margin-left: auto;
`;

const CusStack = styled(Stack)``;

const CusTextArea = styled(Textarea)`
  font-size: 13px;
`;

const ResponseCt = styled(Box)`
  border-radius: 10px;
  padding: 10px;

  background-color: var(
    --variant-softBg,
    var(--joy-palette-primary-softBg, var(--joy-palette-primary-100, #e3effb))
  );
`;
const ResponseTextCt = styled.div`
  display: flex;
  flex-wrap: wrap;

  & p {
    display: inline-block;
    font-size: 13px;
    margin: 0 3.5px;
  }
`;
const ButtonCt = styled.div`
  display: flex;

  justify-content: end;
  & button {
    width: 20px;
    height: 20px;
    min-height: auto;
    margin-right: 5px;

    &:hover {
      opacity: 0.7;
    }
    svg {
      width: 15px;
      height: 15px;
    }
  }
`;
