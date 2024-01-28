import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

import React, { useState } from "react";

export default function ToastMessage({ text, setShowToast }) {
  const [defaultState, setDefaultState] = useState({
    vertical: "bottom",
    horizontal: "center",
  });
  const [open, setOpen] = useState(true);
  const { vertical, horizontal } = defaultState;

  const handleClose = () => {
    setOpen(false);
    setShowToast(false);
    // setState({ ...state, open: false });
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={text}
        key={vertical + horizontal}
      />
    </Box>
  );
}
