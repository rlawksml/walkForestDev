import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

import React, { useState } from "react";

export default function ToastMessage({ text, showToast, setShowToast }) {
  const [defaultState, setDefaultState] = useState({
    vertical: "bottom",
    horizontal: "center",
  });
  // const [open, setOpen] = useState(true);
  const { vertical, horizontal } = defaultState;

  const handleClose = () => {
    // setOpen(false);
    setShowToast((prev) => !prev);
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={showToast}
        onClose={handleClose}
        message={text}
        key={vertical + horizontal}
      />
    </Box>
  );
}
