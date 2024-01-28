import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function UseItems({
  itemtype,
  desc,
  typeColor,
  cardClass,
  onClick,
  handleUsesItemDetail,
}) {
  return (
    <CusCard
      size="sm"
      sx={{ width: 320 }}
      variant="soft"
      color="neutral"
      className={cardClass ? "active usesItem" : "usesItem"}
      onClick={onClick}
    >
      <CardInfoTop>
        <Title className={typeColor} level="title-sm">
          {itemtype}
        </Title>
        <CusBtn
          variant="soft"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 500 }}
          onClick={() => {
            handleUsesItemDetail();
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </CusBtn>
      </CardInfoTop>
      <CardContent orientation="horizontal">
        <Desc level="body-sm">{desc}</Desc>
      </CardContent>
    </CusCard>
  );
}

const CusCard = styled(Card)`
  border-radius: 7px;
  background: #fff;

  border: 1.5px solid #dcdcdc;
  width: 100%;

  &.active {
    box-shadow: 0px 4px 5.3px 0px rgba(0, 0, 0, 0.25);
    border: 2px solid #ffc42e;
  }
  margin: 10px 0;

  @media (min-width: 481px) {
    flex: 0 0 30%;
    width: 31%;
    margin: 10px;
    min-height: 120px;
  }
`;

const CardInfoTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(Typography)`
  font-weight: bold;

  border-radius: 4px;
  padding: 3.5px 7.5px;
  font-size: 13px;
  font-weight: 500;

  width: fit-content;

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

const CusBtn = styled(Button)`
  color: #808080;
  background: transparent;
  padding: 0;
  width: 20px;
  height: 20px;
  min-height: auto;

  border-radius: 100px;

  & svg {
    width: 15px;
    height: 15px;
  }
`;

const Desc = styled(Typography)`
  word-break: keep-all;
`;
