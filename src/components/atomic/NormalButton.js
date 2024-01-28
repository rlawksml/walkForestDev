import React from "react";
import styled from "styled-components";

export default function normalButton({
  disabled,
  buttonId,
  buttonTitle,
  buttonClass,
  callBackFunc,
  type,
  style,
}) {
  return (
    <DefaultBtn
      type={type}
      id={buttonId}
      disabled={disabled}
      className={buttonClass ? buttonClass : ""}
      style={{ ...style }}
      onClick={(e) => {
        e.preventDefault();
        callBackFunc && callBackFunc(e);
      }}
    >
      {buttonTitle}
    </DefaultBtn>
  );
}

const DefaultBtn = styled.button`
  min-width: fit-content;
  transition: 0.2s;

  letter-spacing: -1px;
  font-weight: 500;
  border-radius: 5px;
  border: none;
  background: transparent;
`;
