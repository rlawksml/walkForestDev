import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import SimCardAlertIcon from "@mui/icons-material/SimCardAlert";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <NotFoundContainer>
      <SimCardAlertIcon sx={{ mb: 5 }} fontSize="large" color="error" />
      <Typography sx={{ mb: 5 }} variant="h4" color={"GrayText"}>
        요청하신 페이지를 찾지 못했습니다.
      </Typography>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로 돌아가기
      </Button>
    </NotFoundContainer>
  );
}

const NotFoundContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
