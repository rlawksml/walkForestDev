import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Dialogs({
  openDia,
  setOpenDia,
  title,
  desc,
  callBackFunc,
}) {
  const handleClose = () => {
    setOpenDia(false);
  };

  return (
    <>
      <Dialog
        open={openDia}
        onClose={handleClose}
        aria-labelledby={title}
        aria-describedby={desc}
      >
        <DialogTitle id={title}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id={desc}>{desc} </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>취소</Button> */}
          <Button
            onClick={(e) => {
              e.preventDefault();
              callBackFunc && callBackFunc(e);
              handleClose();
            }}
            autoFocus
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
