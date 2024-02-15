import { Box, Textarea } from "@mui/joy";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import CloseIcon from "@mui/icons-material/Close";

import styled from "styled-components";

export default function RecommandBookCard({
  modalOpen,
  setModalOpen,
  modalInfo,
}) {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [thum, setThum] = useState();
  const [createAt, setCreatAt] = useState();

  useEffect(() => {
    setThum(modalInfo?.thumnail);
    setDesc(modalInfo?.desc);
    setTitle(modalInfo?.title);
    setCreatAt(modalInfo?.createAt);
  }, []);
  return (
    <>
      <MyModal fullSize open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog>
          <CloseIcon
            className="closeBtn"
            onClick={() => {
              setModalOpen(false);
            }}
          />
          {modalInfo ? (
            <Card>
              <BookHeader>
                <div>
                  <Typography sx={{ wordBreak: "keep-all" }} level="title-lg">
                    {title}
                  </Typography>
                  <Typography level="body-sm">{createAt}</Typography>
                </div>
                <IconButton
                  className="bookMarkBtn"
                  aria-label="bookmark Bahamas Islands"
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ marginLeft: "auto" }}
                >
                  <BookmarkAdd />
                </IconButton>
              </BookHeader>

              <BookImg
                className=""
                src={thum}
                srcSet={thum}
                loading="lazy"
                alt=""
              />

              <CardContent orientation="vertical">
                <div>
                  <Typography level="body-xs">{desc}</Typography>
                </div>
                <Button
                  variant="outlined"
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: "auto", alignSelf: "center", fontWeight: 500 }}
                >
                  보러가기
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Typography>준비중인 서비스입니다.</Typography>
          )}
        </ModalDialog>
      </MyModal>
    </>
  );
}

const MyModal = styled(Modal)`
  .closeBtn {
    margin-left: auto;
  }
  .bookMarkBtn {
    margin-bottom: auto;
  }
`;

const BookImg = styled.img`
  width: 80%;
  margin: 0 auto;
`;

const BookHeader = styled.div`
  display: flex;
`;
