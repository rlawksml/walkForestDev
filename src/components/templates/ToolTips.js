import * as React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import styled from "styled-components";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 280,
    borderRadius: "10px 10px 10px 10px",
    border: "1px solid #ffc42e",
    filter: "drop-shadow(0px 4px 7.8px rgba(0, 0, 0, 0.21))",
    wordBreak: "keep-all",
    padding: "10px",
  },
}));

export default function ToolTips({ position, title, desc, children }) {
  return (
    <HtmlTooltip
      placement={position}
      title={
        <React.Fragment>
          <Typography color="inherit">{title ? title : ""}</Typography>
          <Typography sx={{ wordBreak: "keep-all" }} className="desc">
            {desc}
          </Typography>
        </React.Fragment>
      }
    >
      {children}
    </HtmlTooltip>
  );
}
