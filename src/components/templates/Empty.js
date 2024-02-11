import React from "react";
import styled from "styled-components";
import ErrorIcon from "@mui/icons-material/Error";

export default function Empty({ desc }) {
  return (
    <EmptyCt>
      <ErrorIcon className="icon" color="error" variant="soft" />
      {desc ? desc : "자료가 없습니다."}
    </EmptyCt>
  );
}

const EmptyCt = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 0 10px 10px 0;
  position: relative;
  font-size: 14px;
  color: #888;
  background-color: #dcdcdc;
  display: flex;
  align-items: center;
  .icon {
    margin: 0 10px 0 20px;
  }
  &:after {
    position: absolute;
    content: "";
    width: 10px;
    height: 100%;
    top: 0;
    leftl: 0;
    background-color: tomato;
  }
`;
